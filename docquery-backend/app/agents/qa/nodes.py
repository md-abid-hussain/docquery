import os
from typing import List

from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_community.document_loaders import GithubFileLoader
from langchain_core.documents import Document
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from langchain_mongodb.retrievers import MongoDBAtlasHybridSearchRetriever

from app.agents.utils.database import get_vector_store
from app.agents.utils.models import get_chat_model, get_llm_for_intermediate_process

from .state import QAAgentState

model = get_chat_model()
intermediate_llm = get_llm_for_intermediate_process()


# System prompts
COMPRESSION_PROMPT = """You are an expert in context compression. Your task is to:
1. Analyze the context and question.
2. Extract and summarize only the most relevant information.
3. Preserve relevant code examples only if the user asked for an example in the question.
4. Format the output clearly.

Provide a compressed context with all crucial information."""

CHAT_SYSTEM_PROMPT = """You are an expert chatbot which can answer properly as per context and question.
Answer the user's question accurately with the context available.
If context is not available, inform the user that you are unable to answer the question.

The answer should be concise and properly formatted in markdown format.
If the context has a suitable example for the question, include it in the answer.

By default, keep your responses concise and to the point unless the user specifically asks for a detailed response or additional information."""


def create_github_file_loader(repo):
    return GithubFileLoader(
        repo=repo,
        access_token=os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN"),
        file_filter=None,
    )


def get_similar_documents(repo_name: str, query: str) -> List[Document]:
    retriever = MongoDBAtlasHybridSearchRetriever(
        vectorstore=get_vector_store(),
        search_index_name="text_search_index",
        pre_filter={"repo": {"$eq": repo_name}},
        top_k=4,
    )

    retriever_from_llm = MultiQueryRetriever.from_llm(
        retriever=retriever, llm=intermediate_llm
    )

    results = retriever_from_llm.invoke(query)

    document_set = set(doc.metadata.get("file_path") for doc in results)

    loader = create_github_file_loader(repo_name)
    doc_to_send = []

    for file_path in document_set:
        document_content = loader.get_file_content_by_path(file_path)
        doc_to_send.append(
            Document(page_content=document_content, metadata={"file_path": file_path})
        )

    return doc_to_send


def format_context(documents: List[Document]) -> str:
    if not documents:
        return "No context available"

    formatted_contexts = []
    for i, doc in enumerate(documents, 1):
        formatted_contexts.append(
            f"Document {i} ({doc.metadata.get('file_path', 'unknown')}):\n{doc.page_content}\n"
        )
    return "\n".join(formatted_contexts)


async def retrieve_node(state: QAAgentState, config: RunnableConfig):

    try:
        docs = get_similar_documents(state["repository_name"], state["question"])

        if not docs:
            state["error"] = "No relevant documents found for the query"

        state["context"] = format_context(docs)

        return state
    except Exception as e:
        state["error"] = f"Error during retrieval: {str(e)}"
        return state


async def chat_node(state: QAAgentState, config: RunnableConfig):
    compression_messages = [
        SystemMessage(content=COMPRESSION_PROMPT),
        HumanMessage(
            content=f"Question: {state['question']}\nContext: {state['context']}"
        ),
    ]
    compressed_context = intermediate_llm.invoke(compression_messages)

    # Generate response
    chat_messages = [
        SystemMessage(
            content=f"{CHAT_SYSTEM_PROMPT}\n\nRepository: {state['repository_name']}\n"
            f"Context:\n{compressed_context.content}"
        ),
        HumanMessage(content=state["question"]),
    ]

    response = model.invoke(chat_messages, config=config)
    state["messages"].append(AIMessage(content=response.content))

    return state

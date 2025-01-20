from typing import List
from .state import QAAgentState
from app.agents.utils.models import get_chat_model
from app.agents.utils.database import get_vector_store
from langchain_core.documents import Document
from langchain_core.runnables import RunnableConfig
from langchain_mongodb.retrievers import MongoDBAtlasHybridSearchRetriever
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

model = get_chat_model()

def get_similar_documents(repo_name: str, query: str) -> List[Document]:
    retriever = MongoDBAtlasHybridSearchRetriever(
        vectorstore=get_vector_store(),
        search_index_name="text_search_index",
        pre_filter={"repo": {"$eq": repo_name}},
    )

    results = retriever.invoke(query)

    return results


async def retrieve_node(state: QAAgentState, config: RunnableConfig):
    if state.get("prev_repo_name"):
        print("got previous state")
        if state["prev_repo_name"] != state["repository_name"]:
            state["documents"] = None
            state['messages'] = []
            state["prev_repo_name"] = state["repository_name"]

    else:
        state["prev_repo_name"] = state["repository_name"]

    question = state["question"]
    repository_name = state["repository_name"]
    docs = get_similar_documents(repository_name, question)

    state["documents"] = docs

    return state


async def chat_node(state: QAAgentState, config: RunnableConfig):

    system_message = f"""
    Answer the user\'s question from the context. If context not present try answering yourself.
    user_question: {state["question"]}
    context: {"\n\n".join(doc.page_content for doc in state["documents"])}

    Answer should be detailed and should contain examples for explanation if required.
    If context is empty return a message saying that not able to find any answer.
    """

    messages = [
        SystemMessage(content=system_message),
        HumanMessage(content=state["question"]),
    ]

    response = model.invoke(messages, config=config)

    state["messages"].append(AIMessage(content=response.content))

    return state

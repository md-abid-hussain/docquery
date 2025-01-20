import os
from .state import IngestionAgentState
from app.agents.utils.database import get_vector_store, save_to_database
from langchain_core.runnables import RunnableConfig
from langchain_core.documents import Document
from langchain_community.document_loaders import GithubFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from copilotkit.langchain import copilotkit_emit_state


def create_github_file_loader(repo):
    return GithubFileLoader(
        repo=repo,
        access_token=os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN"),
        file_filter=None,
    )


async def ingestion_node(state: IngestionAgentState, config: RunnableConfig):
    try:
        vector_store = get_vector_store()
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, chunk_overlap=200
        )
        loader = create_github_file_loader(state["repo"]["full_name"])
        for index, file_path in enumerate(state["repo"]["files_path"]):
            state["files_ingested"] = index + 1
            await copilotkit_emit_state(config, state)

            document_content = loader.get_file_content_by_path(file_path)
            document = Document(
                page_content=document_content,
                metadata={"file_path": file_path, "repo": state["repo"]["full_name"]},
            )

            split_docs = text_splitter.split_documents([document])
            vector_store.add_documents(split_docs)
        return state
    except Exception as e:
        state["error"] = f"Error during ingestion: {str(e)}"
        return state


async def verify_ingestion_node(state: IngestionAgentState, config: RunnableConfig):
    if state["error"]:
        state["status"] = "FAILED"
    else:
        save_to_database(state["repo"]["full_name"])
        state["status"] = "COMPLETED"

    return state

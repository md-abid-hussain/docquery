from copilotkit.state import MessagesState
from typing import TypedDict, Optional, List, AsyncIterator
from enum import Enum


class StatusType(Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


class RepositoryDetails(TypedDict):
    name: str
    full_name: str
    files_path: List[str]
    repository_url: str
    documents: Optional[AsyncIterator[str]]


class IngestionAgentState(MessagesState):
    repo: Optional[RepositoryDetails]
    error: Optional[str]
    status: StatusType
    total_files: int
    files_ingested: int

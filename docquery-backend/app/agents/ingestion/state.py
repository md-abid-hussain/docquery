from enum import Enum
from typing import List, Literal, Optional, TypedDict

from copilotkit.state import MessagesState


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


class IngestionAgentState(MessagesState):
    repo: Optional[RepositoryDetails]
    error: Optional[str]
    status: Literal["PENDING", "RUNNING", "COMPLETED", "FAILED", "CANCELLED"]
    total_files: int
    files_ingested: int

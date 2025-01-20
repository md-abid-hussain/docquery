from typing import Optional, List
from copilotkit.state import CopilotKitState
from langchain_core.documents import Document


class QAAgentState(CopilotKitState):
    question: str
    repository_name: str
    prev_repo_name: Optional[str]
    documents: Optional[List[Document]]
    error: Optional[str]

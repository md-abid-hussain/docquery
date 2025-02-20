from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph

from .nodes import chat_node, retrieve_node
from .state import QAAgentState

workflow = StateGraph(QAAgentState)

workflow.add_node("Retrieve Node", retrieve_node)
workflow.add_node("Chat Node", chat_node)

workflow.add_edge("Retrieve Node", "Chat Node")

workflow.set_entry_point("Retrieve Node")

checkpointer = MemorySaver()
graph = workflow.compile(checkpointer=checkpointer)

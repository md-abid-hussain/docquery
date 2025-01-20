from .nodes import retrieve_node, chat_node
from .state import QAAgentState
from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import MemorySaver


workflow = StateGraph(QAAgentState)

workflow.add_node("Retrieve Node", retrieve_node)
workflow.add_node("Chat Node", chat_node)

workflow.add_edge("Retrieve Node", "Chat Node")

workflow.set_entry_point("Retrieve Node")

checkpointer = MemorySaver()
graph = workflow.compile(checkpointer=checkpointer)

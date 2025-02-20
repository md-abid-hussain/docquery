from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph

from .nodes import ingestion_node, verify_ingestion_node
from .state import IngestionAgentState

workflow = StateGraph(IngestionAgentState)

workflow.add_node("Ingestion Node", ingestion_node)
workflow.add_node("Verify Ingestion Node", verify_ingestion_node)

workflow.set_entry_point("Ingestion Node")
workflow.add_edge("Ingestion Node", "Verify Ingestion Node")

checkpointer = MemorySaver()
graph = workflow.compile(checkpointer=checkpointer)

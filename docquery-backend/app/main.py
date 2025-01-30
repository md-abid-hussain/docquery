from fastapi import FastAPI
from dotenv import load_dotenv
from app.agents.ingestion_agent.agent import graph as ingestion_agent_graph
from app.agents.qa_agent.agent import graph as qa_agent_graph
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitSDK, LangGraphAgent

load_dotenv()

app = FastAPI()
sdk = CopilotKitSDK(
    agents=[
        LangGraphAgent(
            name="ingestion_agent",
            graph=ingestion_agent_graph,
            description="Ingestion Agent",
        ),
        LangGraphAgent(
            name="qa_agent",
            graph=qa_agent_graph,
            description="QA Agent"
        ),
    ]
)

add_fastapi_endpoint(app, sdk, "/copilotkit")


@app.get("/test")
def read_root():
    return "running"

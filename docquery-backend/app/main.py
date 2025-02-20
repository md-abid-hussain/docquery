# import os
# from contextlib import asynccontextmanager

from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agents.ingestion.agent import graph as ingestion_agent_graph
from app.agents.qa.agent import graph as qa_agent_graph

# from langgraph.checkpoint.memory import MemorySaver
# from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver


load_dotenv()


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     async with AsyncPostgresSaver.from_conn_string(
#         conn_string=os.environ.get("POSTGRES_URI") or ""
#     ) as checkpointer:

#         await checkpointer.setup()

#         # QA agent graph
#         qa_agent_graph = qa_agent_workflow.compile(checkpointer=checkpointer)

#         # Ingestion agent graph
#         ingestion_agent_graph = ingestion_agent_workflow.compile(
#             checkpointer=MemorySaver()
#         )

#         # Create SDK with the graph
#         sdk = CopilotKitRemoteEndpoint(
#             agents=[
#                 LangGraphAgent(
#                     name="ingestion_agent",
#                     graph=ingestion_agent_graph,
#                     description="Ingestion Agent",
#                 ),
#                 LangGraphAgent(
#                     name="qa_agent", graph=qa_agent_graph, description="QA Agent"
#                 ),
#             ]
#         )

#         # Add the CopilotKit FastAPI endpoint
#         add_fastapi_endpoint(app, sdk, "/copilotkit")

#         yield


# app = FastAPI(lifespan=lifespan)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React development server
        "http://localhost:8000",  # FastAPI development server
        # Add your production domains here
        "https://docquery-ten.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


sdk = CopilotKitRemoteEndpoint(
    agents=[
        LangGraphAgent(
            name="ingestion_agent",
            graph=ingestion_agent_graph,
            description="Ingestion Agent",
        ),
        LangGraphAgent(name="qa_agent", graph=qa_agent_graph, description="QA Agent"),
    ]
)

# Add the CopilotKit FastAPI endpoint
add_fastapi_endpoint(app, sdk, "/copilotkit")


@app.get("/")
def health_check():
    return {"status": "ok"}

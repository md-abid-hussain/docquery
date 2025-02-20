import os

from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_together import ChatTogether


def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        google_api_key=os.environ.get("GOOGLE_API_KEY"),
    )


def get_chat_model():

    return ChatTogether(model="mistralai/Mistral-Small-24B-Instruct-2501")


def get_llm_for_intermediate_process():
    return ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-thinking-exp",
        google_api_key=os.environ.get("GOOGLE_API_KEY"),
        temperature=0,
    )

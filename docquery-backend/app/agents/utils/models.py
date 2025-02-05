import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_together import ChatTogether


def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        google_api_key=os.environ.get("GOOGLE_API_KEY")
    )


def get_chat_model(name: str = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"):
    return ChatTogether(name=name, api_key=os.environ.get("TOGETHER_API_KEY"))

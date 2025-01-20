import os
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from .models import get_embedding_model

client = MongoClient(os.environ.get("MONGODB_ATLAS_CLUSTER_URI"))

DB_NAME = "docquery_db"
COLLECTION_NAME = "vectorstore"
ATLAS_VECTOR_SEARCH_INDEX = "rag_index"

MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=get_embedding_model(),
    index_name=ATLAS_VECTOR_SEARCH_INDEX,
    relevance_score_fn="cosine",
)

def get_vector_store():
    return vector_store

def save_to_database(name: str):
    repository_collection = client["docquery"]["repositories"]
    repository_collection.insert_one({"name": name})


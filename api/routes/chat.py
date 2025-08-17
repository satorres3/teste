from __future__ import annotations

import json
import os

from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import StreamingResponse

from services.rag import (
    AzureAISearchVectorStore,
    PgVectorStore,
    HybridRetriever,
)

router = APIRouter(prefix="/api/chat", tags=["chat"])

# Configure retriever using available vector store
_vector_store = (
    AzureAISearchVectorStore("", "", "")
    if os.getenv("AZURE_SEARCH_ENDPOINT")
    else PgVectorStore(os.getenv("PGVECTOR_DSN", ""))
)
_retriever = HybridRetriever(_vector_store)


class ChatRequest(BaseModel):
    query: str


@router.post("/{workspace_id}/stream")
async def stream_chat(workspace_id: str, req: ChatRequest) -> StreamingResponse:
    """Stream chat responses for a workspace with RAG retrieval."""
    docs = _retriever.retrieve(workspace_id, req.query)

    def _stream() -> list[str]:
        payload = {"documents": [d.text for d in docs]}
        yield f"data: {json.dumps(payload)}\n\n"

    return StreamingResponse(_stream(), media_type="text/event-stream")

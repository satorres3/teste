from __future__ import annotations

import os
from typing import List

from fastapi import APIRouter, HTTPException, UploadFile
from pydantic import BaseModel

from services.rag import (
    AzureBlobStorage,
    AzureAISearchVectorStore,
    PgVectorStore,
    Document,
    Embedder,
    chunk_text,
    pdf_to_text,
    html_to_text,
)

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])


# Instantiate services (placeholders for real credentials)
_vector_store = (
    AzureAISearchVectorStore("", "", "")
    if os.getenv("AZURE_SEARCH_ENDPOINT")
    else PgVectorStore(os.getenv("PGVECTOR_DSN", ""))
)
_embedder = Embedder()
_blob_storage = (
    AzureBlobStorage(os.getenv("AZURE_BLOB_CONNECTION", ""), os.getenv("AZURE_BLOB_CONTAINER", "raw"))
    if os.getenv("AZURE_BLOB_CONNECTION")
    else None
)


@router.get("/")
async def list_knowledge() -> list[str]:
    """Return knowledge base items."""
    return []


async def _ingest_text(workspace_id: str, text: str, prefix: str) -> None:
    chunks = chunk_text(text)
    docs: List[Document] = []
    for idx, chunk in enumerate(chunks):
        embedding = _embedder.embed([chunk])[0]
        doc_id = f"{prefix}-{idx}"
        docs.append(Document(id=doc_id, text=chunk, embedding=embedding))
    _vector_store.upsert(workspace_id, docs)


@router.post("/{workspace_id}/upload")
async def upload_document(workspace_id: str, file: UploadFile) -> dict[str, str]:
    """Upload a file to the knowledge base."""
    data = await file.read()
    if _blob_storage:
        _blob_storage.upload(f"{workspace_id}/{file.filename}", data)
    if file.filename.lower().endswith(".pdf"):
        text = pdf_to_text(data)
    else:
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            text = data.decode("latin-1")
    await _ingest_text(workspace_id, text, file.filename)
    return {"status": "ok"}


class WebIngest(BaseModel):
    url: str


@router.post("/{workspace_id}/web")
async def ingest_web(workspace_id: str, payload: WebIngest) -> dict[str, str]:
    """Fetch a web page and add it to the knowledge base."""
    try:
        import requests
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc))
    response = requests.get(payload.url, timeout=10)
    response.raise_for_status()
    text = html_to_text(response.text)
    await _ingest_text(workspace_id, text, payload.url)
    return {"status": "ok"}


class SharePointIngest(BaseModel):
    url: str


@router.post("/{workspace_id}/sharepoint")
async def ingest_sharepoint(workspace_id: str, payload: SharePointIngest) -> dict[str, str]:
    """Placeholder for SharePoint ingestion."""
    # Real implementation would authenticate and download the file.
    await _ingest_text(workspace_id, f"sharepoint:{payload.url}", payload.url)
    return {"status": "ok"}

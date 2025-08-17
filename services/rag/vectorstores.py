"""Vector store abstractions."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, List, Protocol


@dataclass
class Document:
    id: str
    text: str
    embedding: List[float]


class VectorStore(Protocol):
    """Abstract vector store interface."""

    def upsert(self, workspace_id: str, docs: Iterable[Document]) -> None: ...
    def search(self, workspace_id: str, query: List[float], k: int = 5) -> List[Document]: ...
    def keyword_search(self, workspace_id: str, query: str, k: int = 5) -> List[Document]: ...


class AzureAISearchVectorStore:
    """Minimal stub for Azure AI Search based vector storage."""

    def __init__(self, endpoint: str, index: str, api_key: str):
        self.endpoint = endpoint
        self.index = index
        self.api_key = api_key

    def upsert(self, workspace_id: str, docs: Iterable[Document]) -> None:  # pragma: no cover - stub
        pass

    def search(self, workspace_id: str, query: List[float], k: int = 5) -> List[Document]:  # pragma: no cover - stub
        return []

    def keyword_search(self, workspace_id: str, query: str, k: int = 5) -> List[Document]:  # pragma: no cover - stub
        return []


class PgVectorStore:
    """Minimal stub for a pgvector backed store."""

    def __init__(self, dsn: str):
        self.dsn = dsn

    def upsert(self, workspace_id: str, docs: Iterable[Document]) -> None:  # pragma: no cover - stub
        pass

    def search(self, workspace_id: str, query: List[float], k: int = 5) -> List[Document]:  # pragma: no cover - stub
        return []

    def keyword_search(self, workspace_id: str, query: str, k: int = 5) -> List[Document]:  # pragma: no cover - stub
        return []


__all__ = [
    "Document",
    "VectorStore",
    "AzureAISearchVectorStore",
    "PgVectorStore",
]

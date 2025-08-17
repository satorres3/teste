"""Hybrid retrieval helpers."""
from __future__ import annotations

from typing import Iterable, List

from .embeddings import Embedder
from .vectorstores import Document, VectorStore


class HybridRetriever:
    """Combine keyword and vector search with a simple re-ranking strategy."""

    def __init__(self, vector_store: VectorStore, embedder: Embedder | None = None):
        self.vector_store = vector_store
        self.embedder = embedder or Embedder()

    def retrieve(self, workspace_id: str, query: str, k: int = 5) -> List[Document]:
        """Retrieve documents relevant to *query*.

        The retriever performs a vector search and keyword search, merges the
        results and returns them ordered by aggregated score. This serves as a
        light-weight placeholder for more sophisticated re-ranking systems.
        """

        embedding = self.embedder.embed([query])[0]
        vector_hits = self.vector_store.search(workspace_id, embedding, k)
        keyword_hits = self.vector_store.keyword_search(workspace_id, query, k)

        combined: dict[str, Document] = {}
        scores: dict[str, float] = {}

        def _accumulate(docs: Iterable[Document], weight: float = 1.0) -> None:
            for rank, doc in enumerate(docs, start=1):
                combined.setdefault(doc.id, doc)
                scores[doc.id] = scores.get(doc.id, 0.0) + weight / rank

        _accumulate(vector_hits, weight=1.0)
        _accumulate(keyword_hits, weight=0.5)

        ranked_ids = sorted(scores, key=scores.get, reverse=True)
        return [combined[i] for i in ranked_ids][:k]


__all__ = ["HybridRetriever"]

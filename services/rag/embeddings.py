"""Embedding helpers."""
from __future__ import annotations

from typing import Iterable, List


class Embedder:
    """Simple embedding interface with a deterministic fallback."""

    def embed(self, texts: Iterable[str]) -> List[List[float]]:
        """Embed a list of texts into vectors.

        The default implementation provides a deterministic placeholder
        based on the built-in ``hash`` function so that the module works
        without external dependencies.
        """

        vectors: List[List[float]] = []
        for text in texts:
            h = hash(text)
            # produce a pseudo vector of length 3
            vectors.append([(h >> i & 0xFF) / 255.0 for i in range(3)])
        return vectors


__all__ = ["Embedder"]

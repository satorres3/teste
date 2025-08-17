"""Utilities for chunking documents into smaller pieces."""
from __future__ import annotations

from typing import Iterable

try:
    import PyPDF2  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    PyPDF2 = None

try:
    from bs4 import BeautifulSoup  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    BeautifulSoup = None


CHUNK_SIZE = 500

def chunk_text(text: str, chunk_size: int = CHUNK_SIZE) -> list[str]:
    """Split raw text into non-overlapping chunks."""
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]


def pdf_to_text(stream: bytes) -> str:
    """Extract text from a PDF byte stream."""
    if not PyPDF2:  # pragma: no cover
        raise RuntimeError("PyPDF2 is required for PDF processing")
    reader = PyPDF2.PdfReader(stream)
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def html_to_text(html: str) -> str:
    """Extract readable text from HTML."""
    if not BeautifulSoup:  # pragma: no cover
        raise RuntimeError("BeautifulSoup is required for HTML processing")
    soup = BeautifulSoup(html, "html.parser")
    return soup.get_text(" ", strip=True)


__all__ = [
    "chunk_text",
    "pdf_to_text",
    "html_to_text",
]

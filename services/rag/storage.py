"""Storage helpers for raw files."""
from __future__ import annotations

try:
    from azure.storage.blob import BlobServiceClient  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    BlobServiceClient = None


class AzureBlobStorage:
    """Minimal Azure Blob Storage wrapper used for raw file uploads."""

    def __init__(self, connection_string: str, container: str):
        if not BlobServiceClient:  # pragma: no cover
            raise RuntimeError("azure-storage-blob is required for AzureBlobStorage")
        self.client = BlobServiceClient.from_connection_string(connection_string)
        self.container = self.client.get_container_client(container)

    def upload(self, name: str, data: bytes) -> str:  # pragma: no cover - stub
        blob = self.container.get_blob_client(name)
        blob.upload_blob(data, overwrite=True)
        return blob.url


__all__ = ["AzureBlobStorage"]

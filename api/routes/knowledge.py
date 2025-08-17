from fastapi import APIRouter

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])


@router.get("/")
async def list_knowledge() -> list[str]:
    """Return knowledge base items."""
    return []

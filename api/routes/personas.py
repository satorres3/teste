from fastapi import APIRouter

router = APIRouter(prefix="/api/personas", tags=["personas"])


@router.get("/")
async def list_personas() -> list[str]:
    """Return available personas."""
    return []

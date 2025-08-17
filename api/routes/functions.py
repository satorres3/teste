from fastapi import APIRouter

router = APIRouter(prefix="/api/functions", tags=["functions"])


@router.get("/")
async def list_functions() -> list[str]:
    """Return available functions."""
    return []

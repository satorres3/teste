from fastapi import APIRouter

router = APIRouter(prefix="/api/containers", tags=["containers"])


@router.get("/")
async def list_containers() -> list[str]:
    """Return available containers."""
    return []

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_models() -> list[str]:
    """List OpenAI models."""
    return []

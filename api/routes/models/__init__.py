from fastapi import APIRouter

from . import anthropic, gemini, groq, ollama, openai

router = APIRouter(prefix="/api/models", tags=["models"])


@router.get("/")
async def list_providers() -> dict:
    """Return available model providers."""
    return {"providers": ["openai", "gemini", "anthropic", "groq", "ollama"]}


router.include_router(openai.router, prefix="/openai", tags=["openai"])
router.include_router(gemini.router, prefix="/gemini", tags=["gemini"])
router.include_router(anthropic.router, prefix="/anthropic", tags=["anthropic"])
router.include_router(groq.router, prefix="/groq", tags=["groq"])
router.include_router(ollama.router, prefix="/ollama", tags=["ollama"])

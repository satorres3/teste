from fastapi import APIRouter
from starlette.responses import StreamingResponse

router = APIRouter(prefix="/api/chat", tags=["chat"])


def _stream_stub():
    yield "data: not implemented\n\n"


@router.post("/{workspace_id}/stream")
async def stream_chat(workspace_id: str) -> StreamingResponse:
    """Stream chat responses for a workspace."""
    return StreamingResponse(_stream_stub(), media_type="text/event-stream")

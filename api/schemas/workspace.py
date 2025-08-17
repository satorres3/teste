from typing import Optional

from pydantic import BaseModel


class Workspace(BaseModel):
    """Workspace definition."""

    id: str
    name: Optional[str] = None

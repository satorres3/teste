from typing import List, Optional

from pydantic import BaseModel


class User(BaseModel):
    """Authenticated user context."""

    sub: str
    name: Optional[str] = None
    roles: List[str] = []
    workspaces: List[str] = []

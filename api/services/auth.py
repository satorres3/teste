import json
import os
import re
from typing import Optional

import httpx
import jwt
from fastapi import HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


class AuthService:
    """Validate Entra (Azure AD) JWTs using published JWKs."""

    def __init__(self, tenant_id: Optional[str] = None, audience: Optional[str] = None) -> None:
        self.tenant_id = tenant_id or os.getenv("AZURE_TENANT_ID", "common")
        self.audience = audience or os.getenv("AZURE_CLIENT_ID", "")
        self.jwks_uri = (
            f"https://login.microsoftonline.com/{self.tenant_id}/discovery/v2.0/keys"
        )
        self._jwks: Optional[dict] = None

    async def _get_jwks(self) -> dict:
        if not self._jwks:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.jwks_uri)
                response.raise_for_status()
                self._jwks = response.json()
        return self._jwks

    async def validate_token(self, token: str) -> dict:
        jwks = await self._get_jwks()
        header = jwt.get_unverified_header(token)
        key = next((k for k in jwks["keys"] if k["kid"] == header["kid"]), None)
        if not key:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))
        try:
            payload = jwt.decode(token, public_key, algorithms=["RS256"], audience=self.audience)
        except jwt.PyJWTError as exc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)) from exc
        return payload


auth_service = AuthService()
workspace_regex = re.compile(r"/api/chat/([^/]+)/")


class AuthMiddleware(BaseHTTPMiddleware):
    """Authenticate requests and enforce workspace RBAC."""

    async def dispatch(self, request: Request, call_next):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED, content={"detail": "Not authenticated"}
            )
        token = auth_header.split(" ", 1)[1]
        try:
            payload = await auth_service.validate_token(token)
            request.state.user = payload
            match = workspace_regex.search(request.url.path)
            if match:
                workspace_id = match.group(1)
                allowed = payload.get("workspaces", [])
                if workspace_id not in allowed:
                    return JSONResponse(
                        status_code=status.HTTP_403_FORBIDDEN,
                        content={"detail": "Forbidden"},
                    )
        except HTTPException as exc:
            return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})
        return await call_next(request)

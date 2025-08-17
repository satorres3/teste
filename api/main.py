from fastapi import FastAPI

from .services.auth import AuthMiddleware
from .routes import chat, containers, functions, knowledge, personas
from .routes.models import router as models_router

app = FastAPI()
app.add_middleware(AuthMiddleware)

app.include_router(containers.router)
app.include_router(chat.router)
app.include_router(knowledge.router)
app.include_router(personas.router)
app.include_router(models_router)
app.include_router(functions.router)

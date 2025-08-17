
**Notes:**
- The diagram and text reflect the revised flowchart and align with the backend plan (FastAPI, Cosmos DB, Azure AI Search).
- Components are detailed to clarify roles (e.g., frontend vs. backend responsibilities).
- Future considerations include enhancements from the previous plan (e.g., caching, multi-modal).

### Integration with Previous Plans

1. **Frontend**:
   - The `AGENTS.md` phases align with the previous refactor prompt. Phase 1 (Safe Scaffold) matches splitting `index.tsx` into components (`LegacyShell.tsx`, `Sidebar.tsx`). Phase 2 (Routing) implements the routes from the prompt. Phase 3 (Stubs) adds `msal.ts` and `api.ts` as stubs, matching the API integration plan.
   - CSS preservation is reinforced by `AGENTS.md`’s non-negotiables and the prompt’s instruction to split `index.css` without changing rules.
   - Suggestion: In Phase 1, use the previous prompt to generate initial component splits (e.g., `Sidebar.tsx`, `Chat.tsx`), then apply `AGENTS.md`’s routing in Phase 2.

2. **Backend**:
   - The architecture’s FastAPI backend, Cosmos DB, and Azure AI Search match the previous `main.py` and `agents.py`.
   - The model router (LangChain) and RAG align with the backend’s `get_rag_chain` and agent logic.
   - SSE is new; update `main.py` to add an SSE endpoint (e.g., `/api/chat/{id}/stream`).

3. **Codex Agents**:
   - Assuming “codex” refers to Claude-based LangChain agents (or custom tools), the `agents.py` from the previous response supports this (e.g., `create_sales_agent`).
   - The `/api/functions/{id}` endpoint in `main.py` runs these agents, matching the architecture’s model router.
   - Suggestion: Expand `agents.py` with more tools (e.g., SharePoint fetch via Graph) as needed.

4. **Azure Deployment**:
   - The architecture’s deployment (Static Web Apps, App Service) matches the previous README.
   - Add SSE support to App Service (FastAPI supports SSE natively).

**Updated Backend Code (Add SSE):**
Add this to `main.py` for real-time chat:

```python
from fastapi.responses import StreamingResponse
import asyncio

@app.get("/api/chat/{container_id}/stream")
async def chat_stream(container_id: str, query: str, user = Depends(get_current_user)):
    container = containers_container.read_item(container_id)
    if user["email"] not in container["accessControl"]:
        raise HTTPException(status_code=403, detail="Access denied")
    vectorstore = FAISS.load_local(f"vectorstores/{container_id}")
    chain = get_rag_chain(container["selectedModel"], vectorstore)

    async def stream_response():
        # Simulate streaming (replace with LangChain streaming if supported)
        response = chain.run({"question": query, "persona": container["selectedPersona"]})
        for chunk in response.split():
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0.1)  # Simulate streaming
        yield "data: [DONE]\n\n"

    return StreamingResponse(stream_response(), media_type="text/event-stream")

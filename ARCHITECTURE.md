# Architecture (Ground Phase → Full)

This doc outlines the path from current single-page to full multi-workspace hub.

---

## High-Level

```mermaid
flowchart LR
  FE[Front-end: React + Vite] -- Bearer --> API[FastAPI (Azure)]
  FE -- SSE --> API
  API --> RAG[Retriever + Re-rank]
  API --> Router[Model Router]
  API --> K[Knowledge Ingestion]
  K --> Blob[(Azure Blob)]
  K --> Vec[(Azure AI Search or pgvector)]
  RAG --> Vec
  API --> DB[(Postgres/Supabase)]
  FE --> Graph[Microsoft Graph (SharePoint) via API]

# Architecture

The Chatbot Hub is a modular, cloud-native application for AI-powered workspaces, built with React (frontend), FastAPI (backend, future), and Azure services. It supports multiple LLMs, RAG for knowledge bases, and integrations with Microsoft Graph.

## System Overview

The system consists of a React frontend (Vite for dev/build), a FastAPI backend (to be added), and Azure services for storage, database, and search. The frontend communicates with the backend via REST API (Bearer token) and SSE for real-time chat updates. The backend handles AI logic (LangChain), knowledge ingestion, and external integrations.

## Architecture Diagram

```mermaid
flowchart LR
  FE[Frontend: React + Vite] -- Bearer Token API Calls --> API[Backend: FastAPI on Azure]
  FE -- SSE for Real-Time Chat --> API
  API --> RAG[Retriever + Re-rank]
  API --> Router[Model Router: LangChain]
  API --> K[Knowledge Ingestion]
  K --> Blob[(Azure Blob Storage: Files)]
  K --> Vec[(Azure AI Search: Embeddings)]
  RAG --> Vec
  API --> DB[(Azure Cosmos DB: Workspaces, Chats)]
  API --> Graph[Microsoft Graph: SharePoint, Outlook]
  Router --> LLMs[LLMs: OpenAI, Groq, Gemini, Anthropic]

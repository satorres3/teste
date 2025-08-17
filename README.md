# Chatbot Hub

A modular AI chatbot hub with workspaces, RAG, multiple LLMs, and Azure deployment. The frontend uses React with a preserved CSS-based visual identity.

## Features
- Microsoft login via Azure AD.
- Workspaces (containers) with customizable AI assistants.
- RAG for knowledge base (files, websites).
- Support for Gemini, OpenAI, Groq, Anthropic via LangChain.
- RBAC, personas, model selection per workspace.
- Functions/apps (LangChain agents, e.g., sales tools).
- Frontend: Azure Static Web Apps, CSS preserved for visual identity.
- Backend: FastAPI on Azure App Service (to be added).

## Prerequisites
- Azure Subscription.
- GitHub Account.
- API Keys: OpenAI, Groq, Google (Gemini), Anthropic (for future backend).
- Node.js 16+, npm.
- Python 3.10+ (for future backend).

## Setup Instructions

### 1. Azure Resources
- **Azure AD App Registration**:
  1. Azure Portal > Microsoft Entra ID > App Registrations > New.
  2. Name: "ChatbotHub".
  3. Redirect URI: Web, `http://localhost:3000` (dev), `<your-static-web-app-url>` (prod).
  4. Permissions: Microsoft Graph > User.Read (delegated).
  5. Note Client ID, Tenant ID, Client Secret.
- **Cosmos DB** (future): Database "ChatbotHubDB", container "Containers" (partition key: /id).
- **Blob Storage** (future): For knowledge base and assets.
- **Key Vault** (optional): For API keys.

### 2. Clone & Configure
```bash
git clone <your-repo>
cd chatbot-hub
cp .env.example .env  # Create .env for future backend
Edit .env (for future backend):
textAZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
AZURE_TENANT_ID=...
AZURE_COSMOS_ENDPOINT=...
AZURE_STORAGE_CONNECTION_STRING=...
OPENAI_API_KEY=...
GROQ_API_KEY=...
GOOGLE_API_KEY=...
ANTHROPIC_API_KEY=...
REDIRECT_URI=http://localhost:3000
AZURE_STATIC_WEB_APP_URL=<your-static-web-app-url>
3. Frontend Setup
bashcd chatbot-hub
npm install
npm start
Note: CSS is preserved in src/styles/ (e.g., global.css, sidebar.css). Do not modify style rules to maintain visual identity.
4. Deployment

Frontend (Azure Static Web Apps):

Azure Portal > Static Web Apps > Create.
Link GitHub repo, branch main, preset "React".
Add API proxy: /api/* to future backend URL.


Backend (Azure App Service, future):

Azure Portal > App Services > Create (Python 3.10).
Deploy via GitHub Actions (.github/workflows/deploy-backend.yml).
Set env vars in Application Settings.


CI/CD: GitHub Actions for frontend (backend TBD).

5. App Integrations

SharePoint/Outlook: Add Microsoft Graph permissions to Azure AD app (e.g., Files.ReadWrite) for future backend.
Backend will use MSAL for Graph API calls.

6. Usage

Login: Microsoft OAuth redirect (stubbed for now).
Workspaces: Create via settings, auto-generates with AI (stubbed).
Chat: Select model/persona, upload files (to Blob, indexed in AI Search, stubbed).
Functions: Use /api/functions/{id} for workspace-specific agents (future).

7. Development

Frontend: Refactored into components (see src/components). CSS split into styles/ but unchanged for identity.
Backend: FastAPI with LangChain (to be added). Add agents in services/agents.py.
Testing: Jest (frontend, TBD), pytest (backend, future).
Monitoring: Azure Application Insights (future).
Visual Regression: Use Playwright for pixel-parity checks after refactors.

Task Log

Task: Update documentation files
Commit: <hash></hash>
Files: AGENTS.md, README.md, ARCHITECTURE.md
Notes: Aligned with latest plan (CSS preservation, Cosmos DB, Python embeddings).
Task: Scaffold React app and migrate legacy shell
Commit: 1fd72ad
Files: index.html, package.json, vite.config.ts, src/App.tsx, src/main.tsx, src/pages/LegacyShell.tsx
Notes: Added React dependencies and migrated existing UI/logic into React components.
Task: Split index.css into modular styles
Commit: <hash>
Files: index.css, src/main.tsx, src/styles/global.css, src/styles/sidebar.css, src/styles/chat.css, src/styles/hub.css, src/styles/settings.css, src/styles/modal.css
Notes: Extracted page-specific rules to dedicated CSS files and updated imports.

Task: Extract sidebar component
Commit: 6626bc9
Files: src/components/Sidebar.tsx, src/pages/LegacyShell.tsx, README.md
Notes: Moved sidebar markup into Sidebar component and updated LegacyShell.
Task: Add Playwright visual regression tests
Commit: 2d6a0d9
Files: package.json, package-lock.json, playwright.config.ts, tests/visual.test.ts
Notes: Installed Playwright and added snapshot test with console and keyboard checks.
Task: Configure ESLint
Commit: <hash>
Files: .eslintrc.json, package.json, package-lock.json, README.md
Notes: Added ESLint with React, a11y, and TypeScript rules and lint script.

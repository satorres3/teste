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
Commit: 82ada7e, 8537d28</hash>
Files: AGENTS.md, README.md, ARCHITECTURE.md
Notes: Aligned with latest plan (CSS preservation, Cosmos DB, Python embeddings).
Task: Scaffold React app and migrate legacy shell
Commit: 1fd72ad
Files: index.html, package.json, vite.config.ts, src/App.tsx, src/main.tsx, src/pages/LegacyShell.tsx
Notes: Added React dependencies and migrated existing UI/logic into React components.
Task: Split index.css into modular styles
Commit: 82ada7e, 8537d28
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
Commit: 82ada7e, 8537d28
Files: .eslintrc.json, package.json, package-lock.json, README.md
Notes: Added ESLint with React, a11y, and TypeScript rules and lint script.
Task: Add error boundary component
Commit: 82ada7e, 8537d28
Files: src/components/ErrorBoundary.tsx, src/App.tsx, README.md
Notes: Added class-based ErrorBoundary and wrapped LegacyShell with it.

Task: Fix JSX errors in LegacyShell.tsx
Commit: 6df6251
Files: src/pages/LegacyShell.tsx, package.json, .eslintrc.json
Notes: Fixed img src and select props; added ESLint validation.

Task: Remove browser-side GoogleGenAI call
Commit: bf9cd2b
Files: src/pages/LegacyShell.tsx, src/lib/api.ts, src/types/api.ts
Notes: Replaced with API stub per AGENTS.md; no visual changes.

Task: Fix favicon 404
Commit: cd33ee9
Files: public/favicon.ico, index.html
Notes: Added favicon to resolve HTTP error.

Task: Replace favicon.ico with SVG
Commit: 831cf77
Files: public/favicon.svg, index.html
Notes: Used SVG favicon due to .ico restrictions.
Task: Fix empty src attributes in LegacyShell.tsx
Commit: 6904f2b
Files: src/pages/LegacyShell.tsx, .eslintrc.json, README.md
Notes: Replaced empty image src values with null and tightened ESLint rules.
Task: Add routing and stub pages
Commit: 82ada7e, 8537d28
Files: package.json, src/App.tsx, src/components/Sidebar.tsx, src/pages/Login.tsx, src/pages/Hub.tsx, src/pages/SettingsHub.tsx, src/pages/GlobalSettings.tsx, src/pages/Workspace.tsx, src/pages/Knowledge.tsx, src/pages/LegacyShell.tsx
Notes: Introduced react-router-dom routing and migrated legacy sections into dedicated pages with debugging logs.

Task: Add stubbed SSO login handlers
Commit: f60e4fb, c57df81
Files: src/pages/Login.tsx, src/types/api.ts, src/lib/msal.ts, README.md
Notes: Hooked sign-in buttons to mock auth functions and navigation to maintain behavior.
Task: Fix portal navigation buttons
Commit: cde6ac4, d8ec486
Files: src/App.tsx, src/pages/Hub.tsx, src/pages/SettingsHub.tsx, src/pages/GlobalSettings.tsx, src/pages/Workspace.tsx, src/pages/Knowledge.tsx, src/pages/ContainerManagement.tsx
Notes: Wired settings, back, and logout buttons to React Router routes and added container management stub.
Task: Activate stubbed UI buttons
Commit: 3919afa
Files: src/pages/Hub.tsx, src/pages/ContainerManagement.tsx, src/pages/GlobalSettings.tsx
Notes: Enabled profile dropdown, add container button, settings tabs and form controls.

# AGENTS — Working Agreement for Automated Changes

You (automation) are acting as **Principal Engineer**. Follow this agreement exactly.

## Non-Negotiables

1. **UI/UX and styles must remain identical** until explicitly allowed to change.
2. **Do not rename** CSS classes, IDs, or variables (no Tailwind migration, no utility rewrite).
3. **No direct LLM calls in the browser**. All AI logic (e.g., LangChain, model calls) must be server-side via FastAPI.
4. **Small commits** per task; one logical change per commit.
5. **Update README.md → Task Log** after each task (Task, commit, files, notes).
6. **Never delete** `index.html`, `index.css`, or `index.tsx` content without a *1:1 JSX* migration.
7. **No changes to CSS specificity or rule order** to avoid cascade issues.
8. **Run TypeScript checks** (`npx tsc --noEmit`) after each task to ensure no type errors.
9. **Cross-browser compatibility**: Target modern browsers via Browserslist (`> 0.5%, last 2 versions, not dead`).
10. **Accessibility**: Ensure JSX includes ARIA labels and keyboard navigation (lint with `eslint-plugin-jsx-a11y`).
11. **Error handling**: Use React error boundaries to prevent app crashes.
12. **No console errors/warnings**: Verify via Playwright console checks.

## Branching & Commits

- Create a feature branch per milestone (e.g., `chore/safe-refactor`, `feat/router`).
- Conventional commits: `chore:`, `feat:`, `fix:`, `docs:`.

## Phase 1 — Safe Scaffold (no visual changes)

1. Create `src/` with `App.tsx`, `main.tsx`, and `pages/LegacyShell.tsx`.
2. Render **existing** markup from `index.html`/`index.tsx` inside `LegacyShell.tsx` as JSX.
3. Convert only HTML→JSX syntax; **do not** change classes, IDs, or attributes.
4. Keep `index.css` as is, import globally in `main.tsx`. Split into `src/styles/` (e.g., `global.css`, `sidebar.css`, `chat.css`) with identical rules, ensuring no visual changes.
5. Ensure fonts, meta tags, and links (e.g., Google Fonts) from `index.html` are intact in `index.html` or `App.tsx`.
6. Extract shared UI (e.g., sidebar) into `components/Sidebar.tsx` for reuse.
7. **Post-Task 3: Set up Playwright for visual regression testing** (run after Sidebar extraction):
   - Install `@playwright/test`.
   - Add test to snapshot UI (e.g., `/` route) across Chromium, Firefox, WebKit.
   - Check console for errors/warnings and accessibility (keyboard navigation, ARIA).

## Phase 2 — Routing (still no visual changes)

- Install React Router (`react-router-dom`) and create routes:
  - `/login`, `/hub`, `/settings`, `/settings/global`, `/workspace/:id`, `/workspace/:id/knowledge`
- Move sections from `LegacyShell.tsx` into dedicated pages (`pages/Login.tsx`, `pages/Hub.tsx`, etc.) **verbatim** as JSX.
- Reuse `Sidebar.tsx` across routes for consistent navigation.
- Remove each section from `LegacyShell.tsx` once verified for pixel-parity (use Playwright for visual regression tests).
- Ensure dynamic routes (e.g., `/workspace/:id`) handle container-specific data correctly.

## Phase 3 — Stubs (no API integration yet)

- Add `src/lib/msal.ts` (stub for Azure AD login) and `src/lib/api.ts` (stub for backend calls).
- Define TypeScript interfaces in `src/types/api.ts` for API responses (e.g., `Container`, `ChatMessage`) to match backend Pydantic models.
- No behavior changes; only code structure for future logic (e.g., login flow, container fetching).
- Stubbed API calls return mock data (e.g., hard-coded containers).

## Documentation Requirements

- Update `README.md` Task Log after every task (Task, commit hash, files changed, notes).
- Maintain `ARCHITECTURE.md` with system diagrams and component descriptions.
- This file (`AGENTS.md`) is the source of truth for guardrails.

## Acceptance per Task

- App builds (`npm run build`) and runs (`npm start`).
- UI visually identical to main branch (verified via Playwright screenshot tests).
- `npx tsc --noEmit` passes (no TypeScript errors).
- No console errors/warnings (verified via Playwright).
- Accessibility checks pass (via `eslint-plugin-jsx-a11y` and Playwright).
- README Task Log updated with task details.

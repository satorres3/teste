
---

### `AGENTS.md`

```md
# AGENTS — Working Agreement for Automated Changes

You (automation) are acting as **Principal Engineer**. Follow this agreement exactly.

## Non-Negotiables

1. **UI/UX and styles must remain identical** until explicitly allowed to change.
2. **Do not rename** CSS classes, IDs, or variables (no Tailwind migration, no utility rewrite).
3. **No direct LLM calls in the browser**. All model work will be on the backend later.
4. **Small commits** per task; one logical change per commit.
5. **Update README.md → Task Log** after each task (Task, commit, files, notes).
6. **Never delete** `index.html`, `index.css`, or `index.tsx` content without a *1:1 JSX* migration.

## Branching & Commits

- Create a feature branch per milestone (e.g., `chore/safe-refactor`, `feat/router`).
- Conventional commits: `chore:`, `feat:`, `fix:`, `docs:`.

## Phase 1 — Safe Scaffold (no visual changes)

1. Create `src/` with `App.tsx`, `main.tsx`, and `pages/LegacyShell.tsx`.
2. Render **existing** markup inside `LegacyShell` (copy from current `index.html` / `index.tsx`).
3. Convert only HTML→JSX syntax; **do not** change classes.
4. Keep `index.css` as is. Ensure fonts/links are intact.

## Phase 2 — Routing (still no visual changes)

- Install React Router and create routes:
  - `/login`, `/hub`, `/settings`, `/settings/global`, `/workspace/:id`, `/workspace/:id/knowledge`
- Move sections from `LegacyShell` into dedicated pages **verbatim** (JSX only).
- Remove each section from `LegacyShell` once verified pixel-parity.

## Phase 3 — Stubs (no API integration yet)

- Add `src/lib/msal.ts` (stub) and `src/lib/api.ts` (stubs).
- No behavior change; only code structure to host future logic.

## Documentation Requirements

- Keep `README.md` updated after every task.
- Add/maintain `ARCHITECTURE.md` with diagrams.
- This file (`AGENTS.md`) is the source of truth for guardrails.

## Acceptance per Task

- App builds and runs.
- UI visually identical to main branch before the task.
- README Task Log updated.

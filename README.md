# Chatbot Hub — Ground Setup

> **Goal:** Build a multi-workspace chatbot portal with Microsoft login, RBAC, RAG knowledge, SharePoint & local ingestion, and multi-model routing — while **preserving the current UI/UX and CSS exactly** during the initial refactor.

---

## 🔒 Design Contract (MUST NOT BREAK)

These rules are **binding** for all automated refactors:

1. **UI/UX must remain visually identical** after every task.
2. **Do not rename or remove existing CSS classes, IDs, or variables.**
3. **Do not delete `index.html`, `index.css`, or `index.tsx` content** without a 1:1 JSX migration that preserves markup structure and class names.
4. **No browser-side LLM SDKs** (all AI calls will be server-side later).
5. After **every task**, update the **Task Log** below with: Task name, commit hash, files changed, and a short summary.

If any change risks visual drift, stop and open an issue instead.

---

## 🧭 Current Repository (Main Branch)

- `.gitignore`
- `README.md` ← (this file)
- `index.html` *(real content)*
- `index.css` *(real content)*
- `index.tsx` *(real content)*
- `metadata.json` *(template)*
- `package.json` *(Vite defaults)*
- `tsconfig.json` *(Vite defaults)*
- `vite.config.ts` *(Vite defaults)*

---

## 🛠️ Ground Rules for Refactor

- Use a **temporary “LegacyShell”** approach to mount the current HTML inside React without altering styles.
- Migrate pages one-by-one to React routes, **keeping markup and classes 1:1**.
- Only convert HTML → JSX syntax (`class`→`className`, `for`→`htmlFor`, self-closing tags).
- Fonts/links in `index.html` must be kept intact and **not truncated**.

---

## ▶️ Quickstart (dev)

```bash
# Node 20+
npm install
npm run dev
```

## Task Log

- Scaffold Legacy React shell — `7bb1c55` — `index.html`, `src/`, `package.json`, `package-lock.json`, `tsconfig.json` — Migrated legacy markup into React shell and set up new entry.

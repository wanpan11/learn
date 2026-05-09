# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm install` — install dependencies
- `pnpm run dev` — build client bundle then start SSR server (port 3000)
- `pnpm run build:client` — bundle `src/client.tsx` → `public/client.js` via esbuild
- `pnpm run typecheck` — run `tsc --noEmit`

After any change to client entry or build config, run `build:client`. After server/shared code changes, run `typecheck`.

## Architecture

Manual SSR demo (no framework like Next.js). TypeScript + React 18 + Express 4 + esbuild.

**SSR flow:**
1. `server.tsx` — Express server. On `GET /`, calls `renderToString(<App />)` to produce HTML, injects initial data as `window[INITIAL_DATA_KEY]` via inline `<script>`, and sends the full HTML response. Also serves `/api/data` and static files from `public/`.
2. `src/client.tsx` — Browser entry. Reads `window[INITIAL_DATA_KEY]` and calls `hydrateRoot` to attach React event handlers to the server-rendered HTML.
3. `src/App.tsx` — Shared component used by both server and client. Contains a `Counter` subcomponent that demonstrates interactive hydration (buttons only work after client JS loads).
4. `src/types.ts` — `InitialData` interface and `INITIAL_DATA_KEY` constant shared between server and client.
5. `build-client.mjs` — esbuild config that bundles client TSX to `public/client.js` (ESM, es2020, automatic JSX).

**Key invariant:** Server and client must use the same `InitialData` shape and reference `INITIAL_DATA_KEY` from `src/types.ts` (not a hardcoded string). Any mismatch causes hydration errors. The inline script serialization in `server.tsx` escapes `&`, `<`, `>`, and line/paragraph separators for XSS safety — preserve this when modifying data injection.

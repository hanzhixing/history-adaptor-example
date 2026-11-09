# history-adaptor-example

Interactive examples for [`history-adaptor`](../history-adaptor). Each example shows a **host**
app that owns the real browser URL and an **embedded** app that keeps its routes in memory,
connected by the adaptor.

This is a separate project from the library. It depends on the sibling package via
`"history-adaptor": "file:../history-adaptor"`.

## Setup

The library must be built first (the example consumes `../history-adaptor/dist`):

```bash
cd ../history-adaptor
pnpm install
pnpm build
```

Then, in this directory:

```bash
pnpm install
pnpm dev        # Vite dev server at http://localhost:5173
```

## Scripts

- `pnpm dev` — Vite dev server
- `pnpm build` — production build
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm test` — Vitest (jsdom) smoke test of every example

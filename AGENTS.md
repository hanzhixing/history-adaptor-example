# AGENTS.md

Interactive examples for [`history-adaptor`](../history-adaptor). Each example is a **real app**
running in an iframe: an outer app owns the real browser URL (HTML5 or hash), a nested app
keeps its routes in memory, and a small rule table maps addresses between the two schemes.

This is a **separate repository** from the library. It consumes the sibling package through
`"history-adaptor": "file:../history-adaptor"`, which resolves to that package's built `dist/`.
Build the library first whenever its source changes:

```bash
cd ../history-adaptor && pnpm install && pnpm build
```

Do not edit the library from here; make library changes in `../history-adaptor`.

The example consumes the library through a `file:` dependency, which pnpm copies into its
store. After changing the library and rebuilding (`pnpm --dir ../history-adaptor build`), run
`pnpm install --force` here so the example sees the new `dist/`. Also restart Vite with
`pnpm dev --force` (or delete `node_modules/.vite`) so its optimized dependency cache is
rebuilt; a running dev server can otherwise serve the old helper.

## Commands

Use `pnpm` (lockfile is `pnpm-lock.yaml`). Node 26 is the local version.

- `pnpm dev` — Vite dev server at `http://localhost:5173`
- `pnpm build` — production build; every example is its own HTML entry (`dist/examples/...`)
- `pnpm build:pages` — production build for the GitHub Pages base (`BASE_PATH`, default
  `/history-adaptor-example/`)
- `pnpm preview` — serve the production build
- `pnpm preview:pages` — serve the Pages build at its base path
- `pnpm deploy` — build for Pages and push `dist/` to the `gh-pages` branch
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm test` — Vitest (jsdom) smoke test for every example
- `pnpm test -- test/example-smoke.test.ts` — run one file
- `pnpm test -- -t "vanilla-react"` — filter by test name

There is no lint or format script in this repo (unlike the library). Match the existing
style by hand: 4-space indent, single quotes, semicolons, trailing commas, no bracket
spacing, relative imports with explicit `.ts`/`.tsx` extensions.

## Architecture

```
index.html                 # example shell entry
src/App.tsx                # shell: mode + example pickers, <iframe>, hierarchy, source tabs
src/registry.ts            # example metadata + `?raw` imports (single source of truth)
src/lib/address.ts         # toAddress / splitAddress / pathnameOf
src/lib/browser.ts         # example-only `resetBrowser` (tests)
src/lib/content.ts         # plain-DOM content renderer
src/lib/frame.ts           # in-iframe address bar + address reporting (example-only)
src/components/            # ScenarioNav, ModeSwitch, SourceTabs, StructureDiagram
examples/
  vanilla-react/           # each folder is a standalone app
  react-vue/
  solid-react/
  vue-angular/
  angular-solid/
test/
  example-smoke.test.ts    # mounts all five examples × html5/hash in jsdom
```

The shell is only chrome. `sandbox.ts` is the example entry: it reads `?mode=html5|hash` and
`?sandbox`, installs a browser-address-bar lookalike inside the iframe, and calls the app's
`mount()`. `?sandbox` points the address bar at the portal home because the example is served
from `/examples/<id>/index.html` instead of being deployed at `/portal/*`.

The iframe reports its host address to the shell on every navigation (`src/lib/frame.ts`),
and the shell mirrors it into `window.history` (`replaceState`). The real browser address bar
therefore follows the iframe, and the host page's "Now we are on page …" comes from the host
router's location — not from a separately constructed string. The iframe also resizes itself
to its content height, so the example never needs its own scrollbar.

**Base path.** `vite.config.ts` reads `BASE_PATH` (default `/`) into Vite's `base`. The
iframe `src`, the top-level URL mirroring, and the reset effect all go through `withBase` in
`src/App.tsx`, so the shell works both at `/` (dev) and under a GitHub Pages project path
(`/<repo>/`). The Pages build also emits `404.html` (redirects deep links back to the shell)
and `.nojekyll` (keeps Vite's `_router_…` chunk). The example apps themselves stay on logical
addresses (`/portal/...`); only the iframe's `src` and the shell's real URL use the base.

## Example layout

Naming is always `<host>-<nested>`. Each example contains:

- `index.html` — the Vite entry; loads `sandbox.ts`.
- `sandbox.ts` — **example only**: reads `?mode`/`?sandbox`, calls `createApp(mode).mount(container)`,
  installs the in-iframe address bar, reports the host address to the shell. Not part of the
  app you copy.
- `create-app.ts(x)` — the app integration. `createApp(mode)` returns
  `{mount(container): Promise<HistoryLike>, dispose}`; `mount` renders the app and resolves with
  the connected host history. Angular resolves it after bootstrap.
- `App.*` — the outer top-level: renders the host router and hosts the nested root.
- `Layout.*` — the persistent nav + `<Outlet>`/`<RouterView>`/`<router-outlet>`.
- `Content.*` — the outer app's routed page.
- `routes.*` — the outer route table.
- `NestedXxxApp.*`, `NestedContent.*`, `NestedRoutes.*` — the nested app, one file per component.
- The nested root is a literal id inside `App` (`#react-root`, `#vue-root`, `#angular-root`,
  `#solid-root`); `create-app` mounts the nested app into it.
- Nav links are written directly in `Layout` (`<Link to="/portal/home">`, `<router-link>`,
  `routerLink`, `<A>`), with the address itself as the visible text. There is no `links.ts` and
  no `{label, to}` indirection.
- `rules.ts` — the two rule directions. Keep the addresses as literals; rules and route
  tables are different scopes.

`vanilla-react` is the one exception: the host has no framework router, so `App.ts` is a custom
element with `App.html` as its template, the nav is plain `<a>` elements, and the content is
rendered by `renderContent`. There is no `Layout`/`routes` for the host side.

The source viewer lists **Example sandbox** first, then **Your app code** (the core), separated by
a divider. Keep example-only code in `sandbox.ts` and `src/lib/frame.ts`.

Every connection looks like this:

```ts
const [hostHistory, nestedHistory] = connect([
    {key: 'host', history: hostSource, adaptors: [{target: 'nested', adapt: createAdapt(rulesFromOuterToNested)}]},
    {key: 'nested', history: nestedSource, adaptors: [{target: 'host', adapt: createAdapt(rulesFromNestedToOuter)}]},
]);
```

## Rules helper (`history-adaptor/helper`)

`createAdapt(rules)` lives in the library and returns an `Adapt`. It normalizes the
incoming `To` to a full `pathname + search + hash` string and tries each rule in order:

| `from` shape | Strategy |
| --- | --- |
| `RegExp` | `String.prototype.replace` with `$<name>` named groups |
| string containing `{` | RFC 6570 via `@fedify/uri-template` (`match` → `expand`) |
| other string | `path-to-regexp` `match` on the pathname + `compile` the target, carrying search/hash |

When nothing matches it returns `undefined`, which stops propagation. `connect` still accepts
a plain custom function for `adapt`, so the helper is convenience, not a requirement. The
library owns the unit tests (`test/create-adapt.test.ts`); this repo covers it end-to-end in
the smoke test.

Dependencies are deliberately small: `path-to-regexp` (the de-facto Express path matcher) and
`@fedify/uri-template` (RFC 6570 expansion + round-trip matching). Native
`URL`/`URLSearchParams` handle query and address parsing.

The nested side is deliberately asymmetric for `/404`: there is no `rulesFromNestedToOuter`
entry for it, so navigating the nested app to `/404` does not touch the outer URL. Keep that
asymmetry — it demonstrates how "no rule" stops propagation.

## Framework-specific gotchas

- **Peer propagation**: `connect()` returns proxies. A proxy `push`/`replace`
  updates its own history and propagates; a navigation the raw router reports on its own
  (a standard `<Link>`, `<router-link>`, `RouterLink`, `<A>` click) arrives as `POP` and is
  propagated to the other side automatically. That is why the nested apps use standard links.
- **React**: `createBrowserRouter`/`createHashRouter` for the host, `createMemoryRouter` for
  the nested side. `<Route>`/`<Link>` are written as standard JSX.
- **Vue**: `createWebHistory`/`createWebHashHistory` for the host, `createMemoryHistory` +
  `replace('/news')` before `createRouter` for the nested side. The Nav uses `<RouterLink
  custom>` so it can render its own `<a aria-current>`.
- **Solid**: Solid Router only ships a memory history publicly. In `solid-react` the host
  wraps `fromBrowserNative` in a `{get,set,go,listen}` object so `<MemoryRouter history>` can
  own the URL and `fromSolidRouter` can adapt the same object. The nested Solid app uses a
  plain `createMemoryHistory()`.
- **Angular**: Angular 22 is zoneless. `@angular/compiler` is imported for JIT, components are
  declared with `Component({...})(Class)` (no decorator syntax needed). A nested Angular app
  provides its own `Location` backed by `MemoryLocationStrategy`
  (`{provide: Location, useFactory: () => new Location(new MemoryLocationStrategy())}`), so
  Angular's `PathLocationStrategy` never writes the iframe URL. It also uses
  `provideRouter(routes, withDisabledInitialNavigation())`, then `router.navigateByUrl('/news')`.
  The host uses the real `PathLocationStrategy`/`HashLocationStrategy`. Bootstrapping is async,
  so `mount(container)` resolves after bootstrap.
- **Hash mode UI**: the outer `Layout`/`App` prefixes each nav link with a gray `/#` (a sibling
  `<span>`, not part of the link), the outer `Content` prefixes the address with a gray `/#`,
  and the in-iframe address bar shows `/#/...`. The nested app stays logical (no `#`).
- **Vite plugins**: any `*.solid.tsx` is Solid; everything else with JSX is React.
  `@vitejs/plugin-react` excludes `/\.solid\.tsx$/`; `vite-plugin-solid` includes
  `\.solid\.tsx$` and `node_modules/**/*.jsx` (the `solid` export condition resolves Solid
  packages to their `.jsx` sources). Keep that split if you add more Solid files.
- **Vitest** uses `vitest.config.ts`, not `vite.config.ts`. It must keep the Solid plugin, the
  `solid-js/web` browser alias, and the inline rules for `solid-js`/`@solidjs/router`; otherwise
  Solid renders nothing or loads two runtimes.

## Testing notes

`test/example-smoke.test.ts` imports each example's `createApp`, calls `mount(container)` in a
jsdom container, and asserts:

- `[data-host]` exists and contains `[data-embedded]`
- both sides render `Content Component`
- clicking the host's second link changes the nested active link (`aria-current="page"`)

Angular tests are slower because bootstrapping is async; keep the `await app.mount(...)` inside
`act`. Clean up with `app.dispose()` in `finally`.

The four rule strategies and the intentional `/404` asymmetry are unit-tested in the library
(`../history-adaptor/test/create-adapt.test.ts`). Add a case there whenever a strategy changes;
the example smoke test covers the end-to-end path.

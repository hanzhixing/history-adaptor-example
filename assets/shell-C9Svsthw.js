import{r as e,t}from"./rolldown-runtime-XKyaHtl9.js";import"./style--f9_Lsz9.js";import{n,r,t as i}from"./jsx-runtime-DhZz8lae.js";import{t as a}from"./App-D2Nu_wRS.js";var o=e(r(),1),s=n(),c=i(),l=`flex-1 px-4 py-2 text-base font-medium transition-colors`,u=`bg-slate-800 text-white`,d=`bg-white text-slate-600 hover:bg-slate-100`,f=({value:e,onChange:t})=>(0,c.jsxs)(`div`,{className:`space-y-2`,children:[(0,c.jsx)(`span`,{className:`text-sm font-medium text-slate-500`,children:`Browser routing`}),(0,c.jsxs)(`div`,{className:`flex overflow-hidden rounded-full border border-slate-300 shadow-sm`,children:[(0,c.jsx)(`button`,{type:`button`,className:`${l} ${e===`html5`?u:d}`,"aria-pressed":e===`html5`,onClick:()=>t(`html5`),children:`HTML5`}),(0,c.jsx)(`button`,{type:`button`,className:`${l} ${e===`hash`?u:d}`,"aria-pressed":e===`hash`,onClick:()=>t(`hash`),children:`Hash`})]})]}),p=[{id:`vanilla-react`,title:`Vanilla host ↔ nested React`,description:`A plain-JS host (ES modules, <template>, a custom element) owns the browser URL and imports a React app, which keeps its routes in a memory router.`,entry:`/examples/vanilla-react/index.html`,host:{framework:`Vanilla + Web Component`,note:`App is a native custom element; links are plain <a> elements`},nested:{framework:`React`,note:`NestedReactApp + createMemoryRouter, mounted into #react-root`},slot:`App → #react-root`,files:[{name:`index.html`,source:`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vanilla host ↔ nested React</title>
    </head>
    <body class="bg-slate-100 p-4 text-slate-900">
        <script type="module" src="./sandbox.ts"><\/script>
    </body>
</html>
`,lang:`xml`,group:`example`},{name:`sandbox.ts`,source:`import '../../src/style.css';

import {installAddressBar, reportAddressToParent} from '../../src/lib/frame.ts';
import {createApp} from './create-app.tsx';

// Example sandbox — not part of the app you copy.
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'hash' ? 'hash' : 'html5';

// A real deployment serves the app at \`/portal/*\`; this only compensates for
// the example being hosted under \`/examples/vanilla-react/index.html\`.
if (params.has('sandbox')) {
    history.replaceState(null, '', mode === 'hash' ? '#/portal/home' : '/portal/home');
}

void (async () => {
    const app = createApp(mode);
    const hostHistory = await app.mount(document.body);
    installAddressBar(hostHistory, mode);
    reportAddressToParent(hostHistory);
})();
`,group:`example`},{name:`App.ts`,source:`import type {HistoryLike} from 'history-adaptor';

import {pathnameOf} from '../../src/lib/address.ts';
import {renderContent} from '../../src/lib/content.ts';
import templateHtml from './App.html?raw';

const template = document.createElement('template');
template.innerHTML = templateHtml;

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

/** The outer portal, written as a native custom element. */
export class App extends HTMLElement {
    #history: HistoryLike | undefined;
    #unlisten: (() => void) | undefined;
    #hashMode = false;
    #ready = false;

    connectedCallback(): void {
        if (this.#ready) {
            return;
        }
        this.#ready = true;
        this.append(template.content.cloneNode(true));

        this.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    this.#history?.push(href);
                }
            });
        });
    }

    disconnectedCallback(): void {
        this.#unlisten?.();
        this.#unlisten = undefined;
    }

    connect(history: HistoryLike, hashMode = false): void {
        this.#history = history;
        this.#hashMode = hashMode;
        this.#unlisten?.();
        this.#unlisten = history.listen(() => this.#render());
        this.#render();
    }

    /** Root the nested React app mounts into. */
    get nestedRoot(): HTMLElement {
        return this.querySelector('#react-root') as HTMLElement;
    }

    #render(): void {
        const history = this.#history;
        const content = this.querySelector('[data-content]');
        if (!history || !content) {
            return;
        }

        const {pathname, search, hash} = history.location;
        const address = pathname + search + hash;

        this.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((anchor) => {
            const href = anchor.getAttribute('href') ?? '/';
            const active = pathnameOf(href) === pathname;

            anchor.className = \`\${linkBase} \${active ? linkActive : linkIdle}\`;
            if (active) {
                anchor.setAttribute('aria-current', 'page');
            } else {
                anchor.removeAttribute('aria-current');
            }
        });

        this.querySelectorAll<HTMLElement>('[data-hash-prefix]').forEach((prefix) => {
            prefix.hidden = !this.#hashMode;
        });

        renderContent(content as HTMLElement, address, {hashMode: this.#hashMode});
    }
}

if (!customElements.get('vanilla-app')) {
    customElements.define('vanilla-app', App);
}

export const createVanillaApp = (): App =>
    document.createElement('vanilla-app') as unknown as App;
`,group:`app`},{name:`App.html`,source:a,lang:`xml`,group:`app`},{name:`create-app.tsx`,source:`import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromBrowserNative, fromReactRouter} from 'history-adaptor/helper';
import {createRoot} from 'react-dom/client';
import {createMemoryRouter, RouterProvider} from 'react-router';

import type {BrowserMode} from '../../src/types.ts';
import {createVanillaApp} from './App.ts';
import {nestedRoutes} from './NestedRoutes.tsx';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: create both histories, connect them, render both apps. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    const outerHistory = fromBrowserNative({hash: mode === 'hash'});
    const nestedRouter = createMemoryRouter(nestedRoutes, {initialEntries: ['/news']});
    const nestedSource = fromReactRouter(nestedRouter);

    const [hostHistory, nestedHistory] = connect([
        {
            key: 'outer',
            history: outerHistory,
            adaptors: [{target: 'nested', adapt: createAdapt(rulesFromOuterToNested)}],
        },
        {
            key: 'nested',
            history: nestedSource,
            adaptors: [{target: 'outer', adapt: createAdapt(rulesFromNestedToOuter)}],
        },
    ]);

    let disposeNested: (() => void) | undefined;
    let app: ReturnType<typeof createVanillaApp> | undefined;

    return {
        mount: (container) => {
            app = createVanillaApp();
            container.append(app);
            app.connect(hostHistory, mode === 'hash');

            const root = createRoot(app.nestedRoot);
            root.render(<RouterProvider router={nestedRouter} />);
            disposeNested = () => root.unmount();

            return Promise.resolve(hostHistory);
        },
        dispose: () => {
            disposeNested?.();
            hostHistory.dispose?.();
            nestedHistory.dispose?.();
            nestedRouter.dispose();
            app?.remove();
        },
    };
};
`,group:`app`},{name:`NestedReactApp.tsx`,source:`import {NavLink, Outlet} from 'react-router';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

const navClass = ({isActive}: {isActive: boolean}): string =>
    \`\${linkBase} \${isActive ? linkActive : linkIdle}\`;

/** The nested React app's top-level layout. */
export const NestedReactApp = () => (
    <div data-embedded className="space-y-4">
        <nav className="flex flex-col gap-1">
            <NavLink to="/news" end className={navClass}>
                /news
            </NavLink>
            <NavLink to="/discussion/42" end className={navClass}>
                /discussion/42
            </NavLink>
            <NavLink to="/user/alice" end className={navClass}>
                /user/alice
            </NavLink>
            <NavLink
                to="/user/alice/post?category=tech&keyword=router#comments"
                end
                className={navClass}
            >
                /user/alice/post?category=tech&amp;keyword=router#comments
            </NavLink>
            <NavLink to="/user/alice/friend?group=dev#top" end className={navClass}>
                /user/alice/friend?group=dev#top
            </NavLink>
            <NavLink to="/404" end className={navClass}>
                /404
            </NavLink>
        </nav>
        <Outlet />
    </div>
);
`,group:`app`},{name:`NestedContent.tsx`,source:`import {useLocation} from 'react-router';

import {toAddress} from '../../src/lib/address.ts';

/** The nested app's routed page. */
export const NestedContent = () => {
    const location = useLocation();
    return (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p className="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                <span className="break-all font-mono text-slate-700">
                    {toAddress(location)}
                </span>
            </p>
        </div>
    );
};
`,group:`app`},{name:`NestedRoutes.tsx`,source:`import {createRoutesFromElements, Route} from 'react-router';

import {NestedContent} from './NestedContent.tsx';
import {NestedReactApp} from './NestedReactApp.tsx';

export const nestedRoutes = createRoutesFromElements(
    <Route element={<NestedReactApp />}>
        <Route path="/news" element={<NestedContent />} />
        <Route path="/discussion/:discussion_id" element={<NestedContent />} />
        <Route path="/user/:user_id" element={<NestedContent />} />
        <Route path="/user/:user_id/post" element={<NestedContent />} />
        <Route path="/user/:user_id/friend" element={<NestedContent />} />
        <Route path="/404" element={<NestedContent />} />
        <Route path="*" element={<NestedContent />} />
    </Route>,
);
`,group:`app`},{name:`rules.ts`,source:`import type {Rule} from 'history-adaptor/helper';

// Outer portal address -> nested address
export const rulesFromOuterToNested: Rule[] = [
    // literal replacement
    {from: '/portal/home', to: '/news'},
    {from: '/portal/error/not_found', to: '/404'},

    // path-to-regexp (>= 8.4.0): pass :param through
    {from: '/portal/discussion/:discussion_id', to: '/discussion/:discussion_id'},
    {from: '/portal/user/:user_id', to: '/user/:user_id'},

    // native RegExp + String.prototype.replace: query becomes path, $<name> groups
    {
        from: /^\\/portal\\/articles\\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>',
    },

    // RFC 6570 URI template: pathname + query + fragment
    {from: '/portal/friend{?user_id,group}{#hash}', to: '/user/{user_id}/friend{?group}{#hash}'},
];

// Nested address -> outer portal address
export const rulesFromNestedToOuter: Rule[] = [
    {from: '/news', to: '/portal/home'},
    {from: '/discussion/:discussion_id', to: '/portal/discussion/:discussion_id'},
    {from: '/user/:user_id', to: '/portal/user/:user_id'},
    {
        from: /^\\/user\\/(?<user_id>[^/?#]+)\\/post\\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>',
    },
    {from: '/user/{user_id}/friend{?group}{#hash}', to: '/portal/friend{?user_id,group}{#hash}'},
];
`,group:`app`}]},{id:`react-vue`,title:`React SPA ↔ nested Vue`,description:`A standard React SPA (React Router, <Route>, <Link>) owns the browser URL and bootstraps a Vue app by hand, which keeps its routes in a memory router.`,entry:`/examples/react-vue/index.html`,host:{framework:`React SPA`,note:`App renders the host router; Layout holds the nav and <Outlet>`},nested:{framework:`Vue`,note:`NestedVueApp.vue + createMemoryHistory + createRouter, mounted into #vue-root`},slot:`App → #vue-root`,files:[{name:`index.html`,source:`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React host ↔ nested Vue</title>
    </head>
    <body class="bg-slate-100 p-4 text-slate-900">
        <div id="root"></div>
        <script type="module" src="./sandbox.ts"><\/script>
    </body>
</html>
`,lang:`xml`,group:`example`},{name:`sandbox.ts`,source:`import '../../src/style.css';

import {installAddressBar, reportAddressToParent} from '../../src/lib/frame.ts';
import {createApp} from './create-app.tsx';

// Example sandbox — not part of the app you copy.
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'hash' ? 'hash' : 'html5';

// A real deployment serves the app at \`/portal/*\`; this only compensates for
// the example being hosted under \`/examples/react-vue/index.html\`.
if (params.has('sandbox')) {
    history.replaceState(null, '', mode === 'hash' ? '#/portal/home' : '/portal/home');
}

void (async () => {
    const app = createApp(mode);
    const hostHistory = await app.mount(document.getElementById('root') as HTMLElement);
    installAddressBar(hostHistory, mode);
    reportAddressToParent(hostHistory);
})();
`,group:`example`},{name:`App.tsx`,source:`import {RouterProvider, type DataRouter} from 'react-router';
import {createApp as createVueApp} from 'vue';
import {useEffect, useRef} from 'react';
import type {Router as VueRouter} from 'vue-router';

import NestedVueApp from './NestedVueApp.vue';

/** The outer React SPA; it renders the host router and hosts the nested Vue app. */
export const App = ({
    hostRouter,
    nestedRouter,
}: {
    hostRouter: DataRouter;
    nestedRouter: VueRouter;
}) => {
    const slot = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = slot.current;
        if (!element) {
            return;
        }
        const app = createVueApp(NestedVueApp);
        app.use(nestedRouter);
        app.mount(element);
        return () => app.unmount();
    }, [nestedRouter]);

    return (
        <div data-host className="space-y-4">
            <RouterProvider router={hostRouter} />

            <section className="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                    Nested Vue app (memory router)
                </p>
                <div id="vue-root" ref={slot} />
            </section>
        </div>
    );
};
`,group:`app`},{name:`Layout.tsx`,source:`import {NavLink, Outlet} from 'react-router';

import type {BrowserMode} from '../../src/types.ts';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';
const navRow = 'flex items-baseline gap-1';

const navClass = ({isActive}: {isActive: boolean}): string =>
    \`\${linkBase} \${isActive ? linkActive : linkIdle}\`;

/** The outer app's persistent layout. */
export const Layout = ({mode}: {mode: BrowserMode}) => (
    <div className="space-y-4">
        <header className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Outer · React SPA
            </p>
            <h1 className="text-xl font-semibold text-slate-800">
                Portal (React Router owns the browser URL)
            </h1>
        </header>

        <nav className="flex flex-col gap-1">
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/home" end className={navClass}>
                    /portal/home
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/discussion/42" end className={navClass}>
                    /portal/discussion/42
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/user/alice" end className={navClass}>
                    /portal/user/alice
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink
                    to="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                    end
                    className={navClass}
                >
                    /portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink
                    to="/portal/friend?user_id=alice&group=dev#top"
                    end
                    className={navClass}
                >
                    /portal/friend?user_id=alice&amp;group=dev#top
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/error/not_found" end className={navClass}>
                    /portal/error/not_found
                </NavLink>
            </div>
        </nav>

        <Outlet />
    </div>
);
`,group:`app`},{name:`Content.tsx`,source:`import {useLocation} from 'react-router';

import {toAddress} from '../../src/lib/address.ts';
import type {BrowserMode} from '../../src/types.ts';

/** The outer app's routed page. */
export const Content = ({mode}: {mode: BrowserMode}) => {
    const location = useLocation();
    return (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p className="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <span className="break-all font-mono text-slate-700">
                    {toAddress(location)}
                </span>
            </p>
        </div>
    );
};
`,group:`app`},{name:`routes.tsx`,source:`import {createRoutesFromElements, Route} from 'react-router';

import {Content} from './Content.tsx';
import {Layout} from './Layout.tsx';
import type {BrowserMode} from '../../src/types.ts';

export const createRoutes = (mode: BrowserMode) =>
    createRoutesFromElements(
        <Route element={<Layout mode={mode} />}>
            <Route path="/portal/home" element={<Content mode={mode} />} />
            <Route path="/portal/discussion/:discussion_id" element={<Content mode={mode} />} />
            <Route path="/portal/user/:user_id" element={<Content mode={mode} />} />
            <Route path="/portal/articles" element={<Content mode={mode} />} />
            <Route path="/portal/friend" element={<Content mode={mode} />} />
            <Route path="/portal/error/not_found" element={<Content mode={mode} />} />
            <Route path="*" element={<Content mode={mode} />} />
        </Route>,
    );
`,group:`app`},{name:`create-app.tsx`,source:`import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromReactRouter, fromVueRouter} from 'history-adaptor/helper';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, createHashRouter} from 'react-router';
import {createMemoryHistory, createRouter} from 'vue-router';

import type {BrowserMode} from '../../src/types.ts';
import {App} from './App.tsx';
import {nestedRoutes} from './NestedRoutes.ts';
import {createRoutes} from './routes.tsx';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: a React host router, a Vue memory router, and the rules. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    const memoryHistory = createMemoryHistory();
    memoryHistory.replace('/news');
    const nestedRouter = createRouter({history: memoryHistory, routes: nestedRoutes});

    const routes = createRoutes(mode);
    const hostRouter =
        mode === 'hash' ? createHashRouter(routes) : createBrowserRouter(routes);

    const [hostHistory, nestedHistory] = connect([
        {
            key: 'host',
            history: fromReactRouter(hostRouter),
            adaptors: [{target: 'nested', adapt: createAdapt(rulesFromOuterToNested)}],
        },
        {
            key: 'nested',
            history: fromVueRouter(nestedRouter),
            adaptors: [{target: 'host', adapt: createAdapt(rulesFromNestedToOuter)}],
        },
    ]);

    let root: ReturnType<typeof createRoot> | undefined;

    return {
        mount: (container) => {
            root = createRoot(container);
            root.render(<App hostRouter={hostRouter} nestedRouter={nestedRouter} />);
            return Promise.resolve(hostHistory);
        },
        dispose: () => {
            root?.unmount();
            hostHistory.dispose?.();
            nestedHistory.dispose?.();
            hostRouter.dispose();
        },
    };
};
`,group:`app`},{name:`NestedVueApp.vue`,source:`<template>
    <div data-embedded class="space-y-4">
        <nav class="flex flex-col gap-1">
            <RouterLink
                to="/news"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/news</RouterLink
            >
            <RouterLink
                to="/discussion/42"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/discussion/42</RouterLink
            >
            <RouterLink
                to="/user/alice"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/user/alice</RouterLink
            >
            <RouterLink
                to="/user/alice/post?category=tech&keyword=router#comments"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/user/alice/post?category=tech&amp;keyword=router#comments</RouterLink
            >
            <RouterLink
                to="/user/alice/friend?group=dev#top"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/user/alice/friend?group=dev#top</RouterLink
            >
            <RouterLink
                to="/404"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/404</RouterLink
            >
        </nav>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
<\/script>
`,lang:`xml`,group:`app`},{name:`NestedContent.vue`,source:`<template>
    <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Content Component
        </div>
        <p class="text-2xl font-bold text-slate-900">
            Now we are on page
            <span class="break-all font-mono text-slate-700">{{ route.fullPath }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';

const route = useRoute();
<\/script>
`,lang:`xml`,group:`app`},{name:`NestedRoutes.ts`,source:`import type {RouteRecordRaw} from 'vue-router';

import NestedContent from './NestedContent.vue';

export const nestedRoutes: RouteRecordRaw[] = [
    {path: '/', redirect: '/news'},
    {path: '/news', component: NestedContent},
    {path: '/discussion/:discussion_id', component: NestedContent},
    {path: '/user/:user_id', component: NestedContent},
    {path: '/user/:user_id/post', component: NestedContent},
    {path: '/user/:user_id/friend', component: NestedContent},
    {path: '/404', component: NestedContent},
    {path: '/:pathMatch(.*)*', redirect: '/404'},
];
`,group:`app`},{name:`rules.ts`,source:`import type {Rule} from 'history-adaptor/helper';

// Outer portal address -> nested address
export const rulesFromOuterToNested: Rule[] = [
    // literal replacement
    {from: '/portal/home', to: '/news'},
    {from: '/portal/error/not_found', to: '/404'},

    // path-to-regexp (>= 8.4.0): pass :param through
    {from: '/portal/discussion/:discussion_id', to: '/discussion/:discussion_id'},
    {from: '/portal/user/:user_id', to: '/user/:user_id'},

    // native RegExp + String.prototype.replace: query becomes path, $<name> groups
    {
        from: /^\\/portal\\/articles\\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>',
    },

    // RFC 6570 URI template: pathname + query + fragment
    {from: '/portal/friend{?user_id,group}{#hash}', to: '/user/{user_id}/friend{?group}{#hash}'},
];

// Nested address -> outer portal address
export const rulesFromNestedToOuter: Rule[] = [
    {from: '/news', to: '/portal/home'},
    {from: '/discussion/:discussion_id', to: '/portal/discussion/:discussion_id'},
    {from: '/user/:user_id', to: '/portal/user/:user_id'},
    {
        from: /^\\/user\\/(?<user_id>[^/?#]+)\\/post\\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>',
    },
    {from: '/user/{user_id}/friend{?group}{#hash}', to: '/portal/friend{?user_id,group}{#hash}'},
];
`,group:`app`}]},{id:`solid-react`,title:`Solid SPA ↔ nested React`,description:`A Solid SPA (Solid Router) owns the browser URL by backing its memory history with the real one, then mounts a React memory router inside.`,entry:`/examples/solid-react/index.html`,host:{framework:`Solid SPA`,note:`App renders the host router; Layout holds the nav`},nested:{framework:`React`,note:`NestedReactApp + createMemoryRouter, mounted into #react-root`},slot:`App → #react-root`,files:[{name:`index.html`,source:`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Solid host ↔ nested React</title>
    </head>
    <body class="bg-slate-100 p-4 text-slate-900">
        <div id="root"></div>
        <script type="module" src="./sandbox.ts"><\/script>
    </body>
</html>
`,lang:`xml`,group:`example`},{name:`sandbox.ts`,source:`import '../../src/style.css';

import {installAddressBar, reportAddressToParent} from '../../src/lib/frame.ts';
import {createApp} from './create-app.tsx';

// Example sandbox — not part of the app you copy.
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'hash' ? 'hash' : 'html5';

// A real deployment serves the app at \`/portal/*\`; this only compensates for
// the example being hosted under \`/examples/solid-react/index.html\`.
if (params.has('sandbox')) {
    history.replaceState(null, '', mode === 'hash' ? '#/portal/home' : '/portal/home');
}

void (async () => {
    const app = createApp(mode);
    const hostHistory = await app.mount(document.getElementById('root') as HTMLElement);
    installAddressBar(hostHistory, mode);
    reportAddressToParent(hostHistory);
})();
`,group:`example`},{name:`App.solid.tsx`,source:`/** @jsxImportSource solid-js */
import {MemoryRouter} from '@solidjs/router';
import type {Component} from 'solid-js';
import {render} from 'solid-js/web';

import type {BrowserMode} from '../../src/types.ts';
import type {BrowserMemoryHistory} from './browser-history.ts';
import {Layout} from './Layout.solid.tsx';
import {ModeContext} from './ModeContext.ts';
import {routes} from './routes.tsx';

/** The outer Solid SPA; it renders the host router and hosts the nested React app. */
export const App: Component<{history: BrowserMemoryHistory; mode: BrowserMode}> = (props) => (
    <div data-host class="space-y-4">
        <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Outer · Solid SPA
            </p>
            <h1 class="text-xl font-semibold text-slate-800">
                Portal (Solid Router owns the browser URL)
            </h1>
        </header>

        <ModeContext.Provider value={props.mode}>
            <MemoryRouter history={props.history} root={Layout}>
                {routes}
            </MemoryRouter>
        </ModeContext.Provider>

        <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
                Nested React app (memory router)
            </p>
            <div id="react-root" />
        </section>
    </div>
);

export const mountApp = (
    container: HTMLElement,
    history: BrowserMemoryHistory,
    mode: BrowserMode,
) => render(() => <App history={history} mode={mode} />, container);
`,group:`app`},{name:`Layout.solid.tsx`,source:`/** @jsxImportSource solid-js */
import {A} from '@solidjs/router';
import {type Component, type JSX, useContext} from 'solid-js';

import {ModeContext} from './ModeContext.ts';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';
const navRow = 'flex items-baseline gap-1';

/** The outer app's persistent layout. */
export const Layout: Component<{children?: JSX.Element}> = (props) => {
    const mode = useContext(ModeContext);

    return (
        <div class="space-y-4">
            <nav class="flex flex-col gap-1">
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/home"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/home
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/discussion/42"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/discussion/42
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/user/alice"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/user/alice
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/friend?user_id=alice&group=dev#top"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/friend?user_id=alice&amp;group=dev#top
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/error/not_found"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/error/not_found
                    </A>
                </div>
            </nav>

            {props.children}
        </div>
    );
};
`,group:`app`},{name:`Content.solid.tsx`,source:`/** @jsxImportSource solid-js */
import {useLocation} from '@solidjs/router';
import {type Component, useContext} from 'solid-js';

import {toAddress} from '../../src/lib/address.ts';
import {ModeContext} from './ModeContext.ts';

/** The outer app's routed page. */
export const Content: Component = () => {
    const location = useLocation();
    const mode = useContext(ModeContext);

    return (
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                <span class="break-all font-mono text-slate-700">{toAddress(location)}</span>
            </p>
        </div>
    );
};
`,group:`app`},{name:`routes.tsx`,source:`import type {RouteDefinition} from '@solidjs/router';

import {Content} from './Content.solid.tsx';

export const routes: RouteDefinition[] = [
    {path: '/portal/home', component: Content},
    {path: '/portal/discussion/:discussion_id', component: Content},
    {path: '/portal/user/:user_id', component: Content},
    {path: '/portal/articles', component: Content},
    {path: '/portal/friend', component: Content},
    {path: '/portal/error/not_found', component: Content},
    {path: '*', component: Content},
];
`,group:`app`},{name:`create-app.tsx`,source:`import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromReactRouter, fromSolidRouter} from 'history-adaptor/helper';
import {createRoot} from 'react-dom/client';
import {createMemoryRouter, RouterProvider} from 'react-router';

import type {BrowserMode} from '../../src/types.ts';
import {mountApp} from './App.solid.tsx';
import {createBrowserMemoryHistory} from './browser-history.ts';
import {nestedRoutes} from './NestedRoutes.tsx';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: a Solid host router, a React memory router, and the rules. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    const solidHistory = createBrowserMemoryHistory(mode);
    const hostSource = fromSolidRouter(solidHistory);

    const nestedRouter = createMemoryRouter(nestedRoutes, {initialEntries: ['/news']});
    const nestedSource = fromReactRouter(nestedRouter);

    const [hostHistory, nestedHistory] = connect([
        {
            key: 'host',
            history: hostSource,
            adaptors: [{target: 'nested', adapt: createAdapt(rulesFromOuterToNested)}],
        },
        {
            key: 'nested',
            history: nestedSource,
            adaptors: [{target: 'host', adapt: createAdapt(rulesFromNestedToOuter)}],
        },
    ]);

    let disposeSolid: (() => void) | undefined;
    let disposeNested: (() => void) | undefined;

    return {
        mount: (container) => {
            disposeSolid = mountApp(container, solidHistory, mode);

            const slot = container.querySelector('#react-root') as HTMLElement;
            const root = createRoot(slot);
            root.render(<RouterProvider router={nestedRouter} />);
            disposeNested = () => root.unmount();

            return Promise.resolve(hostHistory);
        },
        dispose: () => {
            disposeNested?.();
            disposeSolid?.();
            hostHistory.dispose?.();
            nestedHistory.dispose?.();
            nestedRouter.dispose();
            solidHistory.dispose();
        },
    };
};
`,group:`app`},{name:`ModeContext.ts`,source:`import {createContext} from 'solid-js';

import type {BrowserMode} from '../../src/types.ts';

export const ModeContext = createContext<BrowserMode>('html5');
`,group:`app`},{name:`browser-history.ts`,source:`import {fromBrowserNative} from 'history-adaptor/helper';

import {toAddress} from '../../src/lib/address.ts';
import type {BrowserMode} from '../../src/types.ts';

export type BrowserMemoryHistory = {
    get: () => string;
    set: (change: {value: string; replace?: boolean; scroll?: unknown}) => void;
    go: (delta: number) => void;
    listen: (listener: (value: string) => void) => () => void;
    dispose: () => void;
};

/**
 * Solid Router only ships a memory history publicly, so back it with the real
 * browser history. \`<MemoryRouter history={...}>\` then drives the URL bar, and
 * \`fromSolidRouter(history)\` can adapt the same object for \`connect\`.
 */
export const createBrowserMemoryHistory = (mode: BrowserMode): BrowserMemoryHistory => {
    const native = fromBrowserNative({hash: mode === 'hash'});

    return {
        get: () => toAddress(native.location),
        set: ({value, replace}) => {
            if (replace) {
                native.replace(value);
            } else {
                native.push(value);
            }
        },
        go: (delta) => native.go(delta),
        listen: (listener) => native.listen(() => listener(toAddress(native.location))),
        dispose: () => native.dispose?.(),
    };
};
`,group:`app`},{name:`NestedReactApp.tsx`,source:`import {NavLink, Outlet} from 'react-router';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

const navClass = ({isActive}: {isActive: boolean}): string =>
    \`\${linkBase} \${isActive ? linkActive : linkIdle}\`;

/** The nested React app's top-level layout. */
export const NestedReactApp = () => (
    <div data-embedded className="space-y-4">
        <nav className="flex flex-col gap-1">
            <NavLink to="/news" end className={navClass}>
                /news
            </NavLink>
            <NavLink to="/discussion/42" end className={navClass}>
                /discussion/42
            </NavLink>
            <NavLink to="/user/alice" end className={navClass}>
                /user/alice
            </NavLink>
            <NavLink
                to="/user/alice/post?category=tech&keyword=router#comments"
                end
                className={navClass}
            >
                /user/alice/post?category=tech&amp;keyword=router#comments
            </NavLink>
            <NavLink to="/user/alice/friend?group=dev#top" end className={navClass}>
                /user/alice/friend?group=dev#top
            </NavLink>
            <NavLink to="/404" end className={navClass}>
                /404
            </NavLink>
        </nav>
        <Outlet />
    </div>
);
`,group:`app`},{name:`NestedContent.tsx`,source:`import {useLocation} from 'react-router';

import {toAddress} from '../../src/lib/address.ts';

/** The nested app's routed page. */
export const NestedContent = () => {
    const location = useLocation();
    return (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p className="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                <span className="break-all font-mono text-slate-700">
                    {toAddress(location)}
                </span>
            </p>
        </div>
    );
};
`,group:`app`},{name:`NestedRoutes.tsx`,source:`import {createRoutesFromElements, Route} from 'react-router';

import {NestedContent} from './NestedContent.tsx';
import {NestedReactApp} from './NestedReactApp.tsx';

export const nestedRoutes = createRoutesFromElements(
    <Route element={<NestedReactApp />}>
        <Route path="/news" element={<NestedContent />} />
        <Route path="/discussion/:discussion_id" element={<NestedContent />} />
        <Route path="/user/:user_id" element={<NestedContent />} />
        <Route path="/user/:user_id/post" element={<NestedContent />} />
        <Route path="/user/:user_id/friend" element={<NestedContent />} />
        <Route path="/404" element={<NestedContent />} />
        <Route path="*" element={<NestedContent />} />
    </Route>,
);
`,group:`app`},{name:`rules.ts`,source:`import type {Rule} from 'history-adaptor/helper';

// Outer portal address -> nested address
export const rulesFromOuterToNested: Rule[] = [
    // literal replacement
    {from: '/portal/home', to: '/news'},
    {from: '/portal/error/not_found', to: '/404'},

    // path-to-regexp (>= 8.4.0): pass :param through
    {from: '/portal/discussion/:discussion_id', to: '/discussion/:discussion_id'},
    {from: '/portal/user/:user_id', to: '/user/:user_id'},

    // native RegExp + String.prototype.replace: query becomes path, $<name> groups
    {
        from: /^\\/portal\\/articles\\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>',
    },

    // RFC 6570 URI template: pathname + query + fragment
    {from: '/portal/friend{?user_id,group}{#hash}', to: '/user/{user_id}/friend{?group}{#hash}'},
];

// Nested address -> outer portal address
export const rulesFromNestedToOuter: Rule[] = [
    {from: '/news', to: '/portal/home'},
    {from: '/discussion/:discussion_id', to: '/portal/discussion/:discussion_id'},
    {from: '/user/:user_id', to: '/portal/user/:user_id'},
    {
        from: /^\\/user\\/(?<user_id>[^/?#]+)\\/post\\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>',
    },
    {from: '/user/{user_id}/friend{?group}{#hash}', to: '/portal/friend{?user_id,group}{#hash}'},
];
`,group:`app`}]},{id:`vue-angular`,title:`Vue SPA ↔ nested Angular`,description:`A Vue SPA (Vue Router, <router-link>) owns the browser URL and bootstraps Angular by hand. Angular keeps its routes in memory through a custom LocationStrategy.`,entry:`/examples/vue-angular/index.html`,host:{framework:`Vue SPA`,note:`App renders the router; Layout holds the nav and <RouterView>`},nested:{framework:`Angular`,note:`NestedAngularApp + in-memory LocationStrategy, mounted into #angular-root`},slot:`App → #angular-root`,files:[{name:`index.html`,source:`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vue host ↔ nested Angular</title>
    </head>
    <body class="bg-slate-100 p-4 text-slate-900">
        <div id="root"></div>
        <script type="module" src="./sandbox.ts"><\/script>
    </body>
</html>
`,lang:`xml`,group:`example`},{name:`sandbox.ts`,source:`import '../../src/style.css';

import {installAddressBar, reportAddressToParent} from '../../src/lib/frame.ts';
import {createApp} from './create-app.ts';

// Example sandbox — not part of the app you copy.
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'hash' ? 'hash' : 'html5';

// A real deployment serves the app at \`/portal/*\`; this only compensates for
// the example being hosted under \`/examples/vue-angular/index.html\`.
if (params.has('sandbox')) {
    history.replaceState(null, '', mode === 'hash' ? '#/portal/home' : '/portal/home');
}

void (async () => {
    const app = createApp(mode);
    const hostHistory = await app.mount(document.getElementById('root') as HTMLElement);
    installAddressBar(hostHistory, mode);
    reportAddressToParent(hostHistory);
})();
`,group:`example`},{name:`App.vue`,source:`<template>
    <div data-host class="space-y-4">
        <RouterView />

        <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
                Nested Angular app (memory router)
            </p>
            <div id="angular-root"></div>
        </section>
    </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
<\/script>
`,lang:`xml`,group:`app`},{name:`Layout.vue`,source:`<template>
    <div class="space-y-4">
        <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Outer · Vue SPA
            </p>
            <h1 class="text-xl font-semibold text-slate-800">
                Portal (Vue Router owns the browser URL)
            </h1>
        </header>

        <nav class="flex flex-col gap-1">
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/home"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/home</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/discussion/42"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/discussion/42</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/user/alice"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/user/alice</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/friend?user_id=alice&group=dev#top"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/friend?user_id=alice&amp;group=dev#top</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/error/not_found"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/error/not_found</RouterLink
                >
            </div>
        </nav>

        <RouterView />
    </div>
</template>

<script setup lang="ts">
import {inject} from 'vue';
import {RouterLink, RouterView} from 'vue-router';

const hashMode = inject('hashMode', false);
<\/script>
`,lang:`xml`,group:`app`},{name:`Content.vue`,source:`<template>
    <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Content Component
        </div>
        <p class="text-2xl font-bold text-slate-900">
            Now we are on page
            <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
            <span class="break-all font-mono text-slate-700">{{ route.fullPath }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import {inject} from 'vue';
import {useRoute} from 'vue-router';

const hashMode = inject('hashMode', false);
const route = useRoute();
<\/script>
`,lang:`xml`,group:`app`},{name:`routes.ts`,source:`import type {RouteRecordRaw} from 'vue-router';

import Content from './Content.vue';
import Layout from './Layout.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        children: [
            {path: 'portal/home', component: Content},
            {path: 'portal/discussion/:discussion_id', component: Content},
            {path: 'portal/user/:user_id', component: Content},
            {path: 'portal/articles', component: Content},
            {path: 'portal/friend', component: Content},
            {path: 'portal/error/not_found', component: Content},
        ],
    },
    {path: '/:pathMatch(.*)*', redirect: '/portal/home'},
];
`,group:`app`},{name:`create-app.ts`,source:`import '@angular/compiler';

import {Location} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import {Router, provideRouter, withDisabledInitialNavigation} from '@angular/router';
import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromAngularRouter, fromVueRouter} from 'history-adaptor/helper';
import {createApp as createVueApp} from 'vue';
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import type {BrowserMode} from '../../src/types.ts';
import App from './App.vue';
import {MemoryLocationStrategy} from './MemoryLocationStrategy.ts';
import {NestedAngularApp} from './NestedAngularApp.ts';
import {nestedRoutes} from './NestedRoutes.ts';
import {routes} from './routes.ts';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: a Vue host router, an in-memory Angular app, and the rules. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    const hostRouter = createRouter({
        history: mode === 'hash' ? createWebHashHistory() : createWebHistory(),
        routes,
    });

    let vueApp: ReturnType<typeof createVueApp> | undefined;
    let angular: Awaited<ReturnType<typeof bootstrapApplication>> | undefined;
    let hostHistory: HistoryLike | undefined;
    let nestedHistory: HistoryLike | undefined;

    return {
        mount: async (container) => {
            vueApp = createVueApp(App);
            vueApp.provide('hashMode', mode === 'hash');
            vueApp.use(hostRouter);
            vueApp.mount(container);

            const slot = container.querySelector('#angular-root') as HTMLElement;
            slot.append(document.createElement('nested-angular'));

            const appRef = await bootstrapApplication(NestedAngularApp, {
                providers: [
                    provideRouter(nestedRoutes, withDisabledInitialNavigation()),
                    {
                        provide: Location,
                        useFactory: () => new Location(new MemoryLocationStrategy()),
                    },
                ],
            });
            angular = appRef;

            const router = appRef.injector.get(Router);
            const location = appRef.injector.get(Location);
            await router.navigateByUrl('/news');

            [hostHistory, nestedHistory] = connect([
                {
                    key: 'host',
                    history: fromVueRouter(hostRouter),
                    adaptors: [
                        {target: 'nested', adapt: createAdapt(rulesFromOuterToNested)},
                    ],
                },
                {
                    key: 'nested',
                    history: fromAngularRouter(router, location),
                    adaptors: [
                        {target: 'host', adapt: createAdapt(rulesFromNestedToOuter)},
                    ],
                },
            ]);

            return hostHistory;
        },
        dispose: () => {
            hostHistory?.dispose?.();
            nestedHistory?.dispose?.();
            angular?.destroy();
            vueApp?.unmount();
        },
    };
};
`,group:`app`},{name:`NestedAngularApp.ts`,source:`import '@angular/compiler';

import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

/** The nested Angular app's top-level layout. */
export const NestedAngularApp = Component({
    selector: 'nested-angular',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    host: {'data-embedded': ''},
    template: \`
        <div class="space-y-4">
            <nav class="flex flex-col gap-1">
                <a
                    routerLink="/news"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/news</a
                >
                <a
                    routerLink="/discussion/42"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/discussion/42</a
                >
                <a
                    routerLink="/user/alice"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice</a
                >
                <a
                    routerLink="/user/alice/post"
                    [queryParams]="{category: 'tech', keyword: 'router'}"
                    fragment="comments"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice/post?category=tech&amp;keyword=router#comments</a
                >
                <a
                    routerLink="/user/alice/friend"
                    [queryParams]="{group: 'dev'}"
                    fragment="top"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice/friend?group=dev#top</a
                >
                <a
                    routerLink="/404"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/404</a
                >
            </nav>
            <router-outlet />
        </div>
    \`,
})(class {});
`,group:`app`},{name:`NestedContent.ts`,source:`import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, type Event} from '@angular/router';
import {filter, map, startWith} from 'rxjs';

/** The nested app's routed page. */
class ContentImpl {
    readonly address$ = inject(Router).events.pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => inject(Router).url),
        startWith(inject(Router).url),
    );
}

export const NestedContent = Component({
    selector: 'ng-content-page',
    imports: [AsyncPipe],
    template: \`
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page
                <span class="break-all font-mono text-slate-700">{{ address$ | async }}</span>
            </p>
        </div>
    \`,
})(ContentImpl);
`,group:`app`},{name:`NestedRoutes.ts`,source:`import type {Routes} from '@angular/router';

import {NestedContent} from './NestedContent.ts';

export const nestedRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'news'},
    {path: 'news', component: NestedContent},
    {path: 'discussion/:discussion_id', component: NestedContent},
    {path: 'user/:user_id', component: NestedContent},
    {path: 'user/:user_id/post', component: NestedContent},
    {path: 'user/:user_id/friend', component: NestedContent},
    {path: '404', component: NestedContent},
    {path: '**', redirectTo: '404'},
];
`,group:`app`},{name:`MemoryLocationStrategy.ts`,source:`import {LocationStrategy, type LocationChangeListener} from '@angular/common';

type Listener = LocationChangeListener;

type Entry = {
    url: string;
    state: unknown;
};

/** A \`LocationStrategy\` that keeps Angular's routes in memory. */
export class MemoryLocationStrategy extends LocationStrategy {
    #entries: Entry[] = [{url: '/', state: null}];
    #index = 0;
    #listeners = new Set<Listener>();

    path(): string {
        return this.#entries[this.#index].url;
    }

    prepareExternalUrl(internal: string): string {
        return internal;
    }

    getState(): unknown {
        return this.#entries[this.#index].state;
    }

    pushState(state: unknown, _title: string, url: string, queryParams: string): void {
        this.#commit({url: url + queryParams, state}, false);
    }

    replaceState(state: unknown, _title: string, url: string, queryParams: string): void {
        this.#commit({url: url + queryParams, state}, true);
    }

    forward(): void {
        this.historyGo(1);
    }

    back(): void {
        this.historyGo(-1);
    }

    historyGo(relativePosition: number): void {
        const next = this.#index + relativePosition;
        if (next < 0 || next >= this.#entries.length) {
            return;
        }
        this.#index = next;
        this.#notify();
    }

    onPopState(fn: Listener): void {
        this.#listeners.add(fn);
    }

    getBaseHref(): string {
        return '/';
    }

    #commit(entry: Entry, replace: boolean): void {
        if (replace) {
            this.#entries[this.#index] = entry;
        } else {
            this.#entries.splice(this.#index + 1);
            this.#entries.push(entry);
            this.#index++;
        }
        this.#notify();
    }

    #notify(): void {
        const state = this.#entries[this.#index].state;
        this.#listeners.forEach((listener) => listener({type: 'popstate', state}));
    }
}
`,group:`app`},{name:`rules.ts`,source:`import type {Rule} from 'history-adaptor/helper';

// Outer portal address -> nested address
export const rulesFromOuterToNested: Rule[] = [
    // literal replacement
    {from: '/portal/home', to: '/news'},
    {from: '/portal/error/not_found', to: '/404'},

    // path-to-regexp (>= 8.4.0): pass :param through
    {from: '/portal/discussion/:discussion_id', to: '/discussion/:discussion_id'},
    {from: '/portal/user/:user_id', to: '/user/:user_id'},

    // native RegExp + String.prototype.replace: query becomes path, $<name> groups
    {
        from: /^\\/portal\\/articles\\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>',
    },

    // RFC 6570 URI template: pathname + query + fragment
    {from: '/portal/friend{?user_id,group}{#hash}', to: '/user/{user_id}/friend{?group}{#hash}'},
];

// Nested address -> outer portal address
export const rulesFromNestedToOuter: Rule[] = [
    {from: '/news', to: '/portal/home'},
    {from: '/discussion/:discussion_id', to: '/portal/discussion/:discussion_id'},
    {from: '/user/:user_id', to: '/portal/user/:user_id'},
    {
        from: /^\\/user\\/(?<user_id>[^/?#]+)\\/post\\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>',
    },
    {from: '/user/{user_id}/friend{?group}{#hash}', to: '/portal/friend{?user_id,group}{#hash}'},
];
`,group:`app`}]},{id:`angular-solid`,title:`Angular SPA ↔ nested Solid`,description:`A standard Angular SPA (RouterLink, <router-outlet>) owns the browser URL, then a Solid memory router is mounted inside it.`,entry:`/examples/angular-solid/index.html`,host:{framework:`Angular SPA`,note:`App renders the router; Layout holds the nav and <router-outlet>`},nested:{framework:`Solid`,note:`NestedSolidApp + createMemoryHistory, mounted into #solid-root`},slot:`App → #solid-root`,files:[{name:`index.html`,source:`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Angular host ↔ nested Solid</title>
    </head>
    <body class="bg-slate-100 p-4 text-slate-900">
        <div id="root"></div>
        <script type="module" src="./sandbox.ts"><\/script>
    </body>
</html>
`,lang:`xml`,group:`example`},{name:`sandbox.ts`,source:`import '../../src/style.css';

import {installAddressBar, reportAddressToParent} from '../../src/lib/frame.ts';
import {createApp} from './create-app.ts';

// Example sandbox — not part of the app you copy.
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'hash' ? 'hash' : 'html5';

// A real deployment serves the app at \`/portal/*\`; this only compensates for
// the example being hosted under \`/examples/angular-solid/index.html\`.
if (params.has('sandbox')) {
    history.replaceState(null, '', mode === 'hash' ? '#/portal/home' : '/portal/home');
}

void (async () => {
    const app = createApp(mode);
    const hostHistory = await app.mount(document.getElementById('root') as HTMLElement);
    installAddressBar(hostHistory, mode);
    reportAddressToParent(hostHistory);
})();
`,group:`example`},{name:`App.ts`,source:`import '@angular/compiler';

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

class AppImpl {}

/** The outer Angular SPA; it renders the host router and hosts the nested Solid app. */
export const App = Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    host: {'data-host': ''},
    template: \`
        <div class="space-y-4">
            <router-outlet />

            <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
                    Nested Solid app (memory router)
                </p>
                <div id="solid-root"></div>
            </section>
        </div>
    \`,
})(AppImpl);
`,group:`app`},{name:`Layout.ts`,source:`import '@angular/compiler';

import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {HASH_MODE} from './HashMode.ts';

class LayoutImpl {
    readonly hashMode = inject(HASH_MODE);
}

/** The outer app's persistent layout. */
export const Layout = Component({
    selector: 'app-layout',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    template: \`
        <div class="space-y-4">
            <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Outer · Angular SPA
                </p>
                <h1 class="text-xl font-semibold text-slate-800">
                    Portal (Angular Router owns the browser URL)
                </h1>
            </header>

            <nav class="flex flex-col gap-1">
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/home"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/home</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/discussion/42"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/discussion/42</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/user/alice"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/user/alice</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/articles"
                        [queryParams]="{user_id: 'alice', category_id: 'tech', keyword: 'router'}"
                        fragment="comments"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/friend"
                        [queryParams]="{user_id: 'alice', group: 'dev'}"
                        fragment="top"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/friend?user_id=alice&amp;group=dev#top</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/error/not_found"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/error/not_found</a
                    >
                </div>
            </nav>

            <router-outlet />
        </div>
    \`,
})(LayoutImpl);
`,group:`app`},{name:`Content.ts`,source:`import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, type Event} from '@angular/router';
import {filter, map, startWith} from 'rxjs';

import {HASH_MODE} from './HashMode.ts';

/** The outer app's routed page. */
class ContentImpl {
    readonly hashMode = inject(HASH_MODE);
    readonly address$ = inject(Router).events.pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => inject(Router).url),
        startWith(inject(Router).url),
    );
}

export const Content = Component({
    selector: 'ng-content-page',
    imports: [AsyncPipe],
    template: \`
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page
                @if (hashMode) {
                    <span class="font-mono text-slate-400">/#</span>
                }
                <span class="break-all font-mono text-slate-700">{{ address$ | async }}</span>
            </p>
        </div>
    \`,
})(ContentImpl);
`,group:`app`},{name:`routes.ts`,source:`import type {Routes} from '@angular/router';

import {Content} from './Content.ts';
import {Layout} from './Layout.ts';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'portal/home'},
            {path: 'portal/home', component: Content},
            {path: 'portal/discussion/:discussion_id', component: Content},
            {path: 'portal/user/:user_id', component: Content},
            {path: 'portal/articles', component: Content},
            {path: 'portal/friend', component: Content},
            {path: 'portal/error/not_found', component: Content},
        ],
    },
    {path: '**', redirectTo: 'portal/home'},
];
`,group:`app`},{name:`create-app.ts`,source:`import '@angular/compiler';

import {Location} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import {Router, provideRouter, withHashLocation} from '@angular/router';
import {createMemoryHistory} from '@solidjs/router';
import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromAngularRouter, fromSolidRouter} from 'history-adaptor/helper';

import type {BrowserMode} from '../../src/types.ts';
import {App} from './App.ts';
import {HASH_MODE} from './HashMode.ts';
import {mountNestedSolid} from './NestedSolidApp.solid.tsx';
import {routes} from './routes.ts';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: an Angular host router, a Solid memory router, and the rules. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    let appRef: Awaited<ReturnType<typeof bootstrapApplication>> | undefined;
    let disposeSolid: (() => void) | undefined;
    let hostHistory: HistoryLike | undefined;
    let nestedHistory: HistoryLike | undefined;

    return {
        mount: async (container) => {
            const hostElement = document.createElement('app-root');
            container.append(hostElement);

            appRef = await bootstrapApplication(App, {
                providers: [
                    {provide: HASH_MODE, useValue: mode === 'hash'},
                    mode === 'hash'
                        ? provideRouter(routes, withHashLocation())
                        : provideRouter(routes),
                ],
            });

            const router = appRef.injector.get(Router);
            const location = appRef.injector.get(Location);

            const solidHistory = createMemoryHistory();
            solidHistory.set({value: '/news', replace: true});

            [hostHistory, nestedHistory] = connect([
                {
                    key: 'host',
                    history: fromAngularRouter(router, location),
                    adaptors: [
                        {target: 'nested', adapt: createAdapt(rulesFromOuterToNested)},
                    ],
                },
                {
                    key: 'nested',
                    history: fromSolidRouter(solidHistory),
                    adaptors: [
                        {target: 'host', adapt: createAdapt(rulesFromNestedToOuter)},
                    ],
                },
            ]);

            const slot = container.querySelector('#solid-root') as HTMLElement;
            disposeSolid = mountNestedSolid(slot, solidHistory);

            return hostHistory;
        },
        dispose: () => {
            disposeSolid?.();
            hostHistory?.dispose?.();
            nestedHistory?.dispose?.();
            appRef?.destroy();
        },
    };
};
`,group:`app`},{name:`HashMode.ts`,source:`import {InjectionToken} from '@angular/core';

export const HASH_MODE = new InjectionToken<boolean>('HASH_MODE');
`,group:`app`},{name:`NestedSolidApp.solid.tsx`,source:`/** @jsxImportSource solid-js */
import {MemoryRouter, type MemoryHistory} from '@solidjs/router';
import type {Component} from 'solid-js';
import {render} from 'solid-js/web';

import {NestedSolidLayout} from './NestedSolidLayout.solid.tsx';
import {nestedRoutes} from './NestedRoutes.ts';

/** The nested Solid app: a standard memory router. */
export const NestedSolidApp: Component<{history: MemoryHistory}> = (props) => (
    <MemoryRouter history={props.history} root={NestedSolidLayout}>
        {nestedRoutes}
    </MemoryRouter>
);

export const mountNestedSolid = (container: HTMLElement, history: MemoryHistory) =>
    render(() => <NestedSolidApp history={history} />, container);
`,group:`app`},{name:`NestedSolidLayout.solid.tsx`,source:`/** @jsxImportSource solid-js */
import {A} from '@solidjs/router';
import type {Component, JSX} from 'solid-js';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

/** The nested Solid app's persistent layout. */
export const NestedSolidLayout: Component<{children?: JSX.Element}> = (props) => (
    <div data-embedded class="space-y-4">
        <nav class="flex flex-col gap-1">
            <A href="/news" end class={linkBase} inactiveClass={linkIdle} activeClass={linkActive}>
                /news
            </A>
            <A
                href="/discussion/42"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /discussion/42
            </A>
            <A
                href="/user/alice"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /user/alice
            </A>
            <A
                href="/user/alice/post?category=tech&keyword=router#comments"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /user/alice/post?category=tech&amp;keyword=router#comments
            </A>
            <A
                href="/user/alice/friend?group=dev#top"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /user/alice/friend?group=dev#top
            </A>
            <A href="/404" end class={linkBase} inactiveClass={linkIdle} activeClass={linkActive}>
                /404
            </A>
        </nav>

        {props.children}
    </div>
);
`,group:`app`},{name:`NestedContent.solid.tsx`,source:`/** @jsxImportSource solid-js */
import {useLocation} from '@solidjs/router';
import type {Component} from 'solid-js';

import {toAddress} from '../../src/lib/address.ts';

/** The nested app's routed page. */
export const NestedContent: Component = () => {
    const location = useLocation();
    return (
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                <span class="break-all font-mono text-slate-700">{toAddress(location)}</span>
            </p>
        </div>
    );
};
`,group:`app`},{name:`NestedRoutes.ts`,source:`import type {RouteDefinition} from '@solidjs/router';

import {NestedContent} from './NestedContent.solid.tsx';

export const nestedRoutes: RouteDefinition[] = [
    {path: '/news', component: NestedContent},
    {path: '/discussion/:discussion_id', component: NestedContent},
    {path: '/user/:user_id', component: NestedContent},
    {path: '/user/:user_id/post', component: NestedContent},
    {path: '/user/:user_id/friend', component: NestedContent},
    {path: '/404', component: NestedContent},
    {path: '*', component: NestedContent},
];
`,group:`app`},{name:`rules.ts`,source:`import type {Rule} from 'history-adaptor/helper';

// Outer portal address -> nested address
export const rulesFromOuterToNested: Rule[] = [
    // literal replacement
    {from: '/portal/home', to: '/news'},
    {from: '/portal/error/not_found', to: '/404'},

    // path-to-regexp (>= 8.4.0): pass :param through
    {from: '/portal/discussion/:discussion_id', to: '/discussion/:discussion_id'},
    {from: '/portal/user/:user_id', to: '/user/:user_id'},

    // native RegExp + String.prototype.replace: query becomes path, $<name> groups
    {
        from: /^\\/portal\\/articles\\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>',
    },

    // RFC 6570 URI template: pathname + query + fragment
    {from: '/portal/friend{?user_id,group}{#hash}', to: '/user/{user_id}/friend{?group}{#hash}'},
];

// Nested address -> outer portal address
export const rulesFromNestedToOuter: Rule[] = [
    {from: '/news', to: '/portal/home'},
    {from: '/discussion/:discussion_id', to: '/portal/discussion/:discussion_id'},
    {from: '/user/:user_id', to: '/portal/user/:user_id'},
    {
        from: /^\\/user\\/(?<user_id>[^/?#]+)\\/post\\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>',
    },
    {from: '/user/{user_id}/friend{?group}{#hash}', to: '/portal/friend{?user_id,group}{#hash}'},
];
`,group:`app`}]}],m=e=>p.find(t=>t.id===e)??p[0],h=`w-full rounded-lg border px-3 py-2 text-left text-base transition-colors`,g=`border-slate-800 bg-slate-800 text-white`,_=`border-slate-300 bg-white text-slate-700 hover:bg-slate-100`,v=({value:e,onChange:t})=>(0,c.jsxs)(`div`,{className:`space-y-2`,children:[(0,c.jsx)(`span`,{className:`text-sm font-medium text-slate-500`,children:`Example`}),(0,c.jsx)(`nav`,{className:`flex flex-col gap-2`,children:p.map(n=>(0,c.jsx)(`button`,{type:`button`,className:`${h} ${n.id===e?g:_}`,"aria-pressed":n.id===e,onClick:()=>t(n.id),children:n.title},n.id))})]}),y=e(t(((e,t)=>{function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw Error(`map is read-only`)}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw Error(`set is read-only`)}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],i=typeof r;i!==`object`&&i!==`function`||Object.isFrozen(r)||n(r)}),e}var r=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function i(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}function a(e,...t){let n=Object.create(null);for(let t in e)n[t]=e[t];return t.forEach(function(e){for(let t in e)n[t]=e[t]}),n}var o=`</span>`,s=e=>!!e.scope,c=(e,{prefix:t})=>{if(e.startsWith(`language:`))return e.replace(`language:`,`language-`);if(e.includes(`.`)){let n=e.split(`.`);return[`${t}${n.shift()}`,...n.map((e,t)=>`${e}${`_`.repeat(t+1)}`)].join(` `)}return`${t}${e}`},l=class{constructor(e,t){this.buffer=``,this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=i(e)}openNode(e){if(!s(e))return;let t=c(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){s(e)&&(this.buffer+=o)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},u=(e={})=>{let t={children:[]};return Object.assign(t,e),t},d=class e{constructor(){this.rootNode=u(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let t=u({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return typeof t==`string`?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(t=>this._walk(e,t)),e.closeNode(t)),e}static _collapse(t){typeof t!=`string`&&t.children&&(t.children.every(e=>typeof e==`string`)?t.children=[t.children.join(``)]:t.children.forEach(t=>{e._collapse(t)}))}},f=class extends d{constructor(e){super(),this.options=e}addText(e){e!==``&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){let n=e.root;t&&(n.scope=`language:${t}`),this.add(n)}toHTML(){return new l(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function p(e){return e?typeof e==`string`?e:e.source:null}function m(e){return _(`(?=`,e,`)`)}function h(e){return _(`(?:`,e,`)*`)}function g(e){return _(`(?:`,e,`)?`)}function _(...e){return e.map(e=>p(e)).join(``)}function v(e){let t=e[e.length-1];return typeof t==`object`&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function y(...e){return`(`+(v(e).capture?``:`?:`)+e.map(e=>p(e)).join(`|`)+`)`}function b(e){return RegExp(e.toString()+`|`).exec(``).length-1}function x(e,t){let n=e&&e.exec(t);return n&&n.index===0}var S=new RegExp(y(/\[(?:[^\\\]]|\\.)*\]/,/\(\?<(?![=!])[^>]+>/,/\(\?'[^']+'/,/\(\??/,/\\([1-9][0-9]*)/,/\\./));function C(e,{joinWith:t}){let n=0;return e.map(e=>{n+=1;let t=n,r=p(e),i=``;for(;r.length>0;){let e=S.exec(r);if(!e){i+=r;break}i+=r.substring(0,e.index),r=r.substring(e.index+e[0].length),e[0][0]===`\\`&&e[1]?i+=`\\`+String(Number(e[1])+t):(i+=e[0],(e[0]===`(`||/^\(\?[<']/.test(e[0]))&&n++)}return i}).map(e=>`(${e})`).join(t)}var w=/\b\B/,T=`[a-zA-Z]\\w*`,E=`[a-zA-Z_]\\w*`,D=`\\b\\d+(\\.\\d+)?`,O=`(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)`,k=`\\b(0b[01]+)`,A=`!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~`,j=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=_(t,/.*\b/,e.binary,/\b.*/)),a({scope:`meta`,begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{e.index!==0&&t.ignoreMatch()}},e)},M={begin:`\\\\[\\s\\S]`,relevance:0},N={scope:`string`,begin:`'`,end:`'`,illegal:`\\n`,contains:[M]},P={scope:`string`,begin:`"`,end:`"`,illegal:`\\n`,contains:[M]},F={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},I=function(e,t,n={}){let r=a({scope:`comment`,begin:e,end:t,contains:[]},n);r.contains.push({scope:`doctag`,begin:`[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)`,end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let i=y(`I`,`a`,`is`,`so`,`us`,`to`,`at`,`if`,`in`,`it`,`on`,/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:_(/[ ]+/,`(`,i,/[.]?[:]?([.][ ]|[ ])/,`){3}`)}),r},L=I(`//`,`$`),R=I(`/\\*`,`\\*/`),z=I(`#`,`$`),B=Object.freeze({__proto__:null,APOS_STRING_MODE:N,BACKSLASH_ESCAPE:M,BINARY_NUMBER_MODE:{scope:`number`,begin:k,relevance:0},BINARY_NUMBER_RE:k,COMMENT:I,C_BLOCK_COMMENT_MODE:R,C_LINE_COMMENT_MODE:L,C_NUMBER_MODE:{scope:`number`,begin:O,relevance:0},C_NUMBER_RE:O,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},HASH_COMMENT_MODE:z,IDENT_RE:T,MATCH_NOTHING_RE:w,METHOD_GUARD:{begin:`\\.\\s*[a-zA-Z_]\\w*`,relevance:0},NUMBER_MODE:{scope:`number`,begin:D,relevance:0},NUMBER_RE:D,PHRASAL_WORDS_MODE:F,QUOTE_STRING_MODE:P,REGEXP_MODE:{scope:`regexp`,begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[M,{begin:/\[/,end:/\]/,relevance:0,contains:[M]}]},RE_STARTERS_RE:A,SHEBANG:j,TITLE_MODE:{scope:`title`,begin:T,relevance:0},UNDERSCORE_IDENT_RE:E,UNDERSCORE_TITLE_MODE:{scope:`title`,begin:E,relevance:0}});function V(e,t){e.input[e.index-1]===`.`&&t.ignoreMatch()}function ee(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function te(e,t){t&&e.beginKeywords&&(e.begin=`\\b(`+e.beginKeywords.split(` `).join(`|`)+`)(?!\\.)(?=\\b|\\s)`,e.__beforeBegin=V,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ne(e,t){Array.isArray(e.illegal)&&(e.illegal=y(...e.illegal))}function re(e,t){if(e.match){if(e.begin||e.end)throw Error(`begin & end are not supported with match`);e.begin=e.match,delete e.match}}function ie(e,t){e.relevance===void 0&&(e.relevance=1)}var ae=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw Error(`beforeMatch cannot be used with starts`);let n=Object.assign({},e);Object.keys(e).forEach(t=>{delete e[t]}),e.keywords=n.keywords,e.begin=_(n.beforeMatch,m(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},oe=[`of`,`and`,`for`,`in`,`not`,`or`,`if`,`then`,`parent`,`list`,`value`],se=`keyword`;function H(e,t,n=se){let r=Object.create(null);return typeof e==`string`?i(n,e.split(` `)):Array.isArray(e)?i(n,e):Object.keys(e).forEach(function(n){Object.assign(r,H(e[n],t,n))}),r;function i(e,n){t&&(n=n.map(e=>e.toLowerCase())),n.forEach(function(t){let n=t.split(`|`);r[n[0]]=[e,ce(n[0],n[1])]})}}function ce(e,t){return t?Number(t):+!le(e)}function le(e){return oe.includes(e.toLowerCase())}var U={},W=e=>{console.error(e)},G=(e,...t)=>{console.log(`WARN: ${e}`,...t)},K=(e,t)=>{U[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),U[`${e}/${t}`]=!0)},q=Error();function J(e,t,{key:n}){let r=0,i=e[n],a={},o={};for(let e=1;e<=t.length;e++)o[e+r]=i[e],a[e+r]=!0,r+=b(t[e-1]);e[n]=o,e[n]._emit=a,e[n]._multi=!0}function ue(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw W(`skip, excludeBegin, returnBegin not compatible with beginScope: {}`),q;if(typeof e.beginScope!=`object`||e.beginScope===null)throw W(`beginScope must be object`),q;J(e,e.begin,{key:`beginScope`}),e.begin=C(e.begin,{joinWith:``})}}function de(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw W(`skip, excludeEnd, returnEnd not compatible with endScope: {}`),q;if(typeof e.endScope!=`object`||e.endScope===null)throw W(`endScope must be object`),q;J(e,e.end,{key:`endScope`}),e.end=C(e.end,{joinWith:``})}}function fe(e){e.scope&&typeof e.scope==`object`&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function pe(e){fe(e),typeof e.beginScope==`string`&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope==`string`&&(e.endScope={_wrap:e.endScope}),ue(e),de(e)}function me(e){function t(t,n){return new RegExp(p(t),`m`+(e.case_insensitive?`i`:``)+(e.unicodeRegex?`u`:``)+(n?`g`:``))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=b(e)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=t(C(e,{joinWith:`|`}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let t=this.matcherRe.exec(e);if(!t)return null;let n=t.findIndex((e,t)=>t>0&&e!==void 0),r=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,r)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let t=new n;return this.rules.slice(e).forEach(([e,n])=>t.addRule(e,n)),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),t.type===`begin`&&this.count++}exec(e){let t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition()&&!(n&&n.index===this.lastIndex)){let t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}function i(e){let t=new r;return e.contains.forEach(e=>t.addRule(e.begin,{rule:e,type:`begin`})),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:`end`}),e.illegal&&t.addRule(e.illegal,{type:`illegal`}),t}function o(n,r){let a=n;if(n.isCompiled)return a;[ee,re,pe,ae].forEach(e=>e(n,r)),e.compilerExtensions.forEach(e=>e(n,r)),n.__beforeBegin=null,[te,ne,ie].forEach(e=>e(n,r)),n.isCompiled=!0;let s=null;return typeof n.keywords==`object`&&n.keywords.$pattern&&(n.keywords=Object.assign({},n.keywords),s=n.keywords.$pattern,delete n.keywords.$pattern),s||=/\w+/,n.keywords&&=H(n.keywords,e.case_insensitive),a.keywordPatternRe=t(s,!0),r&&(n.begin||=/\B|\b/,a.beginRe=t(a.begin),!n.end&&!n.endsWithParent&&(n.end=/\B|\b/),n.end&&(a.endRe=t(a.end)),a.terminatorEnd=p(a.end)||``,n.endsWithParent&&r.terminatorEnd&&(a.terminatorEnd+=(n.end?`|`:``)+r.terminatorEnd)),n.illegal&&(a.illegalRe=t(n.illegal)),n.contains||=[],n.contains=[].concat(...n.contains.map(function(e){return he(e===`self`?n:e)})),n.contains.forEach(function(e){o(e,a)}),n.starts&&o(n.starts,r),a.matcher=i(a),a}if(e.compilerExtensions||=[],e.contains&&e.contains.includes(`self`))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),o(e)}function Y(e){return e?e.endsWithParent||Y(e.starts):!1}function he(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return a(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Y(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}var ge=`11.12.0`,_e=class extends Error{constructor(e,t){super(e),this.name=`HTMLInjectionError`,this.html=t}},X=i,Z=a,Q=Symbol(`nomatch`),ve=7,ye=function(e){let t=Object.create(null),i=Object.create(null),a=[],o=!0,s=`Could not find the language '{}', did you forget to load/include a language module?`,c={disableAutodetect:!0,name:`Plain text`,contains:[]},l={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:`hljs-`,cssSelector:`pre code`,languages:null,__emitter:f};function u(e){return l.noHighlightRe.test(e)}function d(e){let t=e.className+` `;t+=e.parentNode?e.parentNode.className:``;let n=l.languageDetectRe.exec(t);if(n){let t=N(n[1]);return t||(G(s.replace(`{}`,n[1])),G(`Falling back to no-highlight mode for this block.`,e)),t?n[1]:`no-highlight`}return t.split(/\s+/).find(e=>u(e)||N(e))}function p(e,t,n){let r=``,i=``;typeof t==`object`?(r=e,n=t.ignoreIllegals,i=t.language):(K(`10.7.0`,`highlight(lang, code, ...args) has been deprecated.`),K(`10.7.0`,`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),i=e,r=t),n===void 0&&(n=!0);let a={code:r,language:i};z(`before:highlight`,a);let o=a.result?a.result:v(a.language,a.code,n);return o.code=a.code,z(`after:highlight`,o),o}function v(e,n,i,a){let c=Object.create(null);function u(e,t){return e.keywords[t]}function d(){if(!A.keywords){M.addText(P);return}let e=0;A.keywordPatternRe.lastIndex=0;let t=A.keywordPatternRe.exec(P),n=``;for(;t;){n+=P.substring(e,t.index);let r=D.case_insensitive?t[0].toLowerCase():t[0],i=u(A,r);if(i){let[e,a]=i;if(M.addText(n),n=``,c[r]=(c[r]||0)+1,c[r]<=ve&&(F+=a),e.startsWith(`_`))n+=t[0];else{let n=D.classNameAliases[e]||e;m(t[0],n)}}else n+=t[0];e=A.keywordPatternRe.lastIndex,t=A.keywordPatternRe.exec(P)}n+=P.substring(e),M.addText(n)}function f(){if(P===``)return;let e=null;if(typeof A.subLanguage==`string`){if(!t[A.subLanguage]){M.addText(P);return}e=v(A.subLanguage,P,!0,j[A.subLanguage]),j[A.subLanguage]=e._top}else e=S(P,A.subLanguage.length?A.subLanguage:null);A.relevance>0&&(F+=e.relevance),M.__addSublanguage(e._emitter,e.language)}function p(){A.subLanguage==null?d():f(),P=``}function m(e,t){e!==``&&(M.startScope(t),M.addText(e),M.endScope())}function h(e,t){let n=1,r=t.length-1;for(;n<=r;){if(!e._emit[n]){n++;continue}let r=D.classNameAliases[e[n]]||e[n],i=t[n];r?m(i,r):(P=i,d(),P=``),n++}}function g(e,t){return e.scope&&typeof e.scope==`string`&&M.openNode(D.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(m(P,D.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),P=``):e.beginScope._multi&&(h(e.beginScope,t),P=``)),A=Object.create(e,{parent:{value:A}}),A}function _(e,t,n){let i=x(e.endRe,n);if(i){if(e[`on:end`]){let n=new r(e);e[`on:end`](t,n),n.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return _(e.parent,t,n)}function y(e){return A.matcher.regexIndex===0?(P+=e[0],1):(R=!0,0)}function b(e){let t=e[0],n=e.rule,i=new r(n),a=[n.__beforeBegin,n[`on:begin`]];for(let n of a)if(n&&(n(e,i),i.isMatchIgnored))return y(t);return n.skip?P+=t:(n.excludeBegin&&(P+=t),p(),!n.returnBegin&&!n.excludeBegin&&(P=t)),g(n,e),n.returnBegin?0:t.length}function C(e){let t=e[0],r=n.substring(e.index),i=_(A,e,r);if(!i)return Q;let a=A;A.endScope&&A.endScope._wrap?(p(),m(t,A.endScope._wrap)):A.endScope&&A.endScope._multi?(p(),h(A.endScope,e)):a.skip?P+=t:(a.returnEnd||a.excludeEnd||(P+=t),p(),a.excludeEnd&&(P=t));do A.scope&&M.closeNode(),!A.skip&&!A.subLanguage&&(F+=A.relevance),A=A.parent;while(A!==i.parent);return i.starts&&g(i.starts,e),a.returnEnd?0:t.length}function w(){let e=[];for(let t=A;t!==D;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach(e=>M.openNode(e))}let T={};function E(t,r){let a=r&&r[0];if(P+=t,a==null)return p(),0;if(T.type===`begin`&&r.type===`end`&&T.index===r.index&&a===``){if(P+=n.slice(r.index,r.index+1),!o){let t=Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=T.rule,t}return 1}if(T=r,r.type===`begin`)return b(r);if(r.type===`illegal`&&!i){let e=Error(`Illegal lexeme "`+a+`" for mode "`+(A.scope||`<unnamed>`)+`"`);throw e.mode=A,e}if(r.type===`end`){let e=C(r);if(e!==Q)return e}if(r.type===`illegal`&&a===``)return r.index===n.length||(P+=`
`),1;if(L>1e5&&L>r.index*3)throw Error(`potential infinite loop, way more iterations than matches`);return P+=a,a.length}let D=N(e);if(!D)throw W(s.replace(`{}`,e)),Error(`Unknown language: "`+e+`"`);let O=me(D),k=``,A=a||O,j={},M=new l.__emitter(l);w();let P=``,F=0,I=0,L=0,R=!1;try{if(D.__emitTokens)D.__emitTokens(n,M);else{for(A.matcher.considerAll();;){L++,R?R=!1:A.matcher.considerAll(),A.matcher.lastIndex=I;let e=A.matcher.exec(n);if(!e)break;let t=E(n.substring(I,e.index),e);I=e.index+t}E(n.substring(I))}return M.finalize(),k=M.toHTML(),{language:e,value:k,relevance:F,illegal:!1,_emitter:M,_top:A}}catch(t){if(t.message&&t.message.includes(`Illegal`))return{language:e,value:X(n),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:I,context:n.slice(I-100,I+100),mode:t.mode,resultSoFar:k},_emitter:M};if(o)return{language:e,value:X(n),illegal:!1,relevance:0,errorRaised:t,_emitter:M,_top:A};throw t}}function b(e){let t={value:X(e),illegal:!1,relevance:0,_top:c,_emitter:new l.__emitter(l)};return t._emitter.addText(e),t}function S(e,n){n=n||l.languages||Object.keys(t);let r=b(e),i=n.filter(N).filter(F).map(t=>v(t,e,!1));i.unshift(r);let[a,o]=i.sort((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(N(e.language).supersetOf===t.language)return 1;if(N(t.language).supersetOf===e.language)return-1}return 0}),s=a;return s.secondBest=o,s}function C(e,t,n){let r=t&&i[t]||n;e.classList.add(`hljs`),e.classList.add(`language-${r}`)}function w(e){let t=null,n=d(e);if(u(n))return;if(z(`before:highlightElement`,{el:e,language:n}),e.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);return}if(e.children.length>0&&(l.ignoreUnescapedHTML||(console.warn(`One of your code blocks includes unescaped HTML. This is a potentially serious security risk.`),console.warn(`https://github.com/highlightjs/highlight.js/wiki/security`),console.warn(`The element with unescaped HTML:`),console.warn(e)),l.throwUnescapedHTML))throw new _e(`One of your code blocks includes unescaped HTML.`,e.innerHTML);t=e;let r=t.textContent,i=n?p(r,{language:n,ignoreIllegals:!0}):S(r);e.innerHTML=i.value,e.dataset.highlighted=`yes`,C(e,n,i.language),e.result={language:i.language,re:i.relevance,relevance:i.relevance},i.secondBest&&(e.secondBest={language:i.secondBest.language,relevance:i.secondBest.relevance}),z(`after:highlightElement`,{el:e,result:i,text:r})}function T(e){l=Z(l,e)}let E=()=>{k(),K(`10.6.0`,`initHighlighting() deprecated.  Use highlightAll() now.`)};function D(){k(),K(`10.6.0`,`initHighlightingOnLoad() deprecated.  Use highlightAll() now.`)}let O=!1;function k(){function e(){k()}document.readyState===`loading`?(O||window.addEventListener(`DOMContentLoaded`,e,!1),O=!0):document.querySelectorAll(l.cssSelector).forEach(w)}function A(n,r){let i=null;try{i=r(e)}catch(e){if(W(`Language definition for '{}' could not be registered.`.replace(`{}`,n)),o)W(e);else throw e;i=c}i.name||(i.name=n),t[n]=i,i.rawDefinition=r.bind(null,e),i.aliases&&P(i.aliases,{languageName:n})}function j(e){delete t[e];for(let t of Object.keys(i))i[t]===e&&delete i[t]}function M(){return Object.keys(t)}function N(e){return e=(e||``).toLowerCase(),t[e]||t[i[e]]}function P(e,{languageName:t}){typeof e==`string`&&(e=[e]),e.forEach(e=>{i[e.toLowerCase()]=t})}function F(e){let t=N(e);return t&&!t.disableAutodetect}function I(e){e[`before:highlightBlock`]&&!e[`before:highlightElement`]&&(e[`before:highlightElement`]=t=>{e[`before:highlightBlock`](Object.assign({block:t.el},t))}),e[`after:highlightBlock`]&&!e[`after:highlightElement`]&&(e[`after:highlightElement`]=t=>{e[`after:highlightBlock`](Object.assign({block:t.el},t))})}function L(e){I(e),a.push(e)}function R(e){let t=a.indexOf(e);t!==-1&&a.splice(t,1)}function z(e,t){let n=e;a.forEach(function(e){e[n]&&e[n](t)})}function V(e){return K(`10.7.0`,`highlightBlock will be removed entirely in v12.0`),K(`10.7.0`,`Please use highlightElement now.`),w(e)}Object.assign(e,{highlight:p,highlightAuto:S,highlightAll:k,highlightElement:w,highlightBlock:V,configure:T,initHighlighting:E,initHighlightingOnLoad:D,registerLanguage:A,unregisterLanguage:j,listLanguages:M,getLanguage:N,registerAliases:P,autoDetection:F,inherit:Z,addPlugin:L,removePlugin:R}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=ge,e.regex={concat:_,lookahead:m,either:y,optional:g,anyNumberOfTimes:h};for(let e in B)typeof B[e]==`object`&&n(B[e]);return Object.assign(e,B),e},$=ye({});$.newInstance=()=>ye({}),t.exports=$,$.HighlightJS=$,$.default=$}))()).default,b=`[A-Za-z$_][0-9A-Za-z$_]*`,x=`as.in.of.if.for.while.finally.var.new.function.do.return.void.else.break.catch.instanceof.with.throw.case.default.try.switch.continue.typeof.delete.let.yield.const.class.debugger.async.await.static.import.from.export.extends.using`.split(`.`),S=[`true`,`false`,`null`,`undefined`,`NaN`,`Infinity`],C=`Object.Function.Boolean.Symbol.Math.Date.Number.BigInt.String.RegExp.Array.Float32Array.Float64Array.Int8Array.Uint8Array.Uint8ClampedArray.Int16Array.Int32Array.Uint16Array.Uint32Array.BigInt64Array.BigUint64Array.Set.Map.WeakSet.WeakMap.ArrayBuffer.SharedArrayBuffer.Atomics.DataView.JSON.Promise.Generator.GeneratorFunction.AsyncFunction.Reflect.Proxy.Intl.WebAssembly`.split(`.`),w=[`Error`,`EvalError`,`InternalError`,`RangeError`,`ReferenceError`,`SyntaxError`,`TypeError`,`URIError`],T=[`setInterval`,`setTimeout`,`clearInterval`,`clearTimeout`,`require`,`exports`,`eval`,`isFinite`,`isNaN`,`parseFloat`,`parseInt`,`decodeURI`,`decodeURIComponent`,`encodeURI`,`encodeURIComponent`,`escape`,`unescape`],E=[`arguments`,`this`,`super`,`console`,`window`,`document`,`localStorage`,`sessionStorage`,`module`,`self`,`global`],D=[].concat(T,C,w);function O(e){let t=e.regex,n=(e,{after:t})=>{let n=`</`+e[0].slice(1);return e.input.indexOf(n,t)!==-1},r=b,i={begin:`<>`,end:`</>`},a=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{let r=e[0].length+e.index,i=e.input[r];if(i===`<`||i===`,`){t.ignoreMatch();return}i===`>`&&(n(e,{after:r})||t.ignoreMatch());let a,o=e.input.substring(r);((a=o.match(/^\s*=/))||(a=o.match(/^\s+extends\s+/))&&a.index===0)&&t.ignoreMatch()}},s={$pattern:b,keyword:x,literal:S,built_in:D,"variable.language":E},c=`[0-9](_?[0-9])*`,l=`\\.(${c})`,u=`0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`,d={className:`number`,variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:`\\b(0|[1-9](_?[0-9])*)n\\b`},{begin:`\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b`},{begin:`\\b0[bB][0-1](_?[0-1])*n?\\b`},{begin:`\\b0[oO][0-7](_?[0-7])*n?\\b`},{begin:`\\b0[0-7]+n?\\b`}],relevance:0},f={className:`subst`,begin:`\\$\\{`,end:`\\}`,keywords:s,contains:[]},p={begin:".?html`",end:``,starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:`xml`}},m={begin:".?css`",end:``,starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:`css`}},h={begin:".?gql`",end:``,starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:`graphql`}},g={className:`string`,begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:`comment`,variants:[e.COMMENT(/\/\*\*(?!\/)/,`\\*/`,{relevance:0,contains:[{begin:`(?=@[A-Za-z]+)`,relevance:0,contains:[{className:`doctag`,begin:`@[A-Za-z]+`},{className:`type`,begin:`\\{`,end:`\\}`,excludeEnd:!0,excludeBegin:!0,relevance:0},{className:`variable`,begin:r+`(?=\\s*(-)|$)`,endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},v=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,m,h,g,{match:/\$\d+/},d];f.contains=v.concat({begin:/\{/,end:/\}/,keywords:s,contains:[`self`].concat(v)});let y=[].concat(_,f.contains),O=y.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:[`self`].concat(y)}]),k={className:`params`,begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:O},A={variants:[{match:[/class/,/\s+/,r,/\s+/,/extends/,/\s+/,t.concat(r,`(`,t.concat(/\./,r),`)*`)],scope:{1:`keyword`,3:`title.class`,5:`keyword`,7:`title.class.inherited`}},{match:[/class/,/\s+/,r],scope:{1:`keyword`,3:`title.class`}}]},j={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:`title.class`,keywords:{_:[...C,...w]}},M={label:`use_strict`,className:`meta`,relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},N={variants:[{match:[/function/,/\s+/,r,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:`keyword`,3:`title.function`},label:`func.def`,contains:[k],illegal:/%/},P={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:`variable.constant`};function F(e){return t.concat(`(?!`,e.join(`|`),`)`)}let I={match:t.concat(/\b/,F([...T,`super`,`import`,`await`].map(e=>`${e}\\s*\\(`)),r,t.lookahead(/\s*\(/)),className:`title.function`,relevance:0},L={begin:t.concat(/\./,t.lookahead(t.concat(r,/(?![0-9A-Za-z$_(])/))),end:r,excludeBegin:!0,keywords:`prototype`,className:`property`,relevance:0},R={match:[/get|set/,/\s+/,r,/(?=\()/],className:{1:`keyword`,3:`title.function`},contains:[{begin:/\(\)/},k]},z=`(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|`+e.UNDERSCORE_IDENT_RE+`)\\s*=>`,B={match:[/const|var|let/,/\s+/,r,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(z)],keywords:`async`,className:{1:`keyword`,3:`title.function`},contains:[k]};return{name:`JavaScript`,aliases:[`js`,`jsx`,`mjs`,`cjs`],keywords:s,exports:{PARAMS_CONTAINS:O,CLASS_REFERENCE:j},illegal:/#(?![$_A-Za-z])/,contains:[e.SHEBANG({label:`shebang`,binary:`node`,relevance:5}),M,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,m,h,g,_,{match:/\$\d+/},d,j,{scope:`attr`,match:r+t.lookahead(`:`),relevance:0},B,{begin:`(`+e.RE_STARTERS_RE+`|\\b(case|return|throw)\\b)\\s*`,keywords:`return throw case`,relevance:0,contains:[_,e.REGEXP_MODE,{className:`function`,begin:z,returnBegin:!0,end:`\\s*=>`,contains:[{className:`params`,variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:O}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:a},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:`xml`,contains:[{begin:o.begin,end:o.end,skip:!0,contains:[`self`]}]}]},N,{beginKeywords:`while if switch catch for`},{begin:`\\b(?!function)`+e.UNDERSCORE_IDENT_RE+`\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{`,returnBegin:!0,label:`func.def`,contains:[k,e.inherit(e.TITLE_MODE,{begin:r,className:`title.function`})]},{match:/\.\.\./,relevance:0},L,{match:`\\$`+r,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:`title.function`},contains:[k]},I,P,A,R,{match:/\$[(.]/}]}}function k(e){let t=e.regex,n=O(e),r=b,i=[`any`,`void`,`number`,`boolean`,`string`,`object`,`never`,`symbol`,`bigint`,`unknown`],a={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:`keyword`,3:`title.class`}},o={beginKeywords:`interface`,end:/\{/,excludeEnd:!0,keywords:{keyword:`interface extends`,built_in:i},contains:[n.exports.CLASS_REFERENCE]},s={className:`meta`,relevance:10,begin:/^\s*['"]use strict['"]/},c={$pattern:b,keyword:x.concat([`type`,`interface`,`public`,`private`,`protected`,`implements`,`declare`,`abstract`,`readonly`,`enum`,`override`,`satisfies`]),literal:S,built_in:D.concat(i),"variable.language":E},l={className:`meta`,begin:`@`+r},u=(e,t,n)=>{let r=e.contains.findIndex(e=>e.label===t);if(r===-1)throw Error(`can not find mode to replace`);e.contains.splice(r,1,n)};Object.assign(n.keywords,c),n.exports.PARAMS_CONTAINS.push(l);let d=n.contains.find(e=>e.scope===`attr`),f=Object.assign({},d,{match:t.concat(r,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,d,f]),n.contains=n.contains.concat([l,a,o,f]),u(n,`shebang`,e.SHEBANG()),u(n,`use_strict`,s);let p=n.contains.find(e=>e.label===`func.def`);return p.relevance=0,Object.assign(n,{name:`TypeScript`,aliases:[`ts`,`tsx`,`mts`,`cts`]}),n}function A(e){let t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r=/[\p{L}0-9._:-]+/u,i={className:`symbol`,begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:`keyword`,begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=e.inherit(a,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:`string`}),c=e.inherit(e.QUOTE_STRING_MODE,{className:`string`}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:`attr`,begin:r,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:`string`,endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[i]},{begin:/'/,end:/'/,contains:[i]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:`HTML, XML`,aliases:[`html`,`xhtml`,`rss`,`atom`,`xjb`,`xsd`,`xsl`,`plist`,`wsf`,`svg`],case_insensitive:!0,unicodeRegex:!0,contains:[{className:`meta`,begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,c,s,o,{begin:/\[/,end:/\]/,contains:[{className:`meta`,begin:/<![a-z]/,end:/>/,contains:[a,o,c,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},i,{className:`meta`,end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[c]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:`tag`,begin:/<style(?=\s|>)/,end:/>/,keywords:{name:`style`},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:`css`}},{className:`tag`,begin:/<script(?=\s|>)/,end:/>/,keywords:{name:`script`},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:`javascript`}},{className:`tag`,begin:/<>|<\/>/},{className:`tag`,begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:`name`,begin:n,relevance:0,starts:l}]},{className:`tag`,begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:`name`,begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}y.registerLanguage(`typescript`,k),y.registerLanguage(`xml`,A);var j=[{id:`example`,label:`Example sandbox`,hint:`Only exists to run the example inside an iframe.`},{id:`app`,label:`Your app code`,hint:`Copy this into a real project.`}],M=async e=>{try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.opacity=`0`,document.body.append(t),t.select(),document.execCommand(`copy`),t.remove()}},N=({files:e})=>{let t=e.find(e=>e.group===`app`)??e[0],[n,r]=(0,o.useState)(t?.name??``),[i,a]=(0,o.useState)(!1),s=e.find(e=>e.name===n)??t,l=(0,o.useMemo)(()=>s?y.highlight(s.source,{language:s.lang??`typescript`}).value:``,[s]);return s?(0,c.jsxs)(`div`,{className:`overflow-hidden rounded-xl border border-slate-700 bg-slate-900`,children:[(0,c.jsx)(`div`,{className:`space-y-3 border-b border-slate-700 px-3 py-3`,children:j.map((t,n)=>{let i=e.filter(e=>e.group===t.id);return i.length===0?null:(0,c.jsxs)(`div`,{className:n>0?`border-t border-slate-700 pt-3`:void 0,children:[(0,c.jsxs)(`div`,{className:`mb-1 flex flex-wrap items-baseline gap-2`,children:[(0,c.jsx)(`span`,{className:`text-xs font-semibold uppercase tracking-widest ${t.id===`app`?`text-sky-400`:`text-slate-500`}`,children:t.label}),(0,c.jsx)(`span`,{className:`text-xs text-slate-500`,children:t.hint})]}),(0,c.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:i.map(e=>(0,c.jsx)(`button`,{type:`button`,className:`rounded-md px-3 py-1 font-mono text-sm transition-colors ${e.name===s.name?`bg-slate-700 text-white`:`text-slate-400 hover:bg-slate-800 hover:text-slate-200`}`,"aria-pressed":e.name===s.name,onClick:()=>r(e.name),children:e.name},e.name))})]},t.id)})}),(0,c.jsxs)(`div`,{className:`flex items-center justify-between gap-3 border-b border-slate-700 px-4 py-2`,children:[(0,c.jsx)(`span`,{className:`font-mono text-sm font-semibold text-slate-300`,children:s.name}),(0,c.jsx)(`button`,{type:`button`,className:`rounded-md border border-slate-600 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800`,onClick:async()=>{await M(s.source),a(!0),setTimeout(()=>a(!1),1500)},children:i?`Copied`:`Copy`})]}),(0,c.jsx)(`pre`,{className:`overflow-x-auto p-4 text-sm leading-relaxed`,children:(0,c.jsx)(`code`,{className:`hljs language-${s.lang??`typescript`}`,dangerouslySetInnerHTML:{__html:l}})})]}):null},P=({example:e})=>(0,c.jsxs)(`section`,{className:`rounded-xl border border-slate-300 bg-white p-4`,children:[(0,c.jsx)(`h2`,{className:`text-sm font-semibold uppercase tracking-widest text-slate-500`,children:`Component hierarchy`}),(0,c.jsx)(`div`,{className:`mt-3 space-y-3 font-mono text-sm`,children:(0,c.jsxs)(`div`,{className:`rounded-lg border-2 border-sky-300 bg-sky-50 p-3`,children:[(0,c.jsxs)(`div`,{className:`font-semibold text-sky-800`,children:[`Outer · `,e.host.framework]}),(0,c.jsx)(`div`,{className:`mt-1 text-xs text-slate-600`,children:e.host.note}),(0,c.jsxs)(`div`,{className:`mt-3 rounded-lg border border-dashed border-slate-400 p-3`,children:[(0,c.jsxs)(`div`,{className:`text-xs text-slate-500`,children:[`slot `,e.slot]}),(0,c.jsxs)(`div`,{className:`mt-2 rounded-lg border-2 border-violet-300 bg-violet-50 p-3`,children:[(0,c.jsxs)(`div`,{className:`font-semibold text-violet-800`,children:[`Nested · `,e.nested.framework]}),(0,c.jsx)(`div`,{className:`mt-1 text-xs text-slate-600`,children:e.nested.note})]})]})]})}),(0,c.jsxs)(`p`,{className:`mt-3 text-sm leading-relaxed text-slate-600`,children:[`Outer navigation → rules → nested app. A standard link click on the nested side is reported as POP and propagated back. When no rule matches, `,(0,c.jsx)(`code`,{children:`adapt`}),` `,`returns `,(0,c.jsx)(`code`,{children:`undefined`}),` and propagation stops — the nested `,(0,c.jsx)(`code`,{children:`/404`}),` `,`is the intentional asymmetry.`]})]}),F=`/history-adaptor-example/`,I=e=>`${F}${e.replace(/^\//,``)}`;(0,s.createRoot)(document.getElementById(`root`)).render((0,c.jsx)(()=>{let[e,t]=(0,o.useState)(`html5`),[n,r]=(0,o.useState)(`vanilla-react`),[i,a]=(0,o.useState)(480),s=(0,o.useRef)(null),l=m(n);return(0,o.useEffect)(()=>{let t=t=>{if(t.origin!==window.location.origin)return;let n=t.data;n?.type===`history-adaptor-example:address`&&typeof n.address==`string`&&window.history.replaceState(null,``,e===`hash`?`#${n.address}`:I(n.address))};return window.addEventListener(`message`,t),()=>window.removeEventListener(`message`,t)},[e]),(0,o.useEffect)(()=>{window.history.replaceState(null,``,F)},[l.id,e]),(0,o.useEffect)(()=>{let e=s.current;if(!e)return;let t,n=()=>{let t=e.contentDocument?.body;t&&a(Math.max(260,t.scrollHeight))},r=()=>{let r=e.contentDocument;r?.body&&(n(),t?.disconnect(),t=new ResizeObserver(n),t.observe(r.body))};return e.addEventListener(`load`,r),e.contentDocument?.readyState===`complete`&&r(),()=>{e.removeEventListener(`load`,r),t?.disconnect()}},[l.id,e]),(0,c.jsx)(`div`,{className:`min-h-screen bg-slate-100 p-6 text-base text-slate-900`,children:(0,c.jsxs)(`div`,{className:`mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row`,children:[(0,c.jsx)(`aside`,{className:`lg:w-80 lg:shrink-0`,children:(0,c.jsxs)(`div`,{className:`space-y-6 lg:sticky lg:top-6`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h1`,{className:`text-2xl font-bold`,children:`history-adaptor examples`}),(0,c.jsx)(`p`,{className:`mt-2 text-base leading-relaxed text-slate-600`,children:`Each example is a real app running in an iframe. The outer app owns the browser URL; the nested app is a framework app with its own memory router. Only the rules change between stacks.`})]}),(0,c.jsx)(f,{value:e,onChange:t}),(0,c.jsx)(v,{value:l.id,onChange:r})]})}),(0,c.jsxs)(`main`,{className:`min-w-0 flex-1 space-y-6`,children:[(0,c.jsx)(`p`,{className:`text-base text-slate-600`,children:l.description}),(0,c.jsx)(P,{example:l}),(0,c.jsxs)(`section`,{className:`overflow-hidden rounded-2xl border-4 border-amber-400 bg-white shadow-lg`,children:[(0,c.jsxs)(`div`,{className:`space-y-1 border-b-2 border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900`,children:[(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,c.jsx)(`span`,{className:`rounded bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-white`,children:`iframe`}),(0,c.jsx)(`span`,{className:`font-semibold`,children:`A real app running inside an iframe`})]}),(0,c.jsx)(`p`,{className:`text-amber-800`,children:`This iframe simulates a real browser app. Because this is a example, the shell's browser address bar mirrors the iframe's address. Use the address bar inside the frame to navigate.`})]}),(0,c.jsx)(`iframe`,{ref:s,title:`${l.title} (${e})`,src:`${I(l.entry)}?mode=${e}&sandbox`,style:{height:i},className:`w-full border-0`},`${l.id}:${e}`)]}),(0,c.jsx)(N,{files:l.files},l.id)]})]})})},{}));
import angularSolidApp from '../examples/angular-solid/App.ts?raw';
import angularSolidContent from '../examples/angular-solid/Content.ts?raw';
import angularSolidCreateApp from '../examples/angular-solid/create-app.ts?raw';
import angularSolidHashMode from '../examples/angular-solid/HashMode.ts?raw';
import angularSolidIndex from '../examples/angular-solid/index.html?raw';
import angularSolidLayout from '../examples/angular-solid/Layout.ts?raw';
import angularSolidContentPage from '../examples/angular-solid/NestedContent.solid.tsx?raw';
import angularSolidRoutes from '../examples/angular-solid/NestedRoutes.ts?raw';
import angularSolidNestedApp from '../examples/angular-solid/NestedSolidApp.solid.tsx?raw';
import angularSolidNestedLayout from '../examples/angular-solid/NestedSolidLayout.solid.tsx?raw';
import angularSolidRoutesFile from '../examples/angular-solid/routes.ts?raw';
import angularSolidRules from '../examples/angular-solid/rules.ts?raw';
import angularSolidSandbox from '../examples/angular-solid/sandbox.ts?raw';
import reactVueApp from '../examples/react-vue/App.tsx?raw';
import reactVueContent from '../examples/react-vue/Content.tsx?raw';
import reactVueCreateApp from '../examples/react-vue/create-app.tsx?raw';
import reactVueIndex from '../examples/react-vue/index.html?raw';
import reactVueLayout from '../examples/react-vue/Layout.tsx?raw';
import reactVueNestedContent from '../examples/react-vue/NestedContent.vue?raw';
import reactVueNestedRoutes from '../examples/react-vue/NestedRoutes.ts?raw';
import reactVueNestedApp from '../examples/react-vue/NestedVueApp.vue?raw';
import reactVueRoutes from '../examples/react-vue/routes.tsx?raw';
import reactVueRules from '../examples/react-vue/rules.ts?raw';
import reactVueSandbox from '../examples/react-vue/sandbox.ts?raw';
import solidReactApp from '../examples/solid-react/App.solid.tsx?raw';
import solidReactHistory from '../examples/solid-react/browser-history.ts?raw';
import solidReactContent from '../examples/solid-react/Content.solid.tsx?raw';
import solidReactCreateApp from '../examples/solid-react/create-app.tsx?raw';
import solidReactIndex from '../examples/solid-react/index.html?raw';
import solidReactLayout from '../examples/solid-react/Layout.solid.tsx?raw';
import solidReactMode from '../examples/solid-react/ModeContext.ts?raw';
import solidReactNestedContent from '../examples/solid-react/NestedContent.tsx?raw';
import solidReactNestedRoutes from '../examples/solid-react/NestedRoutes.tsx?raw';
import solidReactNestedApp from '../examples/solid-react/NestedReactApp.tsx?raw';
import solidReactRoutes from '../examples/solid-react/routes.tsx?raw';
import solidReactRules from '../examples/solid-react/rules.ts?raw';
import solidReactSandbox from '../examples/solid-react/sandbox.ts?raw';
import vanillaReactApp from '../examples/vanilla-react/App.ts?raw';
import vanillaReactShell from '../examples/vanilla-react/App.html?raw';
import vanillaReactCreateApp from '../examples/vanilla-react/create-app.tsx?raw';
import vanillaReactIndex from '../examples/vanilla-react/index.html?raw';
import vanillaReactNestedContent from '../examples/vanilla-react/NestedContent.tsx?raw';
import vanillaReactNestedRoutes from '../examples/vanilla-react/NestedRoutes.tsx?raw';
import vanillaReactNestedApp from '../examples/vanilla-react/NestedReactApp.tsx?raw';
import vanillaReactRules from '../examples/vanilla-react/rules.ts?raw';
import vanillaReactSandbox from '../examples/vanilla-react/sandbox.ts?raw';
import vueAngularApp from '../examples/vue-angular/App.vue?raw';
import vueAngularContent from '../examples/vue-angular/Content.vue?raw';
import vueAngularCreateApp from '../examples/vue-angular/create-app.ts?raw';
import vueAngularIndex from '../examples/vue-angular/index.html?raw';
import vueAngularLayout from '../examples/vue-angular/Layout.vue?raw';
import vueAngularNestedContent from '../examples/vue-angular/NestedContent.ts?raw';
import vueAngularNestedRoutes from '../examples/vue-angular/NestedRoutes.ts?raw';
import vueAngularNestedApp from '../examples/vue-angular/NestedAngularApp.ts?raw';
import vueAngularLocation from '../examples/vue-angular/MemoryLocationStrategy.ts?raw';
import vueAngularRoutes from '../examples/vue-angular/routes.ts?raw';
import vueAngularRules from '../examples/vue-angular/rules.ts?raw';
import vueAngularSandbox from '../examples/vue-angular/sandbox.ts?raw';

export type ExampleFile = {
    name: string;
    source: string;
    lang?: 'typescript' | 'xml';
    /** `app` is code a user would copy; `example` only exists for this sandbox. */
    group: 'app' | 'example';
};

export type Example = {
    id: string;
    title: string;
    description: string;
    /** Vite-served entry for the iframe. */
    entry: string;
    host: {framework: string; note: string};
    nested: {framework: string; note: string};
    /** Human-readable root the nested app mounts into. */
    slot: string;
    files: ExampleFile[];
};

export const examples: Example[] = [
    {
        id: 'vanilla-react',
        title: 'Vanilla host ↔ nested React',
        description:
            'A plain-JS host (ES modules, <template>, a custom element) owns the browser URL and imports a React app, which keeps its routes in a memory router.',
        entry: '/examples/vanilla-react/index.html',
        host: {
            framework: 'Vanilla + Web Component',
            note: 'App is a native custom element; links are plain <a> elements',
        },
        nested: {
            framework: 'React',
            note: 'NestedReactApp + createMemoryRouter, mounted into #react-root',
        },
        slot: 'App → #react-root',
        files: [
            {name: 'index.html', source: vanillaReactIndex, lang: 'xml', group: 'example'},
            {name: 'sandbox.ts', source: vanillaReactSandbox, group: 'example'},
            {name: 'App.ts', source: vanillaReactApp, group: 'app'},
            {name: 'App.html', source: vanillaReactShell, lang: 'xml', group: 'app'},
            {name: 'create-app.tsx', source: vanillaReactCreateApp, group: 'app'},
            {name: 'NestedReactApp.tsx', source: vanillaReactNestedApp, group: 'app'},
            {name: 'NestedContent.tsx', source: vanillaReactNestedContent, group: 'app'},
            {name: 'NestedRoutes.tsx', source: vanillaReactNestedRoutes, group: 'app'},
            {name: 'rules.ts', source: vanillaReactRules, group: 'app'},
        ],
    },
    {
        id: 'react-vue',
        title: 'React SPA ↔ nested Vue',
        description:
            'A standard React SPA (React Router, <Route>, <Link>) owns the browser URL and bootstraps a Vue app by hand, which keeps its routes in a memory router.',
        entry: '/examples/react-vue/index.html',
        host: {
            framework: 'React SPA',
            note: 'App renders the host router; Layout holds the nav and <Outlet>',
        },
        nested: {
            framework: 'Vue',
            note: 'NestedVueApp.vue + createMemoryHistory + createRouter, mounted into #vue-root',
        },
        slot: 'App → #vue-root',
        files: [
            {name: 'index.html', source: reactVueIndex, lang: 'xml', group: 'example'},
            {name: 'sandbox.ts', source: reactVueSandbox, group: 'example'},
            {name: 'App.tsx', source: reactVueApp, group: 'app'},
            {name: 'Layout.tsx', source: reactVueLayout, group: 'app'},
            {name: 'Content.tsx', source: reactVueContent, group: 'app'},
            {name: 'routes.tsx', source: reactVueRoutes, group: 'app'},
            {name: 'create-app.tsx', source: reactVueCreateApp, group: 'app'},
            {name: 'NestedVueApp.vue', source: reactVueNestedApp, lang: 'xml', group: 'app'},
            {name: 'NestedContent.vue', source: reactVueNestedContent, lang: 'xml', group: 'app'},
            {name: 'NestedRoutes.ts', source: reactVueNestedRoutes, group: 'app'},
            {name: 'rules.ts', source: reactVueRules, group: 'app'},
        ],
    },
    {
        id: 'solid-react',
        title: 'Solid SPA ↔ nested React',
        description:
            'A Solid SPA (Solid Router) owns the browser URL by backing its memory history with the real one, then mounts a React memory router inside.',
        entry: '/examples/solid-react/index.html',
        host: {
            framework: 'Solid SPA',
            note: 'App renders the host router; Layout holds the nav',
        },
        nested: {
            framework: 'React',
            note: 'NestedReactApp + createMemoryRouter, mounted into #react-root',
        },
        slot: 'App → #react-root',
        files: [
            {name: 'index.html', source: solidReactIndex, lang: 'xml', group: 'example'},
            {name: 'sandbox.ts', source: solidReactSandbox, group: 'example'},
            {name: 'App.solid.tsx', source: solidReactApp, group: 'app'},
            {name: 'Layout.solid.tsx', source: solidReactLayout, group: 'app'},
            {name: 'Content.solid.tsx', source: solidReactContent, group: 'app'},
            {name: 'routes.tsx', source: solidReactRoutes, group: 'app'},
            {name: 'create-app.tsx', source: solidReactCreateApp, group: 'app'},
            {name: 'ModeContext.ts', source: solidReactMode, group: 'app'},
            {name: 'browser-history.ts', source: solidReactHistory, group: 'app'},
            {name: 'NestedReactApp.tsx', source: solidReactNestedApp, group: 'app'},
            {name: 'NestedContent.tsx', source: solidReactNestedContent, group: 'app'},
            {name: 'NestedRoutes.tsx', source: solidReactNestedRoutes, group: 'app'},
            {name: 'rules.ts', source: solidReactRules, group: 'app'},
        ],
    },
    {
        id: 'vue-angular',
        title: 'Vue SPA ↔ nested Angular',
        description:
            'A Vue SPA (Vue Router, <router-link>) owns the browser URL and bootstraps Angular by hand. Angular keeps its routes in memory through a custom LocationStrategy.',
        entry: '/examples/vue-angular/index.html',
        host: {
            framework: 'Vue SPA',
            note: 'App renders the router; Layout holds the nav and <RouterView>',
        },
        nested: {
            framework: 'Angular',
            note: 'NestedAngularApp + in-memory LocationStrategy, mounted into #angular-root',
        },
        slot: 'App → #angular-root',
        files: [
            {name: 'index.html', source: vueAngularIndex, lang: 'xml', group: 'example'},
            {name: 'sandbox.ts', source: vueAngularSandbox, group: 'example'},
            {name: 'App.vue', source: vueAngularApp, lang: 'xml', group: 'app'},
            {name: 'Layout.vue', source: vueAngularLayout, lang: 'xml', group: 'app'},
            {name: 'Content.vue', source: vueAngularContent, lang: 'xml', group: 'app'},
            {name: 'routes.ts', source: vueAngularRoutes, group: 'app'},
            {name: 'create-app.ts', source: vueAngularCreateApp, group: 'app'},
            {
                name: 'NestedAngularApp.ts',
                source: vueAngularNestedApp,
                group: 'app',
            },
            {name: 'NestedContent.ts', source: vueAngularNestedContent, group: 'app'},
            {name: 'NestedRoutes.ts', source: vueAngularNestedRoutes, group: 'app'},
            {
                name: 'MemoryLocationStrategy.ts',
                source: vueAngularLocation,
                group: 'app',
            },
            {name: 'rules.ts', source: vueAngularRules, group: 'app'},
        ],
    },
    {
        id: 'angular-solid',
        title: 'Angular SPA ↔ nested Solid',
        description:
            'A standard Angular SPA (RouterLink, <router-outlet>) owns the browser URL, then a Solid memory router is mounted inside it.',
        entry: '/examples/angular-solid/index.html',
        host: {
            framework: 'Angular SPA',
            note: 'App renders the router; Layout holds the nav and <router-outlet>',
        },
        nested: {
            framework: 'Solid',
            note: 'NestedSolidApp + createMemoryHistory, mounted into #solid-root',
        },
        slot: 'App → #solid-root',
        files: [
            {name: 'index.html', source: angularSolidIndex, lang: 'xml', group: 'example'},
            {name: 'sandbox.ts', source: angularSolidSandbox, group: 'example'},
            {name: 'App.ts', source: angularSolidApp, group: 'app'},
            {name: 'Layout.ts', source: angularSolidLayout, group: 'app'},
            {name: 'Content.ts', source: angularSolidContent, group: 'app'},
            {name: 'routes.ts', source: angularSolidRoutesFile, group: 'app'},
            {name: 'create-app.ts', source: angularSolidCreateApp, group: 'app'},
            {name: 'HashMode.ts', source: angularSolidHashMode, group: 'app'},
            {name: 'NestedSolidApp.solid.tsx', source: angularSolidNestedApp, group: 'app'},
            {
                name: 'NestedSolidLayout.solid.tsx',
                source: angularSolidNestedLayout,
                group: 'app',
            },
            {name: 'NestedContent.solid.tsx', source: angularSolidContentPage, group: 'app'},
            {name: 'NestedRoutes.ts', source: angularSolidRoutes, group: 'app'},
            {name: 'rules.ts', source: angularSolidRules, group: 'app'},
        ],
    },
];

export const findExample = (id: string): Example =>
    examples.find((example) => example.id === id) ?? examples[0];

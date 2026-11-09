/** @jsxImportSource solid-js */
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

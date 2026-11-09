import {connect, type HistoryLike} from 'history-adaptor';
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

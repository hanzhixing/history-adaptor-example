import {connect, type HistoryLike} from 'history-adaptor';
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

import {connect, type HistoryLike} from 'history-adaptor';
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

import {connect, type HistoryLike} from 'history-adaptor';
import {fromReactRouter} from 'history-adaptor/helper';
import {createMemoryRouter} from 'react-router';

import {embeddedToHost, hostToEmbedded} from './mapping.ts';
import {embeddedPaths, embeddedRoutes} from './routes.tsx';

export const createBridge = (hostHistory: HistoryLike) => {
    const embeddedRouter = createMemoryRouter(embeddedRoutes, {
        initialEntries: [embeddedPaths.home],
    });
    const embeddedHistory = fromReactRouter(embeddedRouter);

    const [host, embedded] = connect([
        {
            key: 'host',
            history: hostHistory,
            adaptors: [{target: 'embedded', adapt: hostToEmbedded}],
        },
        {
            key: 'embedded',
            history: embeddedHistory,
            adaptors: [{target: 'host', adapt: embeddedToHost}],
        },
    ]);

    return {
        host,
        embedded,
        embeddedRouter,
        dispose: () => {
            host.dispose?.();
            embedded.dispose?.();
            embeddedRouter.dispose();
        },
    };
};

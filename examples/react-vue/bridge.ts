import {connect, type HistoryLike} from 'history-adaptor';
import {fromVueRouter} from 'history-adaptor/helper';
import {createMemoryHistory, createRouter} from 'vue-router';

import {embeddedToHost, hostToEmbedded} from './mapping.ts';
import {embeddedPaths, embeddedRoutes} from './routes.tsx';

export const createBridge = (hostHistory: HistoryLike) => {
    const routingHistory = createMemoryHistory();
    routingHistory.replace(embeddedPaths.home);
    const embeddedRouter = createRouter({history: routingHistory, routes: embeddedRoutes});
    const embeddedHistory = fromVueRouter(embeddedRouter);

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
        },
    };
};

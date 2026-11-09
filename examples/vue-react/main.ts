import {connect} from 'history-adaptor';
import {fromReactRouter} from 'history-adaptor/helper';
import {createMemoryRouter} from 'react-router';
import type {Router as VueRouter} from 'vue-router';

import {createReactEmbedded} from '../../apps/reactEmbedded.tsx';
import {createVueHost} from '../../apps/vueHost.ts';
import type {HostVariant} from '../../types.ts';
import {embeddedToHost, hostToEmbedded} from './mapping.ts';
import {embeddedLinks, embeddedPaths, embeddedRoutes, hostLinks} from './routes.tsx';

export const mount = (container: HTMLElement, host: HostVariant) => {
    // Embedded app: a React memory router.
    const embeddedRouter = createMemoryRouter(embeddedRoutes, {
        initialEntries: [embeddedPaths.home],
    });
    const embeddedHistory = fromReactRouter(embeddedRouter);

    const hostSetup = host.createHost();

    const [hostHistory, embeddedHistoryProxy] = connect([
        {
            key: 'host',
            history: hostSetup.history,
            adaptors: [{target: 'embedded', adapt: hostToEmbedded}],
        },
        {
            key: 'embedded',
            history: embeddedHistory,
            adaptors: [{target: 'host', adapt: embeddedToHost}],
        },
    ]);

    // Render the Vue host app and mount the React app inside it.
    const hostApp = createVueHost({
        router: hostSetup.router as VueRouter,
        history: hostHistory,
        links: hostLinks,
    });
    const embeddedApp = createReactEmbedded({
        slot: hostApp.slot,
        router: embeddedRouter,
        history: embeddedHistoryProxy,
        links: embeddedLinks,
    });

    container.append(hostApp.element);

    return {
        dispose: () => {
            embeddedApp.dispose();
            hostApp.dispose();
            hostHistory.dispose?.();
            embeddedHistoryProxy.dispose?.();
            embeddedRouter.dispose();
            hostApp.element.remove();
        },
    };
};

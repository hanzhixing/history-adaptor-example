import {connect} from 'history-adaptor';
import {fromVueRouter} from 'history-adaptor/helper';
import {createMemoryHistory, createRouter} from 'vue-router';

import {createVanillaHost} from '../../apps/vanillaHost.ts';
import {createVueEmbedded} from '../../apps/vueEmbedded.ts';
import type {HostVariant} from '../../types.ts';
import {embeddedToHost, hostToEmbedded} from './mapping.ts';
import {embeddedLinks, embeddedPaths, embeddedRoutes, hostLinks} from './routes.tsx';

export const mount = (container: HTMLElement, host: HostVariant) => {
    // Embedded app: a Vue memory router.
    const routingHistory = createMemoryHistory();
    routingHistory.replace(embeddedPaths.home);
    const embeddedRouter = createRouter({history: routingHistory, routes: embeddedRoutes});
    const embeddedHistory = fromVueRouter(embeddedRouter);

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

    const hostApp = createVanillaHost({
        history: hostHistory,
        links: hostLinks,
        formatAddress: host.formatAddress,
    });
    const embeddedApp = createVueEmbedded({
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
            hostApp.element.remove();
        },
    };
};

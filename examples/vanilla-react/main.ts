import {connect} from 'history-adaptor';
import {fromReactRouter} from 'history-adaptor/helper';
import {createMemoryRouter} from 'react-router';

import {createReactEmbedded} from '../../apps/reactEmbedded.tsx';
import {createVanillaHost} from '../../apps/vanillaHost.ts';
import type {HostVariant} from '../../types.ts';
import {embeddedToHost, hostToEmbedded} from './mapping.ts';
import {embeddedLinks, embeddedPaths, embeddedRoutes, hostLinks} from './routes.tsx';

export const mount = (container: HTMLElement, host: HostVariant) => {
    // Embedded app: a React memory router.
    const embeddedRouter = createMemoryRouter(embeddedRoutes, {
        initialEntries: [embeddedPaths.home],
    });
    const embeddedHistory = fromReactRouter(embeddedRouter);

    // The host is plain JS: it only needs the browser history.
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

    // Render the vanilla host app and mount the React app inside it.
    const hostApp = createVanillaHost({
        history: hostHistory,
        links: hostLinks,
        formatAddress: host.formatAddress,
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

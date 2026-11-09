import {RouterProvider} from 'react-router';

import {PageNav} from '../../components/PageNav.tsx';
import {RouterInput} from '../../components/RouterInput.tsx';
import {useAddress} from '../../components/useAddress.ts';
import {useBuilt} from '../../components/useBuilt.ts';
import type {ExampleProps} from '../../types.ts';
import {createBridge} from './bridge.ts';
import {embeddedLinks, hostLinks} from './routes.tsx';

export const ReactReactExample = ({createHost}: ExampleProps) => {
    const app = useBuilt(() => {
        const host = createHost();
        const bridge = createBridge(host.history);
        return {
            ...bridge,
            hostApp: host,
            dispose: () => {
                bridge.dispose();
                host.dispose?.();
            },
        };
    });
    const hostAddress = useAddress(app.host);
    const embeddedAddress = useAddress(app.embedded);

    return (
        <div data-host className="space-y-4">
            {/* Host app: React SPA, owns the real browser URL. */}
            <PageNav history={app.host} links={hostLinks} />
            {app.hostApp.view}
            <RouterInput value={hostAddress} onNavigate={(next) => app.host.push(next)} />

            {/* Embedded app: a second React memory router, mounted inside the host. */}
            <div data-embedded className="space-y-4 rounded-xl border-2 border-dashed border-slate-300 p-4">
                <PageNav history={app.embedded} links={embeddedLinks} />
                <RouterProvider router={app.embeddedRouter} />
                <RouterInput
                    value={embeddedAddress}
                    onNavigate={(next) => void app.embeddedRouter.navigate(next)}
                />
            </div>
        </div>
    );
};

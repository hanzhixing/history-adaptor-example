import {useEffect, useRef} from 'react';

import {createVueEmbedded} from '../../apps/vueEmbedded.ts';
import {PageNav} from '../../components/PageNav.tsx';
import {RouterInput} from '../../components/RouterInput.tsx';
import {useAddress} from '../../components/useAddress.ts';
import {useBuilt} from '../../components/useBuilt.ts';
import type {ExampleProps} from '../../types.ts';
import {createBridge} from './bridge.ts';
import {embeddedLinks, hostLinks} from './routes.tsx';

export const ReactVueExample = ({createHost}: ExampleProps) => {
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
    const embeddedSlot = useRef<HTMLDivElement>(null);

    // The host is React; the embedded app is a real Vue app mounted into its slot.
    useEffect(() => {
        const slot = embeddedSlot.current;
        if (!slot) {
            return;
        }
        const embedded = createVueEmbedded({
            slot,
            router: app.embeddedRouter,
            history: app.embedded,
            links: embeddedLinks,
        });
        return () => embedded.dispose();
    }, [app]);

    return (
        <div className="space-y-4" data-host>
            {/* Host app: React SPA, owns the real browser URL. */}
            <PageNav history={app.host} links={hostLinks} />
            {app.hostApp.view}
            <RouterInput value={hostAddress} onNavigate={(next) => app.host.push(next)} />

            {/* Embedded app: a real Vue memory-router app mounted in the host. */}
            <div
                ref={embeddedSlot}
                data-embedded
                className="space-y-4 rounded-xl border-2 border-dashed border-slate-300 p-4"
            />
        </div>
    );
};

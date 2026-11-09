import type {HistoryLike} from 'history-adaptor';
import {createRoot} from 'react-dom/client';
import {RouterProvider, type DataRouter} from 'react-router';

import {PageNav} from '../components/PageNav.tsx';
import {RouterInput} from '../components/RouterInput.tsx';
import {useAddress} from '../components/useAddress.ts';

type Link = {
    label: string;
    to: string;
};

const Embedded = ({
    router,
    history,
    links,
}: {
    router: DataRouter;
    history: HistoryLike;
    links: Link[];
}) => {
    const address = useAddress(history);
    return (
        <div className="space-y-4">
            <PageNav history={history} links={links} />
            <RouterProvider router={router} />
            <RouterInput value={address} onNavigate={(next) => void router.navigate(next)} />
        </div>
    );
};

/** A React memory-router app mounted into a slot of the host. */
export const createReactEmbedded = (options: {
    slot: HTMLElement;
    router: DataRouter;
    history: HistoryLike;
    links: Link[];
}) => {
    const root = createRoot(options.slot);
    root.render(
        <Embedded router={options.router} history={options.history} links={options.links} />,
    );
    return {dispose: () => root.unmount()};
};

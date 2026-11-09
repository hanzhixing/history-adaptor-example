import type {ReactNode} from 'react';

import type {HistoryLike} from 'history-adaptor';

export type BrowserMode = 'html5' | 'hash';

/** What a host setup file returns. `router`/`view` are used by the concrete framework. */
export type HostSetup = {
    history: HistoryLike;
    view?: ReactNode;
    router?: unknown;
    dispose?: () => void;
};

/** Provided by the demo shell (it knows the selected browser mode). */
export type HostVariant = {
    createHost: () => HostSetup;
    formatAddress?: (address: string) => string;
};

export type ExampleProps = {
    createHost: () => HostSetup;
    formatAddress?: (address: string) => string;
};

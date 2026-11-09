import {useSyncExternalStore} from 'react';

import type {HistoryLike} from 'history-adaptor';

import {toAddress} from './address.ts';

/** Subscribe to one side's current address and re-render on change. */
export const useAddress = (history: HistoryLike): string =>
    useSyncExternalStore(
        (callback) => history.listen(() => callback()),
        () => toAddress(history.location),
    );

import {fromBrowserNative} from 'history-adaptor/helper';

import {toAddress} from '../../src/lib/address.ts';
import type {BrowserMode} from '../../src/types.ts';

export type BrowserMemoryHistory = {
    get: () => string;
    set: (change: {value: string; replace?: boolean; scroll?: unknown}) => void;
    go: (delta: number) => void;
    listen: (listener: (value: string) => void) => () => void;
    dispose: () => void;
};

/**
 * Solid Router only ships a memory history publicly, so back it with the real
 * browser history. `<MemoryRouter history={...}>` then drives the URL bar, and
 * `fromSolidRouter(history)` can adapt the same object for `connect`.
 */
export const createBrowserMemoryHistory = (mode: BrowserMode): BrowserMemoryHistory => {
    const native = fromBrowserNative({hash: mode === 'hash'});

    return {
        get: () => toAddress(native.location),
        set: ({value, replace}) => {
            if (replace) {
                native.replace(value);
            } else {
                native.push(value);
            }
        },
        go: (delta) => native.go(delta),
        listen: (listener) => native.listen(() => listener(toAddress(native.location))),
        dispose: () => native.dispose?.(),
    };
};

import type {HistoryLike} from 'history-adaptor';

import type {BrowserMode} from '../types.ts';
import {toAddress} from './address.ts';

export const ADDRESS_CHANNEL = 'history-adaptor-example:address';

/**
 * Example sandbox: report the host app's real address to the shell so the browser
 * address bar can follow the iframe. No-op outside an iframe (e.g. jsdom tests).
 */
export const reportAddressToParent = (history: HistoryLike): (() => void) => {
    if (typeof window === 'undefined' || !window.parent || window.parent === window) {
        return () => {};
    }

    const report = (): void => {
        window.parent.postMessage(
            {type: ADDRESS_CHANNEL, address: toAddress(history.location)},
            window.location.origin,
        );
    };

    report();
    return history.listen(report);
};

/**
 * Example sandbox: a browser-address-bar lookalike inside the iframe. Typing an
 * address and pressing Enter navigates the host app (and therefore the nested
 * app, through `connect`). In hash mode the value is prefixed with `#`.
 */
export const installAddressBar = (
    history: HistoryLike,
    mode: BrowserMode,
): (() => void) => {
    const format = (address: string): string => (mode === 'hash' ? `/#${address}` : address);

    const form = document.createElement('form');
    form.className =
        'sticky top-0 z-10 mb-4 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm';
    form.setAttribute('aria-label', 'Simulated browser address bar');

    const dot = document.createElement('span');
    dot.className = 'h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500';
    dot.setAttribute('aria-hidden', 'true');

    const input = document.createElement('input');
    input.className =
        'min-w-0 flex-1 bg-transparent font-mono text-base text-slate-800 outline-none';
    input.value = format(toAddress(history.location));
    input.setAttribute('aria-label', 'Address');
    input.spellcheck = false;

    const hint = document.createElement('span');
    hint.className = 'shrink-0 text-xs uppercase tracking-widest text-slate-400';
    hint.textContent = 'Enter to go';

    form.append(dot, input, hint);
    document.body.prepend(form);

    const unlisten = history.listen(() => {
        input.value = format(toAddress(history.location));
    });

    const onSubmit = (event: Event): void => {
        event.preventDefault();
        let next = input.value.trim();
        if (!next) {
            return;
        }
        // Accept `/#/path`, `#/path`, or the plain logical path.
        if (next.startsWith('/#')) {
            next = next.slice(1);
        }
        if (next.startsWith('#')) {
            next = next.slice(1);
        }
        if (next) {
            history.push(next);
        }
    };
    form.addEventListener('submit', onSubmit);

    return () => {
        form.removeEventListener('submit', onSubmit);
        unlisten();
        form.remove();
    };
};

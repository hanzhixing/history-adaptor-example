/** @jsxImportSource solid-js */
import {useLocation} from '@solidjs/router';
import {type Component, useContext} from 'solid-js';

import {toAddress} from '../../src/lib/address.ts';
import {ModeContext} from './ModeContext.ts';

/** The outer app's routed page. */
export const Content: Component = () => {
    const location = useLocation();
    const mode = useContext(ModeContext);

    return (
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                <span class="break-all font-mono text-slate-700">{toAddress(location)}</span>
            </p>
        </div>
    );
};

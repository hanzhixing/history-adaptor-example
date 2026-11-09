import {useLocation} from 'react-router';

import {toAddress} from '../../src/lib/address.ts';
import type {BrowserMode} from '../../src/types.ts';

/** The outer app's routed page. */
export const Content = ({mode}: {mode: BrowserMode}) => {
    const location = useLocation();
    return (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p className="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <span className="break-all font-mono text-slate-700">
                    {toAddress(location)}
                </span>
            </p>
        </div>
    );
};

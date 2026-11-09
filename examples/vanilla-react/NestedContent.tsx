import {useLocation} from 'react-router';

import {toAddress} from '../../src/lib/address.ts';

/** The nested app's routed page. */
export const NestedContent = () => {
    const location = useLocation();
    return (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p className="text-2xl font-bold text-slate-900">
                Now we are on page{' '}
                <span className="break-all font-mono text-slate-700">
                    {toAddress(location)}
                </span>
            </p>
        </div>
    );
};

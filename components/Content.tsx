/** The content that appears after a route switch on one side. */
export const Content = ({address}: {address: string}) => (
    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Content Component
        </div>
        <p className="text-xl font-semibold text-slate-800">
            Now we are on page <span className="break-all font-mono text-sky-700">{address}</span>
        </p>
    </div>
);

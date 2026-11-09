import type {Example} from '../registry.ts';

export const StructureDiagram = ({example}: {example: Example}) => (
    <section className="rounded-xl border border-slate-300 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Component hierarchy
        </h2>

        <div className="mt-3 space-y-3 font-mono text-sm">
            <div className="rounded-lg border-2 border-sky-300 bg-sky-50 p-3">
                <div className="font-semibold text-sky-800">
                    Outer · {example.host.framework}
                </div>
                <div className="mt-1 text-xs text-slate-600">{example.host.note}</div>

                <div className="mt-3 rounded-lg border border-dashed border-slate-400 p-3">
                    <div className="text-xs text-slate-500">slot {example.slot}</div>

                    <div className="mt-2 rounded-lg border-2 border-violet-300 bg-violet-50 p-3">
                        <div className="font-semibold text-violet-800">
                            Nested · {example.nested.framework}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                            {example.nested.note}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Outer navigation → rules → nested app. A standard link click on the nested side is
            reported as POP and propagated back. When no rule matches, <code>adapt</code>{' '}
            returns <code>undefined</code> and propagation stops — the nested <code>/404</code>{' '}
            is the intentional asymmetry.
        </p>
    </section>
);

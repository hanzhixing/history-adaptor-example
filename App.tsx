import {useEffect, useRef, useState} from 'react';

import {BrowserModeSwitch} from './components/BrowserModeSwitch.tsx';
import {CodeExample} from './components/CodeExample.tsx';
import {ScenarioNav} from './components/ScenarioNav.tsx';
import {resetBrowser} from './demoReset.ts';
import {examples, type MountExample} from './registry.ts';
import type {BrowserMode, HostVariant} from './types.ts';

/** Demo shell: mounts an app that is written in vanilla JS or Vue. */
const Mounted = ({example, host}: {example: MountExample; host: HostVariant}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) {
            return;
        }
        const app = example.mount(container, host);
        return () => app.dispose();
    }, [example, host]);

    return <div ref={ref} />;
};

export const App = () => {
    const [mode, setMode] = useState<BrowserMode>('html5');
    const [exampleId, setExampleId] = useState(examples[0].id);
    const example = examples.find((item) => item.id === exampleId) ?? examples[0];
    const host = mode === 'hash' ? example.hash : example.html5;
    const selection = `${example.id}:${mode}`;

    // Demo-only: give each example a clean starting URL. Real app code does not
    // do this — the browser mode is decided once when the app is deployed.
    const lastReset = useRef('');
    if (lastReset.current !== selection) {
        lastReset.current = selection;
        resetBrowser(mode, example.hostHome);
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6 text-base text-slate-900">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
                <aside className="lg:w-80 lg:shrink-0">
                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div>
                            <h1 className="text-2xl font-bold">history-adaptor demo</h1>
                            <p className="mt-2 text-base leading-relaxed text-slate-600">
                                A <strong>host</strong> app owns the real browser URL (HTML5 or hash),
                                while an <strong>embedded</strong> app keeps its own routes in
                                memory. Pick an example, then navigate either side — the adaptor
                                maps every address into the other side&apos;s own form.
                            </p>
                        </div>

                        <BrowserModeSwitch value={mode} onChange={setMode} />
                        <ScenarioNav value={example.id} onChange={setExampleId} />
                    </div>
                </aside>

                <main className="min-w-0 flex-1 space-y-6">
                    <p className="text-base text-slate-600">{example.description}</p>
                    <div className="rounded-2xl border-4 border-slate-300 bg-white p-4 shadow-lg">
                        {example.kind === 'component' ? (
                            <example.Component
                                key={selection}
                                createHost={host.createHost}
                                formatAddress={host.formatAddress}
                            />
                        ) : (
                            <Mounted key={selection} example={example} host={host} />
                        )}
                    </div>
                    {example.files.map((file) => (
                        <CodeExample key={file.name} title={file.name} code={file.source} />
                    ))}
                </main>
            </div>
        </div>
    );
};

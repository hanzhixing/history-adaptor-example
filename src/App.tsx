import {useEffect, useRef, useState} from 'react';

import {ModeSwitch} from './components/ModeSwitch.tsx';
import {ScenarioNav} from './components/ScenarioNav.tsx';
import {SourceTabs} from './components/SourceTabs.tsx';
import {StructureDiagram} from './components/StructureDiagram.tsx';
import {ADDRESS_CHANNEL} from './lib/frame.ts';
import {findExample} from './registry.ts';
import type {BrowserMode} from './types.ts';

/**
 * Vite's base, e.g. `/` in dev and `/<repo>/` on GitHub Pages. The shell mirrors
 * the iframe's logical address into the real URL, so it has to stay under the
 * deployed base path.
 */
const BASE = import.meta.env.BASE_URL;
const withBase = (path: string): string => `${BASE}${path.replace(/^\//, '')}`;

/**
 * Example shell. It only owns chrome; every example is a real app running in its
 * own iframe with its own browser history.
 *
 * The iframe reports its host address after every navigation, so the real
 * browser address bar follows the app exactly as it would without an iframe.
 */
export const App = () => {
    const [mode, setMode] = useState<BrowserMode>('html5');
    const [exampleId, setExampleId] = useState('vanilla-react');
    const [frameHeight, setFrameHeight] = useState(480);
    const frameRef = useRef<HTMLIFrameElement>(null);
    const example = findExample(exampleId);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) {
                return;
            }

            const data = event.data as {type?: string; address?: string} | null;
            if (data?.type !== ADDRESS_CHANNEL || typeof data.address !== 'string') {
                return;
            }

            window.history.replaceState(
                null,
                '',
                mode === 'hash' ? `#${data.address}` : withBase(data.address),
            );
        };

        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [mode]);

    // The new iframe reports its own address as soon as it boots.
    useEffect(() => {
        window.history.replaceState(null, '', BASE);
    }, [example.id, mode]);

    // Grow the iframe to its content so the example never needs its own scrollbar.
    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) {
            return;
        }

        let observer: ResizeObserver | undefined;

        const measure = (): void => {
            const body = frame.contentDocument?.body;
            if (!body) {
                return;
            }
            setFrameHeight(Math.max(260, body.scrollHeight));
        };

        const connect = (): void => {
            const doc = frame.contentDocument;
            if (!doc?.body) {
                return;
            }
            measure();
            observer?.disconnect();
            observer = new ResizeObserver(measure);
            observer.observe(doc.body);
        };

        frame.addEventListener('load', connect);
        if (frame.contentDocument?.readyState === 'complete') {
            connect();
        }

        return () => {
            frame.removeEventListener('load', connect);
            observer?.disconnect();
        };
    }, [example.id, mode]);

    return (
        <div className="min-h-screen bg-slate-100 p-6 text-base text-slate-900">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
                <aside className="lg:w-80 lg:shrink-0">
                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div>
                            <h1 className="text-2xl font-bold">history-adaptor examples</h1>
                            <p className="mt-2 text-base leading-relaxed text-slate-600">
                                Each example is a real app running in an iframe. The outer app
                                owns the browser URL; the nested app is a framework app with its
                                own memory router. Only the rules change between stacks.
                            </p>
                        </div>

                        <ModeSwitch value={mode} onChange={setMode} />
                        <ScenarioNav value={example.id} onChange={setExampleId} />
                    </div>
                </aside>

                <main className="min-w-0 flex-1 space-y-6">
                    <p className="text-base text-slate-600">{example.description}</p>

                    <StructureDiagram example={example} />

                    <section className="overflow-hidden rounded-2xl border-4 border-amber-400 bg-white shadow-lg">
                        <div className="space-y-1 border-b-2 border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-white">
                                    iframe
                                </span>
                                <span className="font-semibold">
                                    A real app running inside an iframe
                                </span>
                            </div>
                            <p className="text-amber-800">
                                This iframe simulates a real browser app. Because this is a
                                example, the shell&apos;s browser address bar mirrors the iframe&apos;s
                                address. Use the address bar inside the frame to navigate.
                            </p>
                        </div>

                        <iframe
                            ref={frameRef}
                            key={`${example.id}:${mode}`}
                            title={`${example.title} (${mode})`}
                            src={`${withBase(example.entry)}?mode=${mode}&sandbox`}
                            style={{height: frameHeight}}
                            className="w-full border-0"
                        />
                    </section>

                    <SourceTabs key={example.id} files={example.files} />
                </main>
            </div>
        </div>
    );
};

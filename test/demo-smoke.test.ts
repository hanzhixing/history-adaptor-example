import {act, createElement} from 'react';
import {createRoot} from 'react-dom/client';
import {describe, expect, it} from 'vitest';

import {resetBrowser} from '../demoReset.ts';
import {examples} from '../registry.ts';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const flush = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));

const activeText = (container: Element): string =>
    container.querySelector('[aria-current="page"]')?.textContent?.trim() ?? '';

describe('demo examples', () => {
    for (const example of examples) {
        for (const mode of ['html5', 'hash'] as const) {
            it(`${example.id} (${mode}) renders and propagates navigation`, async () => {
                const container = document.createElement('div');
                document.body.appendChild(container);
                const host = mode === 'hash' ? example.hash : example.html5;
                resetBrowser(mode, example.hostHome);
                let cleanup: (() => void) | undefined;

                try {
                    if (example.kind === 'component') {
                        const root = createRoot(container);
                        await act(async () => {
                            root.render(
                                createElement(example.Component, {
                                    createHost: host.createHost,
                                    formatAddress: host.formatAddress,
                                }),
                            );
                        });
                        cleanup = () => root.unmount();
                    } else {
                        let app: {dispose: () => void} | undefined;
                        await act(async () => {
                            app = example.mount(container, host);
                        });
                        cleanup = () => app?.dispose();
                    }

                    await act(async () => {
                        await flush();
                    });

                    const hostPanel = container.querySelector('[data-host]') as Element;
                    const nestedPanel = container.querySelector('[data-embedded]') as Element;
                    expect(hostPanel).not.toBeNull();
                    expect(nestedPanel).not.toBeNull();
                    expect(hostPanel.contains(nestedPanel)).toBe(true);
                    expect(hostPanel.textContent).toContain('Content Component');
                    expect(nestedPanel.textContent).toContain('Content Component');

                    // Host anchors come first: Home, News, ...
                    const hostLinks = [...hostPanel.querySelectorAll('a')];
                    expect(hostLinks.length).toBeGreaterThan(1);
                    const nestedBefore = activeText(nestedPanel);

                    await act(async () => {
                        hostLinks[1].dispatchEvent(
                            new MouseEvent('click', {bubbles: true, cancelable: true}),
                        );
                        await flush();
                    });

                    expect(activeText(hostPanel)).toBe(hostLinks[1].textContent?.trim() ?? '');
                    expect(activeText(nestedPanel)).not.toBe(nestedBefore);
                } finally {
                    await act(async () => {
                        cleanup?.();
                    });
                    container.remove();
                }
            });
        }
    }
});

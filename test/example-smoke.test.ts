import {act} from 'react';
import {describe, expect, it} from 'vitest';

import {createApp as createAngularSolid} from '../examples/angular-solid/create-app.ts';
import {createApp as createReactVue} from '../examples/react-vue/create-app.tsx';
import {createApp as createSolidReact} from '../examples/solid-react/create-app.tsx';
import {createApp as createVanillaReact} from '../examples/vanilla-react/create-app.tsx';
import {createApp as createVueAngular} from '../examples/vue-angular/create-app.ts';
import {resetBrowser} from '../src/lib/browser.ts';
import type {BrowserMode} from '../src/types.ts';

type CreatedApp = {
    /** Render the app into the container and resolve with the host history. */
    mount: (container: HTMLElement) => Promise<unknown>;
    dispose: () => void;
};

type CreateApp = (mode: BrowserMode) => CreatedApp;

const examples: {id: string; createApp: CreateApp}[] = [
    {id: 'vanilla-react', createApp: createVanillaReact},
    {id: 'react-vue', createApp: createReactVue},
    {id: 'solid-react', createApp: createSolidReact},
    {id: 'vue-angular', createApp: createVueAngular},
    {id: 'angular-solid', createApp: createAngularSolid},
];

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const flush = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

const activeText = (container: Element): string =>
    container.querySelector('[aria-current="page"]')?.textContent?.trim() ?? '';

const textOf = (element: Element): string => element.textContent?.trim() ?? '';

/**
 * Host nav links come first, but the nested panel lives inside the host panel,
 * so ignore anchors that belong to the nested app.
 */
const hostLinks = (hostPanel: Element, nestedPanel: Element): HTMLAnchorElement[] =>
    [...hostPanel.querySelectorAll('a')].filter(
        (anchor): anchor is HTMLAnchorElement => !nestedPanel.contains(anchor),
    );

const nestedLinks = (nestedPanel: Element): HTMLAnchorElement[] => [
    ...nestedPanel.querySelectorAll('a'),
];

/** Click a link and wait for the synchronous/async routers to settle. */
const click = async (anchor: Element): Promise<void> => {
    await act(async () => {
        anchor.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
        await flush(140);
    });
};

describe('examples', () => {
    for (const example of examples) {
        for (const mode of ['html5', 'hash'] as const) {
            it(`${example.id} (${mode}) renders and propagates every rule`, async () => {
                const container = document.createElement('div');
                document.body.append(container);
                resetBrowser(mode, '/portal/home');
                let app: CreatedApp | undefined;

                try {
                    app = example.createApp(mode);
                    await act(async () => {
                        await app?.mount(container);
                    });
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

                    const outer = hostLinks(hostPanel, nestedPanel);
                    const inner = nestedLinks(nestedPanel);
                    expect(outer.length).toBeGreaterThanOrEqual(6);
                    expect(inner.length).toBeGreaterThanOrEqual(6);

                    // literal rule: /portal/home -> /news
                    expect(activeText(hostPanel)).toContain('/portal/home');
                    expect(activeText(nestedPanel)).toContain('/news');

                    // path-to-regexp: /portal/discussion/:id -> /discussion/:id
                    await click(outer[1]);
                    expect(activeText(hostPanel)).toBe(textOf(outer[1]));
                    expect(activeText(nestedPanel)).toContain('/discussion/42');

                    // RegExp: /portal/articles?... -> /user/:id/post?...
                    await click(outer[3]);
                    expect(activeText(hostPanel)).toContain('/portal/articles');
                    expect(activeText(nestedPanel)).toContain('/user/alice/post');

                    // RFC 6570 URI template: /portal/friend?... -> /user/:id/friend?...
                    await click(outer[4]);
                    expect(activeText(hostPanel)).toContain('/portal/friend');
                    expect(activeText(nestedPanel)).toContain('/user/alice/friend');

                    // nested -> host: /discussion/:id -> /portal/discussion/:id
                    await click(inner[1]);
                    expect(activeText(hostPanel)).toBe(textOf(outer[1]));

                    // intentional asymmetry: nested /404 has no reverse rule, so
                    // the host must stay where it is.
                    const hostBefore404 = activeText(hostPanel);
                    await click(inner[5]);
                    expect(activeText(nestedPanel)).toContain('/404');
                    expect(activeText(hostPanel)).toBe(hostBefore404);
                } finally {
                    await act(async () => {
                        app?.dispose();
                    });
                    container.remove();
                }
            });
        }
    }
});

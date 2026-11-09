import type {HistoryLike} from 'history-adaptor';

import {pathnameOf} from '../../src/lib/address.ts';
import {renderContent} from '../../src/lib/content.ts';
import templateHtml from './App.html?raw';

const template = document.createElement('template');
template.innerHTML = templateHtml;

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

/** The outer portal, written as a native custom element. */
export class App extends HTMLElement {
    #history: HistoryLike | undefined;
    #unlisten: (() => void) | undefined;
    #hashMode = false;
    #ready = false;

    connectedCallback(): void {
        if (this.#ready) {
            return;
        }
        this.#ready = true;
        this.append(template.content.cloneNode(true));

        this.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    this.#history?.push(href);
                }
            });
        });
    }

    disconnectedCallback(): void {
        this.#unlisten?.();
        this.#unlisten = undefined;
    }

    connect(history: HistoryLike, hashMode = false): void {
        this.#history = history;
        this.#hashMode = hashMode;
        this.#unlisten?.();
        this.#unlisten = history.listen(() => this.#render());
        this.#render();
    }

    /** Root the nested React app mounts into. */
    get nestedRoot(): HTMLElement {
        return this.querySelector('#react-root') as HTMLElement;
    }

    #render(): void {
        const history = this.#history;
        const content = this.querySelector('[data-content]');
        if (!history || !content) {
            return;
        }

        const {pathname, search, hash} = history.location;
        const address = pathname + search + hash;

        this.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((anchor) => {
            const href = anchor.getAttribute('href') ?? '/';
            const active = pathnameOf(href) === pathname;

            anchor.className = `${linkBase} ${active ? linkActive : linkIdle}`;
            if (active) {
                anchor.setAttribute('aria-current', 'page');
            } else {
                anchor.removeAttribute('aria-current');
            }
        });

        this.querySelectorAll<HTMLElement>('[data-hash-prefix]').forEach((prefix) => {
            prefix.hidden = !this.#hashMode;
        });

        renderContent(content as HTMLElement, address, {hashMode: this.#hashMode});
    }
}

if (!customElements.get('vanilla-app')) {
    customElements.define('vanilla-app', App);
}

export const createVanillaApp = (): App =>
    document.createElement('vanilla-app') as unknown as App;

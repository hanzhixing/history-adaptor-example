import {LocationStrategy, type LocationChangeListener} from '@angular/common';

type Listener = LocationChangeListener;

type Entry = {
    url: string;
    state: unknown;
};

/** A `LocationStrategy` that keeps Angular's routes in memory. */
export class MemoryLocationStrategy extends LocationStrategy {
    #entries: Entry[] = [{url: '/', state: null}];
    #index = 0;
    #listeners = new Set<Listener>();

    path(): string {
        return this.#entries[this.#index].url;
    }

    prepareExternalUrl(internal: string): string {
        return internal;
    }

    getState(): unknown {
        return this.#entries[this.#index].state;
    }

    pushState(state: unknown, _title: string, url: string, queryParams: string): void {
        this.#commit({url: url + queryParams, state}, false);
    }

    replaceState(state: unknown, _title: string, url: string, queryParams: string): void {
        this.#commit({url: url + queryParams, state}, true);
    }

    forward(): void {
        this.historyGo(1);
    }

    back(): void {
        this.historyGo(-1);
    }

    historyGo(relativePosition: number): void {
        const next = this.#index + relativePosition;
        if (next < 0 || next >= this.#entries.length) {
            return;
        }
        this.#index = next;
        this.#notify();
    }

    onPopState(fn: Listener): void {
        this.#listeners.add(fn);
    }

    getBaseHref(): string {
        return '/';
    }

    #commit(entry: Entry, replace: boolean): void {
        if (replace) {
            this.#entries[this.#index] = entry;
        } else {
            this.#entries.splice(this.#index + 1);
            this.#entries.push(entry);
            this.#index++;
        }
        this.#notify();
    }

    #notify(): void {
        const state = this.#entries[this.#index].state;
        this.#listeners.forEach((listener) => listener({type: 'popstate', state}));
    }
}

import '@angular/compiler';

import {Location} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import {Router, provideRouter, withHashLocation} from '@angular/router';
import {createMemoryHistory} from '@solidjs/router';
import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromAngularRouter, fromSolidRouter} from 'history-adaptor/helper';

import type {BrowserMode} from '../../src/types.ts';
import {App} from './App.ts';
import {HASH_MODE} from './HashMode.ts';
import {mountNestedSolid} from './NestedSolidApp.solid.tsx';
import {routes} from './routes.ts';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: an Angular host router, a Solid memory router, and the rules. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    let appRef: Awaited<ReturnType<typeof bootstrapApplication>> | undefined;
    let disposeSolid: (() => void) | undefined;
    let hostHistory: HistoryLike | undefined;
    let nestedHistory: HistoryLike | undefined;

    return {
        mount: async (container) => {
            const hostElement = document.createElement('app-root');
            container.append(hostElement);

            appRef = await bootstrapApplication(App, {
                providers: [
                    {provide: HASH_MODE, useValue: mode === 'hash'},
                    mode === 'hash'
                        ? provideRouter(routes, withHashLocation())
                        : provideRouter(routes),
                ],
            });

            const router = appRef.injector.get(Router);
            const location = appRef.injector.get(Location);

            const solidHistory = createMemoryHistory();
            solidHistory.set({value: '/news', replace: true});

            [hostHistory, nestedHistory] = connect([
                {
                    key: 'host',
                    history: fromAngularRouter(router, location),
                    adaptors: [
                        {target: 'nested', adapt: createAdapt(rulesFromOuterToNested)},
                    ],
                },
                {
                    key: 'nested',
                    history: fromSolidRouter(solidHistory),
                    adaptors: [
                        {target: 'host', adapt: createAdapt(rulesFromNestedToOuter)},
                    ],
                },
            ]);

            const slot = container.querySelector('#solid-root') as HTMLElement;
            disposeSolid = mountNestedSolid(slot, solidHistory);

            return hostHistory;
        },
        dispose: () => {
            disposeSolid?.();
            hostHistory?.dispose?.();
            nestedHistory?.dispose?.();
            appRef?.destroy();
        },
    };
};

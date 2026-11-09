import '@angular/compiler';

import {Location} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import {Router, provideRouter, withDisabledInitialNavigation} from '@angular/router';
import {connect, type HistoryLike} from 'history-adaptor';
import {createAdapt, fromAngularRouter, fromVueRouter} from 'history-adaptor/helper';
import {createApp as createVueApp} from 'vue';
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import type {BrowserMode} from '../../src/types.ts';
import App from './App.vue';
import {MemoryLocationStrategy} from './MemoryLocationStrategy.ts';
import {NestedAngularApp} from './NestedAngularApp.ts';
import {nestedRoutes} from './NestedRoutes.ts';
import {routes} from './routes.ts';
import {rulesFromNestedToOuter, rulesFromOuterToNested} from './rules.ts';

export type CreatedApp = {
    /** Render the app into the container and resolve with the connected host history. */
    mount: (container: HTMLElement) => Promise<HistoryLike>;
    dispose: () => void;
};

/** The app integration: a Vue host router, an in-memory Angular app, and the rules. */
export const createApp = (mode: BrowserMode): CreatedApp => {
    const hostRouter = createRouter({
        history: mode === 'hash' ? createWebHashHistory() : createWebHistory(),
        routes,
    });

    let vueApp: ReturnType<typeof createVueApp> | undefined;
    let angular: Awaited<ReturnType<typeof bootstrapApplication>> | undefined;
    let hostHistory: HistoryLike | undefined;
    let nestedHistory: HistoryLike | undefined;

    return {
        mount: async (container) => {
            vueApp = createVueApp(App);
            vueApp.provide('hashMode', mode === 'hash');
            vueApp.use(hostRouter);
            vueApp.mount(container);

            const slot = container.querySelector('#angular-root') as HTMLElement;
            slot.append(document.createElement('nested-angular'));

            const appRef = await bootstrapApplication(NestedAngularApp, {
                providers: [
                    provideRouter(nestedRoutes, withDisabledInitialNavigation()),
                    {
                        provide: Location,
                        useFactory: () => new Location(new MemoryLocationStrategy()),
                    },
                ],
            });
            angular = appRef;

            const router = appRef.injector.get(Router);
            const location = appRef.injector.get(Location);
            await router.navigateByUrl('/news');

            [hostHistory, nestedHistory] = connect([
                {
                    key: 'host',
                    history: fromVueRouter(hostRouter),
                    adaptors: [
                        {target: 'nested', adapt: createAdapt(rulesFromOuterToNested)},
                    ],
                },
                {
                    key: 'nested',
                    history: fromAngularRouter(router, location),
                    adaptors: [
                        {target: 'host', adapt: createAdapt(rulesFromNestedToOuter)},
                    ],
                },
            ]);

            return hostHistory;
        },
        dispose: () => {
            hostHistory?.dispose?.();
            nestedHistory?.dispose?.();
            angular?.destroy();
            vueApp?.unmount();
        },
    };
};

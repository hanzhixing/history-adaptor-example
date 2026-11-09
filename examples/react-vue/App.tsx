import {RouterProvider, type DataRouter} from 'react-router';
import {createApp as createVueApp} from 'vue';
import {useEffect, useRef} from 'react';
import type {Router as VueRouter} from 'vue-router';

import NestedVueApp from './NestedVueApp.vue';

/** The outer React SPA; it renders the host router and hosts the nested Vue app. */
export const App = ({
    hostRouter,
    nestedRouter,
}: {
    hostRouter: DataRouter;
    nestedRouter: VueRouter;
}) => {
    const slot = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = slot.current;
        if (!element) {
            return;
        }
        const app = createVueApp(NestedVueApp);
        app.use(nestedRouter);
        app.mount(element);
        return () => app.unmount();
    }, [nestedRouter]);

    return (
        <div data-host className="space-y-4">
            <RouterProvider router={hostRouter} />

            <section className="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                    Nested Vue app (memory router)
                </p>
                <div id="vue-root" ref={slot} />
            </section>
        </div>
    );
};

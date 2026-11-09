import {createApp, defineComponent, h} from 'vue';
import {RouterView, useRoute, type Router} from 'vue-router';

import type {HistoryLike} from 'history-adaptor';

type Link = {
    label: string;
    to: string;
};

const pathnameOf = (address: string): string => address.split(/[?#]/)[0] || '/';

/** A host app written in Vue (Vue Router + Vue components), no React. */
export const createVueHost = (options: {
    router: Router;
    history: HistoryLike;
    links: Link[];
}) => {
    let slot: HTMLElement | undefined;

    const Host = defineComponent({
        setup() {
            const route = useRoute();

            return () =>
                h('div', {class: 'space-y-4', 'data-host': ''}, [
                    h(
                        'nav',
                        {class: 'flex flex-col gap-1'},
                        options.links.map((link) =>
                            h(
                                'a',
                                {
                                    href: link.to,
                                    class:
                                        pathnameOf(link.to) === route.path
                                            ? 'break-all font-mono text-base font-semibold underline'
                                            : 'break-all font-mono text-base hover:underline',
                                    'aria-current':
                                        pathnameOf(link.to) === route.path ? 'page' : undefined,
                                    onClick: (event: Event) => {
                                        event.preventDefault();
                                        options.history.push(link.to);
                                    },
                                },
                                link.to,
                            ),
                        ),
                    ),
                    h(RouterView),
                    h('div', {
                        class: 'space-y-4 rounded-xl border-2 border-dashed border-slate-300 p-4',
                        'data-embedded': '',
                        ref: (element: unknown) => {
                            if (element) {
                                slot = element as HTMLElement;
                            }
                        },
                    }),
                ]);
        },
    });

    const app = createApp(Host);
    app.use(options.router);
    const element = document.createElement('div');
    app.mount(element);

    return {
        element,
        slot: slot as HTMLElement,
        dispose: () => app.unmount(),
    };
};

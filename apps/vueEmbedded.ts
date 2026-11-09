import {createApp, defineComponent, h} from 'vue';
import {RouterView, useRoute, type Router} from 'vue-router';

import type {HistoryLike} from 'history-adaptor';

type Link = {
    label: string;
    to: string;
};

const pathnameOf = (address: string): string => address.split(/[?#]/)[0] || '/';

/** A Vue memory-router app mounted into a slot of the host. */
export const createVueEmbedded = (options: {
    slot: HTMLElement;
    router: Router;
    history: HistoryLike;
    links: Link[];
}) => {
    const Embedded = defineComponent({
        setup() {
            const route = useRoute();

            return () =>
                h('div', {class: 'space-y-4'}, [
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
                ]);
        },
    });

    const app = createApp(Embedded);
    app.use(options.router);
    app.mount(options.slot);
    return {dispose: () => app.unmount()};
};

import {defineComponent, h} from 'vue';
import {useRoute} from 'vue-router';

/** The routed page body for a Vue Router side. */
export const VuePage = defineComponent({
    setup() {
        const route = useRoute();
        return () =>
            h(
                'div',
                {class: 'space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm'},
                [
                    h(
                        'div',
                        {
                            class: 'text-xs font-semibold uppercase tracking-widest text-slate-400',
                        },
                        'Content Component',
                    ),
                    h('p', {class: 'text-xl font-semibold text-slate-800'}, [
                        'Now we are on page ',
                        h('span', {class: 'break-all font-mono text-sky-700'}, route.fullPath),
                    ]),
                ],
            );
    },
});

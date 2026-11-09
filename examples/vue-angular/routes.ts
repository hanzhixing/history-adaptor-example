import type {RouteRecordRaw} from 'vue-router';

import Content from './Content.vue';
import Layout from './Layout.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        children: [
            {path: 'portal/home', component: Content},
            {path: 'portal/discussion/:discussion_id', component: Content},
            {path: 'portal/user/:user_id', component: Content},
            {path: 'portal/articles', component: Content},
            {path: 'portal/friend', component: Content},
            {path: 'portal/error/not_found', component: Content},
        ],
    },
    {path: '/:pathMatch(.*)*', redirect: '/portal/home'},
];

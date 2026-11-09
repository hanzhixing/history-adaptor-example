import type {RouteRecordRaw} from 'vue-router';

import NestedContent from './NestedContent.vue';

export const nestedRoutes: RouteRecordRaw[] = [
    {path: '/', redirect: '/news'},
    {path: '/news', component: NestedContent},
    {path: '/discussion/:discussion_id', component: NestedContent},
    {path: '/user/:user_id', component: NestedContent},
    {path: '/user/:user_id/post', component: NestedContent},
    {path: '/user/:user_id/friend', component: NestedContent},
    {path: '/404', component: NestedContent},
    {path: '/:pathMatch(.*)*', redirect: '/404'},
];

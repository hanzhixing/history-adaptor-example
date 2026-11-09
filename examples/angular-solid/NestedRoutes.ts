import type {RouteDefinition} from '@solidjs/router';

import {NestedContent} from './NestedContent.solid.tsx';

export const nestedRoutes: RouteDefinition[] = [
    {path: '/news', component: NestedContent},
    {path: '/discussion/:discussion_id', component: NestedContent},
    {path: '/user/:user_id', component: NestedContent},
    {path: '/user/:user_id/post', component: NestedContent},
    {path: '/user/:user_id/friend', component: NestedContent},
    {path: '/404', component: NestedContent},
    {path: '*', component: NestedContent},
];

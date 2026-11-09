import type {RouteDefinition} from '@solidjs/router';

import {Content} from './Content.solid.tsx';

export const routes: RouteDefinition[] = [
    {path: '/portal/home', component: Content},
    {path: '/portal/discussion/:discussion_id', component: Content},
    {path: '/portal/user/:user_id', component: Content},
    {path: '/portal/articles', component: Content},
    {path: '/portal/friend', component: Content},
    {path: '/portal/error/not_found', component: Content},
    {path: '*', component: Content},
];

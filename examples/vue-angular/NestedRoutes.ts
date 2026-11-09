import type {Routes} from '@angular/router';

import {NestedContent} from './NestedContent.ts';

export const nestedRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'news'},
    {path: 'news', component: NestedContent},
    {path: 'discussion/:discussion_id', component: NestedContent},
    {path: 'user/:user_id', component: NestedContent},
    {path: 'user/:user_id/post', component: NestedContent},
    {path: 'user/:user_id/friend', component: NestedContent},
    {path: '404', component: NestedContent},
    {path: '**', redirectTo: '404'},
];

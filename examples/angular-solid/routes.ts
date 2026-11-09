import type {Routes} from '@angular/router';

import {Content} from './Content.ts';
import {Layout} from './Layout.ts';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'portal/home'},
            {path: 'portal/home', component: Content},
            {path: 'portal/discussion/:discussion_id', component: Content},
            {path: 'portal/user/:user_id', component: Content},
            {path: 'portal/articles', component: Content},
            {path: 'portal/friend', component: Content},
            {path: 'portal/error/not_found', component: Content},
        ],
    },
    {path: '**', redirectTo: 'portal/home'},
];

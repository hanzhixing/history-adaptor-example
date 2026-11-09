import '@angular/compiler';

import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

/** The nested Angular app's top-level layout. */
export const NestedAngularApp = Component({
    selector: 'nested-angular',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    host: {'data-embedded': ''},
    template: `
        <div class="space-y-4">
            <nav class="flex flex-col gap-1">
                <a
                    routerLink="/news"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/news</a
                >
                <a
                    routerLink="/discussion/42"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/discussion/42</a
                >
                <a
                    routerLink="/user/alice"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice</a
                >
                <a
                    routerLink="/user/alice/post"
                    [queryParams]="{category: 'tech', keyword: 'router'}"
                    fragment="comments"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice/post?category=tech&amp;keyword=router#comments</a
                >
                <a
                    routerLink="/user/alice/friend"
                    [queryParams]="{group: 'dev'}"
                    fragment="top"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice/friend?group=dev#top</a
                >
                <a
                    routerLink="/404"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/404</a
                >
            </nav>
            <router-outlet />
        </div>
    `,
})(class {});

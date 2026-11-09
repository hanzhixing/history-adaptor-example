import '@angular/compiler';

import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {HASH_MODE} from './HashMode.ts';

class LayoutImpl {
    readonly hashMode = inject(HASH_MODE);
}

/** The outer app's persistent layout. */
export const Layout = Component({
    selector: 'app-layout',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    template: `
        <div class="space-y-4">
            <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Outer · Angular SPA
                </p>
                <h1 class="text-xl font-semibold text-slate-800">
                    Portal (Angular Router owns the browser URL)
                </h1>
            </header>

            <nav class="flex flex-col gap-1">
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/home"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/home</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/discussion/42"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/discussion/42</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/user/alice"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/user/alice</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/articles"
                        [queryParams]="{user_id: 'alice', category_id: 'tech', keyword: 'router'}"
                        fragment="comments"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/friend"
                        [queryParams]="{user_id: 'alice', group: 'dev'}"
                        fragment="top"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/friend?user_id=alice&amp;group=dev#top</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/error/not_found"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/error/not_found</a
                    >
                </div>
            </nav>

            <router-outlet />
        </div>
    `,
})(LayoutImpl);

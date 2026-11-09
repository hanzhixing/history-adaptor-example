import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, type Event} from '@angular/router';
import {filter, map, startWith} from 'rxjs';

import {HASH_MODE} from './HashMode.ts';

/** The outer app's routed page. */
class ContentImpl {
    readonly hashMode = inject(HASH_MODE);
    readonly address$ = inject(Router).events.pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => inject(Router).url),
        startWith(inject(Router).url),
    );
}

export const Content = Component({
    selector: 'ng-content-page',
    imports: [AsyncPipe],
    template: `
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page
                @if (hashMode) {
                    <span class="font-mono text-slate-400">/#</span>
                }
                <span class="break-all font-mono text-slate-700">{{ address$ | async }}</span>
            </p>
        </div>
    `,
})(ContentImpl);

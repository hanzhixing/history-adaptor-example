import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, type Event} from '@angular/router';
import {filter, map, startWith} from 'rxjs';

/** The nested app's routed page. */
class ContentImpl {
    readonly address$ = inject(Router).events.pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => inject(Router).url),
        startWith(inject(Router).url),
    );
}

export const NestedContent = Component({
    selector: 'ng-content-page',
    imports: [AsyncPipe],
    template: `
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page
                <span class="break-all font-mono text-slate-700">{{ address$ | async }}</span>
            </p>
        </div>
    `,
})(ContentImpl);

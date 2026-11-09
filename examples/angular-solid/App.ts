import '@angular/compiler';

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

class AppImpl {}

/** The outer Angular SPA; it renders the host router and hosts the nested Solid app. */
export const App = Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    host: {'data-host': ''},
    template: `
        <div class="space-y-4">
            <router-outlet />

            <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
                    Nested Solid app (memory router)
                </p>
                <div id="solid-root"></div>
            </section>
        </div>
    `,
})(AppImpl);

/** @jsxImportSource solid-js */
import {MemoryRouter, type MemoryHistory} from '@solidjs/router';
import type {Component} from 'solid-js';
import {render} from 'solid-js/web';

import {NestedSolidLayout} from './NestedSolidLayout.solid.tsx';
import {nestedRoutes} from './NestedRoutes.ts';

/** The nested Solid app: a standard memory router. */
export const NestedSolidApp: Component<{history: MemoryHistory}> = (props) => (
    <MemoryRouter history={props.history} root={NestedSolidLayout}>
        {nestedRoutes}
    </MemoryRouter>
);

export const mountNestedSolid = (container: HTMLElement, history: MemoryHistory) =>
    render(() => <NestedSolidApp history={history} />, container);

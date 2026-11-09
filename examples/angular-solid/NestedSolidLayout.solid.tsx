/** @jsxImportSource solid-js */
import {A} from '@solidjs/router';
import type {Component, JSX} from 'solid-js';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

/** The nested Solid app's persistent layout. */
export const NestedSolidLayout: Component<{children?: JSX.Element}> = (props) => (
    <div data-embedded class="space-y-4">
        <nav class="flex flex-col gap-1">
            <A href="/news" end class={linkBase} inactiveClass={linkIdle} activeClass={linkActive}>
                /news
            </A>
            <A
                href="/discussion/42"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /discussion/42
            </A>
            <A
                href="/user/alice"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /user/alice
            </A>
            <A
                href="/user/alice/post?category=tech&keyword=router#comments"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /user/alice/post?category=tech&amp;keyword=router#comments
            </A>
            <A
                href="/user/alice/friend?group=dev#top"
                end
                class={linkBase}
                inactiveClass={linkIdle}
                activeClass={linkActive}
            >
                /user/alice/friend?group=dev#top
            </A>
            <A href="/404" end class={linkBase} inactiveClass={linkIdle} activeClass={linkActive}>
                /404
            </A>
        </nav>

        {props.children}
    </div>
);

/** @jsxImportSource solid-js */
import {A} from '@solidjs/router';
import {type Component, type JSX, useContext} from 'solid-js';

import {ModeContext} from './ModeContext.ts';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';
const navRow = 'flex items-baseline gap-1';

/** The outer app's persistent layout. */
export const Layout: Component<{children?: JSX.Element}> = (props) => {
    const mode = useContext(ModeContext);

    return (
        <div class="space-y-4">
            <nav class="flex flex-col gap-1">
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/home"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/home
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/discussion/42"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/discussion/42
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/user/alice"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/user/alice
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/friend?user_id=alice&group=dev#top"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/friend?user_id=alice&amp;group=dev#top
                    </A>
                </div>
                <div class={navRow}>
                    {mode === 'hash' ? <span class="font-mono text-slate-400">/#</span> : null}
                    <A
                        href="/portal/error/not_found"
                        end
                        class={linkBase}
                        inactiveClass={linkIdle}
                        activeClass={linkActive}
                    >
                        /portal/error/not_found
                    </A>
                </div>
            </nav>

            {props.children}
        </div>
    );
};

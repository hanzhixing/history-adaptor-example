import {NavLink, Outlet} from 'react-router';

import type {BrowserMode} from '../../src/types.ts';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';
const navRow = 'flex items-baseline gap-1';

const navClass = ({isActive}: {isActive: boolean}): string =>
    `${linkBase} ${isActive ? linkActive : linkIdle}`;

/** The outer app's persistent layout. */
export const Layout = ({mode}: {mode: BrowserMode}) => (
    <div className="space-y-4">
        <header className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Outer · React SPA
            </p>
            <h1 className="text-xl font-semibold text-slate-800">
                Portal (React Router owns the browser URL)
            </h1>
        </header>

        <nav className="flex flex-col gap-1">
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/home" end className={navClass}>
                    /portal/home
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/discussion/42" end className={navClass}>
                    /portal/discussion/42
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/user/alice" end className={navClass}>
                    /portal/user/alice
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink
                    to="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                    end
                    className={navClass}
                >
                    /portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink
                    to="/portal/friend?user_id=alice&group=dev#top"
                    end
                    className={navClass}
                >
                    /portal/friend?user_id=alice&amp;group=dev#top
                </NavLink>
            </div>
            <div className={navRow}>
                {mode === 'hash' ? (
                    <span className="font-mono text-slate-400">/#</span>
                ) : null}
                <NavLink to="/portal/error/not_found" end className={navClass}>
                    /portal/error/not_found
                </NavLink>
            </div>
        </nav>

        <Outlet />
    </div>
);

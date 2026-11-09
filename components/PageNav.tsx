import type {HistoryLike} from 'history-adaptor';

import {pathnameOf} from './address.ts';
import {useAddress} from './useAddress.ts';

type Link = {
    label: string;
    to: string;
};

type Props = {
    history: HistoryLike;
    links: Link[];
    /** Optional formatter, e.g. to show `#/…` for a hash-mode browser side. */
    format?: (address: string) => string;
};

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-slate-600 hover:text-slate-900 hover:underline';
const linkActive = 'font-semibold text-slate-900 underline';

/** A vertical list of links; active state comes from this side's own history. */
export const PageNav = ({history, links, format = (address) => address}: Props) => {
    const currentPath = pathnameOf(useAddress(history));

    return (
        <nav className="flex flex-col gap-1">
            {links.map((link) => {
                const active = pathnameOf(link.to) === currentPath;
                return (
                    <a
                        key={link.label}
                        href={format(link.to)}
                        title={link.label}
                        className={`${linkBase} ${active ? linkActive : linkIdle}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={(event) => {
                            event.preventDefault();
                            history.push(link.to);
                        }}
                    >
                        {format(link.to)}
                    </a>
                );
            })}
        </nav>
    );
};

import {NavLink, Outlet} from 'react-router';

const linkBase = 'break-all font-mono text-base underline-offset-2';
const linkIdle = 'text-sky-700 hover:text-sky-900 hover:underline';
const linkActive = 'font-semibold text-sky-900 underline';

const navClass = ({isActive}: {isActive: boolean}): string =>
    `${linkBase} ${isActive ? linkActive : linkIdle}`;

/** The nested React app's top-level layout. */
export const NestedReactApp = () => (
    <div data-embedded className="space-y-4">
        <nav className="flex flex-col gap-1">
            <NavLink to="/news" end className={navClass}>
                /news
            </NavLink>
            <NavLink to="/discussion/42" end className={navClass}>
                /discussion/42
            </NavLink>
            <NavLink to="/user/alice" end className={navClass}>
                /user/alice
            </NavLink>
            <NavLink
                to="/user/alice/post?category=tech&keyword=router#comments"
                end
                className={navClass}
            >
                /user/alice/post?category=tech&amp;keyword=router#comments
            </NavLink>
            <NavLink to="/user/alice/friend?group=dev#top" end className={navClass}>
                /user/alice/friend?group=dev#top
            </NavLink>
            <NavLink to="/404" end className={navClass}>
                /404
            </NavLink>
        </nav>
        <Outlet />
    </div>
);

import type {HistoryLike} from 'history-adaptor';

type Link = {
    label: string;
    to: string;
};

const pathnameOf = (address: string): string => address.split(/[?#]/)[0] || '/';

/** A host app written in plain JavaScript: DOM APIs only, no framework. */
export const createVanillaHost = (options: {
    history: HistoryLike;
    links: Link[];
    formatAddress?: (address: string) => string;
}) => {
    const format = options.formatAddress ?? ((address: string) => address);

    const element = document.createElement('div');
    element.className = 'space-y-4';
    element.setAttribute('data-host', '');

    const nav = document.createElement('nav');
    nav.className = 'flex flex-col gap-1';

    const content = document.createElement('div');
    content.className = 'rounded-lg border border-slate-200 bg-white p-4 text-xl font-semibold';

    const slot = document.createElement('div');
    slot.className = 'space-y-4 rounded-xl border-2 border-dashed border-slate-300 p-4';
    slot.setAttribute('data-embedded', '');

    element.append(nav, content, slot);

    const render = (): void => {
        const {pathname, search, hash} = options.history.location;
        nav.replaceChildren(
            ...options.links.map((link) => {
                const anchor = document.createElement('a');
                anchor.href = format(link.to);
                anchor.textContent = format(link.to);
                anchor.className = 'break-all font-mono text-base underline-offset-2 hover:underline';
                if (pathnameOf(link.to) === pathname) {
                    anchor.classList.add('font-semibold', 'underline');
                    anchor.setAttribute('aria-current', 'page');
                }
                anchor.addEventListener('click', (event) => {
                    event.preventDefault();
                    options.history.push(link.to);
                });
                return anchor;
            }),
        );
        content.textContent = `Now we are on page ${format(pathname + search + hash)}`;
    };

    const unlisten = options.history.listen(render);
    render();

    return {element, slot, dispose: unlisten};
};

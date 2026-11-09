/**
 * Render the routed page body for a plain-DOM host. Kept intentionally small:
 * the point of the example is the routing wiring, not the page chrome.
 */
export const renderContent = (
    element: HTMLElement,
    address: string,
    options: {hashMode?: boolean} = {},
): void => {
    const wrapper = document.createElement('div');
    wrapper.className = 'space-y-2';

    const label = document.createElement('div');
    label.className =
        'text-xs font-semibold uppercase tracking-widest text-slate-400';
    label.textContent = 'Content Component';

    const line = document.createElement('p');
    line.className = 'text-2xl font-bold text-slate-900';
    line.append('Now we are on page ');

    if (options.hashMode) {
        const prefix = document.createElement('span');
        prefix.className = 'font-mono text-slate-400';
        prefix.textContent = '/#';
        line.append(prefix);
    }

    const code = document.createElement('span');
    code.className = 'break-all font-mono text-slate-700';
    code.textContent = address;
    line.append(code);

    wrapper.append(label, line);
    element.replaceChildren(wrapper);
};

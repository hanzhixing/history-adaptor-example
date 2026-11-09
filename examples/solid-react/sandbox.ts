import '../../src/style.css';

import {installAddressBar, reportAddressToParent} from '../../src/lib/frame.ts';
import {createApp} from './create-app.tsx';

// Example sandbox — not part of the app you copy.
const params = new URLSearchParams(location.search);
const mode = params.get('mode') === 'hash' ? 'hash' : 'html5';

// A real deployment serves the app at `/portal/*`; this only compensates for
// the example being hosted under `/examples/solid-react/index.html`.
if (params.has('sandbox')) {
    history.replaceState(null, '', mode === 'hash' ? '#/portal/home' : '/portal/home');
}

void (async () => {
    const app = createApp(mode);
    const hostHistory = await app.mount(document.getElementById('root') as HTMLElement);
    installAddressBar(hostHistory, mode);
    reportAddressToParent(hostHistory);
})();

import type {BrowserMode} from '../types.ts';

/**
 * Example sandbox only: put the address bar at a known portal address before an
 * example boots. A real deployment serves the app at `/portal/*`, so app code
 * never needs this.
 */
export const resetBrowser = (mode: BrowserMode, address: string): void => {
    window.history.replaceState(null, '', mode === 'hash' ? `#${address}` : address);
};

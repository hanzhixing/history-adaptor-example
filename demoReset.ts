import type {BrowserMode} from './types.ts';

/**
 * Demo-only: give each example a clean starting URL. Real app code decides the
 * browser mode once at deploy time and never resets the address bar like this.
 */
export const resetBrowser = (mode: BrowserMode, home: string): void => {
    window.history.replaceState(null, '', mode === 'hash' ? `/#${home}` : home);
};

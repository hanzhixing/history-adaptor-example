import {createContext} from 'solid-js';

import type {BrowserMode} from '../../src/types.ts';

export const ModeContext = createContext<BrowserMode>('html5');

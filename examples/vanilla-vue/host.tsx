import {fromBrowserNative} from 'history-adaptor/helper';

// A plain-JS host only needs the browser history. Use the one that matches how
// your app is deployed — there is no runtime "mode" switch in real code.
export const createHtml5Host = () => ({history: fromBrowserNative()});
export const createHashHost = () => ({history: fromBrowserNative({hash: true})});

export const formatHtml5Address = (address: string) => address;
export const formatHashAddress = (address: string) => `#${address}`;

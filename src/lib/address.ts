import type {Location, To} from 'history-adaptor';

export type Address = {
    pathname: string;
    search: string;
    hash: string;
};

/** Normalize a location descriptor into the full address string rules match against. */
export const toAddress = (to: Location | To): string => {
    if (typeof to === 'string') {
        return to;
    }
    return `${to.pathname ?? '/'}${to.search ?? ''}${to.hash ?? ''}`;
};

/** Split an address into its pathname / search / hash parts. */
export const splitAddress = (address: string): Address => {
    const hashIndex = address.indexOf('#');
    const hash = hashIndex >= 0 ? address.slice(hashIndex) : '';
    const withoutHash = hashIndex >= 0 ? address.slice(0, hashIndex) : address;

    const searchIndex = withoutHash.indexOf('?');
    const search = searchIndex >= 0 ? withoutHash.slice(searchIndex) : '';
    const pathname =
        (searchIndex >= 0 ? withoutHash.slice(0, searchIndex) : withoutHash) || '/';

    return {pathname, search, hash};
};

/** The pathname part of an address, used for active-link checks. */
export const pathnameOf = (address: string): string => splitAddress(address).pathname;

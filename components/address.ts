import type {Location, To} from 'history-adaptor';

export const toAddress = (location: {pathname: string; search: string; hash: string}): string =>
    location.pathname + location.search + location.hash;

export const pathnameOf = (address: string): string => address.split(/[?#]/)[0] || '/';

export const splitAddress = (to: Location | To): Location => {
    if (typeof to !== 'string') {
        return {
            pathname: to.pathname ?? '/',
            search: to.search ?? '',
            hash: to.hash ?? '',
        };
    }

    const hashIndex = to.indexOf('#');
    const hash = hashIndex >= 0 ? to.slice(hashIndex) : '';
    const withoutHash = hashIndex >= 0 ? to.slice(0, hashIndex) : to;
    const searchIndex = withoutHash.indexOf('?');
    const search = searchIndex >= 0 ? withoutHash.slice(searchIndex) : '';
    const pathname = (searchIndex >= 0 ? withoutHash.slice(0, searchIndex) : withoutHash) || '/';

    return {pathname, search, hash};
};

export const parseSearch = (search: string): Record<string, string> => {
    const result: Record<string, string> = {};
    new URLSearchParams(search).forEach((value, key) => {
        result[key] = value;
    });
    return result;
};

/** Match a path template such as `/post/:id` and extract its params. */
export const matchPath = (
    template: string,
    pathname: string,
): Record<string, string> | undefined => {
    const keys: string[] = [];
    let pattern = '^';

    template.split('/').forEach((segment, index) => {
        if (index > 0) {
            pattern += '/';
        }
        if (segment.startsWith(':')) {
            keys.push(segment.slice(1));
            pattern += '([^/]+)';
        } else {
            pattern += segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
    });
    pattern += '$';

    const match = new RegExp(pattern).exec(pathname);
    if (!match) {
        return undefined;
    }

    const params: Record<string, string> = {};
    keys.forEach((key, index) => {
        params[key] = decodeURIComponent(match[index + 1] ?? '');
    });
    return params;
};

/** Fill a path template such as `/post/:id` from a set of params. */
export const buildPath = (template: string, params: Record<string, string>): string =>
    template.replace(/:([^/]+)/g, (_match, key: string) => encodeURIComponent(params[key] ?? ''));

/** Try a table of `from template -> to template` rules, keeping search/hash. */
export const mapPaths = (
    table: Record<string, string>,
    location: Location,
): To | undefined => {
    for (const [from, to] of Object.entries(table)) {
        const params = matchPath(from, location.pathname);
        if (params) {
            return {
                pathname: buildPath(to, params),
                search: location.search,
                hash: location.hash,
            };
        }
    }
    return undefined;
};

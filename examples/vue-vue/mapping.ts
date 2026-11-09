import type {Adapt} from 'history-adaptor';

import {
    buildPath,
    mapPaths,
    matchPath,
    parseSearch,
    splitAddress,
} from '../../components/address.ts';
import {embeddedPaths, hostPaths} from './routes.tsx';

// host address -> embedded address
export const hostToEmbedded: Adapt = (to) => {
    const location = splitAddress(to);

    // /blog?post=123&comment=456 -> /vue/post/123/comment/456
    if (location.pathname === hostPaths.blog) {
        const query = parseSearch(location.search);
        if (query.post && query.comment) {
            return {
                pathname: buildPath(embeddedPaths.blog, {
                    post: query.post,
                    comment: query.comment,
                }),
                hash: location.hash,
            };
        }
    }

    return mapPaths(
        {
            [hostPaths.home]: embeddedPaths.home,
            [hostPaths.news]: embeddedPaths.news,
            [hostPaths.post]: embeddedPaths.post,
            [hostPaths.search]: embeddedPaths.search,
            [hostPaths.docs]: embeddedPaths.docs,
        },
        location,
    );
};

// embedded address -> host address
export const embeddedToHost: Adapt = (to) => {
    const location = splitAddress(to);

    // /vue/post/123/comment/456 -> /blog?post=123&comment=456
    const comment = matchPath(embeddedPaths.blog, location.pathname);
    if (comment) {
        return {
            pathname: hostPaths.blog,
            search: `?post=${comment.post}&comment=${comment.comment}`,
            hash: location.hash,
        };
    }

    return mapPaths(
        {
            [embeddedPaths.home]: hostPaths.home,
            [embeddedPaths.news]: hostPaths.news,
            [embeddedPaths.post]: hostPaths.post,
            [embeddedPaths.search]: hostPaths.search,
            [embeddedPaths.docs]: hostPaths.docs,
        },
        location,
    );
};

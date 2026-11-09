import {buildPath} from '../../components/address.ts';
import {ReactPage} from '../../components/ReactPage.tsx';

// The host is the outer React SPA; the embedded app is another React app.
export const hostPaths = {
    home: '/home',
    news: '/news',
    post: '/post/:id',
    blog: '/blog',
    search: '/search',
    docs: '/docs',
};

export const hostHome = hostPaths.home;

export const embeddedPaths = {
    home: '/embedded',
    news: '/embedded/news',
    post: '/embedded/post/:id',
    blog: '/embedded/post/:post/comment/:comment',
    search: '/embedded/search',
    docs: '/embedded/docs',
};

export const hostLinks = [
    {label: 'Home', to: hostPaths.home},
    {label: 'News', to: hostPaths.news},
    {label: 'Post #11', to: hostPaths.post.replace(':id', '11')},
    {label: 'Post 123 + comment 456', to: `${hostPaths.blog}?post=123&comment=456`},
    {label: 'Search q=router', to: `${hostPaths.search}?q=router`},
    {label: 'Docs #intro', to: `${hostPaths.docs}#intro`},
];

export const embeddedLinks = [
    {label: 'Home', to: embeddedPaths.home},
    {label: 'News', to: embeddedPaths.news},
    {label: 'Post #11', to: embeddedPaths.post.replace(':id', '11')},
    {
        label: 'Post 123 + comment 456',
        to: buildPath(embeddedPaths.blog, {post: '123', comment: '456'}),
    },
    {label: 'Search q=router', to: `${embeddedPaths.search}?q=router`},
    {label: 'Docs #intro', to: `${embeddedPaths.docs}#intro`},
];

export const hostRoutes = [
    {path: hostPaths.home, element: <ReactPage />},
    {path: hostPaths.news, element: <ReactPage />},
    {path: hostPaths.post, element: <ReactPage />},
    {path: hostPaths.blog, element: <ReactPage />},
    {path: hostPaths.search, element: <ReactPage />},
    {path: hostPaths.docs, element: <ReactPage />},
];

export const embeddedRoutes = [
    {path: embeddedPaths.home, element: <ReactPage />},
    {path: embeddedPaths.news, element: <ReactPage />},
    {path: embeddedPaths.post, element: <ReactPage />},
    {path: embeddedPaths.blog, element: <ReactPage />},
    {path: embeddedPaths.search, element: <ReactPage />},
    {path: embeddedPaths.docs, element: <ReactPage />},
];

import {buildPath} from '../../components/address.ts';
import {ReactPage} from '../../components/ReactPage.tsx';
import {VuePage} from '../../components/vue.tsx';

// The host is a Vue SPA, so it owns the browser URL through Vue Router.
export const hostPaths = {
    home: '/home',
    news: '/news',
    post: '/post/:id',
    blog: '/blog',
    search: '/search',
    docs: '/docs',
};

export const hostHome = hostPaths.home;

// The embedded app is a React Router memory router.
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
    {path: hostPaths.home, component: VuePage},
    {path: hostPaths.news, component: VuePage},
    {path: hostPaths.post, component: VuePage},
    {path: hostPaths.blog, component: VuePage},
    {path: hostPaths.search, component: VuePage},
    {path: hostPaths.docs, component: VuePage},
];

export const embeddedRoutes = [
    {path: embeddedPaths.home, element: <ReactPage />},
    {path: embeddedPaths.news, element: <ReactPage />},
    {path: embeddedPaths.post, element: <ReactPage />},
    {path: embeddedPaths.blog, element: <ReactPage />},
    {path: embeddedPaths.search, element: <ReactPage />},
    {path: embeddedPaths.docs, element: <ReactPage />},
];

import {buildPath} from '../../components/address.ts';
import {VuePage} from '../../components/vue.tsx';

// The host is the outer Vue SPA; the embedded app is another Vue app.
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
    home: '/vue',
    news: '/vue/news',
    post: '/vue/post/:id',
    blog: '/vue/post/:post/comment/:comment',
    search: '/vue/search',
    docs: '/vue/docs',
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
    {path: embeddedPaths.home, component: VuePage},
    {path: embeddedPaths.news, component: VuePage},
    {path: embeddedPaths.post, component: VuePage},
    {path: embeddedPaths.blog, component: VuePage},
    {path: embeddedPaths.search, component: VuePage},
    {path: embeddedPaths.docs, component: VuePage},
];

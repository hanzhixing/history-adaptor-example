import {buildPath} from '../../components/address.ts';
import {VuePage} from '../../components/vue.tsx';

// The host is plain JS, so it has no framework route config.
export const hostPaths = {
    home: '/webapp/main/blog/home',
    news: '/webapp/main/blog/news',
    post: '/webapp/main/blog/post/:id',
    blog: '/webapp/main/blog',
    search: '/webapp/main/blog/search',
    docs: '/webapp/main/blog/docs',
};

export const hostHome = hostPaths.home;

// The embedded app is a Vue Router memory router.
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

export const embeddedRoutes = [
    {path: embeddedPaths.home, component: VuePage},
    {path: embeddedPaths.news, component: VuePage},
    {path: embeddedPaths.post, component: VuePage},
    {path: embeddedPaths.blog, component: VuePage},
    {path: embeddedPaths.search, component: VuePage},
    {path: embeddedPaths.docs, component: VuePage},
];

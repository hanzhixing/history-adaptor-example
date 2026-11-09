import {fromVueRouter} from 'history-adaptor/helper';
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import {hostRoutes} from './routes.tsx';

// Pick the one that matches how your Vue SPA is deployed.
export const createHtml5Host = () => {
    const router = createRouter({history: createWebHistory(), routes: hostRoutes});
    return {history: fromVueRouter(router), router};
};

export const createHashHost = () => {
    const router = createRouter({history: createWebHashHistory(), routes: hostRoutes});
    return {history: fromVueRouter(router), router};
};

import {fromReactRouter} from 'history-adaptor/helper';
import {createBrowserRouter, createHashRouter, RouterProvider} from 'react-router';

import {hostRoutes} from './routes.tsx';

export const createHtml5Host = () => {
    const router = createBrowserRouter(hostRoutes);
    return {
        history: fromReactRouter(router),
        view: <RouterProvider router={router} />,
        dispose: () => router.dispose(),
    };
};

export const createHashHost = () => {
    const router = createHashRouter(hostRoutes);
    return {
        history: fromReactRouter(router),
        view: <RouterProvider router={router} />,
        dispose: () => router.dispose(),
    };
};

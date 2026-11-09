import {createRoutesFromElements, Route} from 'react-router';

import {Content} from './Content.tsx';
import {Layout} from './Layout.tsx';
import type {BrowserMode} from '../../src/types.ts';

export const createRoutes = (mode: BrowserMode) =>
    createRoutesFromElements(
        <Route element={<Layout mode={mode} />}>
            <Route path="/portal/home" element={<Content mode={mode} />} />
            <Route path="/portal/discussion/:discussion_id" element={<Content mode={mode} />} />
            <Route path="/portal/user/:user_id" element={<Content mode={mode} />} />
            <Route path="/portal/articles" element={<Content mode={mode} />} />
            <Route path="/portal/friend" element={<Content mode={mode} />} />
            <Route path="/portal/error/not_found" element={<Content mode={mode} />} />
            <Route path="*" element={<Content mode={mode} />} />
        </Route>,
    );

import {createRoutesFromElements, Route} from 'react-router';

import {NestedContent} from './NestedContent.tsx';
import {NestedReactApp} from './NestedReactApp.tsx';

export const nestedRoutes = createRoutesFromElements(
    <Route element={<NestedReactApp />}>
        <Route path="/news" element={<NestedContent />} />
        <Route path="/discussion/:discussion_id" element={<NestedContent />} />
        <Route path="/user/:user_id" element={<NestedContent />} />
        <Route path="/user/:user_id/post" element={<NestedContent />} />
        <Route path="/user/:user_id/friend" element={<NestedContent />} />
        <Route path="/404" element={<NestedContent />} />
        <Route path="*" element={<NestedContent />} />
    </Route>,
);

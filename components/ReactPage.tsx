import {useLocation} from 'react-router';

import {toAddress} from './address.ts';
import {Content} from './Content.tsx';

/** The routed page body for a React Router side. */
export const ReactPage = () => {
    const location = useLocation();
    return <Content address={toAddress(location)} />;
};

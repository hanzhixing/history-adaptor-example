import {useEffect, useState} from 'react';

/** Build the routers/histories once per mount and dispose them on unmount. */
export const useBuilt = <T extends {dispose: () => void}>(factory: () => T): T => {
    const [value] = useState(factory);

    useEffect(() => () => value.dispose(), [value]);

    return value;
};

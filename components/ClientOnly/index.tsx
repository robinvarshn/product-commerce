import { useEffect, useState } from 'react';
import { CTypes } from './client-only';

const ClientOnly = ({ children, ...delegated }: CTypes): JSX.Element | null => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <div {...delegated}>{children}</div>;
};

export default ClientOnly;

import React, { useMemo } from 'react';
import { formatBreadcrumb } from 'shared';
import styles from './index.css';

const Breadcrumb = ({ path }: { path: string }) => {
    const formattedPath = useMemo(() => formatBreadcrumb(path), [path]);

    return <div className={styles.Root}>{formattedPath || <br />}</div>;
};

export default Breadcrumb;

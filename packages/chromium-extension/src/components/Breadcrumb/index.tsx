import React, { useMemo } from 'react';
import { formatBreadcrumb } from 'shared';
import styles from './index.css';

const Breadcrumb = ({ path }: { path: string }) => {
    console.info(formatBreadcrumb);

    const formattedPath = useMemo(() => formatBreadcrumb(path), [path]);

    return <div className={styles.Root}>{formattedPath}</div>;
};

export default Breadcrumb;

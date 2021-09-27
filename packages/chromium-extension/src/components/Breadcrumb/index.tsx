import React, { useMemo } from 'react';
import { formatBreadcrumb } from 'shared';
import styles from './index.css';

const Breadcrumb = ({ path }: { path: string }) => {
    const formattedPath = useMemo(() => formatBreadcrumb(path), [path]);

    return (
        <div className={styles.Root}>
            {formattedPath && formattedPath.length ? (
                formattedPath.map((elem, i) => (
                    <>
                        <span>{elem}</span>
                        <span className={styles.Chevron}>{i < formattedPath.length - 1 && ''}</span>
                    </>
                ))
            ) : (
                <br />
            )}
        </div>
    );
};

export default Breadcrumb;

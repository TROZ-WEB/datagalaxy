import React, { Fragment, useMemo } from 'react';
import { formatBreadcrumb } from 'shared';
import styles from './index.css';

const Breadcrumb = ({ path, threshold = 3, ellipse = 10 }: { path: string; threshold?: number; ellipse?: number }) => {
    // TODO: if path undefined, that crash
    const formattedPath = useMemo(() => (path ? formatBreadcrumb(path, threshold, ellipse) : null), [path]);

    return (
        <div>
            {formattedPath && (
                <div className={styles.Root} title={formattedPath.default.join(' > ')}>
                    {formattedPath && formattedPath.shorten.length ? (
                        formattedPath.shorten.map((elem, i) => (
                            <Fragment key={elem}>
                                <span>{elem}</span>
                                <span className={styles.Chevron}>{i < formattedPath.shorten.length - 1 && ''}</span>
                            </Fragment>
                        ))
                    ) : (
                        <br />
                    )}
                </div>
            )}
        </div>
    );
};

export default Breadcrumb;

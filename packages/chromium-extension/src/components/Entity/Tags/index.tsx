import cx from 'clsx';
import React from 'react';
import styles from './index.css';

const Tags = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cx(styles.Root, className)}>{children}</div>;
};

Tags.Item = ({ tag, hideLabel = false }: { tag: string; hideLabel?: boolean }) => {
    return (
        <div className={styles.RootItem}>
            <span className={cx(styles.ColorPoint, styles[tag])} />
            {hideLabel && <span>{tag}</span>}
        </div>
    );
};

export default Tags;

import cx from 'clsx';
import React from 'react';
import { useStoreState } from '../../../store/hooks';
import styles from './index.css';

const Tags = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cx(styles.Root, className)}>{children}</div>;
};

Tags.Item = ({ tag, hideLabel = false }: { tag: string; hideLabel?: boolean }) => {
    const tags = useStoreState((state) => state.auth.tags);

    return (
        <div className={styles.RootItem}>
            <span
                className={styles.ColorPoint}
                style={{
                    backgroundColor: tags.find(({ label }) => label === tag).color,
                }}
            />
            {!hideLabel && <span>{tag}</span>}
        </div>
    );
};

export default Tags;

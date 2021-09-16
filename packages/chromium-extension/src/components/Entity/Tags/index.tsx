import cx from 'clsx';
import React from 'react';
import styles from './index.css';

const Tags = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.Root}>{children}</div>;
};

Tags.Item = ({ tag }: { tag: string }) => {
    return (
        <div className={styles.RootItem}>
            <span className={cx(styles.ColorPoint, styles[tag])} />
            <span>{chrome.i18n.getMessage(`entity_details_sections_general_tags_${tag.toLowerCase()}`)}</span>
        </div>
    );
};

export default Tags;

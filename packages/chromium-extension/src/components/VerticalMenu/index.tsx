import cx from 'clsx';
import React from 'react';
import ArrowLeft from '../../icons/ArrowLeft';
import CommentDuo from '../../icons/CommentDuo';
import FileTasksCheck from '../../icons/FileTasksCheck';
import Info from '../../icons/Info';
import Insight from '../../icons/Insight';
import Mapping from '../../icons/Mapping';
import styles from './index.css';

const VerticalMenu = () => {
    return (
        <div className={styles.Root}>
            <button className={cx(styles.MenuItem, styles.BackButton)} type="button">
                <ArrowLeft className={styles.BackButtonIcon} />
            </button>
            <button className={styles.MenuItem} type="button">
                <Info className={styles.MenuItemIcon} />
            </button>
            <button className={styles.MenuItem} type="button">
                <Insight className={styles.MenuItemIcon} />
            </button>
            <button className={styles.MenuItem} type="button">
                <Mapping className={styles.MenuItemIcon} />
            </button>
            <button className={styles.MenuItem} type="button">
                <CommentDuo className={styles.MenuItemIcon} />
            </button>
            <button className={styles.MenuItem} type="button">
                <FileTasksCheck className={styles.MenuItemIcon} />
            </button>
        </div>
    );
};

export default VerticalMenu;

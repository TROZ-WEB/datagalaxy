import cx from 'clsx';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import CommentDuo from '../../icons/CommentDuo';
// import FileTasksCheck from '../../icons/FileTasksCheck';
// import Notification from '../../icons/Notification';
import ArrowLeft from '../../icons/ArrowLeft';
import Search from '../../icons/Search';
import { useStoreState } from '../../store/hooks';
import Avatar from '../Avatar';
import WhiteLogo from '../../../assets/logo-icon.svg';
import styles from './index.css';

interface MenuItem {
    icon: React.ReactElement;
    path: string;
}

function isHistoryRoot(h: any) {
    if (!h) {
        return false;
    }

    if (h.length === 1) {
        return true;
    }

    return h.location.pathname === h.entries[0].pathname;
}

const Menu = () => {
    const { pathname } = useLocation();
    const history = useHistory();

    const { dgapi: url, user } = useStoreState((state) => state.auth);

    const canGoBack = !isHistoryRoot(history);

    const menuItems: MenuItem[] = [
        {
            icon: <Search className={styles.MenuItemImage} />,
            path: '/app/search',
        },
        // {
        //     icon: <CommentDuo className={styles.MenuItemImage} />,
        //     path: '/app/comments',
        // },
        // {
        //     icon: <FileTasksCheck className={styles.MenuItemImage} />,
        //     path: '/app/tasks',
        // },
        // {
        //     icon: <Notification className={styles.MenuItemImage} />,
        //     path: '/app/notifications',
        // },
        {
            icon: <Avatar size="mini" user={user} />,
            path: '/app/account',
        },
    ];

    return (
        <div className={styles.Root}>
            <div className={styles.flex}>
                {canGoBack && (
                    <button
                        className={cx(styles.TopMenuItem, styles.BackButton)}
                        onClick={() => {
                            history.goBack();
                        }}
                        type="button"
                    >
                        <ArrowLeft className={styles.BackButtonIcon} />
                    </button>
                )}
                <a href={url} rel="noreferrer" target="_blank">
                    <img alt="Datagalaxy logo" className={styles.Logo} src={WhiteLogo} />
                </a>
            </div>
            <div className={styles.MenuItemsContainer}>
                {menuItems.map(({ icon, path }) => (
                    <button
                        key={path}
                        className={cx(styles.MenuItem, { [styles.SelectedMenuItem]: path === pathname })}
                        onClick={() => history.push(path)}
                        type="button"
                    >
                        {icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;

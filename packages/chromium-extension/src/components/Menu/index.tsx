import cx from 'clsx';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import CommentDuo from '../../icons/CommentDuo';
// import FileTasksCheck from '../../icons/FileTasksCheck';
import Notification from '../../icons/Notification';
import Search from '../../icons/Search';
import EllipsePlaceHolder from '../../../assets/EllipsePlaceHolder.png';
import WhiteLogo from '../../../assets/white-logo.png';
import styles from './index.css';

interface MenuItem {
    icon: React.ReactElement;
    path: string;
}

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
    {
        icon: <Notification className={styles.MenuItemImage} />,
        path: '/app/notifications',
    },
    {
        icon: <img alt="Go to account" className={styles.MenuItemImage} src={EllipsePlaceHolder} />,
        path: '/app/account',
    },
];

const Menu = () => {
    const { pathname } = useLocation();
    const history = useHistory();

    return (
        <div className={styles.Root}>
            <img alt="Datagalaxy logo" className={styles.Logo} src={WhiteLogo} />
            <div className={styles.MenuItemsContainer}>
                {menuItems.map(({ icon, path }) => (
                    <button
                        key={path}
                        className={cx(styles.MenuItem, { [styles.SelectedMenuItem]: path === pathname })}
                        onClick={() => history.push(path)}
                        type="button"
                    >
                        {icon}
                        {/* <img alt={description} className={styles.MenuItemImage} src={icon} /> */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;

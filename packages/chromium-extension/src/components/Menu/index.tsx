import cx from 'clsx';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import styles from './index.css';

interface MenuItem {
    icon: string;
    path: string;
    description: string;
}

const menuItems: MenuItem[] = [
    {
        icon: Logo,
        path: '/app/search',
        description: 'Go to search',
    },
    {
        icon: Logo,
        path: '/app/comments',
        description: 'Go to comments',
    },
    {
        icon: Logo,
        path: '/app/tasks',
        description: 'Go to tasks',
    },
    {
        icon: Logo,
        path: '/app/notifications',
        description: 'Go to notifications',
    },
    {
        icon: Logo,
        path: '/app/account',
        description: 'Go to account',
    },
];

const Menu = () => {
    const { pathname } = useLocation();
    const history = useHistory();

    return (
        <div className={styles.Root}>
            <img alt="Datagalaxy logo" className={styles.Logo} src={Logo} />
            <div className={styles.MenuItemsContainer}>
                {menuItems.map(({ icon, path, description }) => (
                    <button
                        key={path}
                        className={cx(styles.MenuItem, { [styles.SelectedMenuItem]: path === pathname })}
                        onClick={() => history.push(path)}
                        type="button"
                    >
                        <img alt={description} className={styles.MenuItemImage} src={icon} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;

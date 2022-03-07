import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import CommentDuo from '../../icons/CommentDuo';
// import FileTasksCheck from '../../icons/FileTasksCheck';
// import Notification from '../../icons/Notification';
import styled, { css } from 'styled-components';
import Search from '../../icons/Search';
import { useStoreState, useStoreActions } from '../../store/hooks';
import Avatar from '../Avatar';
import SelectedMenu from '../../../assets/anchor-selected-menu.svg';
import Back from '../../../assets/icons/back.svg';
import WhiteLogo from '../../../assets/logo-icon.svg';

/* ---------- STYLES ---------- */

const SBackButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px !important;
`;

const SBackText = styled.span`
    color: #ffffff;
    margin-left: 12px;
`;

const SFlex = styled.div`
    display: flex;
    margin-left: 20px;
`;

const SLogo = styled.img`
    width: 27px;
`;

const SMenuItem = styled.button`
    all: unset;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 64px;
    font-family: 'Montserrat', sans-serif;

    ${(props) =>
        props.isSelected &&
        css`
            background: url(${SelectedMenu}) center bottom no-repeat;
            background-size: 34px;
        `}
`;

const SMenuItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
`;

const SRoot = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    height: 63px;
    width: 400px;
    background-color: #001030;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const SSearch = styled(Search)`
    width: 20px;
    height: 20px;
`;

/* ---------- COMPONENT ---------- */

interface MenuItem {
    icon: React.ReactElement;
    path: string;
}

function isHistoryRoot(h: any) {
    if (!h) {
        return false;
    }

    if (h.length === 1 || h.location.pathname === '/app/search') {
        return true;
    }

    return h.location.pathname === h.entries[0].pathname;
}

const Menu = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const { updateIsLoaded } = useStoreActions((actions) => actions.entity);

    const { dgapi: url, user } = useStoreState((state) => state.auth);

    const canGoBack = !isHistoryRoot(history);

    const menuItems: MenuItem[] = [
        {
            icon: <SSearch />,
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
        <SRoot>
            <SFlex>
                <a href={url} rel="noreferrer" target="_blank">
                    <SLogo alt="Datagalaxy logo" src={WhiteLogo} />
                </a>
                {canGoBack && (
                    <SBackButton
                        id="backButton"
                        onClick={() => {
                            updateIsLoaded(false);
                            history.goBack();
                        }}
                        type="button"
                    >
                        <SFlex>
                            <img alt="back" src={Back} />
                            <SBackText>{chrome.i18n.getMessage(`navigation_back`)}</SBackText>
                        </SFlex>
                    </SBackButton>
                )}
            </SFlex>
            <SMenuItemsContainer>
                {menuItems.map(({ icon, path }, index) => (
                    <SMenuItem
                        id={`menuItem${index}`}
                        key={path}
                        isSelected={path === pathname}
                        onClick={() => history.push(path)}
                        type="button"
                    >
                        {icon}
                    </SMenuItem>
                ))}
            </SMenuItemsContainer>
        </SRoot>
    );
};

export default Menu;

import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import VerticalMenuButton from './VerticalMenuButton';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    width: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f3f6ff;
    height: 100%;
    padding-top: 16px;
    box-sizing: border-box;
`;

/* ---------- COMPONENT ---------- */

interface VerticalMenuProps {
    URLLocation: string;
    childrenObjectsNumber: number;
    linkedObjectsNumber: number;
    commentsNumber: number;
}

const VerticalMenu: FC<VerticalMenuProps> = ({
    URLLocation,
    childrenObjectsNumber,
    linkedObjectsNumber,
    commentsNumber,
}) => {
    const history = useHistory();
    const path = useLocation().pathname.split('/').pop();

    const handleClickButton = (nextPath: string) => () => {
        history.replace(nextPath);
    };

    return (
        <SRoot>
            <VerticalMenuButton
                icon="Info"
                id="infoButton1"
                onClick={handleClickButton(`/app/entities/${URLLocation}/`)}
                tooltip={chrome.i18n.getMessage(`docking_panel_details`)}
                variant={path === '' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={childrenObjectsNumber}
                icon="Hierarchy"
                id="infoButton2"
                onClick={handleClickButton(`/app/entities/${URLLocation}/children-objects`)}
                tooltip={
                    childrenObjectsNumber === 0
                        ? chrome.i18n.getMessage(`docking_panel_no_descendants`)
                        : chrome.i18n.getMessage(`docking_panel_descendants`)
                }
                variant={path === 'children-objects' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={linkedObjectsNumber}
                icon="Mapping"
                id="infoButton3"
                onClick={handleClickButton(`/app/entities/${URLLocation}/linked-objects`)}
                tooltip={
                    linkedObjectsNumber === 0
                        ? chrome.i18n.getMessage(`docking_panel_no_related`)
                        : chrome.i18n.getMessage(`docking_panel_related`)
                }
                variant={path === 'linked-objects' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={commentsNumber}
                icon="CommentDuo"
                id="infoButton4"
                onClick={handleClickButton(`/app/entities/${URLLocation}/comments`)}
                tooltip={chrome.i18n.getMessage(`docking_panel_comments`)}
                variant={path === 'comments' && 'active'}
            />
        </SRoot>
    );
};

export default VerticalMenu;

import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EntityType } from 'shared';
import styled from 'styled-components';
import VerticalMenuButton from './VerticalMenuButton';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    width: 4%;
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: #f3f6ff;
    height: 100%;
    padding: 16px 0px;
    position: fixed;
`;

/* ---------- COMPONENT ---------- */

interface VerticalMenuProps {
    entity: EntityType;
    URLLocation: string;
}

const VerticalMenu: FC<VerticalMenuProps> = ({ entity, URLLocation }) => {
    const history = useHistory();
    const path = useLocation().pathname.split('/').pop();

    return (
        <SRoot>
            <VerticalMenuButton
                icon="Info"
                onClick={() => history.replace(`/app/entities/${URLLocation}/`)}
                variant={path === '' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={entity?.childrenCount}
                icon="Hierarchy"
                onClick={() => history.replace(`/app/entities/${URLLocation}/children-objects`)}
                variant={path === 'children-objects' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={100}
                icon="Mapping"
                onClick={() => history.replace(`/app/entities/${URLLocation}/linked-objects`)}
                variant={path === 'linked-objects' && 'active'}
            />
        </SRoot>
    );
};

export default VerticalMenu;

import React, { FC } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { EntityType } from 'shared';
import styled from 'styled-components';
import VerticalMenuButton from './VerticalMenuButton';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    width: 54px;
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: #f3f6ff;
    height: 100%;
    padding: 16px 0px;
`;

/* ---------- COMPONENT ---------- */

interface VerticalMenuProps {
    entity: EntityType;
}

const VerticalMenu: FC<VerticalMenuProps> = ({ entity }) => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const currentLocation = location.pathname.split('/').pop();

    return (
        <SRoot>
            <VerticalMenuButton
                icon="Info"
                onClick={() => history.replace(`${path}/`)}
                variant={currentLocation === '' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={100}
                icon="Hierarchy"
                onClick={() => history.replace(`${path}/linked-objects`)}
                variant={currentLocation === 'linked-objects' && 'active'}
            />
            <VerticalMenuButton
                badgeCount={entity?.childrenCount}
                icon="Mapping"
                onClick={() => history.replace(`${path}/descendants`)}
                variant={currentLocation === 'descendants' && 'active'}
            />
        </SRoot>
    );
};

export default VerticalMenu;

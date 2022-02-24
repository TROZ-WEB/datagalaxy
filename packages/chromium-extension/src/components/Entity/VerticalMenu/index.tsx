import React, { FC } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { EntityType } from 'shared';
import VerticalMenuButton from './VerticalMenuButton';
import styles from './index.css';

interface VerticalMenuProps {
    entity: EntityType;
}

const VerticalMenu: FC<VerticalMenuProps> = ({ entity }) => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const currentLocation = location.pathname.split('/').pop();

    return (
        <div className={styles.Root}>
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
                badgeCount={entity.childrenCount}
                icon="Mapping"
                onClick={() => history.replace(`${path}/descendants`)}
                variant={currentLocation === 'descendants' && 'active'}
            />
        </div>
    );
};

export default VerticalMenu;

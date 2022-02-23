import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import { useStoreDispatch, useStoreActions, useStoreState } from '../../store/hooks';
import Details from './pages/Details';
import styles from './index.css';

const EntityDetails = () => {
    const { path } = useRouteMatch();
    const quickEntityFromSearch = useStoreState((state) => state.search.selectedEntity);

    const dispatch = useStoreDispatch();
    const { updateDisplayedEntity } = useStoreActions((actions) => actions.entity);
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);

    useEffect(() => {
        const fetchEntity = async () => {
            await dispatch.entity.fetchEntity(quickEntityFromSearch?.location);
        };

        fetchEntity();

        return () => {
            // Clear loaded entity in search model and entity model
            updateDisplayedEntity(null);
            updateSelectedEntity(null);
        };
    }, [dispatch]);

    return (
        <div className={styles.Root}>
            <VerticalMenu />
            <div className={styles.Content}>
                <Switch>
                    <Route path={`${path}/insights`} exact>
                        To implements
                    </Route>
                    <Route path={`${path}/`} exact>
                        <Details />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default EntityDetails;

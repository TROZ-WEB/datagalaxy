import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import Details from './pages/Details';
import styles from './index.css';
import { useStoreDispatch, useStoreActions, useStoreState } from '../../store/hooks';

const EntityDetails = () => {
    const { path } = useRouteMatch();
    const quickEntityFromSearch = useStoreState((state) => state.search.selectedEntity);

    const dispatch = useStoreDispatch();
    const { updateDisplayedEntity } = useStoreActions((actions) => actions.entity);
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);

    useEffect(() => {
        const fetchEntity = async () => {
            await dispatch.entity.fetchEntity(quickEntityFromSearch.location);
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
                    <Route exact path={`${path}/insights`}>
                        To implements
                    </Route>
                    <Route exact path={`${path}/`}>
                        <Details />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default EntityDetails;

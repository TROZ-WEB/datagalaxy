import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { EntityType } from 'shared';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import SearchCardResult from '../../components/SearchForm/SearchCardResult/index';
import { useStoreDispatch, useStoreState } from '../../store/hooks';
import LinkedObjects from '../LinkedObjects';
import Details from './pages/Details';
import styles from './index.css';

const EntityDetails = () => {
    const initialEntity = useStoreState((state) => state.search.selectedEntity);
    const [entity, setEntity] = useState<EntityType>(initialEntity);
    const { path } = useRouteMatch();
    const quickEntityFromSearch = useStoreState((state) => state.search.selectedEntity);

    const dispatch = useStoreDispatch();

    useEffect(() => {
        const fetchEntity = async () => {
            await dispatch.entity.fetchEntity(quickEntityFromSearch?.location);
        };

        fetchEntity();
    }, [dispatch, quickEntityFromSearch]);

    return (
        <>
            <SearchCardResult ellipseBreadCrumb={9} entity={entity} alwaysExpanded />
            <div className={styles.Container}>
                <VerticalMenu entity={entity} />
                <div className={styles.Content}>
                    <Switch>
                        <Route path={`${path}/insights`} exact>
                            To implements
                        </Route>
                        <Route path={`${path}/`} exact>
                            <Details entity={entity} setEntity={setEntity} />
                        </Route>
                        <Route path={`${path}/linked-objects`} exact>
                            <LinkedObjects />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default EntityDetails;

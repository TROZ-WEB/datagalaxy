import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { EntityType } from 'shared';
import styled from 'styled-components';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import SearchCardResult from '../../components/SearchForm/SearchCardResult/index';
import { useStoreDispatch, useStoreState } from '../../store/hooks';
import LinkedObjects from '../LinkedObjects';
import Details from './pages/Details';

/* ---------- STYLES ---------- */

const SContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 0;
    height: 100%;
`;

const SContent = styled.div`
    padding: 11px;
    width: 289px;
`;

/* ---------- COMPONENT ---------- */

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
            <SearchCardResult ellipseBreadCrumb={9} entity={entity} alwaysExpanded entityPage />
            <SContainer>
                <VerticalMenu entity={entity} />
                <SContent>
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
                </SContent>
            </SContainer>
        </>
    );
};

export default EntityDetails;

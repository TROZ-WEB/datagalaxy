import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { EntityType } from 'shared';
import styled from 'styled-components';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import LoadingScreen from '../../components/LoadingScreen';
import EntityHeader from '../../components/ui/EntityHeader';
import { useStoreDispatch, useStoreState, useStoreActions } from '../../store/hooks';
import ChildrenObjects from './ChildrenObjects';
import LinkedObjects from './LinkedObjects';
import Details from './pages/Details';

/* ---------- STYLES ---------- */

const SContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 0;
    height: 90%;
    overflow: scroll;
`;

const SContent = styled.div`
    padding: 11px;
    width: 400px;
`;

/* ---------- COMPONENT ---------- */

const EntityPage = () => {
    const { URLLocation } = useParams();
    const dispatch = useStoreDispatch();
    const location = URLLocation.replace(new RegExp('\\.', 'g'), '/'); // Replace "." by "/" from url
    const dataType = location.split('/')[0];

    const fullyLoadedEntity = useStoreState((state) => state.entity.displayedEntity);
    const isLoaded = useStoreState((state) => state.entity.isLoaded);
    const { updateIsLoaded } = useStoreActions((actions) => actions.entity);

    const [entity, setEntity] = useState<EntityType>();

    useEffect(() => {
        const fetchEntity = async () => {
            await dispatch.entity.fetchEntity(location);
        };

        fetchEntity().then(() => updateIsLoaded(true));
    }, [dispatch, location]);

    useEffect(() => {
        if (fullyLoadedEntity) {
            setEntity({ ...fullyLoadedEntity, dataType });
        }
    }, [fullyLoadedEntity]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isLoaded && entity && Object.keys(entity).length !== 0 ? (
                <>
                    <EntityHeader ellipseBreadCrumb={9} entity={entity} alwaysExpanded entityPage />
                    <SContainer>
                        <VerticalMenu URLLocation={URLLocation} entity={entity} />
                        <SContent>
                            <Switch>
                                {/* <Route path={`/app/entities/${URLLocation}/insights`} exact>
                                    To implements
                                </Route> */}
                                <Route path={`/app/entities/${URLLocation}/`} exact>
                                    <Details entity={entity} />
                                </Route>
                                <Route path={`/app/entities/${URLLocation}/linked-objects`} exact>
                                    <LinkedObjects />
                                </Route>
                                <Route path={`/app/entities/${URLLocation}/children-objects`} exact>
                                    <ChildrenObjects entity={entity} />
                                </Route>
                            </Switch>
                        </SContent>
                    </SContainer>
                </>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
};

export default EntityPage;

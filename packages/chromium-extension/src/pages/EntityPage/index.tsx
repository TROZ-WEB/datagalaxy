import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { EntityType, ReverseDataTypeMapping } from 'shared';
import styled from 'styled-components';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import LoadingScreen from '../../components/LoadingScreen';
import EntityHeader from '../../components/ui/EntityHeader';
import { useStoreDispatch, useStoreState } from '../../store/hooks';
import ChildrenObjects from './ChildrenObjects';
import LinkedObjects from './LinkedObjects';
import Details from './pages/Details';

/* ---------- STYLES ---------- */

const SContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const SContent = styled.div`
    overflow-y: scroll;
    position: absolute;
    height: 80%;
    width: 100%;
    padding: 0px 4px 16px 68px;
    box-sizing: border-box;
`;

/* ---------- COMPONENT ---------- */

const EntityPage = () => {
    const { URLLocation } = useParams();
    const dispatch = useStoreDispatch();
    const location = URLLocation.replace(new RegExp('\\.', 'g'), '/'); // Replace "." by "/" from url
    const dataType = location.split('/')[0];

    const fullyLoadedEntity = useStoreState((state) => state.entity.displayedEntity);
    const screenConfiguration = useStoreState((state) => state.entity.screenConfiguration);

    const [entity, setEntity] = useState<EntityType>();

    useEffect(() => {
        dispatch.entity.fetchEntity(location);
    }, [dispatch, location]);

    useEffect(() => {
        if (fullyLoadedEntity) {
            setEntity({ ...fullyLoadedEntity, dataType, location });
            dispatch.entity.fetchScreenConfiguration({
                dataType: ReverseDataTypeMapping[dataType].toLowerCase(),
                versionId: fullyLoadedEntity.versionId,
                type: fullyLoadedEntity.type,
            });
        }
    }, [fullyLoadedEntity]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {entity && entity.type ? (
                <>
                    <EntityHeader entity={entity} id={`entityHeader${entity.id}`} alwaysExpanded entityPage />
                    <SContainer>
                        <VerticalMenu URLLocation={URLLocation} entity={entity} />
                        <SContent>
                            <Switch>
                                {/* <Route path={`/app/entities/${URLLocation}/insights`} exact>
                                    To implements
                                </Route> */}
                                <Route path={`/app/entities/${URLLocation}/`} exact>
                                    <Details entity={entity} screenConfiguration={screenConfiguration} />
                                </Route>
                                <Route path={`/app/entities/${URLLocation}/linked-objects`} exact>
                                    <LinkedObjects entity={entity} />
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

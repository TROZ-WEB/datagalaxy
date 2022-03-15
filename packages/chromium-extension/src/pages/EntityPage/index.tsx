import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { DataTypeMapping, EntityType, ReverseDataTypeMapping } from 'shared';
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
    padding: 0px 15px 13px 73px;
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

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);

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
        if (fullyLoadedEntity) {
            // API WORKAROUND 4 : API does not provide linked objects size.
            const fetchLinkedObjects = async () => {
                await dispatch.entity.fetchLinkedObjects({
                    id: fullyLoadedEntity.id,
                    dataType,
                    type: fullyLoadedEntity.type,
                    name:
                        dataType === DataTypeMapping.Property // API WORKAROUND 3 : API Ignore technical name for properties, should be fix in a moment
                            ? fullyLoadedEntity.name
                            : fullyLoadedEntity.technicalName,
                    versionId: location.split('/')[1],
                });
            };

            fetchLinkedObjects();
        }
    }, [fullyLoadedEntity]);

    useEffect(() => {
        if (linkedObjects) {
            // API WORKAROUND 4 : API does not provide linked objects size.
            let count = 0;
            Object.keys(linkedObjects).forEach((key) => {
                linkedObjects[key].forEach(() => {
                    count++;
                });
            });
            setEntity({ ...entity, linkedObjectsCount: count });
        }
    }, [linkedObjects]);

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

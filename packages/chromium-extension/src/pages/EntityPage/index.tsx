import React, { useEffect, useMemo, useState } from 'react';
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
    const location = useMemo<string>(() => URLLocation.replace(new RegExp('\\.', 'g'), '/'), [URLLocation]); // Replace "." by "/" from url
    const dataType = useMemo<string>(() => location.split('/')[0], [location]);

    const displayedEntity = useStoreState((state) => state.entity.displayedEntity);
    const screenConfiguration = useStoreState((state) => state.entity.screenConfiguration);

    const [entity, setEntity] = useState<EntityType>();

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);
    const technologies = useStoreState((state) => state.auth.technologies);

    useEffect(() => {
        dispatch.entity.fetchEntity({ location, technologies });
    }, [dispatch, location, technologies]);

    useEffect(() => {
        if (displayedEntity) {
            setEntity({ ...displayedEntity, dataType, location });
            dispatch.entity.fetchScreenConfiguration({
                dataType: ReverseDataTypeMapping[dataType].toLowerCase(),
                versionId: displayedEntity.versionId,
                type: displayedEntity.type,
            });

            // API WORKAROUND 4 : API does not provide linked objects size.
            const fetchLinkedObjects = async () => {
                await dispatch.entity.fetchLinkedObjects({
                    id: displayedEntity.id,
                    dataType,
                    type: displayedEntity.type,
                    name:
                        dataType === DataTypeMapping.Property // API WORKAROUND 3 : API Ignore technical name for properties, should be fix in a moment
                            ? displayedEntity.name
                            : displayedEntity.technicalName,
                    versionId: location.split('/')[1],
                });
            };

            fetchLinkedObjects();
        } else {
            setEntity(null);
        }
    }, [displayedEntity]);

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

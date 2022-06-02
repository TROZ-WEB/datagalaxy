import React, { useEffect, useMemo, useState } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { DataTypeMapping, EntityType, ReverseDataTypeMapping } from 'shared';
import styled from 'styled-components';
import VerticalMenu from '../../components/Entity/VerticalMenu';
import LoadingScreen from '../../components/LoadingScreen';
import EntityHeader from '../../components/ui/EntityHeader';
import { useStoreActions, useStoreDispatch, useStoreState } from '../../store/hooks';
import ChildrenObjects from './ChildrenObjects';
import Comments from './Comments';
import LinkedObjects from './LinkedObjects';
import Details from './pages/Details';

/* ---------- STYLES ---------- */

const SContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: calc(100% - 100px);
`;

const SContent = styled.div`
    height: 100%;
    width: 100%;
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
    const currentWorkspace = useStoreState((state) => state.entity.currentWorkspace);

    const [entity, setEntity] = useState<EntityType>();

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);
    const childrenObjects = useStoreState((state) => state.entity.childrenObjects);
    const technologies = useStoreState((state) => state.auth.technologies);
    const comments = useStoreState((state) => state.entity.comments);

    const [childrenObjectsNumber, setChildrenObjectsNumber] = useState(0);
    const [linkedObjectsNumber, setLinkedObjectsNumber] = useState(0);

    const { updateIsLoaded } = useStoreActions((state) => state.entity);
    const isLoaded = useStoreState((state) => state.entity.isLoaded);

    useEffect(() => {
        updateIsLoaded(false);
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

            const versionId = location.split('/')[1];

            const fetchChildrenObjects = async () => {
                dispatch.entity.fetchChildrenObjects({
                    parentId: displayedEntity.id,
                    dataType,
                    versionId,
                    technology: displayedEntity.technology,
                });
            };

            const fetchComments = async () => {
                dispatch.entity.fetchComments({
                    versionId,
                    entityId: displayedEntity.id,
                });
            };

            const fetchRecentlyAccessedObjects = async () => {
                setTimeout(() => {
                    // Waiting for backend to get information about accessed object
                    dispatch.entity.fetchRecentlyAccessedObjects();
                }, 2000);
            };

            fetchRecentlyAccessedObjects();
            fetchChildrenObjects();
            fetchLinkedObjects();
            fetchComments();
        } else {
            setEntity(null);
        }
    }, [displayedEntity]);

    useEffect(() => {
        if (linkedObjects) {
            // API WORKAROUND 4 : API does not provide linked objects size.
            let count = 0;
            Object.keys(linkedObjects)?.forEach((key) => {
                linkedObjects[key].forEach(() => {
                    count++;
                });
            });
            setLinkedObjectsNumber(count);
        }
    }, [linkedObjects]);

    useEffect(() => {
        if (childrenObjects) {
            const t = displayedEntity?.path?.split('\\');

            const entityPath = t?.[t.length - 1]?.toString();

            let count = 0;
            childrenObjects.forEach((co) => {
                if (co) {
                    const pathSplited = co?.path?.split('\\');

                    if (
                        pathSplited[pathSplited.length - 2] === entityPath ||
                        pathSplited[pathSplited.length - 3] === entityPath
                    ) {
                        count++;
                    }
                }
            });
            setChildrenObjectsNumber(count);
        }
    }, [childrenObjects]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isLoaded && entity && entity.type ? (
                <>
                    <EntityHeader
                        currentWorkspace={currentWorkspace}
                        entity={entity}
                        id={`entityHeader${entity.id}`}
                        alwaysExpanded
                        entityPage
                    />
                    <SContainer>
                        <VerticalMenu
                            URLLocation={URLLocation}
                            childrenObjectsNumber={childrenObjectsNumber}
                            commentsNumber={comments?.length ?? 0}
                            linkedObjectsNumber={linkedObjectsNumber}
                        />
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
                                <Route path={`/app/entities/${URLLocation}/comments`} exact>
                                    <Comments />
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

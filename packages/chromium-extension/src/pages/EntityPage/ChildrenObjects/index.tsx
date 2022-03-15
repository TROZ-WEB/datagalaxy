import React, { useEffect, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTypeMapping, EntityType } from 'shared';
import styled from 'styled-components';
import HorizontalSeparator from '../../../components/HorizontalSeparator';
import LoadingScreen from '../../../components/LoadingScreen';
import Accordion from '../../../components/ui/Accordion';
import EntityHeader from '../../../components/ui/EntityHeader';
import Spinner from '../../../components/ui/Spinner';
import { useStoreDispatch, useStoreState, useStoreActions } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    margin-top: 15px;
`;

const SEntityWrapper = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 6px;
    padding-top: 6px;
`;

const SSpinnerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0px;
`;

const SSubEntityWrapper = styled.span`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border: none;
    background: none;
    padding: 6px 0 6px 48px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
`;

/* ---------- COMPONENT ---------- */

interface ChildrenObjectsProps {
    entity: EntityType;
}

const ChildrenObjects: FC<ChildrenObjectsProps> = ({ entity }) => {
    // /!\ entity and childrenEntity types are not exactly the same
    const history = useHistory();
    const dispatch = useStoreDispatch();
    const childrenObjects = useStoreState((state) => state.entity.childrenObjects);
    const { updateIsLoaded } = useStoreActions((actions) => actions.entity);
    const [isChildrenLoaded, setIsChildrenLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (entity && !isChildrenLoaded) {
            const fetchChildrenObjects = async () => {
                await dispatch.entity.fetchChildrenObjects({
                    parentId: entity.id,
                    dataType: entity.dataType,
                    versionId: entity.versionId,
                });
            };

            fetchChildrenObjects().then(() => {
                setIsChildrenLoaded(true);
            });
        }
    }, [dispatch, entity]);

    const fetchGrandChildrenObjectsAPI = async (childrenEntity) => {
        await dispatch.entity.fetchGrandChildrenObjects({
            parentId: childrenEntity.id,
            dataType: DataTypeMapping[childrenEntity.dataType],
            versionId: childrenEntity.location.split('/')[1],
        });
    };

    useEffect(() => {
        const fetchDataAPI = async () => {
            if (isChildrenLoaded) {
                for (let i = 0; i < childrenObjects?.length; i++) {
                    if (childrenObjects[i].childrenCount > 0) {
                        // eslint-disable-next-line no-await-in-loop
                        await fetchGrandChildrenObjectsAPI(childrenObjects[i]);
                    }
                }
            }
        };

        fetchDataAPI();
    }, [isChildrenLoaded]);

    const handleClick = (childrenEntity) => {
        updateIsLoaded(false);
        setIsChildrenLoaded(false);
        const URLLocation = childrenEntity.location.replace(new RegExp('/', 'g'), '.'); // Replace "/" by "." in url
        history.push(`/app/entities/${URLLocation}/`);
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <SRoot>
            {isChildrenLoaded ? (
                childrenObjects?.map((childrenEntity) => (
                    <>
                        <Accordion
                            key={childrenEntity.id}
                            disabled={childrenEntity.childrenCount === 0}
                            header={
                                <SEntityWrapper onClick={() => handleClick(childrenEntity)}>
                                    <EntityHeader
                                        displayPath={false}
                                        entity={childrenEntity}
                                        id={`entityHeader${childrenEntity.id}`}
                                    />
                                </SEntityWrapper>
                            }
                            openButtonPosition="left"
                        >
                            {childrenEntity?.childrenObjects?.length > 0 ? (
                                childrenEntity?.childrenObjects?.map((grandChildrenEntity) => (
                                    <>
                                        <HorizontalSeparator />
                                        <SSubEntityWrapper
                                            key={grandChildrenEntity.id}
                                            onClick={() => handleClick(grandChildrenEntity)}
                                        >
                                            <EntityHeader
                                                entity={grandChildrenEntity}
                                                id={`entityHeader${grandChildrenEntity.id}`}
                                            />
                                        </SSubEntityWrapper>
                                    </>
                                ))
                            ) : (
                                <SSpinnerWrapper>
                                    <Spinner />
                                </SSpinnerWrapper>
                            )}
                        </Accordion>
                        <HorizontalSeparator />
                    </>
                ))
            ) : (
                <LoadingScreen />
            )}
        </SRoot>
    );
};

export default ChildrenObjects;

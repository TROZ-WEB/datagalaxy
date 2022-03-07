import React, { useEffect, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTypeMapping, EntityType } from 'shared';
import styled from 'styled-components';
import LoadingScreen from '../../../components/LoadingScreen';
import EntityHeader from '../../../components/ui/EntityHeader';
import Spinner from '../../../components/ui/Spinner/index';
import { useStoreDispatch, useStoreState, useStoreActions } from '../../../store/hooks';
import Accordion from './Accordion';

/* ---------- STYLES ---------- */

const SEntityWrapper = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
`;

const SRoot = styled.div`
    overflow-y: scroll;
    position: absolute;
    top: 192px;
    right: 4px;
    left: 68px;
    bottom: 0px;
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
    padding: 12px 0 12px 48px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 76, 255, 0.08);
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
        <SRoot>
            {isChildrenLoaded ? (
                childrenObjects?.map((childrenEntity) => (
                    <Accordion
                        key={childrenEntity.id}
                        childrenCount={childrenEntity.childrenCount}
                        header={
                            <SEntityWrapper onClick={() => handleClick(childrenEntity)}>
                                <EntityHeader entity={childrenEntity} id={`entityHeader${childrenEntity.id}`} />
                            </SEntityWrapper>
                        }
                        openButtonPosition="left"
                    >
                        {childrenEntity?.childrenObjects?.length > 0 ? (
                            childrenEntity?.childrenObjects?.map((grandChildrenEntity) => (
                                <SSubEntityWrapper
                                    key={grandChildrenEntity.id}
                                    onClick={() => handleClick(grandChildrenEntity)}
                                >
                                    <EntityHeader
                                        entity={grandChildrenEntity}
                                        id={`entityHeader${grandChildrenEntity.id}`}
                                    />
                                </SSubEntityWrapper>
                            ))
                        ) : (
                            <SSpinnerWrapper>
                                <Spinner />
                            </SSpinnerWrapper>
                        )}
                    </Accordion>
                ))
            ) : (
                <LoadingScreen />
            )}
        </SRoot>
    );
};

export default ChildrenObjects;

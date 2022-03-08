import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTypeMapping } from 'shared';
import styled from 'styled-components';
import Accordion from '../../../components/ui/Accordion';
import EntityHeader from '../../../components/ui/EntityHeader';
import { useStoreDispatch, useStoreActions, useStoreState } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SSubEntityWrapper = styled.span`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border: none;
    background: none;
    padding: 12px 0;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 76, 255, 0.08);
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
`;

const STitle = styled.div`
    font-weight: 700;
    font-size: 14px;
`;

/* ---------- COMPONENT ---------- */

const LinkedObjects = ({ entity }) => {
    const history = useHistory();

    const dispatch = useStoreDispatch();
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);

    useEffect(() => {
        if (entity) {
            const fetchLinkedObjects = async () => {
                await dispatch.entity.fetchLinkedObjects({
                    id: entity.id,
                    dataType: entity.dataType,
                    type: entity.type,
                    name:
                        entity.dataType === DataTypeMapping.Property // TODO: API Ignore technical for properties, should be fix in a moment
                            ? entity.name
                            : entity.technicalName,
                    versionId: entity.location.split('/')[1],
                });
            };

            fetchLinkedObjects();
        }

        return () => {};
    }, [dispatch, entity]);

    const handleClick = (linkedObject) => {
        updateSelectedEntity(linkedObject);
        history.push(`/app/entities/${linkedObject.id}/`);
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {linkedObjects &&
                Object.keys(linkedObjects).map((key) => (
                    <Accordion
                        header={<STitle>{chrome.i18n.getMessage(key)}</STitle>}
                        openButtonPosition="left"
                        initialOpen
                    >
                        {linkedObjects[key].map((linkedObject, idx) => (
                            <SSubEntityWrapper key={linkedObject.id} onClick={() => handleClick(linkedObject)}>
                                <EntityHeader entity={linkedObject} id={`entityHeader${idx}`} alwaysExpanded />
                            </SSubEntityWrapper>
                        ))}
                    </Accordion>
                ))}
        </>
    );
};

export default LinkedObjects;

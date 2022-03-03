import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTypeMapping } from 'shared';
import styled from 'styled-components';
import Accordion from '../../../components/Accordion';
import EntityHeader from '../../../components/ui/EntityHeader';
import { useStoreDispatch, useStoreActions, useStoreState } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SAccordionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 100%;
`;

const SSearchCardsResultWrapper = styled.div`
    overflow-y: scroll;
    height: 392px;
    margin-right: -17px;
    padding-right: 3px;
    margin-top: 15px;
`;

/* ---------- COMPONENT ---------- */

const LinkedObjects = () => {
    const quickEntityFromSearch = useStoreState((state) => state.search.selectedEntity);
    const history = useHistory();

    const dispatch = useStoreDispatch();
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);

    useEffect(() => {
        if (quickEntityFromSearch) {
            const fetchLinkedObjects = async () => {
                await dispatch.entity.fetchLinkedObjects({
                    id: quickEntityFromSearch.id,
                    dataType: DataTypeMapping[quickEntityFromSearch.dataType],
                    type: quickEntityFromSearch.type,
                    name:
                        DataTypeMapping[quickEntityFromSearch.dataType].entity === DataTypeMapping.Property // TODO: API Ignore technical for properties, should be fix in a moment
                            ? quickEntityFromSearch.name
                            : quickEntityFromSearch.technicalName,
                    versionId: quickEntityFromSearch.location.split('/')[1],
                });
            };

            fetchLinkedObjects();
        }

        return () => {};
    }, [dispatch, quickEntityFromSearch]);

    return (
        <div>
            {linkedObjects &&
                Object.keys(linkedObjects).map((key) => {
                    return (
                        <SAccordionWrapper>
                            <Accordion
                                openButtonPosition="left"
                                sizeOfTitle="big"
                                title={chrome.i18n.getMessage(key)}
                                initialOpen
                            >
                                <SSearchCardsResultWrapper>
                                    {linkedObjects[key].map((linkedObject) => {
                                        return (
                                            <EntityHeader
                                                key={linkedObject.id}
                                                entity={linkedObject}
                                                onClick={() => {
                                                    updateSelectedEntity(linkedObject);
                                                    history.push(`/app/entities/${linkedObject.id}/`);
                                                }}
                                                alwaysExpanded
                                                entityPage
                                            />
                                        );
                                    })}
                                </SSearchCardsResultWrapper>
                            </Accordion>
                        </SAccordionWrapper>
                    );
                })}
        </div>
    );
};

export default LinkedObjects;

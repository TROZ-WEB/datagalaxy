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

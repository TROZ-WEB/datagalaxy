import React from 'react';
import { useHistory } from 'react-router-dom';
import { EntityType } from 'shared';
import styled from 'styled-components';
import Accordion from '../../../components/ui/Accordion';
import EntityHeader from '../../../components/ui/EntityHeader';
import { useStoreActions, useStoreState } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SAccordion = styled(Accordion)`
    margin-top: 8px;
`;

const SEntityWrapper = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 6px 0px 6px 10px;
`;

const STitle = styled.div`
    font-weight: 700;
    font-size: 14px;
`;

const SCardResultContainer = styled.div`
    ${(props) =>
        !props.isLastElement ? 'border-top: 1px solid transparent' : `border-bottom: 1px solid rgba(0, 76, 255, 0.08)`}
    border-top: 1px solid transparent;
    padding-bottom: 3px;

    &:hover,
    &:focus {
        background: rgba(0, 76, 255, 0.08);
    }
`;

/* ---------- COMPONENT ---------- */

const LinkedObjects = () => {
    const history = useHistory();

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);
    const { updateEntity } = useStoreActions((actions) => actions.entity);

    const handleClick = (entityType: EntityType) => () => {
        updateEntity(null);
        const URLLocation = entityType.location.replace(new RegExp('/', 'g'), '.'); // Replace "/" by "." in url
        history.push(`/app/entities/${URLLocation}/`);
    };

    const currentWorkspace = useStoreState((state) => state.entity.currentWorkspace);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {linkedObjects &&
                Object.keys(linkedObjects).map((key) => (
                    <SAccordion
                        header={<STitle>{chrome.i18n.getMessage(key)}</STitle>}
                        openButtonPosition="left"
                        initialOpen
                    >
                        {linkedObjects[key].map((linkedObject: EntityType, index: number, array: EntityType[]) => (
                            <div key={linkedObject.id}>
                                <SCardResultContainer isLastElement={index === array.length - 1}>
                                    <SEntityWrapper onClick={handleClick(linkedObject)}>
                                        <EntityHeader
                                            currentWorkspace={currentWorkspace}
                                            entity={linkedObject}
                                            id={`entityHeader${index}`}
                                            alwaysExpanded
                                        />
                                    </SEntityWrapper>
                                </SCardResultContainer>
                            </div>
                        ))}
                    </SAccordion>
                ))}
        </>
    );
};

export default LinkedObjects;

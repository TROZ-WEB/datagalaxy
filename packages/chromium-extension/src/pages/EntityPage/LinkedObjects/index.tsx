import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Accordion from '../../../components/ui/Accordion';
import EntityHeader from '../../../components/ui/EntityHeader';
import { useStoreActions, useStoreState } from '../../../store/hooks';

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
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const STitle = styled.div`
    font-weight: 700;
    font-size: 14px;
`;

/* ---------- COMPONENT ---------- */

const LinkedObjects = () => {
    const history = useHistory();

    const linkedObjects = useStoreState((state) => state.entity.linkedObjects);
    const { updateDisplayedEntity } = useStoreActions((actions) => actions.entity);

    const handleClick = (e) => {
        updateDisplayedEntity(null);
        const URLLocation = e.location.replace(new RegExp('/', 'g'), '.'); // Replace "/" by "." in url
        history.push(`/app/entities/${URLLocation}/`);
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

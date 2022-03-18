import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import HorizontalSeparator from '../../../components/HorizontalSeparator';
import Accordion from '../../../components/ui/Accordion';
import EntityHeader from '../../../components/ui/EntityHeader';
import { useStoreActions, useStoreState } from '../../../store/hooks';

/* ---------- STYLES ---------- */

const SEntityWrapper = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 6px 0px;
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
                            <div key={linkedObject.id}>
                                <SEntityWrapper onClick={() => handleClick(linkedObject)}>
                                    <EntityHeader entity={linkedObject} id={`entityHeader${idx}`} alwaysExpanded />
                                </SEntityWrapper>
                                <HorizontalSeparator />
                            </div>
                        ))}
                    </Accordion>
                ))}
        </>
    );
};

export default LinkedObjects;

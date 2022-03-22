import React, { useRef } from 'react';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from '../../../store/hooks';
import RoundButton from '../../ui/RoundButton';
import Title from '../../ui/Title';
import FiltersModalTag from './FiltersModalTag';

/* ---------- STYLES ---------- */

const SFiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
`;

const SModal = styled.div`
    background: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
    position: absolute;
    width: 200px;
    top: 100%;
    left: 0;
    padding: 16px;
    z-index: 100;
`;

const SRoot = styled.div`
    position: relative;
    z-index: 500;
`;

const STitle = styled(Title)`
    margin-left: 4px;
`;

/* ---------- COMPONENT ---------- */

const FiltersModal = () => {
    const { AllFilters } = useStoreState((state) => state.modal);

    const filters = [
        { label: chrome.i18n.getMessage(`attribute_key_Workspace`), attributeKey: 'Workspace' },
        { label: chrome.i18n.getMessage(`attribute_key_TechnologyCode`), attributeKey: 'TechnologyCode' },
        { label: chrome.i18n.getMessage(`attribute_key_Module`), attributeKey: 'Module' },
        { label: chrome.i18n.getMessage(`attribute_key_EntityType`), attributeKey: 'EntityType' },
        { label: chrome.i18n.getMessage(`attribute_key_Domains`), attributeKey: 'Domains' },
        { label: chrome.i18n.getMessage(`attribute_key_DataOwners`), attributeKey: 'DataOwners' },
        { label: chrome.i18n.getMessage(`attribute_key_DataStewards`), attributeKey: 'DataStewards' },
        { label: chrome.i18n.getMessage(`attribute_key_EntityStatus`), attributeKey: 'EntityStatus' },
        { label: chrome.i18n.getMessage(`attribute_key_LastModified`), attributeKey: 'LastModificationTime' },
    ];

    const { updateModalState, updateModalTop } = useStoreActions((actions) => actions.modal);

    const filtersModal = useRef(null);
    const modalTop = filtersModal?.current?.getBoundingClientRect()?.bottom;

    const handleOpen = () => {
        updateModalTop(modalTop);
        updateModalState({ modal: 'Overlay', isOpen: true });
        updateModalState({ modal: 'AllFilters', isOpen: true });
    };

    const handleClick = (attributeKey) => {
        updateModalState({ modal: attributeKey, isOpen: true });
        updateModalState({ modal: 'AllFilters', isOpen: false });
    };

    return (
        <SRoot>
            <RoundButton ref={filtersModal} icon="FilterEmpty" onClick={handleOpen} />
            {AllFilters && (
                <SModal onClick={(e) => e.stopPropagation()}>
                    <STitle>{chrome.i18n.getMessage(`filter_by`)}</STitle>
                    <SFiltersContainer>
                        {filters.map(({ label, attributeKey }) => (
                            <FiltersModalTag label={label} onClick={() => handleClick(attributeKey)} />
                        ))}
                    </SFiltersContainer>
                </SModal>
            )}
        </SRoot>
    );
};

export default FiltersModal;

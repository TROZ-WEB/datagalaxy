import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../ui/RoundButton';
import Title from '../../ui/Title';
import FilterModal from './FilterModal';
import OwnersModal from './Modals/OwnersModal';
import TechnologiesModal from './Modals/TechnologiesModal';
import WorkspacesModal from './Modals/WorkspacesModal';
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
    left: 0px;
    padding: 16px;
    z-index: 100;
`;

const SRoot = styled.div`
    position: relative;
`;

const STitle = styled(Title)`
    margin-left: 4px;
`;

/* ---------- COMPONENT ---------- */

const FiltersModal = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleBlur = () => {
        // setTimeout(() => setIsOpen(!isOpen), 200);
    };

    return (
        <SRoot>
            <RoundButton icon="FilterEmpty" onBlur={handleBlur} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <SModal>
                    <STitle>{chrome.i18n.getMessage(`filter_by`)}</STitle>
                    <SFiltersContainer>
                        <WorkspacesModal />
                        <TechnologiesModal />
                        <FilterModal fields={[]} label={chrome.i18n.getMessage(`attribute_key_Module`)} multiselect />
                        <FilterModal
                            fields={[]}
                            label={chrome.i18n.getMessage(`attribute_key_EntityType`)}
                            multiselect
                        />
                        <FilterModal fields={[]} label={chrome.i18n.getMessage(`attribute_key_Tags`)} multiselect />
                        <OwnersModal />
                        <FilterModal fields={[]} label={chrome.i18n.getMessage(`entity_steward`)} multiselect />
                        <FilterModal fields={[]} label={chrome.i18n.getMessage(`attribute_key_EntityStatus`)} />
                        <FilterModal fields={[]} label={chrome.i18n.getMessage(`attribute_key_LastModified`)} />
                    </SFiltersContainer>
                </SModal>
            )}
        </SRoot>
    );
};

export default FiltersModal;

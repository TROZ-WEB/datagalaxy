import React from 'react';
import styled from 'styled-components';
import RoundButton from '../../ui/RoundButton';
import Title from '../../ui/Title';
import DomainsModal from './Modals/DomainsModal';
import EntityTypeModal from './Modals/EntityTypeModal';
import LastModifiedModal from './Modals/LastModifiedModal';
import ModuleModal from './Modals/ModuleModal';
import OwnersModal from './Modals/OwnersModal';
import StatusModal from './Modals/StatusModal';
import StewardsModal from './Modals/StewardsModal';
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

    return (
        <SRoot>
            <RoundButton icon="FilterEmpty" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <SModal>
                    <STitle>{chrome.i18n.getMessage(`filter_by`)}</STitle>
                    <SFiltersContainer>
                        <WorkspacesModal />
                        <TechnologiesModal />
                        <ModuleModal />
                        <EntityTypeModal />
                        <DomainsModal />
                        <OwnersModal />
                        <StewardsModal />
                        <StatusModal />
                        <LastModifiedModal />
                    </SFiltersContainer>
                </SModal>
            )}
        </SRoot>
    );
};

export default FiltersModal;

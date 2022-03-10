import React, { FC } from 'react';
import styled from 'styled-components';
import Glyph from '../../ui/Glyph';
import FilterTag from './FilterTag';

/* ---------- STYLES ---------- */

const SModal = styled.div`
    background: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
    position: absolute;
    width: 370px;
    height: 340px;
    top: 50%;
    transform: translateY(-50%);
    left: 0px;
    padding: 16px;
    z-index: 100;
`;

const SOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #00103033;
`;

const SInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(2, 42, 142, 0.1);
    position: relative;
`;

const SInput = styled.input`
    width: 100%;
    border: none;
    padding: 4px;
    font-size: 14px;
`;

/* ---------- COMPONENT ---------- */

interface FilterModalProps {
    label: string;
}

const FilterModal: FC<FilterModalProps> = ({ label }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <FilterTag label={label} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <SOverlay>
                    <SModal>
                        <SInputContainer>
                            <Glyph icon="Search" />
                            <SInput placeholder="Search..." type="text" />
                        </SInputContainer>
                    </SModal>
                </SOverlay>
            )}
        </>
    );
};

export default FilterModal;

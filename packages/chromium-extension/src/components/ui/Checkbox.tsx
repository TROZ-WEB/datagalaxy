import React from 'react';
import styled from 'styled-components';
import type { Field } from '../SearchForm/SearchInput/ModalBase';
import Glyph from './Glyph';

/* ---------- STYLES ---------- */

const SGlyph = styled(Glyph)`
    color: #ffffff;
    font-size: 13px;
`;

const StyledCheckbox = styled.div`
    display: inline-block;
    width: 13px;
    height: 13px;
    background: ${(props) => (props.checked ? '#1035B1' : '#ffffff')};
    transition: all 150ms;
    border: 2px solid ${(props) => (props.checked ? '#1035B1' : '#C1C2DA')};
    flex: none;

    ${SGlyph} {
        visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
    }
`;

const CheckboxContainer = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    box-sizing: border-box;

    &:hover,
    &:focus {
        background-color: rgba(0, 26, 255, 0.08);
    }
`;

const SLabeLWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 13px;
    font-size: 13px;
    width: 100%;
    overflow: hidden;
`;

const SLabel = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SIconContainer = styled.span`
    margin-right: 8px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    field: Field;
    className?: string;
    onChange?: (field: Field) => void;
}

const Checkbox: React.FC<Props> = ({ field, className, onChange }) => {
    const handleClick = () => {
        onChange(field);
    };

    return (
        <CheckboxContainer className={className} htmlFor={field?.id} onClick={handleClick}>
            <StyledCheckbox checked={field?.checked}>
                <SGlyph icon="Check" />
            </StyledCheckbox>
            <SLabeLWrapper>
                {field?.icon && <SIconContainer>{field?.icon}</SIconContainer>}
                <SLabel>{field?.label}</SLabel>
            </SLabeLWrapper>
        </CheckboxContainer>
    );
};

export default Checkbox;

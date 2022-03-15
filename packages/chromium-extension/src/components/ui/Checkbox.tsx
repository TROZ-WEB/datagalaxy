import React, { useState } from 'react';
import styled from 'styled-components';
import Glyph from './Glyph';

/* ---------- STYLES ---------- */

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

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

    &:hover,
    &:focus {
        background-color: rgba(0, 26, 255, 0.08);
    }
`;

const SLabel = styled.span`
    margin-left: 13px;
    font-size: 13px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    label: string;
    id: string;
    className?: string;
    checked?: boolean;
    onChange?: (id) => void;
}

const Checkbox: React.FC<Props> = ({ label, id, className, checked = false, onChange, ...props }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = () => {
        onChange(id);
        setIsChecked(!isChecked);
    };

    return (
        <CheckboxContainer className={className} htmlFor={id}>
            <HiddenCheckbox checked={isChecked} id={id} onChange={handleChange} {...props} />
            <StyledCheckbox checked={isChecked}>
                <SGlyph icon="Check" />
            </StyledCheckbox>
            <SLabel>{label}</SLabel>
        </CheckboxContainer>
    );
};

export default Checkbox;

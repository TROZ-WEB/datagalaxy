import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
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

const SCheck = styled.div`
    background: #1035b1;
    width: 9px;
    height: 9px;
    border-radius: 9px;
    position: absolute;
    top: 2px;
    left: 2px;
`;

const StyledRadio = styled.div`
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 13px;
    background: '#ffffff';
    transition: all 150ms;
    border: 2px solid #1035b1;
    position: relative;

    ${SCheck} {
        visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
    }
`;

const RadioContainer = styled.label`
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

    ${(props) => props.bold && `font-weight:700`}
`;

/* ---------- COMPONENT ---------- */

interface Props {
    label: string;
    id: string;
    className?: string;
    checked?: boolean;
    bold?: boolean;
    onChange?: (id) => void;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const Radio: React.FC<Props> = ({
    label,
    id,
    className,
    checked = false,
    bold = false,
    onChange,
    setIsOpen,
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = () => {
        onChange(id);
        setIsChecked(!isChecked);
        setIsOpen(false);
    };

    return (
        <RadioContainer className={className} htmlFor={id}>
            <HiddenRadio checked={isChecked} id={id} onChange={handleChange} {...props} />
            <StyledRadio checked={isChecked}>
                <SCheck />
            </StyledRadio>
            <SLabel bold={bold}>{label}</SLabel>
        </RadioContainer>
    );
};

export default Radio;

import React, { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

/* ---------- STYLES ---------- */

const HiddenRadio = styled.input`
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
    border-radius: 50px;
    background: '#ffffff';
    transition: all 150ms;
    border: 2px solid #1035b1;
    position: relative;
    flex: none;
    margin: 3px;

    ${SCheck} {
        visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
    }
`;

const SLabel = styled.span`
    margin-left: 9px;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
`;

const SStyledRadioWrapper = styled.div`
    border-radius: 50px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
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

    ${(props) =>
        props.inline &&
        css`
            ${SLabel} {
                font-weight: 700;
            }

            &:hover,
            &:focus {
                background-color: transparent;

                ${SStyledRadioWrapper} {
                    background-color: rgba(0, 26, 255, 0.08);
                }
            }
        `}
`;

const SIconContainer = styled.span`
    margin-right: 8px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    field: {
        label: string;
        icon?: React.ReactNode;
        checked?: boolean;
        id: string;
    };
    className?: string;
    inline?: boolean;
    onChange?: () => void;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    name: string;
}

const Radio: React.FC<Props> = ({ field, className, inline = false, onChange, setIsOpen, name, ...props }) => {
    const handleChange = () => {
        onChange();
        // eslint-disable-next-line no-unused-expressions
        setIsOpen && setIsOpen(false);
    };

    return (
        <RadioContainer className={className} data-tip={field?.label} htmlFor={field?.id} inline={inline}>
            <HiddenRadio
                checked={field?.checked}
                id={field?.id}
                name={name}
                onChange={handleChange}
                type="radio"
                {...props}
            />
            <SStyledRadioWrapper>
                <StyledRadio checked={field?.checked}>
                    <SCheck />
                </StyledRadio>
            </SStyledRadioWrapper>
            <SLabel>
                {field?.icon && <SIconContainer>{field?.icon}</SIconContainer>} {field?.label}
            </SLabel>
        </RadioContainer>
    );
};

export default Radio;

import React, { useState, FC } from 'react';
import styled, { css } from 'styled-components';
import ArrowDrop from '../../../../assets/icons/arrow-drop-up.svg';

/* ---------- STYLES ---------- */

const SArrowDrop = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 8px;
    transition-duration: 0.2s;
    transform: rotate(180deg);

    ${(props) =>
        props.arrowDropUp &&
        css`
            transform: rotate(90deg);
        `}
`;

const SArrowButton = styled.button`
    border: none;
    background: none;
    padding: 12px 0;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;

    &:disabled {
        visibility: hidden;
    }
`;

const SContent = styled.div`
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
    height: auto;
    width: 100%;
    max-height: 9999px;

    ${(props) =>
        props.collapsed &&
        css`
            max-height: 0;
            transition: max-height 0.35s cubic-bezier(0, 1, 0, 1);
        `}
`;

const SHeader = styled.div`
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

    ${(props) =>
        props.reversed &&
        css`
            flex-direction: row-reverse;
            justify-content: flex-end;
        `}

    ${(props) =>
        props.size === 'big' &&
        css`
            font-size: 18px;
        `}
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #001030;
`;

/* ---------- COMPONENT ---------- */

interface AccordionProps {
    initialOpen?: boolean;
    header: string | React.ReactNode;
    children?: React.ReactNode;
    openButtonPosition?: string;
    sizeOfTitle?: string;
    disabled?: boolean;
}

const Accordion: FC<AccordionProps> = ({
    initialOpen = false,
    header,
    children,
    openButtonPosition = 'right',
    sizeOfTitle = 'normal',
    disabled,
}) => {
    const [isOpen, setOpen] = useState(initialOpen);

    const handleClick = () => {
        if (!disabled) {
            setOpen(!isOpen);
        }
    };

    return (
        <SRoot>
            <SHeader reversed={openButtonPosition === 'left'} sizeOfTitle={sizeOfTitle} type="button">
                {header}
                <SArrowButton disabled={disabled} type="button">
                    <SArrowDrop alt="Arrow icon" arrowDropUp={!isOpen} onClick={handleClick} src={ArrowDrop} />
                </SArrowButton>
            </SHeader>
            <SContent collapsed={!isOpen}>{children}</SContent>
        </SRoot>
    );
};

export default Accordion;

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ArrowDrop from '../../../assets/icons/arrow-drop-up.svg';

/* ---------- STYLES ---------- */

const SArrowDrop = styled.img`
    width: 20px;
    height: 20px;
    transition-duration: 0.4s;

    ${(props) =>
        props.arrowDropUp &&
        css`
            transform: rotate(-180deg);
        `}
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

const SHeader = styled.button`
    width: 100%;
    height: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    border: none;
    background: none;
    padding: 5px 0;
    cursor: pointer;

    ${(props) =>
        props.reversed &&
        css`
            flex-direction: row-reverse;
            justify-content: flex-end;
        `}
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #001030;
`;

const STitle = styled.span`
    font-size: 14px;
    ${(props) =>
        props.size === 'big' &&
        css`
            font-size: 18px;
        `}
`;

/* ---------- COMPONENT ---------- */

const Accordion = ({
    initialOpen = false,
    title,
    children,
    openButtonPosition = 'right',
    sizeOfTitle = 'normal',
}: {
    initialOpen?: boolean;
    title: string;
    children?: React.ReactNode;
    openButtonPosition?: string;
    sizeOfTitle?: string;
}) => {
    const [isOpen, setOpen] = useState(initialOpen);

    return (
        <SRoot>
            <SHeader onClick={() => setOpen(!isOpen)} reversed={openButtonPosition === 'left'} type="button">
                <STitle size={sizeOfTitle}>{title}</STitle>
                <SArrowDrop alt="Arrow icon" arrowDropUp={!isOpen} src={ArrowDrop} />
            </SHeader>
            <SContent collapsed={!isOpen}>{children}</SContent>
        </SRoot>
    );
};

export default Accordion;

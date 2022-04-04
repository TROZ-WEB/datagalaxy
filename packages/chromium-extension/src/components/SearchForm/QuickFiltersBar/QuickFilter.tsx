import React from 'react';
import styled, { css } from 'styled-components';

/* ---------- STYLES ---------- */

const SLabel = styled.div`
    color: #989cd9;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SImageContainer = styled.div`
    margin-right: 5px;
    align-items: center;
    display: flex;
`;

const SRoot = styled.div`
    background: #ffffff;
    height: 34px;
    padding: 4px 8px;
    width: 108px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: start;
    color: #001030;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-right: 8px;
    }

    ${(props) =>
        !props.displayMode &&
        css`
            &:hover,
            &:focus {
                background-color: #004cff14;
            }
            cursor: pointer;
        `}

    ${(props) => props.displayMode && `box-shadow: 0px 0px 14px rgba(16, 53, 177, 0.12);`}
`;

const STextContainer = styled.div`
    overflow: hidden;
`;

const SValue = styled.div`
    font-size: 11px;
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    filter: any;
    onClick: () => void;
    className?: string;
    displayMode?: boolean;
}

const QuickFilter = React.forwardRef(({ filter, onClick, className, displayMode }: Props, ref) => {
    return (
        <SRoot
            ref={ref}
            className={className}
            displayMode={displayMode}
            onClick={onClick}
            title={`${filter?.name}${filter?.content ? ` : ${filter?.content}` : ''}`}
        >
            {filter?.icon && <SImageContainer>{filter?.icon}</SImageContainer>}
            <STextContainer>
                <SLabel>{filter?.name}</SLabel>
                <SValue>{filter?.content ? filter?.content : '...'}</SValue>
            </STextContainer>
        </SRoot>
    );
});

export default QuickFilter;

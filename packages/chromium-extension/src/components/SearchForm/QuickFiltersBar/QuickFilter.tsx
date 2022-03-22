import React from 'react';
import styled from 'styled-components';
import DGGlyph from '../../ui/DGGlyph';

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
    max-width: 95px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #001030;
    box-sizing: border-box;

    &:not(:first-child) {
        margin-left: 8px;
    }

    &:hover,
    &:focus {
        background-color: #004cff14;
    }
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
}

const QuickFilter = React.forwardRef(({ filter, onClick }: Props, ref) => {
    return (
        <SRoot ref={ref} onClick={onClick}>
            <SImageContainer>{/* <DGGlyph icon={filter.icon} kind={filter.kind} /> */}</SImageContainer>
            <STextContainer>
                <SLabel>{chrome.i18n.getMessage(`attribute_key_${filter?.attributeKey}`)}</SLabel>
                <SValue>{filter?.values?.length === 1 && filter?.values?.[0]}</SValue>
            </STextContainer>
        </SRoot>
    );
});

export default QuickFilter;

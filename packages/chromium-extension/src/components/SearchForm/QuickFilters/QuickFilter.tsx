import React, { FC } from 'react';
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

interface QuickFilterProps {
    icon: string;
    kind: string;
    label: string;
    value: string;
}

const QuickFilter: FC<QuickFilterProps> = ({ icon, kind, label, value }) => {
    return (
        <SRoot>
            <SImageContainer>
                <DGGlyph icon={icon} kind={kind} />
            </SImageContainer>
            <STextContainer>
                <SLabel>{label}</SLabel>
                <SValue>{value}</SValue>
            </STextContainer>
        </SRoot>
    );
};

export default QuickFilter;

import React, { FC } from 'react';
import styled from 'styled-components';
import DGGlyph from '../../ui/DGGlyph';
import RoundButton from '../../ui/RoundButton';

/* ---------- STYLES ---------- */

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
    margin: 4px;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
`;

const SRoundButton = styled(RoundButton)`
    margin-left: 2px;
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

interface QuickFilterTagProps {
    icon: string;
    kind: string;
    value: string;
}

const QuickFilterTag: FC<QuickFilterTagProps> = ({ icon, kind, value }) => {
    return (
        <SRoot>
            <SImageContainer>
                <DGGlyph icon={icon} kind={kind} />
            </SImageContainer>
            <STextContainer>
                <SValue>{value}</SValue>
            </STextContainer>
            <SRoundButton icon="Cancelsearch" size="XS" />
        </SRoot>
    );
};

export default QuickFilterTag;

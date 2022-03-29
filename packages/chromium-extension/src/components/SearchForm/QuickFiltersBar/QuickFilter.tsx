import React from 'react';
import styled from 'styled-components';

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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: start;
    color: #001030;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-right: 8px;
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
    className?: string;
}

const QuickFilter = React.forwardRef(({ filter, onClick, className }: Props, ref) => {
    return (
        <SRoot
            ref={ref}
            className={className}
            onClick={onClick}
            title={`${
                chrome.i18n.getMessage(`attribute_key_${filter?.filter?.attributeKey}`) || filter?.filter?.attributeKey
            }${filter?.label ? ` : ${filter?.label}` : ''}`}
        >
            {filter?.icon && <SImageContainer>{filter?.icon}</SImageContainer>}
            <STextContainer>
                <SLabel>
                    {chrome.i18n.getMessage(`attribute_key_${filter?.filter?.attributeKey}`) ||
                        filter?.filter?.attributeKey}
                </SLabel>
                <SValue>{filter?.label ? filter?.label : '...'}</SValue>
            </STextContainer>
        </SRoot>
    );
});

export default QuickFilter;

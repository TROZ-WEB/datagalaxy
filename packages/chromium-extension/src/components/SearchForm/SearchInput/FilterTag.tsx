import React, { FC } from 'react';
import styled from 'styled-components';
import Title from '../../ui/Title';

/* ---------- STYLES ---------- */

const SLabel = styled.div`
    color: #989cd9;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SRoot = styled.div`
    background: #ffffff;
    width: 92px;
    padding: 4px 8px;
    max-width: 95px;
    border-radius: 3px;
    cursor: pointer;
    color: #001030;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px rgba(16, 53, 177, 0.14);
    margin: 4px;
`;

/* ---------- COMPONENT ---------- */

interface FilterTagProps {
    label: string;
    onClick?: () => void;
}

const FilterTag: FC<FilterTagProps> = ({ label, onClick }) => {
    return (
        <SRoot onClick={onClick}>
            <SLabel>{label}</SLabel>
            <Title>...</Title>
        </SRoot>
    );
};

export default FilterTag;

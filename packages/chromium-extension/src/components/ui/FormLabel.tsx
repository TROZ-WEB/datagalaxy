import React from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.span`
    font-size: 12px;
    line-height: 15px;
    font-weight: 700;
    color: #1035b1;
    margin-bottom: 7px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    children: React.ReactNode;
}

const FormLabel: React.FC<Props> = ({ children }) => {
    return <SRoot>{children}</SRoot>;
};

export default FormLabel;

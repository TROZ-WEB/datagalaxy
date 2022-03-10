import React, { FC } from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.h1`
    font-weight: 700;
    font-size: 14px;
    color: #001030;
`;

/* ---------- COMPONENT ---------- */

interface TitleProps {
    className?: string;
}

const Title: FC<TitleProps> = ({ children, className }) => {
    return <SRoot className={className}>{children}</SRoot>;
};

export default Title;

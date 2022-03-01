import React, { ReactNode } from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    width: 100%;
    height: 100%;
    background: #ffffff;
    color: #333333;
    position: absolute;
`;

/* ---------- COMPONENT ---------- */

const Layout = ({ children }: { children?: ReactNode }) => {
    return <SRoot>{children}</SRoot>;
};

export default Layout;

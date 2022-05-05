import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Menu from '../Menu';

/* ---------- STYLES ---------- */

const SContent = styled.div`
    height: 100%;
`;

const SRoot = styled.div`
    padding-top: 63px;
    height: 100%;
`;

/* ---------- COMPONENT ---------- */

const ConnectedLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <SRoot>
            <Menu />
            <SContent>{children}</SContent>
        </SRoot>
    );
};

export default ConnectedLayout;

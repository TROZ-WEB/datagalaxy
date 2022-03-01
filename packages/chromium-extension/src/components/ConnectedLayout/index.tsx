import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Menu from '../Menu';
// import FabMenu from '../ui/FabMenu';

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
            {/* <FabMenu /> */}
        </SRoot>
    );
};

export default ConnectedLayout;

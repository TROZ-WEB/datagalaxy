import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from '../../Theme';
import Menu from '../Menu';

/* ---------- STYLES ---------- */

const SContent = styled.div`
    height: calc(100% - ${Theme.menuBarHeight});
`;

const SRoot = styled.div`
    padding-top: ${Theme.menuBarHeight};
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

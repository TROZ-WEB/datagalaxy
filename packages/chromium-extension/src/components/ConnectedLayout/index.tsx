import React, { ReactNode } from 'react';
import Menu from '../Menu';
import FabMenu from '../ui/FabMenu';

const ConnectedLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <div>
            <Menu />
            {children}
            <FabMenu />
        </div>
    );
};

export default ConnectedLayout;

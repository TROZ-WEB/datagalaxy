import React, { ReactNode } from 'react';
import Menu from '../Menu';

const ConnectedLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <div>
            <Menu />
            {children}
        </div>
    );
};

export default ConnectedLayout;

import React, { ReactNode } from 'react';
import styles from './index.css';

const Layout = ({ children }: { children?: ReactNode }) => {
    return <div className={styles.root}>{children}</div>;
};

export default Layout;

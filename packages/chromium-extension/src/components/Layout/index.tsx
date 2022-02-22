import React, { ReactNode } from 'react';
import RoundButton from '../ui/RoundButton';
import styles from './index.css';

const Layout = ({ children }: { children?: ReactNode }) => {
    const handleCloseApp = () => {
        const root = window.document.getElementById('datagalaxy_root');
        root.classList.remove('datagalaxy_root--show');
    };

    return (
        <div className={styles.Root}>
            <div className={styles.CloseAppButton}>
                <RoundButton icon="CloseCircle" onClick={handleCloseApp} />
            </div>
            {children}
        </div>
    );
};

export default Layout;

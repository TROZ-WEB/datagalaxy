import React from 'react';
import LogoWithText from '../../../../assets/logo-with-text.png';
import styles from './index.css';

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.Root}>
            <div className={styles.Header}>
                <img alt="DataGaxy logo" className={styles.Logo} src={LogoWithText} />
            </div>
            <div className={styles.Body}>{children}</div>
        </div>
    );
};

export default OnboardingLayout;

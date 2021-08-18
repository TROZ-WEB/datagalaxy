import React from 'react';
import styles from './index.css';

interface Props {
    children: React.ReactNode;
    icon?: string;
    iconAltText?: string;
}

const Callout: React.FC<Props> = ({ children, icon, iconAltText }) => {
    return (
        <div className={styles.Root}>
            <img alt={iconAltText} className={styles.Icon} src={icon} />
            {children}
        </div>
    );
};

export default Callout;

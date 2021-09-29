import React from 'react';
import styles from './index.css';

interface Props {
    children: React.ReactNode;
}

const FormLabel: React.FC<Props> = ({ children }) => {
    return <span className={styles.Root}>{children}</span>;
};

export default FormLabel;

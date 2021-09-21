import cx from 'clsx';
import React from 'react';
import styles from './index.css';

const Alert = ({ type, children }: { type: 'success' | 'warning'; children: React.ReactNode }) => {
    return <div className={cx(styles.Root, styles[type])}>{children}</div>;
};

export default Alert;

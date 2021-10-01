import cx from 'clsx';
import React from 'react';
import styles from './index.css';

const Spinner = ({ size = 'normal' }: { size?: 'normal' | 'xs' | 'xl' }) => {
    return (
        <div
            className={cx(styles.Root, {
                [styles.NormalSpinner]: size === 'normal',
                [styles.XLSpinner]: size === 'xl',
                [styles.XSSpinner]: size === 'xs',
            })}
        />
    );
};

export default Spinner;

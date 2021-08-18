import cx from 'clsx';
import React from 'react';
import styles from './index.css';

interface Props {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'contained' | 'outlined';
    onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, onClick, type = 'button', variant = 'contained', ...rest }) => {
    return (
        <button
            className={cx(styles.Root, {
                [styles.Contained]: variant === 'contained',
                [styles.Outlined]: variant === 'outlined',
            })}
            onClick={onClick}
            // eslint-disable-next-line react/button-has-type
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;

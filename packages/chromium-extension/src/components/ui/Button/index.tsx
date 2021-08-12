import React from 'react';
import styles from './index.css';

interface Props {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, onClick, type = 'button', ...rest }) => {
    return (
        // eslint-disable-next-line react/button-has-type
        <button className={styles.Root} onClick={onClick} type={type} {...rest}>
            {children}
        </button>
    );
};

export default Button;

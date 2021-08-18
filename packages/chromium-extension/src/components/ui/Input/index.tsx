import React from 'react';
import styles from './index.css';

interface InputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    errors?: Object;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, name, type = 'text', errors, placeholder, ...rest }, ref) => {
        return (
            <div className={styles.Root}>
                <label className={styles.Label} htmlFor={name}>
                    {label}
                </label>
                {errors && errors[name] && <p className={styles.HelperTextError}>{errors[name].message}</p>}
                <input ref={ref} className={styles.Input} name={name} placeholder={placeholder} type={type} {...rest} />
            </div>
        );
    },
);

export default Input;

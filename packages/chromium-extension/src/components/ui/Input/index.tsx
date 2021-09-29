import cx from 'clsx';
import React from 'react';
import styles from './index.css';

interface InputProps {
    name: string;
    label: string | React.ReactNode;
    type?: string;
    placeholder?: string;
    errors?: Object;
    disabled?: boolean;
    readOnly?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, name, type = 'text', errors, placeholder, disabled = false, readOnly = false, ...rest }, ref) => {
        return (
            <div className={styles.Root}>
                <label className={styles.Label} htmlFor={name}>
                    {label}
                </label>
                {errors && errors[name] && <p className={styles.HelperTextError}>{errors[name].message}</p>}
                <input
                    ref={ref}
                    className={cx(styles.Input, {
                        [styles.Disabled]: disabled || readOnly,
                    })}
                    disabled={disabled}
                    name={name}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    type={type}
                    {...rest}
                />
            </div>
        );
    },
);

export default Input;

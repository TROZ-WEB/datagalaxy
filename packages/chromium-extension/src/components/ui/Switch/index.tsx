import cx from 'clsx';
import React from 'react';
import styles from './index.css';

interface InputProps {
    name: string;
    label: string;
    value: boolean;
    onChange: Function;
}

const Switch = React.forwardRef<HTMLInputElement, InputProps>(
    ({ name, label, value: checked, onChange, ...rest }, ref) => {
        const triggerCheckbox = () => {
            onChange(!checked);
        };

        return (
            <div className={styles.Root}>
                <div
                    className={cx(styles.Switch, { [styles.Checked]: checked })}
                    onClick={triggerCheckbox}
                    onKeyDown={triggerCheckbox}
                    role="button"
                    tabIndex={0}
                >
                    <span className={cx(styles.SwitchSlider, { [styles.SwitchSliderChecked]: checked })} />
                </div>
                <div className={styles.LabelWrapper}>
                    <label htmlFor={name}>{label}</label>
                </div>
                <input
                    ref={ref}
                    className={styles.Checkbox}
                    defaultChecked={checked}
                    name={name}
                    type="checkbox"
                    {...rest}
                />
            </div>
        );
    },
);

export default Switch;

import cx from 'clsx';
import React from 'react';
import Glyph from '../Glyph/index';
import styles from './index.css';

interface Props {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'mini' | 'primary';
    onClick?: () => void;
    icon: string;
}

const RoundButton: React.FC<Props> = ({ onClick, icon, type = 'button', variant, ...rest }) => {
    return (
        <button
            className={cx(styles.Root, {
                [styles.Mini]: variant === 'mini',
                [styles.Primary]: variant === 'primary',
            })}
            onClick={onClick}
            // eslint-disable-next-line react/button-has-type
            type={type}
            {...rest}
        >
            <Glyph icon={icon} />
        </button>
    );
};

export default RoundButton;

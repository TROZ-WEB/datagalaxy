import cx from 'clsx';
import React from 'react';
import Glyph from '../../../ui/Glyph';
import styles from './index.css';

interface Props {
    variant?: 'active' | '';
    onClick?: () => void;
    icon: string;
    badgeCount?: number;
}

const VerticalMenuButton: React.FC<Props> = ({ onClick, icon, variant, badgeCount, ...rest }) => {
    return (
        <button
            className={cx(styles.Root, {
                [styles.Active]: variant === 'active',
                [styles.Disabled]: badgeCount === 0,
            })}
            disabled={badgeCount === 0}
            onClick={onClick}
            type="button"
            {...rest}
        >
            <Glyph icon={icon} />
            {badgeCount > 0 && <span className={styles.Badge}>{badgeCount > 99 ? '99+' : badgeCount}</span>}
        </button>
    );
};

export default VerticalMenuButton;

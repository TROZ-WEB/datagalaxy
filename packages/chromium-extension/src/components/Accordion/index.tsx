import cx from 'clsx';
import React, { useMemo, useState } from 'react';
import ArrowDrop from '../../../assets/icons/arrow-drop-up.svg';
import styles from './index.css';

const Accordion = ({
    initialOpen = false,
    title,
    children,
    openButtonPosition = 'right',
    sizeOfTitle = 'normal',
}: {
    initialOpen?: boolean;
    title: string;
    children?: React.ReactNode;
    openButtonPosition?: string;
    sizeOfTitle?: string;
}) => {
    const [isOpen, setOpen] = useState(initialOpen);

    const computedTitleClass = useMemo(() => {
        switch (sizeOfTitle) {
            case 'normal':
                return 'NormalTitle';
            case 'big':
                return 'BigTitle';
            default:
                return 'NormalTitle';
        }
    }, [sizeOfTitle]);

    return (
        <div className={styles.Root}>
            <button
                className={cx(styles.Header, { [styles.Reversed]: openButtonPosition === 'left' })}
                onClick={() => setOpen(!isOpen)}
                type="button"
            >
                <span className={styles[computedTitleClass]}>{title}</span>
                <img
                    alt="Arrow icon"
                    className={cx(styles.ArrowDrop, {
                        [styles.ArrowDropUp]: !isOpen,
                    })}
                    src={ArrowDrop}
                />
            </button>
            <div
                className={cx(styles.Content, {
                    [styles.Collapsed]: !isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;

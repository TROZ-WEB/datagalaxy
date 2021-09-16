import cx from 'clsx';
import React, { useState } from 'react';
import ArrowDrop from '../../../assets/icons/arrow-drop-up.svg';
import styles from './index.css';

const Accordion = ({
    initialOpen = false,
    title,
    children,
}: {
    initialOpen?: boolean;
    title: string;
    children?: React.ReactNode;
}) => {
    const [isOpen, setOpen] = useState(initialOpen);

    return (
        <div className={styles.Root}>
            <button className={styles.Header} onClick={() => setOpen(!isOpen)} type="button">
                <span>{title}</span>
                <img
                    alt="Arrow icon"
                    className={cx(styles.ArrowDrop, { [styles.ArrowDropUp]: !isOpen })}
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

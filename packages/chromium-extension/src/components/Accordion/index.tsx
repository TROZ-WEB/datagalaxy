import React, { useState } from 'react';
import cx from 'clsx';
import styles from './index.css';
import ArrowDrop from '../../../assets/icons/arrow-drop-up.svg';

const Accordion = ({
    initialOpen = false,
    title,
    children,
}: {
    initialOpen?: boolean;
    title: string;
    children: React.ReactNode;
}) => {
    const [isOpen, setOpen] = useState(initialOpen);
    return (
        <div className={styles.Root}>
            <div className={styles.Header} onClick={() => setOpen(!isOpen)}>
                <span>{title}</span>
                <img className={cx(styles.ArrowDrop, { [styles.ArrowDropUp]: !isOpen })} src={ArrowDrop} />
            </div>
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

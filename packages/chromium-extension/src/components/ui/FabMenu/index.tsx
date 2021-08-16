import cx from 'clsx';
import React, { useState } from 'react';
import styles from './index.css';

const FabMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const actionButtonsClassName = cx(styles.CircleButton, styles.ActionButton, {
        [styles.ActionButtonVisible]: isExpanded,
    });

    const handlePressToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={cx(styles.Root, { [styles.Expanded]: isExpanded })}>
            <button className={cx(styles.CircleButton, styles.ToggleButton)} onClick={handlePressToggle} type="button">
                TMP
            </button>

            <div className={cx(styles.ActionButtonsContainer, { [styles.ActionButtonsContainerExpanded]: isExpanded })}>
                <button className={cx(actionButtonsClassName, styles.SecondActionButton)} type="button">
                    <span>2</span>
                </button>

                <button className={actionButtonsClassName} type="button">
                    1
                </button>
            </div>
        </div>
    );
};

export default FabMenu;

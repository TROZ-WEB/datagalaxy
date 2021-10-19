import cx from 'clsx';
import React from 'react';
import styles from './index.css';

interface StepperProgressProps {
    nbSteps: number;
    currentStep: number;
}

const StepperProgress: React.FC<StepperProgressProps> = ({ nbSteps, currentStep }) => {
    return (
        <div className={styles.Root}>
            {Array(nbSteps)
                .fill(0)
                .map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i} className={styles.StepWrapper}>
                        <span className={cx(styles.StepNumber, { [styles.ActiveNumber]: i + 1 <= currentStep })}>
                            {i + 1}
                        </span>
                        {i + 1 < nbSteps && (
                            <span className={cx(styles.StepTrait, { [styles.ActiveTrait]: i + 1 < currentStep })} />
                        )}
                    </div>
                ))}
        </div>
    );
};

export default StepperProgress;

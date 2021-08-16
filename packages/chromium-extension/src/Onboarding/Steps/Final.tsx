import React from 'react';
import { useHistory } from 'react-router-dom';
import { StepProps } from '../Stepper';
import styles from './index.css';

/**
 * Final step
 */
const StepFinal: React.FC<StepProps> = ({ currentStep, step }) => {
    const history = useHistory();

    const onClick = () => {
        chrome.storage.local.set({ onboardingDone: true });

        history.push('/app');
    };

    if (currentStep !== step) {
        return null;
    }

    return (
        <div>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_final_stepTitle1')}</p>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_final_stepTitle2')}</p>
            <button type="button">{chrome.i18n.getMessage('onboarding_final_discoverFeaturesButton')}</button>
            <button onClick={onClick} type="button">
                {chrome.i18n.getMessage('onboarding_final_skipButton')}
            </button>
        </div>
    );
};

export default StepFinal;

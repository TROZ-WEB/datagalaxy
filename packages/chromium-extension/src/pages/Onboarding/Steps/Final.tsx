import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import AsyncStorageService from '../../../services/AsyncStorageService';
import { StepProps } from '../Stepper';
import CheckIcon from '../../../../assets/icons/check-circle-filled.svg';
import styles from './index.css';

/**
 * Final step
 */
const StepFinal: React.FC<StepProps> = ({ currentStep, step }) => {
    const history = useHistory();

    const onClick = async () => {
        await AsyncStorageService.setData({ onboardingDone: true });

        history.push('/app');
    };

    if (currentStep !== step) {
        return null;
    }

    return (
        <div className={styles.Root}>
            <img alt="Check circle filled" className={styles.CheckIcon} src={CheckIcon} />
            <p className={styles.StepTitle}>
                {chrome.i18n.getMessage('onboarding_final_stepTitle1')}
                <br />
                {chrome.i18n.getMessage('onboarding_final_stepTitle2')}
            </p>
            <Button>{chrome.i18n.getMessage('onboarding_final_discoverFeaturesButton')}</Button>
            <div className={styles.SkipButtonWrapper}>
                <Button onClick={onClick} variant="outlined">
                    {chrome.i18n.getMessage('onboarding_final_skipButton')}
                </Button>
            </div>
        </div>
    );
};

export default StepFinal;

import React from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../Stepper';
import styles from './index.css';

type FormData = {
    sharedHistory: boolean;
    showNotifications: boolean;
};

/**
 * Ask for a Authorization, Sharing and Notifications
 */
const StepSetPreferences: React.FC<StepProps> = ({ goNextStep, currentStep, step }) => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = handleSubmit(() => {
        // TODO: Save the preferences on local storage ()

        if (true) {
            goNextStep();
        }
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_preferences_stepTitle')}</p>
            <div>
                <label htmlFor="sharedHistory">
                    {chrome.i18n.getMessage('onboarding_preferences_inputSharedHistory')}
                </label>
                <input id="sharedHistory" type="checkbox" {...register('sharedHistory')} />
            </div>
            <div>
                <label htmlFor="showNotifications">
                    {chrome.i18n.getMessage('onboarding_preferences_inputShowNotifications')}
                </label>
                <input id="showNotifications" type="checkbox" {...register('showNotifications')} />
            </div>
            <button type="submit">{chrome.i18n.getMessage('onboarding_nextButton')}</button>
        </form>
    );
};

export default StepSetPreferences;

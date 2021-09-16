import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Switch from '../../../components/ui/Switch';
import { useStoreActions } from '../../../store/hooks';
import { StepProps } from '../Stepper';
import styles from './index.css';

type FormData = {
    showNotifications: boolean;
};

/**
 * Ask for an Authorization, Sharing and Notifications
 */
const StepSetPreferences: React.FC<StepProps> = ({ goNextStep, currentStep, step }) => {
    const { control, handleSubmit } = useForm<FormData>();

    const updateShowNotifications = useStoreActions((actions) => actions.localPreferences.updateShowNotifications);

    const onSubmit = handleSubmit(async (values) => {
        updateShowNotifications(values.showNotifications);

        goNextStep();
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_preferences_stepTitle')}</p>
            <Controller
                control={control}
                name="showNotifications"
                render={({ field }) => (
                    <Switch
                        label={chrome.i18n.getMessage('onboarding_preferences_inputShowNotifications')}
                        {...field}
                    />
                )}
                defaultValue
            />
            <div className={styles.ButtonWrapper}>
                <Button type="submit">{chrome.i18n.getMessage('onboarding_nextButton')}</Button>
            </div>
        </form>
    );
};

export default StepSetPreferences;

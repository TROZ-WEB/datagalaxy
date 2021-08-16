import React from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../Stepper';
import styles from './index.css';

type FormData = {
    pin: string;
};

/**
 * Ask for a security code PIN
 */
const StepPIN: React.FC<StepProps> = ({ goNextStep, currentStep, step }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
    } = useForm<FormData>();

    const onSubmit = handleSubmit(() => {
        // TODO: Save the pin on local storage ()

        if (true) {
            goNextStep();
        }
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_pin_stepTitle')}</p>
            <p>{chrome.i18n.getMessage('onboarding_pin_stepSubTitle')}</p>
            <div>
                <label htmlFor="pin">{chrome.i18n.getMessage('onboarding_pin_inputPinLabel')}</label>
                {errors && errors.pin && <span>{errors.pin.message}</span>}
                <input
                    placeholder={chrome.i18n.getMessage('onboarding_pin_inputPinPlaceholder')}
                    type="number"
                    {...register('pin', { minLength: 4, maxLength: 4, pattern: /\d{4}/, valueAsNumber: true })}
                />
            </div>
            {/* En faire un composant 'callout' avec icone customizable */}
            <div>
                <span>ligth bulb</span>
                <p>{chrome.i18n.getMessage('onboarding_pin_callout')}</p>
            </div>
            <button type="submit">{chrome.i18n.getMessage('onboarding_nextButton')}</button>
        </form>
    );
};

export default StepPIN;

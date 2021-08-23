import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Callout from '../../../components/ui/Callout';
import Input from '../../../components/ui/Input';
import AsyncStorageService from '../../../services/AsyncStorageService';
import { StepProps } from '../Stepper';
import Insight from '../../../../assets/icons/insight.svg';
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
    } = useForm<FormData>();

    const onSubmit = handleSubmit(async (values) => {
        await AsyncStorageService.setData(values);

        goNextStep();
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_pin_stepTitle')}</p>
            <p className={styles.StepSubTitle}>{chrome.i18n.getMessage('onboarding_pin_stepSubTitle')}</p>
            <div>
                <Input
                    errors={errors}
                    label={chrome.i18n.getMessage('onboarding_pin_inputPinLabel')}
                    placeholder={chrome.i18n.getMessage('onboarding_pin_inputPinPlaceholder')}
                    {...register('pin', {
                        required: { value: true, message: chrome.i18n.getMessage('error_required_field') },
                        pattern: { value: /^[0-9]{4}$/, message: chrome.i18n.getMessage('error_pin_code_size') },
                        valueAsNumber: true,
                    })}
                />
            </div>
            <Callout icon={Insight}>{chrome.i18n.getMessage('onboarding_pin_callout')}</Callout>
            <div className={styles.ButtonWrapper}>
                <Button type="submit">{chrome.i18n.getMessage('onboarding_nextButton')}</Button>
            </div>
        </form>
    );
};

export default StepPIN;

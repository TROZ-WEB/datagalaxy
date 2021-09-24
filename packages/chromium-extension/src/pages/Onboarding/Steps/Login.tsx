import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouteMatch } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useStoreActions, useStoreState } from '../../../store/hooks';
import { StepProps } from '../Stepper';
import styles from './index.css';

type FormData = {
    email: string;
    pat: string;
};

/**
 * Ask for an Email and PAT
 */
const StepLogin: React.FC<StepProps> = ({ goNextStep, currentStep, step }) => {
    const { url } = useRouteMatch();
    const { auth, onboarding } = useStoreActions((actions) => actions);
    const { onboarding: onboardingState } = useStoreState((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            email: onboardingState.email,
            pat: atob(onboardingState.pat),
        },
    });

    const emailChanges = watch('email');
    const patChanges = watch('pat');

    useEffect(() => {
        onboarding.updateEmail(emailChanges);
        onboarding.updatePat(btoa(patChanges));
    }, [emailChanges, patChanges]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            await auth.loginWithPAT(values);
            await auth.fetchTags();
            await auth.fetchUser();

            onboarding.resetModel();
        } catch (error) {
            setError('pat', {
                message: error.message,
            });

            return;
        }

        goNextStep();
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <p className={styles.StepTitle}>{chrome.i18n.getMessage('onboarding_login_stepTitle')}</p>
            <Input
                errors={errors}
                label={chrome.i18n.getMessage('onboarding_login_inputEmailLabel')}
                {...register('email', { required: true })}
            />
            <Input
                errors={errors}
                label={chrome.i18n.getMessage('onboarding_login_inputPatLabel')}
                type="password"
                {...register('pat', { required: true })}
            />
            <div className={styles.FindPatHelper}>
                <Link to={`${url}/find-pat-helper`}>{chrome.i18n.getMessage('onboarding_login_findMyPat')}</Link>
            </div>
            <div className={styles.ButtonWrapper}>
                <Button type="submit">{chrome.i18n.getMessage('onboarding_login_submitForm')}</Button>
            </div>
        </form>
    );
};

export default StepLogin;

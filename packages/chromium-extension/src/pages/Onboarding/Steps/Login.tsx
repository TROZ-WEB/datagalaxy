import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useStoreActions, useStoreState } from '../../../store/hooks';
import { StepProps } from '../Stepper';

declare const pendo: any;

/* ---------- STYLES ---------- */

const SButtonWrapper = styled.div`
    margin-top: 42px;
    text-align: center;
    display: flex;
    justify-content: center;
`;

const SFindPatHelper = styled.div`
    text-align: right;
    margin-top: 1px;

    & > a {
        color: #1035b1;
        text-decoration: underline;
        font-size: 10px;
        line-height: 13px;

        &::hover,
        &::focus {
            color: #001030;
        }
    }
`;

const SStepTitle = styled.p`
    margin-top: 25px;
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
`;

/* ---------- COMPONENT ---------- */

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

    const user = useStoreState((s) => s.auth.user);
    const aT = useStoreState((s) => s.auth.getDecodedPat);

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

    /* useEffect(() => { // TODO: pendo implementation
        if (user?.userId && aT?.uid) {
            pendo.initialize({
                visitor: {
                    id: aT.uid,
                },

                account: {
                    id: aT.cid,
                },
            });
        }
    }, [user, aT]); */

    const onSubmit = handleSubmit(async (values) => {
        try {
            await auth.loginWithPAT(values);
            await auth.fetchTags();
            await auth.fetchWorkspaces();
            await auth.fetchUser();
            await auth.fetchTechnologies();
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
            <SStepTitle>{chrome.i18n.getMessage('onboarding_login_stepTitle')}</SStepTitle>
            <Input
                errors={errors}
                id="emailInput"
                label={chrome.i18n.getMessage('onboarding_login_inputEmailLabel')}
                {...register('email', { required: true })}
            />
            <Input
                errors={errors}
                id="patInput"
                label={chrome.i18n.getMessage('onboarding_login_inputPatLabel')}
                type="password"
                {...register('pat', { required: true })}
            />
            <SFindPatHelper>
                <Link to={`${url}/find-pat-helper`}>{chrome.i18n.getMessage('onboarding_login_findMyPat')}</Link>
            </SFindPatHelper>
            <SButtonWrapper>
                <Button id="submitButton" type="submit">
                    {chrome.i18n.getMessage('onboarding_login_submitForm')}
                </Button>
            </SButtonWrapper>
        </form>
    );
};

export default StepLogin;

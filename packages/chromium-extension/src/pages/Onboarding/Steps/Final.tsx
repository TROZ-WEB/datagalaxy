import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/ui/Button';
import { useStoreActions } from '../../../store/hooks';
import { StepProps } from '../Stepper';
import CheckIcon from '../../../../assets/icons/check-circle-filled.svg';

/* ---------- STYLES ---------- */

const SCheckIcon = styled.img`
    margin-top: 30px;
    height: 26px;
    width: 26px;
    color: #155724;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SSkipButtonWrapper = styled.div`
    margin-top: 19px;
`;

const SStepTitle = styled.p`
    margin-top: 25px;
    margin-bottom: 21px;
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
`;

/* ---------- COMPONENT ---------- */

const StepFinal: React.FC<StepProps> = ({ currentStep, step }) => {
    const history = useHistory();

    const updateOnboardingDone = useStoreActions((actions) => actions.auth.updateOnboardingDone);
    const onClick = async () => {
        updateOnboardingDone(true);

        history.push('/app');
    };

    if (currentStep !== step) {
        return null;
    }

    return (
        <SRoot>
            <SCheckIcon alt="Check circle filled" src={CheckIcon} />
            <SStepTitle>
                {chrome.i18n.getMessage('onboarding_final_stepTitle1')}
                <br />
                {chrome.i18n.getMessage('onboarding_final_stepTitle2')}
            </SStepTitle>
            <SSkipButtonWrapper>
                <Button onClick={onClick}>{chrome.i18n.getMessage('onboarding_final_skipButton')}</Button>
            </SSkipButtonWrapper>
        </SRoot>
    );
};

export default StepFinal;

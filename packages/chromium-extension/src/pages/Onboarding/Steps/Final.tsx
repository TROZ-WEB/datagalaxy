import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/ui/Button';
import { useStoreActions } from '../../../store/hooks';
import { StepProps } from '../Stepper';
import RocketIcon from '../../../../assets/icons/rocket.svg';

/* ---------- STYLES ---------- */

const SRocketIcon = styled.img`
    margin-top: 30px;
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
    line-height: 20px;
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
            <SRocketIcon alt="Check circle filled" src={RocketIcon} />
            <SStepTitle>
                {chrome.i18n.getMessage('onboarding_final_stepTitle1')}
                <br />
                {chrome.i18n.getMessage('onboarding_final_stepTitle2')}
            </SStepTitle>
            <SSkipButtonWrapper>
                <Button id="onboardingSkipButton" onClick={onClick}>
                    {chrome.i18n.getMessage('onboarding_final_skipButton')}
                </Button>
            </SSkipButtonWrapper>
        </SRoot>
    );
};

export default StepFinal;

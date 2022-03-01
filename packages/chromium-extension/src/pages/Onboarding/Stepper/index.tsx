import React, { useState } from 'react';
import styled from 'styled-components';
import OnboardingLayout from '../Layout';
import StepperProgress from './StepperProgress';

/* ---------- STYLES ---------- */

const STitle = styled.h1`
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
`;

/* ---------- COMPONENT ---------- */

interface StepperProps {
    steps: React.FC<StepProps>[];
}

export interface StepProps {
    goNextStep: () => void;
    goPreviousStep: () => void;
    currentStep: number;
    isLast: boolean;
    isFirst: boolean;
    step: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const goNextStep = () => {
        const nextStep = currentStep + 1;
        if (nextStep <= steps.length) {
            setCurrentStep(nextStep);
        }
    };
    const goPreviousStep = () => {
        const previousStep = currentStep - 1;
        if (previousStep >= 1) {
            setCurrentStep(previousStep);
        }
    };

    return (
        <OnboardingLayout>
            <STitle>{chrome.i18n.getMessage('onboarding_title')}</STitle>
            <StepperProgress currentStep={currentStep} nbSteps={steps.length} />
            <div className="stepper-selector">
                {steps.map((Step: React.FC<StepProps>, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                        <Step
                            currentStep={currentStep}
                            goNextStep={goNextStep}
                            goPreviousStep={goPreviousStep}
                            isFirst={index === 0}
                            isLast={index === steps.length - 1}
                            step={index + 1}
                        />
                    </div>
                ))}
            </div>
        </OnboardingLayout>
    );
};

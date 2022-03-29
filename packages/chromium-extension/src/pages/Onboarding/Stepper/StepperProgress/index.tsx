import React from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SStepNumber = styled.span`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #084eff;
    background-color: rgba(2, 42, 142, 0.1);
    border-radius: 50%;
    line-height: 10px;
    font-size: 10px;
    color: #ffffff;
    font-weight: 700;

    ${(props) => props.activeNumber && `background: #1035B1;`}
`;

const SStepTrait = styled.span`
    height: 1px;
    width: 23px;
    background-color: rgba(2, 42, 142, 0.1);

    ${(props) => props.activeTrait && `background-color: #084eff`}
`;

const SStepWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SRoot = styled.div`
    margin: 0 auto;
    padding: 30px 0;
    display: flex;
    justify-content: center;
`;

/* ---------- COMPONENT ---------- */

interface StepperProgressProps {
    nbSteps: number;
    currentStep: number;
}

const StepperProgress: React.FC<StepperProgressProps> = ({ nbSteps, currentStep }) => {
    return (
        <SRoot>
            {Array(nbSteps)
                .fill(0)
                .map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SStepWrapper key={i}>
                        <SStepNumber activeNumber={i + 1 <= currentStep}>{i + 1}</SStepNumber>
                        {i + 1 < nbSteps && <SStepTrait activeTrait={i + 1 < currentStep} />}
                    </SStepWrapper>
                ))}
        </SRoot>
    );
};

export default StepperProgress;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { StepProps } from '../Stepper';

/**
 * Final step
 */
const StepFinal: React.FC<StepProps> = ({ currentStep, step }) => {
    const history = useHistory();

    const onClick = () => {
        chrome.storage.local.set({ onboardingDone: true });

        history.push('/app');
    };

    if (currentStep !== step) {
        return null;
    }

    return (
        <div>
            <h2>
                <strong>Bravo !</strong>
            </h2>
            <p>Vous êtes désormais connecté.</p>
            <button type="button">VOIR LE DIDACTITIEL</button>
            <button onClick={onClick} type="button">
                {'Passer >'}
            </button>
        </div>
    );
};

export default StepFinal;

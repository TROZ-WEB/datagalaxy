import React from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../Stepper';

type FormData = {
    sharedHistory: boolean;
    showNotifications: boolean;
};

/**
 * Ask for a Authorization, Sharing and Notifications
 */
const StepSetPreferences: React.FC<StepProps> = ({ goNextStep, currentStep, step }) => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = handleSubmit(() => {
        // TODO: Save the preferences on local storage ()

        if (true) {
            goNextStep();
        }
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Autorisation & partage</h2>
            <div>
                <label htmlFor="sharedHistory">Connecter Chrome à mes historiques de recherches DataGalaxy</label>
                <input id="sharedHistory" type="checkbox" {...register('sharedHistory')} />
            </div>
            <div>
                <label htmlFor="showNotifications">Afficher les notifications sur le plugin</label>
                <input id="showNotifications" type="checkbox" {...register('showNotifications')} />
            </div>
            <button type="submit">Continuer</button>
        </form>
    );
};

export default StepSetPreferences;

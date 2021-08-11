import React from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../Stepper';

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
            <h2>Code PIN</h2>
            <p>
                Pour sécuriser votre compte, créez votre code PIN qui vous permettra de vous reconnecter simplement et
                efficacement
            </p>
            <div>
                <label htmlFor="email">Code PIN</label>
                {errors && errors.pin && <span>{errors.pin.message}</span>}
                <input
                    placeholder="ex: 1575"
                    type="number"
                    {...register('pin', { minLength: 4, maxLength: 4, pattern: /\d{4}/, valueAsNumber: true })}
                />
            </div>
            <div>
                <span>ligth bulb</span>
                <p>Pour plus de sécurité ne mettez pas votre année de naissance</p>
            </div>
            <button type="submit">Continuer</button>
        </form>
    );
};

export default StepPIN;

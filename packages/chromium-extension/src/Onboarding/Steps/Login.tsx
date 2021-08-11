import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouteMatch } from 'react-router-dom';
import { StepProps } from '../Stepper';

type FormData = {
    email: string;
    pat: string;
};

/**
 * Ask for a email and PAT
 */
const StepLogin: React.FC<StepProps> = ({ goNextStep, currentStep, step }) => {
    const { url } = useRouteMatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
    } = useForm<FormData>();

    const onSubmit = handleSubmit(() => {
        // TODO: Handle backend login with 'data'

        // Handle PAT error
        // if (PAT error) {
        //     setError('pat', {
        //         message:
        //             "Clé d'accès non reconnues, vérifiez les chiffres entrés ou envoyez un message à votre administrateur",
        //     });
        // }

        // eslint-disable-next-line no-constant-condition
        if (true) {
            goNextStep();
        }
    });

    if (currentStep !== step) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <span>Pour commencer, connectez-vous</span>
            <div>
                <label htmlFor="email">Identifiant</label>
                {errors && errors.email && <span>{errors.email.message}</span>}
                <input {...register('email')} placeholder="ex: julie@thetribe.io" />
            </div>
            <div>
                <label htmlFor="pat">Clé d&apos;accès</label>
                {errors && errors.pat && <span>{errors.pat.message}</span>}
                <input {...register('pat')} placeholder="ex: 7819281920111" />
            </div>
            <Link to={`${url}/find-pat-helper`}>Où trouver ma clé d&apos;accès</Link>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default StepLogin;

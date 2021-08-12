import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouteMatch } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { StepProps } from '../Stepper';
import styles from './index.css';

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
        // console.log('values : ', values);
        // TODO: Handle backend login with 'data'

        // Handle PAT error
        // if (true) {
        //     setError('pat', {
        //         message:
        //             "Clé d'accès non reconnues, vérifiez les chiffres entrés ou envoyez un message à votre administrateur",
        //     });

        //     return;
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
            <p className={styles.XX}>Pour commencer l&apos;expérience, connectez-vous</p>
            <Input errors={errors} label="Identifiant" {...register('email')} />
            <Input errors={errors} label="Clé d'accès" {...register('pat')} />
            <Link className={styles.FindPatHelper} to={`${url}/find-pat-helper`}>
                Où trouver ma clé d&apos;accès
            </Link>
            <div className={styles.ButtonWrapper}>
                <Button type="submit">Se connecter</Button>
            </div>
        </form>
    );
};

export default StepLogin;

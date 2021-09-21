import { useStore } from 'easy-peasy';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { decodeJWT } from 'shared';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useStoreActions, useStoreState, useStoreDispatch } from '../../store/hooks';
import styles from './index.css';

type FormData = {
    email: string;
    pat: string;
};

const Account = () => {
    const history = useHistory();
    const store = useStore();
    const pat = useStoreState((state) => state.auth.pat);

    const decodedPAT = decodeJWT(atob(pat));

    const { updatePATThunk } = useStoreActions((actions) => actions.auth);
    const dispatch = useStoreDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        defaultValues: {
            email: decodedPAT.email,
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await updatePATThunk(values.pat);
        } catch (error) {
            setError('pat', {
                message: error.message,
            });
        }

        // What to do ? Show something that indicates success?
    });

    return (
        <div className={styles.Root}>
            <form onSubmit={onSubmit}>
                <h2>Your parameters</h2>
                <fieldset disabled>
                    <Input
                        label={chrome.i18n.getMessage('onboarding_login_inputEmailLabel')}
                        {...register('email', { required: false })}
                    />
                </fieldset>
                <br />
                <h2>Update your access key</h2>
                <Input
                    errors={errors}
                    label={chrome.i18n.getMessage('onboarding_login_inputPatLabel')}
                    {...register('pat', { required: true })}
                />
                <br />
                <div className={styles.ButtonWrapper}>
                    <Button type="submit">Update your PAT</Button>
                </div>

                <button
                    className={styles.LogoutButton}
                    onClick={async () => {
                        await dispatch.auth.logout(store);

                        history.replace('/onboarding');
                    }}
                    type="button"
                >
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Account;

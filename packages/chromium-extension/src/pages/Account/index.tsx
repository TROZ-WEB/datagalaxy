import { useStore } from 'easy-peasy';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { decodeJWT } from 'shared';
import Alert from '../../components/Alert';
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
    const location = useLocation();

    /**
     * If we cannot reach the API or if the PAT has been revoked
     * We get redirected here with the flag 'isError' in order to
     * ask user check his credentials
     * [Temporary solution because we are currently not able to differentiate down api from revoked PAT]
     */
    const isGlobalError = location?.state?.isError;

    const store = useStore();
    const pat = useStoreState((state) => state.auth.pat);

    const decodedPAT = pat ? decodeJWT(atob(pat)) : null;

    const { updatePATThunk } = useStoreActions((actions) => actions.auth);
    const dispatch = useStoreDispatch();

    const [isAlertSuccessVisible, setIsAlertSuccessVisible] = useState<boolean>(false);
    const [isPATError, setIsPATError] = useState<boolean>(isGlobalError);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            email: decodedPAT ? decodedPAT.email : '',
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        if (!values.pat) {
            return;
        }

        try {
            setIsPATError(false);
            await updatePATThunk(values.pat);

            setValue('pat', '');
            setIsAlertSuccessVisible(true);
            setIsPATError(false);
        } catch (error) {
            setError('pat', {
                message: error.message,
            });
        }
    });

    return (
        <div className={styles.Root}>
            <form onSubmit={onSubmit}>
                <h2 className={styles.Title}>{chrome.i18n.getMessage('account_title')}</h2>
                <fieldset disabled>
                    <Input
                        label={chrome.i18n.getMessage('onboarding_login_inputEmailLabel')}
                        {...register('email', { required: false })}
                    />
                </fieldset>
                <br />
                <h2>Update your access key</h2>
                {isPATError && <Alert type="warning">{chrome.i18n.getMessage('global_error')}</Alert>}
                <Input
                    errors={errors}
                    label={chrome.i18n.getMessage('onboarding_login_inputNewPatLabel')}
                    type="password"
                    {...register('pat', { required: true })}
                />
                {isAlertSuccessVisible && <Alert type="success">Your access key has been updated successfully</Alert>}
                <br />
                <div className={styles.ButtonWrapper}>
                    <Button type="submit">Update your PAT</Button>
                </div>
            </form>
            <div>
                <div className={styles.VersionWrapper}>v{chrome.runtime.getManifest().version} - beta</div>
                <div className={styles.LogoutButton}>
                    <Button
                        onClick={async () => {
                            await dispatch.auth.logout(store);

                            history.push('/onboarding');
                        }}
                        type="button"
                        variant="outlined"
                    >
                        <span className={styles.LogoutIcon}></span>
                        <span>{chrome.i18n.getMessage('account_logout')}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Account;

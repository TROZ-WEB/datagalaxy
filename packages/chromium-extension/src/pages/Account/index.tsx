import { useStore } from 'easy-peasy';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { decodeJWT } from 'shared';
import styled from 'styled-components';
import Alert from '../../components/Alert';
import HorizontalSeparator from '../../components/HorizontalSeparator';
import Button from '../../components/ui/Button';
import FormLabel from '../../components/ui/FormLabel';
import Input from '../../components/ui/Input';
import { useStoreActions, useStoreState, useStoreDispatch } from '../../store/hooks';
import HelpCenterWhiteButton from '../../../assets/icons/help-center-white.svg';
import HelpCenterButton from '../../../assets/icons/help-center.svg';
import LogoutIcon from '../../../assets/icons/logout.svg';

/* ---------- STYLES ---------- */

const SFindPatHelper = styled.div`
    text-align: left;
    margin-top: 1px;

    & > a {
        color: #1035b1;
        text-decoration: underline;
        font-size: 10px;
        line-height: 13px;

        &:hover,
        &:focus {
            color: #001030;
        }
    }
`;

const SLogoutButton = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: center;
`;

const SLogoutIcon = styled.img`
    margin-right: 8px;
    color: #ffffff;
    width: 12px;
    height: 12px;
`;

const SHelpCenterIcon = styled.img`
    margin-bottom: 1px;
    margin-right: 8px;
`;

const SRoot = styled.div`
    height: 100%;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const STitle = styled.h1`
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
`;

const SVersionWrapper = styled.div`
    font-size: 14px;
    text-align: center;
    color: #6d6f88;
`;

const SSignoutDiv = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const SButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

/* ---------- COMPONENT ---------- */

type FormData = {
    email: string;
    pat: string;
};

const Account: FC = () => {
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

    const [buttonHovered, setButtonHovered] = useState(false);

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
        <SRoot>
            <form onSubmit={onSubmit}>
                <STitle>{chrome.i18n.getMessage('account_title')}</STitle>
                <Input
                    id="emailInput"
                    label={<FormLabel>{chrome.i18n.getMessage('onboarding_login_inputEmailLabel')}</FormLabel>}
                    disabled
                    readOnly
                    {...register('email', { required: false })}
                />
                <br />
                <HorizontalSeparator />
                <br />
                <STitle>{chrome.i18n.getMessage('account_update_pat')}</STitle>
                {isPATError && <Alert type="warning">{chrome.i18n.getMessage('global_error')}</Alert>}
                <Input
                    errors={errors}
                    id="patInput"
                    label={<FormLabel>{chrome.i18n.getMessage('onboarding_login_inputNewPatLabel')}</FormLabel>}
                    type="password"
                    {...register('pat', { required: true })}
                />
                <SFindPatHelper>
                    <Link to="/onboarding/find-pat-helper">{chrome.i18n.getMessage('onboarding_login_findMyPat')}</Link>
                </SFindPatHelper>
                {isAlertSuccessVisible && (
                    <Alert type="success">{chrome.i18n.getMessage('account_update_pat_successful')}</Alert>
                )}
                <br />
                <SButtonWrapper>
                    <Button id="updatePatButton" type="submit">
                        {chrome.i18n.getMessage('account_update_pat_button')}
                    </Button>
                </SButtonWrapper>
                <br />
                <STitle>{chrome.i18n.getMessage('help_center')}</STitle>
                <div
                    onFocus={() => {
                        setButtonHovered(true);
                    }}
                    onMouseLeave={() => {
                        setButtonHovered(false);
                    }}
                    onMouseOver={() => {
                        setButtonHovered(true);
                    }}
                >
                    <Button
                        id="helpCenterButton"
                        onClick={() => {
                            if (chrome.runtime.getManifest().current_locale.startsWith('fr')) {
                                window.open('https://datagalaxy.freshdesk.com/fr/support/home');
                            } else {
                                window.open('https://datagalaxy.freshdesk.com/en/support/home');
                            }
                        }}
                        type="button"
                        variant="outlined"
                    >
                        <SHelpCenterIcon
                            alt="Help center icon"
                            src={buttonHovered ? HelpCenterWhiteButton : HelpCenterButton}
                        />
                        <span>{chrome.i18n.getMessage('help_center_button')}</span>
                    </Button>
                </div>
            </form>
            <SSignoutDiv>
                <SVersionWrapper>v{chrome.runtime.getManifest().version} - beta</SVersionWrapper>
                <SLogoutButton>
                    <Button
                        id="logoutButton"
                        onClick={async () => {
                            await dispatch.auth.logout(store);

                            history.push('/onboarding');
                        }}
                        type="button"
                    >
                        <SLogoutIcon alt="Logout icon" src={LogoutIcon} />
                        <span>{chrome.i18n.getMessage('account_logout')}</span>
                    </Button>
                </SLogoutButton>
            </SSignoutDiv>
        </SRoot>
    );
};

export default Account;

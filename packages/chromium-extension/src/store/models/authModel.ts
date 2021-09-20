/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { Action, Actions, Thunk, thunk, action } from 'easy-peasy';
import { AccessToken, decodeJWT } from '../../../../shared/dist/shared';

export interface AuthModel {
    /* State */
    onboardingDone?: boolean;
    pat?: string;
    pubapi?: string;
    dgapi?: string;
    historyLocation?: string;
    /* Actions */
    updateOnboardingDone: Action<AuthModel, boolean>;
    updatePat: Action<AuthModel, string>;
    updatePubapi: Action<AuthModel, string>;
    updateDgapi: Action<AuthModel, string>;
    updateHistoryLocation: Action<AuthModel, string>;
    /* Thunks */
    loginWithPAT: Thunk<AuthModel, { pat: string; email: string }>;
}

/**
 * Thunks
 */

const loginWithPAT = thunk(async (actions: Actions<AuthModel>, payload: { pat: string; email: string }) => {
    let decodedPAT;
    // First decode the PAT
    try {
        decodedPAT = decodeJWT(payload.pat);
    } catch (error) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    if (decodedPAT === null) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    // Verify email from decoded pat equal provided pat
    if (decodedPAT.email !== payload.email) {
        throw new Error(chrome.i18n.getMessage('error_pat_email'));
    }

    // Then save it for future use
    actions.updatePat(btoa(payload.pat));

    // And save only useful JWT attributes to the localStorage
    actions.updatePubapi(decodedPAT.pubapi);
    actions.updateDgapi(decodedPAT.dgapi);

    // Init accessToken singleton
    const accessTokenHandler = AccessToken.getInstance();
    await accessTokenHandler.init(btoa(payload.pat));
});

/**
 * Auth Model Instance
 */

const authModel = async (): Promise<AuthModel> => {
    return {
        /* State */
        onboardingDone: false,
        pat: null,
        pubapi: '',
        dgapi: '',
        historyLocation: null,
        /* Actions */
        updateOnboardingDone: action((state, payload: boolean) => {
            state.onboardingDone = payload;
        }),
        updatePat: action((state, payload: string) => {
            state.pat = payload;
        }),
        updatePubapi: action((state, payload: string) => {
            state.pubapi = payload;
        }),
        updateDgapi: action((state, payload: string) => {
            state.dgapi = payload;
        }),
        updateHistoryLocation: action((state, payload: string) => {
            state.historyLocation = payload;
        }),
        /* Thunks */
        loginWithPAT,
    };
};

export default authModel;

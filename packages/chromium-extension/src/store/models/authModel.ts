/* eslint-disable import/no-cycle */
import { Action, Actions, Thunk, thunk } from 'easy-peasy';
import { decodeJWT } from '../../../../shared/dist/shared';
import AsyncStorageService from '../../Services/AsyncStorageService';
import { setState } from './helper';

export interface AuthModel {
    /* State */
    onboardingDone?: boolean;
    pat?: string;
    pubapi?: string;
    /* Actions */
    setState: Action<AuthModel, Partial<AuthModel>>;
    /* Thunks */
    loginWithPAT: Thunk<AuthModel, string>;
}

/**
 * Thunks
 */

const loginWithPAT = thunk(async (actions: Actions<AuthModel>, pat) => {
    let decodedPAT;
    // First decode the PAT
    try {
        decodedPAT = decodeJWT(pat);
    } catch (error) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    if (decodedPAT === null) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    // Then save it for future use
    await AsyncStorageService.setItem('pat', btoa(pat));
    actions.setState({ pat: btoa(pat) });

    // And save only useful JWT attributes to the localStorage
    await AsyncStorageService.setItem('pubapi', decodedPAT.pubapi);
    actions.setState({ pubapi: decodedPAT.pubapi });
});

/**
 * Auth Model Instance
 */

const authModel = async (): Promise<AuthModel> => {
    return {
        /* State */
        onboardingDone: await AsyncStorageService.getItem('onboardingDone'),
        pat: await AsyncStorageService.getItem('pat'),
        pubapi: await AsyncStorageService.getItem('pubapi'),
        /* Actions */
        setState,
        /* Thunks */
        loginWithPAT,
    };
};

export default authModel;

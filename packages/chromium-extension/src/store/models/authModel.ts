/* eslint-disable import/no-cycle */
import { action, Action, Actions, Thunk, thunk } from 'easy-peasy';
import { decodePAT, getAccessToken } from '../../../../shared/dist/shared';
import chromeExtensionStorageEngine from '../chromeExtensionStorageEngine';
import { setState } from './helper';

export interface AuthModel {
    /* State */
    onboardingDone?: boolean;
    pat?: string;
    accessToken?: string;
    pubapi?: string;
    /* Actions */
    setState: Action<AuthModel, Partial<AuthModel>>;
    /* Thunks */
    loginWithPAT: Thunk<AuthModel, string>;
    refreshAccessToken: Action<AuthModel>;
}

/**
 * Thunks
 */

const loginWithPAT = thunk(async (actions: Actions<AuthModel>, pat) => {
    let decodedPAT;
    // First decode the PAT
    try {
        decodedPAT = decodePAT(pat);
    } catch (error) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    if (decodedPAT === null) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    // Then save it for future use
    await chromeExtensionStorageEngine.setItem('pat', btoa(pat));
    actions.setState({ pat: btoa(pat) });

    // And save only useful JWT attributes to the localStorage
    await chromeExtensionStorageEngine.setItem('pubapi', decodedPAT.pubapi);
    actions.setState({ pubapi: decodedPAT.pubapi });

    // Finally save the access token aswell
    const accessToken = await getAccessToken(decodedPAT.pubapi, pat);

    if (accessToken) {
        await chromeExtensionStorageEngine.setItem('accessToken', btoa(accessToken));
        actions.setState({ accessToken: btoa(accessToken) });

        return;
    }

    throw new Error(chrome.i18n.getMessage('error_pat'));
});

/**
 * Auth Model Instance
 */

const authModel = async (): Promise<AuthModel> => {
    return {
        /* State */
        onboardingDone: await chromeExtensionStorageEngine.getItem('onboardingDone'),
        pat: await chromeExtensionStorageEngine.getItem('pat'),
        accessToken: await chromeExtensionStorageEngine.getItem('accessToken'),
        pubapi: await chromeExtensionStorageEngine.getItem('pubapi'),
        /* Actions */
        setState,
        /* Thunks */
        loginWithPAT,
        refreshAccessToken: action((state) => state), // TODO: to implement
    };
};

export default authModel;

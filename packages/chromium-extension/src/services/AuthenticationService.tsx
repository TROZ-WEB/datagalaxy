import { decodePAT, getAccessToken } from '../../../shared/dist/shared';
import AsyncStorageService from './AsyncStorageService';

class AuthenticationServices {
    static async loginWithPAT(pat: string) {
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
        await AsyncStorageService.setData({ pat: btoa(pat) });

        // And save only useful JWT attributes to the localStorage
        await AsyncStorageService.setData({ pubapi: decodedPAT.pubapi });

        // Finally save the access token aswell
        const accessToken = await getAccessToken(decodedPAT.pubapi, pat);

        if (accessToken) {
            await AsyncStorageService.setData({ accessToken: btoa(accessToken) });

            return;
        }

        throw new Error(chrome.i18n.getMessage('error_pat'));
    }
}

export default AuthenticationServices;

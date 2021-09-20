/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { Action, Actions, Thunk, thunk, action, computed, Computed } from 'easy-peasy';
import {
    AccessToken,
    decodeJWT,
    TagType,
    fetchTags as fetchTagsApi,
    UserType,
    getUserByEmail,
    DecodedJWT,
} from 'shared';

export interface AuthModel {
    /* State */
    onboardingDone?: boolean;
    pat?: string;
    pubapi?: string;
    dgapi?: string;
    historyLocation?: string;
    tags: TagType[];
    user: UserType;
    /* Computed properties */
    getDecodedPat: Computed<AuthModel, DecodedJWT>;
    /* Actions */
    updateOnboardingDone: Action<AuthModel, boolean>;
    updatePat: Action<AuthModel, string>;
    updatePubapi: Action<AuthModel, string>;
    updateDgapi: Action<AuthModel, string>;
    updateHistoryLocation: Action<AuthModel, string>;
    updateTags: Action<AuthModel, TagType[]>;
    updateUser: Action<AuthModel, UserType>;
    /* Thunks */
    loginWithPAT: Thunk<AuthModel, { pat: string; email: string }>;
    fetchTags: Thunk<AuthModel>;
    fetchUser: Thunk<AuthModel>;
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

const fetchTags = thunk(async (actions: Actions<AuthModel>, _, { getStoreState }) => {
    const url = (getStoreState() as any).auth.pubapi;
    const tags: TagType[] = await fetchTagsApi(url);

    actions.updateTags(tags);
});

const fetchUser = thunk(async (actions: Actions<AuthModel>, _, { getStoreState }) => {
    const { pubapi, getDecodedPat } = (getStoreState() as any).auth;

    const user: UserType = await getUserByEmail(pubapi, getDecodedPat.email);

    actions.updateUser(user);
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
        tags: [],
        user: null,
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
        updateTags: action((state, payload: TagType[]) => {
            state.tags = payload;
        }),
        updateUser: action((state, payload: UserType) => {
            state.user = payload;
        }),
        /* Computed properties */
        getDecodedPat: computed((state) => {
            return decodeJWT(atob(state.pat));
        }),
        /* Thunks */
        loginWithPAT,
        fetchTags,
        fetchUser,
    };
};

export default authModel;

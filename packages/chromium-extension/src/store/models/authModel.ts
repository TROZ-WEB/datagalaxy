/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { Action, Actions, Thunk, thunk, action, Computed, Store } from 'easy-peasy';
import {
    AccessToken,
    decodeJWT,
    TagType,
    TechnologyType,
    WorkspaceType,
    fetchTags as fetchTagsApi,
    fetchWorkspaces as fetchWorkspacesApi,
    fetchTechnologies as fetchTechnologiesApi,
    UserType,
    getUserByEmail,
    DecodedJWT,
} from 'shared';
import { StoreModel } from '../types';
import { getDecodedPAT, resetModel } from './helper';

const initialState = {
    onboardingDone: false,
    pat: null,
    pubapi: '',
    dgapi: '',
    historyLocation: null,
    tags: [],
    workspaces: [],
    technologies: [],
    user: null,
};
export interface AuthModel {
    /* State */
    onboardingDone?: boolean;
    pat?: string;
    pubapi: string;
    dgapi: string;
    historyLocation?: string;
    tags: TagType[];
    workspaces: WorkspaceType[];
    technologies: TechnologyType[];
    user: UserType;
    /* Computed properties */
    getDecodedPat: Computed<AuthModel, DecodedJWT>;
    /* Actions */
    resetModel: Action<AuthModel>;
    updateOnboardingDone: Action<AuthModel, boolean>;
    updatePat: Action<AuthModel, string>;
    updatePubapi: Action<AuthModel, string>;
    updateDgapi: Action<AuthModel, string>;
    updateHistoryLocation: Action<AuthModel, string>;
    updateTags: Action<AuthModel, TagType[]>;
    updateWorkspaces: Action<AuthModel, WorkspaceType[]>;
    updateTechnologies: Action<AuthModel, TechnologyType[]>;
    updateUser: Action<AuthModel, UserType>;
    /* Thunks */
    loginWithPAT: Thunk<AuthModel, { pat: string; email: string }>;
    fetchTags: Thunk<AuthModel>;
    fetchTechnologies: Thunk<AuthModel>;
    fetchWorkspaces: Thunk<AuthModel>;
    fetchUser: Thunk<AuthModel>;
    logout: Thunk<AuthModel, Store>;
    updatePATThunk: Thunk<AuthModel, string>;
}

/**
 * Thunks
 */

const loginWithPAT = thunk(async (actions: Actions<AuthModel>, payload: { pat: string; email: string }) => {
    let decodedPAT: DecodedJWT;
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

const fetchWorkspaces = thunk(async (actions: Actions<AuthModel>, _, { getStoreState }) => {
    const url = (getStoreState() as any).auth.pubapi;
    const workspaces: WorkspaceType[] = await fetchWorkspacesApi(url);

    actions.updateWorkspaces(workspaces);
});

const fetchTechnologies = thunk(async (actions: Actions<AuthModel>, _, { getStoreState }) => {
    const url = (getStoreState() as any).auth.pubapi;
    const technologies: TechnologyType[] = await fetchTechnologiesApi(url);

    actions.updateTechnologies(technologies);
});

const fetchUser = thunk(async (actions: Actions<AuthModel>, _, { getStoreState }) => {
    const { pubapi, getDecodedPat } = (getStoreState() as any).auth;

    const user: UserType = await getUserByEmail(pubapi, getDecodedPat.email);

    actions.updateUser(user);
});

const logout = thunk(async (actions: Actions<AuthModel>, store: Store, helpers) => {
    // Reset all models to initial state
    const accessTokenHandler = AccessToken.getInstance();
    accessTokenHandler.reset();

    (helpers.getStoreActions() as Actions<StoreModel>).entity.resetModel();
    (helpers.getStoreActions() as Actions<StoreModel>).search.resetModel();
    (helpers.getStoreActions() as Actions<StoreModel>).auth.resetModel();
    (helpers.getStoreActions() as Actions<StoreModel>).onboarding.resetModel();

    await store.persist.clear();
    await store.persist.flush();
});

/**
 * Allow to use a brand new PAT
 * Requirement :
 * - Identifier in the new PAT must match the current identifier
 *
 * It save and regenerate a new AccessToken
 */
const updatePATThunk = thunk(async (actions: Actions<AuthModel>, pat, helpers) => {
    const currentPat = atob(helpers.getState().pat);

    if (pat === currentPat) {
        return;
    }
    let decodedPAT: DecodedJWT;
    // First decode the PAT
    try {
        decodedPAT = decodeJWT(pat);
    } catch (error) {
        console.error('error', error);

        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    if (decodedPAT === null) {
        throw new Error(chrome.i18n.getMessage('error_pat'));
    }

    const currentDecodedPAT = decodeJWT(currentPat);

    // Check that the new email match the old one
    if (decodedPAT.email !== currentDecodedPAT.email) {
        throw new Error(chrome.i18n.getMessage('error_pat_email'));
    }

    // Then save it for future use
    actions.updatePat(btoa(pat));

    // And save only useful JWT attributes to the localStorage
    actions.updatePubapi(decodedPAT.pubapi);
    actions.updateDgapi(decodedPAT.dgapi);

    // Refresh accessToken singleton
    const accessTokenHandler = AccessToken.getInstance();
    // Init with the new PAT
    await accessTokenHandler.init(btoa(pat));
});

/**
 * Auth Model Instance
 */

const authModel = async (): Promise<AuthModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetModel: action(resetModel(initialState)),
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
            if (state.onboardingDone && payload.startsWith('/app')) {
                state.historyLocation = payload;
            }
        }),
        updateTags: action((state, payload: TagType[]) => {
            state.tags = payload;
        }),
        updateTechnologies: action((state, payload: TechnologyType[]) => {
            state.technologies = payload;
        }),
        updateWorkspaces: action((state, payload: WorkspaceType[]) => {
            state.workspaces = payload;
        }),
        updateUser: action((state, payload: UserType) => {
            state.user = payload;
        }),
        /* Computed properties */
        getDecodedPat: getDecodedPAT('pat'),
        /* Thunks */
        loginWithPAT,
        fetchTags,
        fetchUser,
        fetchWorkspaces,
        fetchTechnologies,
        logout,
        updatePATThunk,
    };
};

export default authModel;

import { Action, Thunk, Actions, thunk, action, debug } from 'easy-peasy';
import {
    fetchWorkspaces as fetchWorkspacesAPI,
    fetchUsers as fetchUsersAPI,
    fetchTechnologies as fetchTechnologiesAPI,
    fetchDomains as fetchDomainsAPI,
    fetchStatus as fetchStatusAPI,
    Filter,
    PickedFilters,
    QuickFilters,
    Workspace,
    UsersByRoleResponse,
    Domain,
    Status,
    TechnologyType,
} from 'shared';
import { resetModel } from './helper';

const EMPTY_RESPONSE: QuickFilters = {
    total: 0,
    total_sum: 0,
    result: {
        filteredViews: [],
        entities: [],
    },
    quickFilters: [],
};

const initialState = {
    pickedFilters: [],
    workspaces: null,
    versionId: undefined,
    users: null,
    technologies: null,
    domains: null,
    status: null,
};

interface SearchedArgs {
    term?: string;
    versionId?: string;
    filters?: Filter[];
    // Will allow to handle more complex search categories...
}

export interface FiltersModel {
    /* State */
    pickedFilters: PickedFilters[];
    workspaces: Workspace[];
    versionId: string;
    users: UsersByRoleResponse;
    technologies: TechnologyType[];
    domains: Domain[];
    status: Status[];
    /* Actions */
    resetQuickFilters: Action<FiltersModel>;
    updatePickedFilters: Action<FiltersModel, any>;
    updateWorkspaces: Action<FiltersModel, any>;
    updateUsers: Action<FiltersModel, any>;
    updateTechnologies: Action<FiltersModel, any>;
    updateVersionId: Action<FiltersModel, any>;
    updateDomains: Action<FiltersModel, any>;
    updateStatus: Action<FiltersModel, any>;
    /* Thunks */
    fetchWorkspaces: Thunk<FiltersModel, SearchedArgs>;
    fetchUsers: Thunk<FiltersModel, SearchedArgs>;
    fetchTechnologies: Thunk<FiltersModel, SearchedArgs>;
    fetchDomains: Thunk<FiltersModel, SearchedArgs>;
    fetchStatus: Thunk<FiltersModel, SearchedArgs>;
}

/**
 * Thunks
 */

const fetchWorkspaces = thunk(async (actions: Actions<FiltersModel>, payload: null, { getStoreState }) => {
    let workspaces;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        workspaces = await fetchWorkspacesAPI(url);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateWorkspaces(workspaces);
});

const fetchUsers = thunk(async (actions: Actions<FiltersModel>, payload: null, { getStoreState }) => {
    let users;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        users = await fetchUsersAPI(url);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateUsers(users);
});

const fetchTechnologies = thunk(async (actions: Actions<FiltersModel>, payload: null, { getStoreState }) => {
    let technologies;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        technologies = await fetchTechnologiesAPI(url);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateTechnologies(technologies);
});

const fetchDomains = thunk(async (actions: Actions<FiltersModel>, payload: null, { getStoreState }) => {
    let domains;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        domains = await fetchDomainsAPI(url);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateDomains(domains);
});

const fetchStatus = thunk(async (actions: Actions<FiltersModel>, payload: null, { getStoreState }) => {
    let status;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        status = await fetchStatusAPI(url);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateStatus(status);
});

/**
 * Search Model Instance
 */

const filtersModel = async (): Promise<FiltersModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetQuickFilters: action(resetModel(initialState)),
        updatePickedFilters: action((state, payload) => {
            state.pickedFilters = payload;
        }),
        updateWorkspaces: action((state, payload) => {
            state.workspaces = payload;
        }),
        updateVersionId: action((state, payload) => {
            state.versionId = payload;
        }),
        updateUsers: action((state, payload) => {
            state.users = payload;
        }),
        updateTechnologies: action((state, payload) => {
            state.technologies = payload;
        }),
        updateDomains: action((state, payload) => {
            state.domains = payload;
        }),
        updateStatus: action((state, payload) => {
            state.status = payload;
        }),
        /* Thunks */
        fetchWorkspaces,
        fetchUsers,
        fetchTechnologies,
        fetchDomains,
        fetchStatus,
    };
};

export default filtersModel;

import { Action, Thunk, Actions, thunk, action, debug } from 'easy-peasy';
import {
    fetchQuickFilters as fetchQuickFiltersAPI,
    fetchWorkspaces as fetchWorkspacesAPI,
    fetchUsers as fetchUsersAPI,
    fetchTechnologies as fetchTechnologiesAPI,
    Filter,
    QuickFilters,
    FormatedWorkspace,
    Users,
    Technologies,
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
    quickFilters: null,
    pickedFilters: [],
    workspaces: null,
    versionId: undefined,
    users: null,
    technologies: null,
};

interface SearchedArgs {
    term?: string;
    versionId?: string;
    filters?: Filter[];
    // Will allow to handle more complex search categories...
}

export interface FiltersModel {
    /* State */
    quickFilters: QuickFilters;
    pickedFilters: Filter[];
    workspaces: FormatedWorkspace[];
    versionId: string;
    users: Users;
    technologies: Technologies;
    /* Actions */
    resetQuickFilters: Action<FiltersModel>;
    updateQuickFilters: Action<FiltersModel, any>;
    updatePickedFilters: Action<FiltersModel, any>;
    updateWorkspaces: Action<FiltersModel, any>;
    updateUsers: Action<FiltersModel, any>;
    updateTechnologies: Action<FiltersModel, any>;
    updateVersionId: Action<FiltersModel, any>;
    /* Thunks */
    fetchQuickFilters: Thunk<FiltersModel, SearchedArgs>;
    fetchWorkspaces: Thunk<FiltersModel, SearchedArgs>;
    fetchUsers: Thunk<FiltersModel, SearchedArgs>;
    fetchTechnologies: Thunk<FiltersModel, SearchedArgs>;
}

/**
 * Thunks
 */

const fetchQuickFilters = thunk(async (actions: Actions<FiltersModel>, payload: SearchedArgs, { getStoreState }) => {
    let quickFilters = EMPTY_RESPONSE;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        quickFilters = await fetchQuickFiltersAPI(url, payload.term, payload.versionId, payload.filters);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateQuickFilters(quickFilters);
});

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

/**
 * Search Model Instance
 */

const filtersModel = async (): Promise<FiltersModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetQuickFilters: action(resetModel(initialState)),
        updateQuickFilters: action((state, payload) => {
            state.quickFilters = payload;
        }),
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
        /* Thunks */
        fetchQuickFilters,
        fetchWorkspaces,
        fetchUsers,
        fetchTechnologies,
    };
};

export default filtersModel;

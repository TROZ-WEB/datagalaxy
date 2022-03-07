import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import { fetchQuickFilters as fetchQuickFiltersAPI, QuickFilter } from 'shared';
import { resetModel } from './helper';

const EMPTY_RESPONSE: QuickFilter = {
    total: 0,
    total_sum: 0,
    result: {
        filteredViews: [],
        entities: [],
    },
};

const initialState = {
    quickFilters: null,
};

export interface QuickFiltersModel {
    /* State */
    quickFilters?: any[];
    /* Actions */
    resetQuickFilters: Action<QuickFiltersModel>;
    updateQuickFilters: Action<QuickFiltersModel, any>;
    /* Thunks */
    fetchQuickFilters: Thunk<QuickFiltersModel, string>;
}

/**
 * Thunks
 */

const fetchQuickFilters = thunk(async (actions: Actions<QuickFiltersModel>, payload: string, { getStoreState }) => {
    let quickFilters = EMPTY_RESPONSE;

    try {
        const url = (getStoreState() as any).auth.pubapi;
        quickFilters = await fetchQuickFiltersAPI(url, payload);
        console.log('API call :', quickFilters);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateQuickFilters(quickFilters);
});

/**
 * Search Model Instance
 */

const quickFiltersModel = async (): Promise<QuickFiltersModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetQuickFilters: action(resetModel(initialState)),
        updateQuickFilters: action((state, payload) => {
            console.log('payload :', payload);
            state.quickFilters = payload;
        }),
        /* Thunks */
        fetchQuickFilters,
    };
};

export default quickFiltersModel;

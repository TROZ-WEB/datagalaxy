import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import { fetchQuickFilters as fetchQuickFiltersAPI, QuickFilter, QuickFilters } from 'shared';
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
    pickedQuickFilters: [
        {
            filter: {
                attributeKey: 'test',
                operator: 'test',
                values: ['test'],
            },
        },
    ],
};

export interface QuickFiltersModel {
    /* State */
    quickFilters?: QuickFilters;
    pickedQuickFilters?: QuickFilter[];
    /* Actions */
    resetQuickFilters: Action<QuickFiltersModel>;
    updateQuickFilters: Action<QuickFiltersModel, any>;
    updatePickedQuickFilters: Action<QuickFiltersModel, any>;
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
            state.quickFilters = payload;
        }),
        updatePickedQuickFilters: action((state, payload) => {
            state.pickedQuickFilters = payload;
        }),
        /* Thunks */
        fetchQuickFilters,
    };
};

export default quickFiltersModel;

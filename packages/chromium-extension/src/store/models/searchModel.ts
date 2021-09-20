/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import { search as searchAPI, EntityType, SearchResponse } from 'shared';
import { enhancedEntitiesWithUserInfo } from './helper';

const EMPTY_ARGS = {
    term: '',
};

const EMPTY_RESPONSE: SearchResponse = {
    total: 0,
    total_sum: 0,
    result: {
        entities: [],
    },
};

interface SearchedArgs {
    term?: string;
    // Will allow to handle more complex search categories...
}

export interface SearchModel {
    /* State */
    searchedArgs?: SearchedArgs;
    searchResults: SearchResponse;
    // Used to get instantly some basic information to display on the entity details page
    selectedEntity: EntityType;
    /* Actions */
    resetSearch: Action<SearchModel>;
    updateSearchedArgs: Action<SearchModel, Partial<SearchedArgs>>;
    updateResults: Action<SearchModel, SearchResponse>;
    updateSelectedEntity: Action<SearchModel, EntityType>;
    /* Thunks */
    search: Thunk<SearchModel, Partial<SearchedArgs>>;
}

/**
 * Thunks
 */

const search = thunk(async (actions: Actions<SearchModel>, searchedArgs: SearchedArgs, { getStoreState }) => {
    let enhancedResults = EMPTY_RESPONSE;

    try {
        // Save the new searched args to the global state
        actions.updateSearchedArgs(searchedArgs);

        const url = (getStoreState() as any).auth.pubapi;

        // First search for results
        enhancedResults = await searchAPI(url, searchedArgs.term);
        // Load additional user information about entities
        enhancedResults.result.entities = await enhancedEntitiesWithUserInfo(enhancedResults.result.entities, url);
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateResults(enhancedResults);
});

/**
 * Search Model Instance
 */

const searchModel = async (): Promise<SearchModel> => {
    return {
        /* State */
        searchedArgs: EMPTY_ARGS,
        searchResults: EMPTY_RESPONSE,
        selectedEntity: null,
        /* Actions */
        resetSearch: action((state) => {
            state.searchedArgs = EMPTY_ARGS;
            state.searchResults = EMPTY_RESPONSE;
        }),
        updateSearchedArgs: action((state, payload: SearchedArgs) => {
            state.searchedArgs = payload;
        }),
        updateResults: action((state, payload: SearchResponse) => {
            state.searchResults = payload;
        }),
        updateSelectedEntity: action((state, payload: EntityType) => {
            state.selectedEntity = payload;
        }),
        /* Thunks */
        search,
    };
};

export default searchModel;

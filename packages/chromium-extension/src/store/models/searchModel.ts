/* eslint-disable import/no-cycle */
import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import { decodePAT, getAccessToken, search as searchAPI, EntityType, getUsersByEmailsAndRole } from 'shared';
import { enhancedEntitiesWithUserInfo } from './helper';

interface SearchedArgs {
    term?: string;
    //Will allow to handle more complex search categories...
}

export interface SearchModel {
    /* State */
    searchedArgs?: SearchedArgs;
    searchResults: EntityType[];
    // Used to get instantly some basic information to display on the entity details page
    selectedEntity: EntityType;
    // Not used yet
    resultsHistory: EntityType[];
    /* Actions */
    updateSearchedArgs: Action<SearchModel, Partial<SearchedArgs>>;
    updateResults: Action<SearchModel, EntityType[]>;
    updateSelectedEntity: Action<SearchModel, EntityType>;
    /* Thunks */
    search: Thunk<SearchModel, Partial<SearchedArgs>>;
}

/**
 * Thunks
 */

const search = thunk(async (actions: Actions<SearchModel>, searchedArgs: SearchedArgs, { getStoreState }) => {
    let enhancedResults = [];

    try {
        // Save the new searched args to the global state
        actions.updateSearchedArgs(searchedArgs);

        const clearPAT = atob((getStoreState() as any).auth.pat);

        const decodedPat = decodePAT(clearPAT);
        const accessToken = await getAccessToken(decodedPat.pubapi, clearPAT);
        // First search for results
        const searchResult = await searchAPI(decodedPat.pubapi, accessToken, searchedArgs.term);
        // // Load additional user information about entities
        enhancedResults = await enhancedEntitiesWithUserInfo(searchResult.result.entities, decodedPat, accessToken);
    } catch (err) {
        console.log('error : ', err);
    }

    actions.updateResults(enhancedResults);
});

/**
 * Search Model Instance
 */

const searchModel = async (): Promise<SearchModel> => {
    return {
        /* State */
        searchedArgs: {
            term: '',
        },
        searchResults: [],
        selectedEntity: null,
        resultsHistory: [], // TODO: Save to and Load from local storage
        /* Actions */
        updateSearchedArgs: action((state, payload: SearchedArgs) => {
            state.searchedArgs = payload;
        }),
        updateResults: action((state, payload: EntityType[]) => {
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

import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import {
    search as searchAPI,
    EntityType,
    SearchResponse,
    TechnologyType,
    Filter,
    QuickFilters,
    AttributeDefinitionType,
} from 'shared';
import { enhancedEntitiesWithTechnologiesInfo, enhancedEntitiesWithAttributesInfo, resetModel } from './helper';

const EMPTY_ARGS = {
    term: '',
    technologies: null,
    attributes: null,
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
    technologies: TechnologyType[];
    attributes: AttributeDefinitionType[];
    filters?: Filter[];
    versionId?: string;
    limit?: number;
    // Will allow to handle more complex search categories...
}

const initialState = {
    quickFilters: null,
    searchedArgs: EMPTY_ARGS,
    searchResults: EMPTY_RESPONSE,
    selectedEntity: null,
    exactMatches: EMPTY_RESPONSE,
};

export interface SearchModel {
    /* State */
    quickFilters: QuickFilters;
    searchedArgs?: SearchedArgs;
    searchResults: SearchResponse;
    exactMatches: SearchResponse;
    // Used to get instantly some basic information to display on the entity details page
    selectedEntity: EntityType;
    /* Actions */
    resetSearch: Action<SearchModel>;
    resetModel: Action<SearchModel>;
    updateSearchedArgs: Action<SearchModel, Partial<SearchedArgs>>;
    updateResults: Action<SearchModel, SearchResponse>;
    updateSelectedEntity: Action<SearchModel, EntityType>;
    updateQuickFilters: Action<SearchModel, any>;
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
        enhancedResults = await searchAPI(
            url,
            searchedArgs.term,
            searchedArgs.filters,
            searchedArgs.versionId,
            searchedArgs.limit,
        );

        // Load additional user information about entities
        if (enhancedResults?.result) {
            enhancedResults.result.entities = await enhancedEntitiesWithTechnologiesInfo(
                searchedArgs.technologies,
                enhancedResults.result.entities,
            );
            enhancedResults.result.entities = await enhancedEntitiesWithAttributesInfo(
                searchedArgs.attributes,
                enhancedResults.result.entities,
            );
        }
    } catch (err) {
        console.error('error : ', err);
    }

    actions.updateResults(enhancedResults);
    actions.updateQuickFilters(enhancedResults);
});

/**
 * Search Model Instance
 */

const searchModel = async (): Promise<SearchModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetSearch: action((state) => {
            state.searchedArgs = EMPTY_ARGS;
            state.searchResults = EMPTY_RESPONSE;
            state.exactMatches = EMPTY_RESPONSE;
        }),
        resetModel: action(resetModel(initialState)),
        updateSearchedArgs: action((state, payload: SearchedArgs) => {
            state.searchedArgs = payload;
        }),
        updateResults: action((state, payload: SearchResponse) => {
            const searchResults = payload?.result
                ? payload.result.entities.filter((entity) => !entity.isExactMatch)
                : [];
            const exactMatches = payload?.result ? payload.result.entities.filter((entity) => entity.isExactMatch) : [];

            state.exactMatches = {
                total: exactMatches.length,
                total_sum: null,
                result: {
                    entities: exactMatches,
                },
            };

            state.searchResults = {
                total: searchResults.length,
                total_sum: payload?.total_sum,
                result: {
                    entities: searchResults,
                },
            };
        }),
        updateSelectedEntity: action((state, payload: EntityType) => {
            state.selectedEntity = payload;
        }),
        updateQuickFilters: action((state, payload) => {
            state.quickFilters = payload;
        }),
        /* Thunks */
        search,
    };
};

export default searchModel;

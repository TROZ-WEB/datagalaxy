/* eslint-disable import/prefer-default-export */
import { Filter } from '../Filters/types';
import { get, post } from '../Http';
import { SearchHistoryResponse, SearchHistoryType, SearchResponse } from './types';

export type { SearchResponse, SearchHistoryType } from './types';

interface SearchRequestParams {
    query: string;
    includedAttributes: string[];
    includeLinks: boolean;
    filters: Filter[];
    versionId?: string;
    limit?: number;
    saveSearchPayload?: boolean;
}

export const search = async (apiUrl, query, filters, versionId, limit, saveSearchPayload): Promise<SearchResponse> => {
    try {
        const params: SearchRequestParams = {
            query,
            includedAttributes: ['DataOwners', 'DataStewards', 'EntityStatus', 'Domains', 'TechnologyCode'],
            includeLinks: true,
            filters,
            saveSearchPayload,
        };

        if (versionId) {
            params.versionId = versionId;
        }

        if (limit !== undefined) {
            params.limit = limit;
        }

        const response = await post<SearchResponse>(`${apiUrl}/search`, params);

        const filtered = response.parsedBody.result.entities.filter((entity) => entity.type);

        response.parsedBody.result.entities = filtered;

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchRecentSearches = async (apiUrl, limit): Promise<SearchHistoryType[]> => {
    try {
        const response = await get<SearchHistoryResponse>(`${apiUrl}/history/search/queries?limit=${limit}`);

        return response.parsedBody.history;
    } catch (error) {
        console.error(error);
    }

    return null;
};

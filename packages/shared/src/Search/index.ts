/* eslint-disable import/prefer-default-export */
import { Filter } from '../Filters/types';
import { post } from '../Http';
import { SearchResponse } from './types';

export type { SearchResponse } from './types';

interface SearchRequestParams {
    query: string;
    includedAttributes: string[];
    includeLinks: boolean;
    filters: Filter[];
    versionId?: string;
}

export const search = async (apiUrl: string, query: string, filters: Filter[], versionId): Promise<SearchResponse> => {
    try {
        const params: SearchRequestParams = {
            query,
            includedAttributes: ['DataOwners', 'DataStewards', 'EntityStatus', 'Domains', 'TechnologyCode'],
            includeLinks: true,
            filters,
        };

        if (versionId) {
            params.versionId = versionId;
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

/* eslint-disable import/prefer-default-export */
import { post } from '../Http';
import { SearchResponse } from './types';

export type { SearchResponse } from './types';

export const search = async (apiUrl: string, query: string): Promise<SearchResponse> => {
    try {
        const response = await post<SearchResponse>(`${apiUrl}/search`, {
            query,
            includedAttributes: ['DataOwners', 'DataStewards', 'EntityStatus'],
        });

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

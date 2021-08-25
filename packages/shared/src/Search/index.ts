/* eslint-disable import/prefer-default-export */
import { post } from '../Http';
import { SearchEntity, SearchResponse } from './types';

export type { SearchEntity, SearchResponse };

export const search = async (apiUrl: string, accessToken: string, query: string): Promise<SearchResponse> => {
    try {
        const response = await post<SearchResponse>(
            `${apiUrl}/search`,
            { query },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

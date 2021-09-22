import { get } from '../Http';
import { TagsResponse, TagType } from './types';

/* eslint-disable import/prefer-default-export */
export type { TagsResponse, TagType } from './types';

export const fetchTags = async (apiUrl: string, page = 1, limit = 10): Promise<TagType[]> => {
    try {
        const response = await get<TagsResponse>(`${apiUrl}/tags?page=${page}&limit=${limit}`);

        if (response.parsedBody.next_page) {
            const additionalTags = await fetchTags(apiUrl, page + 1, limit);

            return [...response.parsedBody.results, ...additionalTags];
        }

        return response.parsedBody.results;
    } catch (error) {
        console.error(error);
    }

    return null;
};

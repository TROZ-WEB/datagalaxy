/* eslint-disable import/prefer-default-export */
import { post } from '../Http';
import { QuickFilters } from './types';

export type { QuickFilter, QuickFilters } from './types';

export const fetchQuickFilters = async (apiUrl: string, versionId: string): Promise<QuickFilters> => {
    try {
        const response = await post<QuickFilters>(`${apiUrl}/search`, {
            query: '',
            limit: 0,
        }); // TODO : add versionId

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

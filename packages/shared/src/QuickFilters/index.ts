/* eslint-disable import/prefer-default-export */
import { post } from '../Http';
import { QuickFilter } from './types';

export type { QuickFilter } from './types';

export const fetchQuickFilters = async (apiUrl: string, versionId: string): Promise<QuickFilter> => {
    try {
        console.log({ versionId });
        const response = await post<QuickFilter>(`${apiUrl}/search`, {
            query: '',
            versionId,
            limit: 0,
        });

        console.log('API : ', response);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

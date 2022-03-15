/* eslint-disable import/prefer-default-export */
import { post, get } from '../Http';
import { QuickFilters, Workspaces, Filter, Users, Technologies } from './types';

export type { Filter, QuickFilters, Workspaces, Users, Technologies } from './types';

export const fetchQuickFilters = async (
    apiUrl: string,
    query: string,
    versionId: string,
    filters: Filter[],
): Promise<QuickFilters> => {
    try {
        let response;
        if (versionId) {
            response = await post<QuickFilters>(`${apiUrl}/search`, {
                query,
                versionId,
                filters,
                limit: 0,
            });
        } else {
            response = await post<QuickFilters>(`${apiUrl}/search`, {
                query,
                filters,
                limit: 0,
            });
        }

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchWorkspaces = async (apiUrl: string): Promise<Workspaces> => {
    try {
        const response = await get<Workspaces>(`${apiUrl}/workspaces`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchUsers = async (apiUrl: string): Promise<Users> => {
    try {
        const response = await get<Users>(`${apiUrl}/users/roles`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchTechnologies = async (apiUrl: string): Promise<Technologies> => {
    try {
        const response = await get<Technologies>(`${apiUrl}/technologies`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

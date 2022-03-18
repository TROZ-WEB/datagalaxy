/* eslint-disable import/prefer-default-export */
import { post, get } from '../Http';
import { QuickFilters, Filter, Users, Domain, Status } from './types';

export type { Filter, QuickFilters, Users, Domain, Status } from './types';

interface SearchRequestParams {
    query: string;
    limit: number;
    filters: Filter[];
    versionId?: string;
}

export const fetchQuickFilters = async (
    apiUrl: string,
    query: string,
    versionId: string,
    filters: Filter[],
): Promise<QuickFilters> => {
    try {
        const params: SearchRequestParams = {
            query,
            filters,
            limit: 0,
        };

        if (versionId) {
            params.versionId = versionId;
        }
        const response = await post<QuickFilters>(`${apiUrl}/search`, params);

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

export const fetchDomains = async (apiUrl: string): Promise<Domain[]> => {
    try {
        const response = await get<Domain[]>(`${apiUrl}/attributes/values?dataType=common&attributeKey=Domains`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchStatus = async (apiUrl: string): Promise<Status[]> => {
    try {
        const response = await get<Status[]>(`${apiUrl}/attributes/values?dataType=common&attributeKey=EntityStatus`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

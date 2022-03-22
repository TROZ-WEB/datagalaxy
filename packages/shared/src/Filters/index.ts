/* eslint-disable import/prefer-default-export */
import { get } from '../Http';
import { Domain, Status } from './types';

export type { Filter, QuickFilters, Domain, Status, PickedFilters } from './types';

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

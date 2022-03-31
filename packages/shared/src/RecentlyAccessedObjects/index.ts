import { EntityType } from '../Entities';
import { get } from '../Http';

/* eslint-disable import/prefer-default-export */
export const fetchRecentlyAccessedObjects = async (apiUrl: string, limit: number): Promise<EntityType[]> => {
    try {
        const response = await get<any>(`${apiUrl}/history/objects?limit=${limit}`);

        return response.parsedBody.history;
    } catch (error) {
        console.error(error);
    }

    return null;
};

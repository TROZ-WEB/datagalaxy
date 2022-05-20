import { get } from '../Http';
import type { EntityComment } from './types';

export type { EntityComment } from './types';

/* eslint-disable import/prefer-default-export */
export const fetchComments = async (
    apiUrl: string,
    versionId: string,
    entityId: string,
): Promise<EntityComment[]> => {
    try {
        const response = await get<EntityComment[]>(`${apiUrl}/comments/${versionId}/${entityId}`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

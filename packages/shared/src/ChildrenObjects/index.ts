import { EntityType } from '../Entities';
import { get } from '../Http';

/* eslint-disable import/prefer-default-export */
export const fetchChildrenObjects = async (
    parentId: string,
    apiUrl: string,
    dataType: string,
    versionId: string,
): Promise<EntityType[]> => {
    try {
        const response = await get<any>(`${apiUrl}/${dataType}?parentId=${parentId}&versionId=${versionId}`);

        return response.parsedBody.results;
    } catch (error) {
        console.error(error);
    }

    return null;
};

import { get } from '../Http';
import { ScreenConfiguration } from './types';

export type { ScreenConfiguration } from './types';

/* eslint-disable import/prefer-default-export */
export const fetchScreenConfiguration = async (
    apiUrl: string,
    dataType: string,
    versionId: string,
): Promise<ScreenConfiguration[]> => {
    try {
        const response = await get<any>(`${apiUrl}/attributes/screens/${dataType}?versionId=${versionId}`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

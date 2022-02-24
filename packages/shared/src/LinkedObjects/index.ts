import { get } from '../Http';
import { LinkedObjectsType } from './types';

/* eslint-disable import/prefer-default-export */
export type { LinkedObjectsType } from './types';

export enum DataTypeMapping {
    Property = 'properties',
    Source = 'sources',
    Usage = 'usages',
    Field = 'fields',
    Structure = 'structures',
    Container = 'containers',
    DataProcessing = 'dataProcessing',
}

export const fetchLinkedObjects = async (
    id: string,
    apiUrl: string,
    dataType: string,
    name: string,
    type: string,
    versionId: string,
): Promise<any> => {
    try {
        const response = await get<any>(
            dataType === DataTypeMapping.Property // TODO: API WORKAROUNG 1 - Api ignore technicalName for properties type
                ? `${apiUrl}/${dataType}?includeLinks=true&name=${name}&type=${type}&versionId=${versionId}`
                : `${apiUrl}/${dataType}?includeLinks=true&technicalName=${name}&type=${type}&versionId=${versionId}`,
        );

        const linkedObjects: LinkedObjectsType = response.parsedBody.results?.find(
            (element) => element.id === id,
        )?.links;

        return linkedObjects;
    } catch (error) {
        console.error(error);
    }

    return null;
};

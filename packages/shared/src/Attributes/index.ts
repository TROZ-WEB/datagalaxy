import { get } from '../Http';
import { DataTypeMapping } from '../LinkedObjects';
import { AttributeDefinitionType } from './types';

/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

export const fetchAttributes = async (apiUrl: string): Promise<AttributeDefinitionType[]> => {
    const dataTypes = DataTypeMapping;
    let attributes = [];

    for (const key of Object.keys(dataTypes)) {
        try {
            const response = await get<any>(`${apiUrl}/attributes?dataType=${key.toLowerCase()}`);
            const attributesForDataType = response.parsedBody;
            attributes = attributes.concat(attributesForDataType);
        } catch (error) {
            console.error(error);
        }
    }

    return attributes;
};

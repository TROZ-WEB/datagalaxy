import { get } from '../Http';
import { TechnologiesResponse, TechnologyType } from './types';

/* eslint-disable import/prefer-default-export */
export type { TechnologiesResponse, TechnologyType } from './types';

export const fetchTechnologies = async (apiUrl: string): Promise<TechnologyType[]> => {
    try {
        const response = await get<TechnologiesResponse>(`${apiUrl}/technologies`);

        return response.parsedBody.results;
    } catch (error) {
        console.error(error);
    }

    return null;
};

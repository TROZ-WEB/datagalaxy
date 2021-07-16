import jwtDecode from 'jwt-decode';
import { get } from '../Http';
import { CredentialsResponse, DecodedPAT } from './types';

export const decodePAT = (integrationToken: string): DecodedPAT => {
    return jwtDecode<DecodedPAT>(integrationToken);
};

export const getAccessToken = async (apiUrl: string, integrationToken: string): Promise<string> => {
    try {
        const response = await get<CredentialsResponse>(`${apiUrl}/credentials`, {
            headers: {
                Authorization: `Bearer ${integrationToken}`,
            },
        });

        return response.parsedBody.accessToken;
    } catch (error) {
        console.error(error);
    }

    return null;
};

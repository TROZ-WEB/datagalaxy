import jwtDecode from 'jwt-decode';
import 'isomorphic-fetch';
import { HttpResponse } from '../Http/types';
import { CredentialsResponse, DecodedJWT } from './types';

export type { DecodedJWT } from './types';

export const decodeJWT = (jwt: string): DecodedJWT => {
    return jwtDecode<DecodedJWT>(jwt);
};

export const getAccessToken = async (apiUrl: string, integrationToken: string): Promise<string> => {
    try {
        const request = new Request(`${apiUrl}/credentials`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${integrationToken}`,
            },
        });

        const response: HttpResponse<CredentialsResponse> = await fetch(request);

        const parsedResponse = await response.json();

        if (parsedResponse.error) {
            throw new Error(parsedResponse.error);
        }

        return parsedResponse.accessToken;
    } catch (error) {
        console.error(error);
    }

    return null;
};

/* eslint-disable import/prefer-default-export */
import { get } from '../Http';
import { UserEntity, UsersResponse, UsersByRoleResponse, governanceRole } from './types';

export type { UserEntity, UsersResponse, UsersByRoleResponse } from './types';

export const getUserByEmail = async (apiUrl: string, accessToken: string, email: string): Promise<UserEntity> => {
    try {
        const response = await get<UsersResponse>(`${apiUrl}/users?email=${email}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.parsedBody.result.length === 1) {
            return response.parsedBody.result[0];
        }

        return null;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const getUsersByEmailsAndRole = async (
    apiUrl: string,
    accessToken: string,
    emails: string[],
    role: governanceRole,
): Promise<UsersByRoleResponse> => {
    try {
        const response = await get<UsersByRoleResponse>(`${apiUrl}/users/roles?role=${role}&email=${emails}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

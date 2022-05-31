import { get } from '../Http';
import { UserType, UsersResponse, UsersByRoleResponse, governanceRole } from './types';

export type { UserType, UsersResponse, UsersByRoleResponse } from './types';

export const getUserByEmail = async (apiUrl: string, email: string): Promise<UserType> => {
    try {
        const response = await get<UsersResponse>(`${apiUrl}/users?email=${email}`);

        if (response.parsedBody.total === 1) {
            return response.parsedBody.results[0];
        }

        return null;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const getUserById = async (apiUrl: string, userId: string): Promise<UserType> => {
    try {
        const response = await get<UsersResponse>(`${apiUrl}/users?userId=${userId}`);

        if (response.parsedBody.total === 0) {
            return null;
        }

        return response.parsedBody.results.pop();
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const getUsersByEmailsAndRole = async (
    apiUrl: string,
    emails: string[],
    role: governanceRole,
): Promise<UsersByRoleResponse> => {
    try {
        const response = await get<UsersByRoleResponse>(`${apiUrl}/users/roles?role=${role}&email=${emails}`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchUsers = async (apiUrl: string): Promise<UsersByRoleResponse> => {
    try {
        const response = await get<UsersByRoleResponse>(`${apiUrl}/users/roles`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

import { get } from '../Http';
import { UserType, UsersResponse, UsersByRoleResponse, governanceRole } from './types';

export type { UserType, UsersResponse, UsersByRoleResponse } from './types';

export const getUserByEmail = async (apiUrl: string, email: string): Promise<UserType> => {
    try {
        const response = await get<UsersResponse>(`${apiUrl}/users?email=${email}`);

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

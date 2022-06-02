import { Actions, Thunk, thunk } from 'easy-peasy';
import { getUserById as getUserByIdApi, UserType } from 'shared';

export interface UsersModel {
    /* Actions */
    getUserById: Thunk<UsersModel, any>;
}

interface GetUserByIdParams {
    userId: string;
}

// eslint-disable-next-line consistent-return
const getUserById = thunk(async (actions: Actions<UsersModel>, payload: GetUserByIdParams, { getStoreState }) => {
    try {
        const url = (getStoreState() as any).auth.pubapi;

        const user = await getUserByIdApi(url, payload.userId);

        return user;
    } catch (err) {
        console.error('error : ', err);
    }
});

/**
 * Modal Model Instance
 */

const usersModel = async (): Promise<UsersModel> => {
    return {
        /* Thunks */
        getUserById,
    };
};

export default usersModel;

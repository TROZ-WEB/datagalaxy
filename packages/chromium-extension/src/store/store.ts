import authModel from './models/authModel';
import localPreferencesModel from './models/localPreferencesModel';
import { StoreModel } from './types';

const storeModel = async (): Promise<StoreModel> => {
    return {
        auth: await authModel(),
        localPreferences: await localPreferencesModel(),
    };
};

export default storeModel;

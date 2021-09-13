import authModel from './models/authModel';
import entityModel from './models/entityModel';
import localPreferencesModel from './models/localPreferencesModel';
import searchModel from './models/searchModel';
import { StoreModel } from './types';

const storeModel = async (): Promise<StoreModel> => {
    return {
        auth: await authModel(),
        localPreferences: await localPreferencesModel(),
        search: await searchModel(),
        entity: await entityModel(),
    };
};

export default storeModel;

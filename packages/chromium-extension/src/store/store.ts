import authModel from './models/authModel';
import localPreferencesModel from './models/localPreferencesModel';
import searchModel from './models/searchModel';
import entityModel from './models/entityModel';
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

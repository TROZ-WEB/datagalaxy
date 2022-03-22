import authModel from './models/authModel';
import entityModel from './models/entityModel';
import filtersModel from './models/filtersModel';
import modalModel from './models/modalModel';
import onboardingModel from './models/onboardingModel';
import searchModel from './models/searchModel';
import { StoreModel } from './types';

const storeModel = async (): Promise<StoreModel> => {
    return {
        auth: await authModel(),
        search: await searchModel(),
        entity: await entityModel(),
        filters: await filtersModel(),
        onboarding: await onboardingModel(),
        modal: await modalModel(),
    };
};

export default storeModel;

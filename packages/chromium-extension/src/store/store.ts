import authModel from './models/authModel';
import entityModel from './models/entityModel';
import filtersModel from './models/filtersModel';
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
    };
};

export default storeModel;

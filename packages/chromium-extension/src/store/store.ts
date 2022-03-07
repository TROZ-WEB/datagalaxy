import authModel from './models/authModel';
import entityModel from './models/entityModel';
import onboardingModel from './models/onboardingModel';
import quickFiltersModel from './models/quickFiltersModel';
import searchModel from './models/searchModel';
import { StoreModel } from './types';

const storeModel = async (): Promise<StoreModel> => {
    return {
        auth: await authModel(),
        search: await searchModel(),
        entity: await entityModel(),
        quickFilters: await quickFiltersModel(),
        onboarding: await onboardingModel(),
    };
};

export default storeModel;

import authModel from './models/authModel';
import entityModel from './models/entityModel';
import searchModel from './models/searchModel';
import onboardingModel from './models/onboardingModel';
import { StoreModel } from './types';

const storeModel = async (): Promise<StoreModel> => {
    return {
        auth: await authModel(),
        search: await searchModel(),
        entity: await entityModel(),
        onboarding: await onboardingModel(),
    };
};

export default storeModel;

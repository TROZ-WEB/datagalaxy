/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { EntityModel } from './models/entityModel';
import { OnboardingModel } from './models/onboardingModel';
import { SearchModel } from './models/searchModel';

export interface StoreModel {
    auth: AuthModel;
    search: SearchModel;
    entity: EntityModel;
    onboarding: OnboardingModel;
}

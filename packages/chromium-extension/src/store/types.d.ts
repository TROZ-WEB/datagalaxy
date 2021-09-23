/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { EntityModel } from './models/entityModel';
import { SearchModel } from './models/searchModel';
import { OnboardingModel } from './models/onboardingModel';

export interface StoreModel {
    auth: AuthModel;
    search: SearchModel;
    entity: EntityModel;
    onboarding: OnboardingModel;
}

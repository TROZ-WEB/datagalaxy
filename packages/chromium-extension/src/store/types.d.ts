/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { EntityModel } from './models/entityModel';
import { FiltersModel } from './models/filtersModel';
import { OnboardingModel } from './models/onboardingModel';
import { SearchModel } from './models/searchModel';

export interface StoreModel {
    auth: AuthModel;
    search: SearchModel;
    filters: FiltersModel;
    entity: EntityModel;
    onboarding: OnboardingModel;
}

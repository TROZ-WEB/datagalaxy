/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { EntityModel } from './models/entityModel';
import { OnboardingModel } from './models/onboardingModel';
import { QuickFiltersModel } from './models/quickFiltersModel';
import { SearchModel } from './models/searchModel';

export interface StoreModel {
    auth: AuthModel;
    search: SearchModel;
    quickFilters: QuickFiltersModel;
    entity: EntityModel;
    onboarding: OnboardingModel;
}

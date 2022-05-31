/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { EntityModel } from './models/entityModel';
import { FiltersModel } from './models/filtersModel';
import { ModalModel } from './models/modalModel';
import { OnboardingModel } from './models/onboardingModel';
import { SearchModel } from './models/searchModel';
import { UsersModel } from './models/usersModel';

export interface StoreModel {
    auth: AuthModel;
    search: SearchModel;
    filters: FiltersModel;
    entity?: EntityModel;
    onboarding: OnboardingModel;
    modal: ModalModel;
    users: UsersModel;
}

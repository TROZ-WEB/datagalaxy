/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { EntityModel } from './models/entityModel';
import { LocalPreferencesModel } from './models/localPreferencesModel';
import { SearchModel } from './models/searchModel';

export interface StoreModel {
    auth: AuthModel;
    localPreferences: LocalPreferencesModel;
    search: SearchModel;
    entity: EntityModel;
}

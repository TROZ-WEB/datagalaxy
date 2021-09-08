/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { LocalPreferencesModel } from './models/localPreferencesModel';
import { SearchModel } from './models/SearchModel';
import { EntityModel } from './models/entityModel';

export interface StoreModel {
    auth: AuthModel;
    localPreferences: LocalPreferencesModel;
    search: SearchModel;
    entity: EntityModel;
}

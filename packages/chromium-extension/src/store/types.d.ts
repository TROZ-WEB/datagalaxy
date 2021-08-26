/* eslint-disable import/no-cycle */
import { AuthModel } from './models/authModel';
import { LocalPreferencesModel } from './models/localPreferencesModel';

export interface StoreModel {
    auth: AuthModel;
    localPreferences: LocalPreferencesModel;
}

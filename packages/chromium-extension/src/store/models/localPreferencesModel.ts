/* eslint-disable import/no-cycle */
import { Action } from 'easy-peasy';
import { setState } from './helper';

export interface LocalPreferencesModel {
    /* State */
    showNotifications?: boolean;
    /* Actions */
    setState: Action<LocalPreferencesModel, Partial<LocalPreferencesModel>>;
}

/**
 * LocalPreferences Model Instance
 */

const localPreferencesModel = async (): Promise<LocalPreferencesModel> => {
    return {
        showNotifications: null,
        setState,
    };
};

export default localPreferencesModel;

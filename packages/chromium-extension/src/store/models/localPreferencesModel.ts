/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { Action, action } from 'easy-peasy';

export interface LocalPreferencesModel {
    /* State */
    showNotifications?: boolean;
    /* Actions */
    updateShowNotifications: Action<LocalPreferencesModel, boolean>;
}

/**
 * LocalPreferences Model Instance
 */

const localPreferencesModel = async (): Promise<LocalPreferencesModel> => {
    return {
        showNotifications: null,
        updateShowNotifications: action((state, payload: boolean) => {
            state.showNotifications = payload;
        }),
    };
};

export default localPreferencesModel;

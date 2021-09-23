/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { action, Action } from 'easy-peasy';
import { resetModel } from './helper';

const initialState = {
    email: '',
    pat: '',
};
export interface OnboardingModel {
    /* State */
    email?: string;
    pat?: string;
    /* Actions */
    resetModel: Action<OnboardingModel>;
    updateEmail: Action<OnboardingModel, string>;
    updatePat: Action<OnboardingModel, string>;
}

/**
 * Onboarding Model Instance
 */

const onboardingModel = async (): Promise<OnboardingModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetModel: action(resetModel(initialState)),
        updateEmail: action((state, payload: string) => {
            state.email = payload;
        }),
        updatePat: action((state, payload: string) => {
            state.pat = payload;
        }),
    };
};

export default onboardingModel;

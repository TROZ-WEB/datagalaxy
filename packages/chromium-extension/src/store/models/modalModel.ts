import { Action, action } from 'easy-peasy';
import { resetModel } from './helper';

const initialState = {
    Top: null,
    Overlay: false,
    AllFilters: false,
    Workspace: false,
    TechnologyCode: false,
    Module: false,
    EntityType: false,
    Domains: false,
    DataOwners: false,
    DataStewards: false,
    EntityStatus: false,
    LastModificationTime: false,
};

export interface ModalModel {
    /* State */
    Top: number;
    Overlay: boolean;
    AllFilters: boolean;
    Workspace: boolean;
    TechnologyCode: boolean;
    Module: boolean;
    EntityType: boolean;
    Domains: boolean;
    DataOwners: boolean;
    DataStewards: boolean;
    EntityStatus: boolean;
    LastModificationTime: boolean;
    /* Actions */
    resetModalState: Action<ModalModel>;
    updateModalState: Action<ModalModel, any>;
    updateModalTop: Action<ModalModel, any>;
}

/**
 * Modal Model Instance
 */

const modalModel = async (): Promise<ModalModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetModalState: action(resetModel(initialState)),
        updateModalState: action((state, payload) => {
            state[payload.modal] = payload.isOpen;
        }),
        updateModalTop: action((state, payload) => {
            state.Top = payload;
        }),
    };
};

export default modalModel;

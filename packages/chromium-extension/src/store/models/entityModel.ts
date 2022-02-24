import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import {
    fetchEntity as fetchEntityAPI,
    fetchLinkedObjects as fetchLinkedObjectsAPI,
    EntityType,
    LinkedObjectsType,
} from 'shared';
import { enhancedEntitiesWithUserInfo, resetModel } from './helper';

/**
 * This model aims to managed the currently displayed entity in the extension
 */

const initialState = {
    displayedEntity: null,
    linkedObjects: null,
};

export interface EntityModel {
    /* State */
    displayedEntity: EntityType;
    linkedObjects: LinkedObjectsType;
    /* Actions */
    resetModel: Action<EntityModel>;
    updateDisplayedEntity: Action<EntityModel, EntityType>;
    updateLinkedObjects: Action<EntityModel, LinkedObjectsType>;
    /* Thunks */
    fetchEntity: Thunk<EntityModel, string>;
    fetchLinkedObjects: Thunk<EntityModel, FetchLinkedObjectsParams>;
}

interface FetchLinkedObjectsParams {
    id: string;
    dataType: string;
    name: string;
    type: string;
    versionId: string;
}

/**
 * Thunks
 */

const fetchEntity = thunk(async (actions: Actions<EntityModel>, location: string, { getStoreState }) => {
    try {
        const url = (getStoreState() as any).auth.pubapi;
        // First search for results
        const entity = await fetchEntityAPI(url, location);

        // Then enrich the entity object with required user info
        const [enhancedEntity] = await enhancedEntitiesWithUserInfo([entity], url);

        actions.updateDisplayedEntity(enhancedEntity);
    } catch (err) {
        console.error('error : ', err);
    }
});

const fetchLinkedObjects = thunk(
    async (actions: Actions<EntityModel>, payload: FetchLinkedObjectsParams, { getStoreState }) => {
        const { id, dataType, name, type, versionId } = payload;
        try {
            const url = (getStoreState() as any).auth.pubapi;
            // First search for results
            const linkedObjects = await fetchLinkedObjectsAPI(id, url, dataType, name, type, versionId);

            actions.updateLinkedObjects(linkedObjects);
        } catch (err) {
            console.error('error : ', err);
        }
    },
);

/**
 * Entity Model Instance
 */

const entityModel = async (): Promise<EntityModel> => {
    return {
        /* State */
        ...initialState,
        /* Actions */
        resetModel: action(resetModel(initialState)),
        updateDisplayedEntity: action((state, payload: EntityType) => {
            state.displayedEntity = payload;
        }),
        updateLinkedObjects: action((state, payload: any) => {
            state.linkedObjects = payload;
        }),
        /* Thunks */
        fetchEntity,
        fetchLinkedObjects,
    };
};

export default entityModel;

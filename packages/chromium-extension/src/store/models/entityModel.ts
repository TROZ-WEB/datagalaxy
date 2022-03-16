import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import {
    fetchEntity as fetchEntityAPI,
    fetchLinkedObjects as fetchLinkedObjectsAPI,
    fetchChildrenObjects as fetchChildrenObjectsAPI,
    fetchScreenConfiguration as fetchScreenConfigurationAPI,
    EntityType,
    LinkedObjectsType,
    getUserByEmail,
    getAttributesValues,
    getAttributes,
    ReverseDataTypeMapping,
    AttributeDefinitionType,
    ScreenConfiguration,
    DataTypeMapping,
} from 'shared';
import { enhancedEntitiesWithUserInfo, resetModel } from './helper';

/**
 * This model aims to managed the currently displayed entity in the extension
 */

const initialState = {
    isLoaded: false,
    displayedEntity: null,
    linkedObjects: null,
    childrenObjects: null,
    screenConfiguration: null,
};

export interface EntityModel {
    /* State */
    isLoaded: boolean;
    displayedEntity: EntityType;
    linkedObjects: LinkedObjectsType;
    childrenObjects: EntityType[];
    screenConfiguration: ScreenConfiguration;
    /* Actions */
    resetModel: Action<EntityModel>;
    updateIsLoaded: Action<EntityModel, boolean>;
    updateDisplayedEntity: Action<EntityModel, EntityType>;
    updateLinkedObjects: Action<EntityModel, LinkedObjectsType>;
    updateChildrenObjects: Action<EntityModel, EntityType[]>;
    updateGrandChildrenObjects: Action<EntityType, { parentId: string; childrenObjects: EntityType[] }>;
    updateScreenConfiguration: Action<EntityModel, ScreenConfiguration>;
    /* Thunks */
    fetchEntity: Thunk<EntityModel, string>;
    fetchLinkedObjects: Thunk<EntityModel, FetchLinkedObjectsParams>;
    fetchChildrenObjects: Thunk<EntityModel, FetchChildrenObjectsParams>;
    fetchGrandChildrenObjects: Thunk<EntityModel, FetchChildrenObjectsParams>;
    fetchScreenConfiguration: Thunk<EntityModel, FetchScreenConfigurationParams>;
}

interface FetchLinkedObjectsParams {
    id: string;
    dataType: string;
    name: string;
    type: string;
    versionId: string;
}

interface FetchChildrenObjectsParams {
    parentId: string;
    dataType: string;
    versionId: string;
}

interface FetchScreenConfigurationParams {
    dataType: string;
    versionId: string;
    type: string;
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

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

        const allAttributes: AttributeDefinitionType[] = await getAttributes(
            url,
            'attributes',
            ReverseDataTypeMapping[location.split('/')[0]]?.toLowerCase(),
        );

        /* eslint-disable no-restricted-syntax, no-await-in-loop */
        for (const key in enhancedEntity.attributes) {
            if (Array.isArray(enhancedEntity.attributes[key])) {
                for (const valueKey in enhancedEntity.attributes[key]) {
                    if (validateEmail(enhancedEntity.attributes[key][valueKey])) {
                        enhancedEntity.attributes[key][valueKey] = await getUserByEmail(
                            url,
                            enhancedEntity.attributes[key][valueKey],
                        );
                    }
                }
            }
        }

        for (const key in enhancedEntity.attributes) {
            if (Array.isArray(enhancedEntity.attributes[key]) && allAttributes.find((att) => att.name === key)) {
                const attributeValues = await getAttributesValues(
                    url,
                    allAttributes.find((att) => att.name === key).dataType.toLowerCase(),
                    allAttributes.find((att) => att.name === key).attributeKey,
                );

                /* eslint-disable no-restricted-syntax, guard-for-in */
                for (const valueKey in enhancedEntity.attributes[key]) {
                    enhancedEntity.attributes[key][valueKey] =
                        attributeValues?.find(
                            (val) =>
                                val.description === enhancedEntity.attributes[key][valueKey] ||
                                val.label === enhancedEntity.attributes[key][valueKey],
                        ) || enhancedEntity.attributes[key][valueKey];
                }
            }
        }

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
            const linkedObjects = await fetchLinkedObjectsAPI(id, url, dataType, name, type, versionId);
            actions.updateLinkedObjects(linkedObjects);
        } catch (err) {
            console.error('error : ', err);
        }
    },
);

const fetchChildrenObjects = thunk(
    async (actions: Actions<EntityModel>, payload: FetchChildrenObjectsParams, { getStoreState }) => {
        const { parentId, dataType, versionId } = payload;
        try {
            let childrenObjects = [];
            const url = (getStoreState() as any).auth.pubapi;
            if (
                dataType === DataTypeMapping.Source ||
                dataType === DataTypeMapping.Container ||
                dataType === DataTypeMapping.Structure ||
                dataType === DataTypeMapping.Field
            ) {
                childrenObjects = childrenObjects.concat(
                    await fetchChildrenObjectsAPI(parentId, url, DataTypeMapping.Source, versionId),
                );
                childrenObjects = childrenObjects.concat(
                    await fetchChildrenObjectsAPI(parentId, url, DataTypeMapping.Container, versionId),
                );
                childrenObjects = childrenObjects.concat(
                    await fetchChildrenObjectsAPI(parentId, url, DataTypeMapping.Structure, versionId),
                );
                childrenObjects = childrenObjects.concat(
                    await fetchChildrenObjectsAPI(parentId, url, DataTypeMapping.Field, versionId),
                );
            } else {
                childrenObjects = await fetchChildrenObjectsAPI(parentId, url, dataType, versionId);
            }
            actions.updateChildrenObjects(childrenObjects);
        } catch (err) {
            console.error('error : ', err);
        }
    },
);

const fetchGrandChildrenObjects = thunk(
    async (actions: Actions<EntityModel>, payload: FetchChildrenObjectsParams, { getStoreState }) => {
        const { parentId, dataType, versionId } = payload;
        try {
            const url = (getStoreState() as any).auth.pubapi;
            // First search for results
            const childrenObjects = await fetchChildrenObjectsAPI(parentId, url, dataType, versionId);

            actions.updateGrandChildrenObjects({
                parentId,
                childrenObjects,
            });
        } catch (err) {
            console.error('error : ', err);
        }
    },
);

const fetchScreenConfiguration = thunk(
    async (actions: Actions<EntityModel>, payload: FetchScreenConfigurationParams, { getStoreState }) => {
        const { dataType, versionId, type } = payload;
        try {
            const url = (getStoreState() as any).auth.pubapi;
            const screenConfiguration = await fetchScreenConfigurationAPI(url, dataType, versionId);
            actions.updateScreenConfiguration(screenConfiguration.filter((sc) => sc.type === type)[0]);
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
        updateIsLoaded: action((state, payload: boolean) => {
            state.isLoaded = payload;
        }),
        updateDisplayedEntity: action((state, payload: EntityType) => {
            state.displayedEntity = payload;
        }),
        updateLinkedObjects: action((state, payload: any) => {
            state.linkedObjects = payload;
        }),
        updateChildrenObjects: action((state, payload: any) => {
            state.childrenObjects = payload;
        }),
        updateGrandChildrenObjects: action((state, payload: any) => {
            const { parentId, childrenObjects } = payload;
            state.childrenObjects.find((entity) => entity && entity.id === parentId).childrenObjects = childrenObjects;
        }),
        updateScreenConfiguration: action((state, payload: any) => {
            state.screenConfiguration = payload;
        }),
        /* Thunks */
        fetchEntity,
        fetchLinkedObjects,
        fetchChildrenObjects,
        fetchGrandChildrenObjects,
        fetchScreenConfiguration,
    };
};

export default entityModel;

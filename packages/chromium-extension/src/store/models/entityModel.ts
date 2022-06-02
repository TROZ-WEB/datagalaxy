import { Action, Thunk, Actions, thunk, action } from 'easy-peasy';
import {
    fetchEntity as fetchEntityAPI,
    fetchLinkedObjects as fetchLinkedObjectsAPI,
    fetchChildrenObjects as fetchChildrenObjectsAPI,
    fetchScreenConfiguration as fetchScreenConfigurationAPI,
    fetchRecentlyAccessedObjects as fetchRecentlyAccessedObjectsAPI,
    fetchComments as fetchEntityCommentsAPI,
    EntityType,
    EntityComment,
    LinkedObjectsType,
    getUserByEmail,
    getAttributesValues,
    getAttributes,
    ReverseDataTypeMapping,
    AttributeDefinitionType,
    ScreenConfiguration,
    DataTypeMapping,
    TechnologyType,
    UserType,
} from 'shared';
import { enhancedEntitiesWithTechnologiesInfo, enhancedEntitiesWithUserInfo, resetModel } from './helper';

/**
 * This model aims to managed the currently displayed entity in the extension
 */

const initialState = {
    isLoaded: false,
    displayedEntity: null,
    comments: null,
    linkedObjects: null,
    childrenObjects: null,
    screenConfiguration: null,
    currentWorkspace: null,
    recentlyAccessedObjects: null,
};

export interface Comment extends Omit<EntityComment, 'creationUser'> {
    creationUser: UserType;
}

export interface EntityModel {
    /* State */
    isLoaded: boolean;
    displayedEntity?: EntityType;
    comments?: Comment[];
    linkedObjects?: LinkedObjectsType;
    childrenObjects?: EntityType[];
    screenConfiguration?: ScreenConfiguration;
    currentWorkspace?: string;
    recentlyAccessedObjects?: EntityType[];
    /* Actions */
    resetModel: Action<EntityModel>;
    updateIsLoaded: Action<EntityModel, boolean>;
    updateEntity: Action<EntityModel, EntityType>;
    updateComments: Action<EntityModel, Comment[]>;
    updateLinkedObjects: Action<EntityModel, LinkedObjectsType>;
    updateChildrenObjects: Action<EntityModel, EntityType[]>;
    updateScreenConfiguration: Action<EntityModel, ScreenConfiguration>;
    updateCurrentWorkspace: Action<EntityModel, string>;
    updateRecentlyAccessedObjects: Action<EntityModel, EntityType[]>;
    /* Thunks */
    fetchEntity: Thunk<EntityModel, FetchEntityArgs>;
    fetchComments: Thunk<EntityModel, FetchEntityCommentsParams>;
    fetchLinkedObjects: Thunk<EntityModel, FetchLinkedObjectsParams>;
    fetchChildrenObjects: Thunk<EntityModel, FetchChildrenObjectsParams>;
    fetchScreenConfiguration: Thunk<EntityModel, FetchScreenConfigurationParams>;
    fetchRecentlyAccessedObjects: Thunk<EntityModel, null>;
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
    technology: TechnologyType;
}

interface FetchScreenConfigurationParams {
    dataType: string;
    versionId: string;
    type: string;
}

interface FetchEntityCommentsParams {
    versionId: string;
    entityId: string;
}

interface FetchEntityArgs {
    location: string;
    technologies: TechnologyType[];
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
const fetchEntity = thunk(async (actions: Actions<EntityModel>, payload: FetchEntityArgs, { getStoreState }) => {
    try {
        const url = (getStoreState() as any).auth.pubapi;
        // First search for results
        const entity = await fetchEntityAPI(url, payload.location);

        // Then enrich the entity object with required user info
        const [enhancedEntity1] = await enhancedEntitiesWithUserInfo([entity], url);
        const [enhancedEntity2] = await enhancedEntitiesWithTechnologiesInfo(payload.technologies, [enhancedEntity1]);

        const enhancedEntity = enhancedEntity2;

        const allAttributes: AttributeDefinitionType[] = await getAttributes(
            url,
            'attributes',
            ReverseDataTypeMapping[payload.location.split('/')[0]]?.toLowerCase(),
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
                enhancedEntity.attributes[key] = enhancedEntity.attributes[key].sort((a, b) => {
                    if (a?.firstName) {
                        // Persons
                        if (a?.firstName < b?.firstName) {
                            return -1;
                        }
                        if (a?.firstName > b?.firstName) {
                            return 1;
                        }
                    }
                    if (a?.label) {
                        if (a?.label < b?.label) {
                            return -1;
                        }
                        if (a?.label > b?.label) {
                            return 1;
                        }
                    }

                    return 0;
                });
            }
        }

        actions.updateEntity(enhancedEntity);
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
            Object.keys(linkedObjects)?.forEach((key) => {
                linkedObjects[key] = linkedObjects[key].filter((lo) => lo.dataType !== 'DataProcessingItem');
            });

            actions.updateLinkedObjects(linkedObjects);
        } catch (err) {
            console.error('error : ', err);
        }
    },
);

const fetchRecentlyAccessedObjects = thunk(async (actions: Actions<EntityModel>, _payload, { getStoreState }) => {
    try {
        const url = (getStoreState() as any).auth.pubapi;
        const recentlyAccessedObjects = await fetchRecentlyAccessedObjectsAPI(url, 4);
        actions.updateRecentlyAccessedObjects(recentlyAccessedObjects);
    } catch (err) {
        console.error('error : ', err);
    }
});

const fetchChildrenObjects = thunk(
    async (actions: Actions<EntityModel>, payload: FetchChildrenObjectsParams, { getStoreState }) => {
        const { parentId, dataType, versionId, technology } = payload;
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

            childrenObjects?.map((co) => {
                // set parent technology to childrens
                if (co && !co.attributes?.technologyCode) {
                    co.technology = technology;
                }

                return co;
            });

            actions.updateChildrenObjects(childrenObjects);
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

const fetchComments = thunk(
    async (actions: Actions<EntityModel>, payload: FetchEntityCommentsParams, { getStoreState }) => {
        const { versionId, entityId } = payload;
        try {
            const url = (getStoreState() as any).auth.pubapi;
            const entityComments = await fetchEntityCommentsAPI(url, versionId, entityId);
            const comments: Comment[] = [];
            for (const comment of entityComments) {
                const user = await getUserByEmail(url, comment.creationUser);
                comments.push({
                    ...comment,
                    creationUser: user,
                });
            }
            actions.updateComments(comments);
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
        updateEntity: action((state, payload: EntityType) => {
            state.displayedEntity = payload;
            state.isLoaded = true;
        }),
        updateComments: action((state, payload: Comment[]) => {
            state.comments = payload;
        }),
        updateLinkedObjects: action((state, payload: any) => {
            state.linkedObjects = payload;
        }),
        updateChildrenObjects: action((state, payload: any) => {
            state.childrenObjects = payload;
        }),
        updateScreenConfiguration: action((state, payload: any) => {
            state.screenConfiguration = payload;
        }),
        updateCurrentWorkspace: action((state, payload: string) => {
            state.currentWorkspace = payload;
        }),
        updateRecentlyAccessedObjects: action((state, payload: any) => {
            state.recentlyAccessedObjects = payload;
        }),
        /* Thunks */
        fetchEntity,
        fetchComments,
        fetchLinkedObjects,
        fetchChildrenObjects,
        fetchScreenConfiguration,
        fetchRecentlyAccessedObjects,
    };
};

export default entityModel;

/* eslint-disable import/prefer-default-export */
import { computed } from 'easy-peasy';
import {
    AttributeDefinitionType,
    decodeJWT,
    EntityType,
    Filter,
    getUsersByEmailsAndRole,
    TechnologyType,
} from 'shared';

const resetModel = (initialState) => (state) => {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const attr in initialState) {
        if (Object.prototype.hasOwnProperty.call(initialState, attr)) {
            state[attr] = initialState[attr];
        }
    }
};

const getDecodedPAT = (patAttributeName: string) =>
    computed((state) => {
        if (state[patAttributeName]) {
            return decodeJWT(atob(state[patAttributeName]));
        }

        return null;
    });
/**
 * From array of entities it will enhanced each one with owner/steward information
 */
const enhancedEntitiesWithUserInfo = async (rawEntities: EntityType[], url): Promise<EntityType[]> => {
    const emails: { owners: string[]; stewards: string[] } = rawEntities?.reduce(
        (acc, rawEntity) => {
            return {
                owners: rawEntity?.attributes?.owners
                    ? Array.from(new Set([...acc.owners, ...rawEntity?.attributes?.owners]))
                    : Array.from(new Set([...acc.owners])),
                stewards: rawEntity?.attributes?.stewards
                    ? Array.from(new Set([...acc.stewards, ...rawEntity?.attributes?.stewards]))
                    : Array.from(new Set([...acc.stewards])),
            };
        },
        { owners: [], stewards: [] },
    );
    const usersInfos = {
        owners: (await getUsersByEmailsAndRole(url, emails.owners, 'owner')).owners,
        stewards: (await getUsersByEmailsAndRole(url, emails.stewards, 'steward')).stewards,
    };

    return rawEntities.map((result) => {
        return {
            ...result,
            owners: result?.attributes?.owners?.map((email) => {
                return usersInfos.owners?.find(({ email: emailToFind }) => emailToFind === email);
            }),
            stewards: result?.attributes?.stewards?.map((email) => {
                return usersInfos.stewards?.find(({ email: emailToFind }) => emailToFind === email);
            }),
        };
    });
};

const enhancedEntitiesWithTechnologiesInfo = async (
    technologies: TechnologyType[],
    rawEntities: EntityType[],
): Promise<EntityType[]> => {
    return rawEntities?.map((rawEntity) => {
        const { technologyCode } = rawEntity?.attributes;
        const fullTechnology = technologies?.find((t) => t.technologyCode === technologyCode);

        return {
            ...rawEntity,
            technology: fullTechnology,
        };
    });
};

const enhancedEntitiesWithAttributesInfo = async (
    attributes: AttributeDefinitionType[],
    rawEntities: EntityType[],
): Promise<EntityType[]> => {
    return rawEntities?.map((rawEntity) => {
        if (rawEntity.exactMatchAttributes) {
            const newExactMatches = rawEntity.exactMatchAttributes.map((ema) => {
                const fullAttribute =
                    attributes?.find((a) => a.attributeKey === ema.attributeKey && a.dataType === rawEntity.dataType) ||
                    attributes?.find((a) => a.attributeKey === ema.attributeKey && a.dataType === 'Common') ||
                    ema;

                return {
                    ...fullAttribute,
                    value: ema.value,
                };
            });
            rawEntity.exactMatchAttributes = newExactMatches;
        }

        return rawEntity;
    });
};

const enhancedQuickFiltersWithAttributesInfo = async (
    attributes: AttributeDefinitionType[],
    rawQuickFilters: { filter: Filter }[],
): Promise<{ filter: Filter }[]> => {
    return rawQuickFilters?.map(({ filter }) => {
        const fullAttribute = attributes?.find((a) => a.attributeKey === filter?.attributeKey);
        const supportedAttributeKeys = [
            'Workspace',
            'TechnologyCode',
            'Module',
            'EntityType',
            'Domains',
            'DataOwners',
            'DataStewards',
            'EntityStatus',
        ];

        return {
            filter: {
                attributeKey: supportedAttributeKeys.includes(filter?.attributeKey)
                    ? filter?.attributeKey
                    : fullAttribute?.name || filter?.attributeKey,
                operator: filter?.operator,
                values: filter?.values,
            },
        };
    });
};

export {
    enhancedEntitiesWithUserInfo,
    enhancedEntitiesWithTechnologiesInfo,
    enhancedEntitiesWithAttributesInfo,
    enhancedQuickFiltersWithAttributesInfo,
    resetModel,
    getDecodedPAT,
};

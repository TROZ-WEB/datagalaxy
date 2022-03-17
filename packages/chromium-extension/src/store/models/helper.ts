/* eslint-disable import/prefer-default-export */
import { computed } from 'easy-peasy';
import { decodeJWT, EntityType, getUsersByEmailsAndRole, TechnologyType } from 'shared';
import { useStoreState } from '../hooks';

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
    const emails: { owners: string[]; stewards: string[] } = rawEntities.reduce(
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
                return usersInfos.owners.find(({ email: emailToFind }) => emailToFind === email);
            }),
            stewards: result?.attributes?.stewards?.map((email) => {
                return usersInfos.stewards.find(({ email: emailToFind }) => emailToFind === email);
            }),
        };
    });
};

const enhancedEntitiesWithTechnologiesInfo = async (
    technologies: TechnologyType[],
    rawEntities: EntityType[],
): Promise<EntityType[]> => {
    return rawEntities.map((result) => {
        const { technologyCode } = result.attributes;
        const fullTechnology = technologies.find((t) => t.technologyCode === technologyCode);

        return {
            ...result,
            technology: fullTechnology,
        };
    });
};

export { enhancedEntitiesWithUserInfo, enhancedEntitiesWithTechnologiesInfo, resetModel, getDecodedPAT };

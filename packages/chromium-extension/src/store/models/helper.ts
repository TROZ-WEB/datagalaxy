/* eslint-disable import/prefer-default-export */
import { computed } from 'easy-peasy';
import { decodeJWT, EntityType, getUsersByEmailsAndRole } from 'shared';

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
        (acc, { attributes: { owners, stewards } }) => {
            // TODO: if owners or stewards undefined, that crash

            return {
                owners: owners ? Array.from(new Set([...acc.owners, ...owners])) : Array.from(new Set([...acc.owners])),
                stewards: stewards
                    ? Array.from(new Set([...acc.stewards, ...stewards]))
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
            owners: result.attributes.owners?.map((email) => {
                return usersInfos.owners.find(({ email: emailToFind }) => emailToFind === email);
            }),
            stewards: result.attributes.stewards?.map((email) => {
                return usersInfos.stewards.find(({ email: emailToFind }) => emailToFind === email);
            }),
        };
    });
};

export { enhancedEntitiesWithUserInfo, resetModel, getDecodedPAT };

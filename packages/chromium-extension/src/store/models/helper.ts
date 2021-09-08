/* eslint-disable import/prefer-default-export */
import { action } from 'easy-peasy';
import { EntityType, getUsersByEmailsAndRole } from 'shared';

const setState: any = action((state, payload) => {
    state = { ...state, ...payload };
});

/**
 * From array of entities it will enhanced each one with owner/steward information
 */
const enhancedEntitiesWithUserInfo = async (
    rawEntities: EntityType[],
    decodedPat,
    accessToken: string,
): Promise<EntityType[]> => {
    const emails: { owners: string[]; stewards: string[] } = rawEntities.reduce(
        (acc, { attributes: { owners, stewards } }) => ({
            owners: Array.from(new Set([...acc.owners, ...owners])),
            stewards: Array.from(new Set([...acc.stewards, ...stewards])),
        }),
        { owners: [], stewards: [] },
    );

    const usersInfos = {
        owners: (await getUsersByEmailsAndRole(decodedPat.pubapi, accessToken, emails.owners, 'owner')).owners,
        stewards: (await getUsersByEmailsAndRole(decodedPat.pubapi, accessToken, emails.stewards, 'steward')).stewards,
    };

    return rawEntities.map((result) => {
        return {
            ...result,
            owner: usersInfos.owners.find(({ email }) => email === result.attributes.owners[0]),
            steward: usersInfos.stewards.find(({ email }) => email === result.attributes.stewards[0]),
        };
    });
};

export { setState, enhancedEntitiesWithUserInfo };

import React, { useState } from 'react';
import { decodePAT, getAccessToken, search, FieldEntity, getUsersByEmailsAndRole } from 'shared';
import VerticalMenu from '../VerticalMenu';
import SearchCardResult from './SearchCardResult';
import SearchInput from './SearchInput';
import { useSearchInput } from './SearchInput/useSearchInput';
import styles from './index.css';

// TODO Replace with path from account when available
const PAT = 'REPLACE WITH YOUT PAT';

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [searchEntities, setSearchEntities] = useState<FieldEntity[]>([]);

    const debounceOnChange = async ({ value }) => {
        if (value) {
            setLoading(true);
            const decodedPat = decodePAT(PAT);
            const accessToken = await getAccessToken(decodedPat.pubapi, PAT);
            // First search for results
            const searchResult = await search(decodedPat.pubapi, accessToken, value);
            // Load additional user information about fields
            const emails: { owners: string[]; stewards: string[] } = searchResult.result.entities.reduce(
                (acc, { attributes: { owners, stewards } }) => ({
                    owners: Array.from(new Set([...acc.owners, ...owners])),
                    stewards: Array.from(new Set([...acc.stewards, ...stewards])),
                }),
                { owners: [], stewards: [] },
            );

            const usersInfos = {
                owners: (await getUsersByEmailsAndRole(decodedPat.pubapi, accessToken, emails.owners, 'owner')).owners,
                stewards: (await getUsersByEmailsAndRole(decodedPat.pubapi, accessToken, emails.stewards, 'steward'))
                    .stewards,
            };
            // Enhance search result to includes users info
            const enhancedResults = searchResult.result.entities.map((result) => {
                return {
                    ...result,
                    owner: usersInfos.owners.find(({ email }) => email === result.attributes.owners[0]),
                    steward: usersInfos.stewards.find(({ email }) => email === result.attributes.stewards[0]),
                };
            });

            setSearchEntities(enhancedResults);
            setLoading(false);
            setSuccess(true);
        }
    };

    const searchInputProps = useSearchInput({ debounceDuration: 1000, debounceOnChange });

    return (
        <>
            <VerticalMenu />
            <div className={styles.Root}>
                <div>
                    <SearchInput
                        {...searchInputProps}
                        loading={loading}
                        placeholder={chrome.i18n.getMessage('search')}
                        success={success}
                    />
                </div>
                <div className={styles.Results}>
                    <p className={styles.ResultsTitle}>Recent search</p>
                    {searchEntities.map((entity, idx) => (
                        <div key={entity.id}>
                            <SearchCardResult field={entity} />
                            {idx < searchEntities.length - 1 && <span className={styles.Separator} />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchForm;

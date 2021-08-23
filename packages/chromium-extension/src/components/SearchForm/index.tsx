import React, { useState } from 'react';
import { decodePAT, getAccessToken, search, SearchEntity } from 'shared';
import SearchInput from './SearchInput';
import { useSearchInput } from './SearchInput/useSearchInput';
import styles from './index.css';

// TODO Replace with path from account when available
const PAT = 'REPLACE WITH YOUT PAT';

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [searchEntities, setSearchEntities] = useState<SearchEntity[]>([]);

    const debounceOnChange = async ({ value }) => {
        if (value) {
            setLoading(true);
            const decodedPat = decodePAT(PAT);
            const accessToken = await getAccessToken(decodedPat.pubapi, PAT);
            const searchResult = await search(decodedPat.pubapi, accessToken, value);
            setSearchEntities(searchResult.result.entities);
            setLoading(false);
            setSuccess(true);
        }
    };

    const searchInputProps = useSearchInput({ debounceDuration: 1000, debounceOnChange });

    return (
        <div className={styles.Root}>
            <div className={styles.InputContainer}>
                <SearchInput
                    {...searchInputProps}
                    loading={loading}
                    placeholder={chrome.i18n.getMessage('search')}
                    success={success}
                />
            </div>
            <div className={styles.Results}>
                {searchEntities.map((entity) => (
                    <div key={entity.id} className={styles.ResultCard}>
                        <span>{entity.type}</span>
                        <span>{entity.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchForm;

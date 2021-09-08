import React, { useState } from 'react';
import SearchCardResult from './SearchCardResult';
import SearchInput from './SearchInput';
import { useSearchInput } from './SearchInput/useSearchInput';
import styles from './index.css';
import { useStoreState, useStoreDispatch } from '../../store/hooks';

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useStoreDispatch();
    const { searchedArgs, searchResults } = useStoreState((state) => state.search);

    const debounceOnChange = async ({ value }) => {
        if (value) {
            setLoading(true);

            await dispatch.search.search({
                term: value,
            });

            setLoading(false);
            setSuccess(true);
        }
    };

    const searchInputProps = useSearchInput({
        debounceDuration: 1000,
        debounceOnChange,
        initialState: { value: searchedArgs.term || 'data' },
    });

    return (
        <>
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
                    {searchResults.map((entity, idx) => (
                        <div key={entity.id}>
                            <div className={styles.SearchCardResultWrapper}>
                                <SearchCardResult entity={entity} />
                            </div>
                            {idx < searchResults.length - 1 && <span className={styles.Separator} />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchForm;

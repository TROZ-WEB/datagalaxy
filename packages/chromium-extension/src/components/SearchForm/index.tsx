import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../store/hooks';
import SearchCardResult from './SearchCardResult';
import SearchInput from './SearchInput';
import { useSearchInput } from './SearchInput/useSearchInput';
import styles from './index.css';

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const history = useHistory();

    const { searchedArgs, searchResults } = useStoreState((state) => state.search);
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);
    const dispatch = useStoreDispatch();

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
        initialState: { value: searchedArgs.term },
    });

    return (
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
                            <SearchCardResult
                                entity={entity}
                                onClick={() => {
                                    updateSelectedEntity(entity);
                                    history.push(`/app/entities/${entity.id}`);
                                }}
                            />
                        </div>
                        {idx < searchResults.length - 1 && <span className={styles.Separator} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchForm;

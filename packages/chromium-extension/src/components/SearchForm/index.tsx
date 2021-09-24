import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../store/hooks';
import SearchCardResult from './SearchCardResult';
import SearchInput from './SearchInput';
import { useSearchInput } from './SearchInput/useSearchInput';
import BlankSearch from '../../../assets/blank-search.png';
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
        } else {
            await dispatch.search.resetSearch();
            setSuccess(false);
        }
    };

    const searchInputProps = useSearchInput({
        debounceDuration: 1000,
        debounceOnChange,
        initialState: { value: searchedArgs.term },
    });

    return (
        <div>
            <div>
                <SearchInput
                    {...searchInputProps}
                    loading={loading}
                    placeholder={chrome.i18n.getMessage('search')}
                    success={success}
                />
            </div>
            <div className={styles.Results}>
                {searchedArgs.term !== '' && (
                    <div className={styles.ResultsTitleWrapper}>
                        <p className={styles.ResultsTitle}>{chrome.i18n.getMessage('search_results')}</p>
                        <span className={styles.TagResultCount}>{searchResults.total}</span>
                    </div>
                )}
                {searchResults.result.entities.length === 0 ? (
                    <div className={styles.BlankSearch}>
                        <img alt="empty result" className={styles.BlankSearchImage} src={BlankSearch} />
                        <p>{chrome.i18n.getMessage('search_blank_search')}</p>
                    </div>
                ) : (
                    searchResults.result.entities.map((entity, idx) => (
                        <div key={entity.id}>
                            <div className={styles.SearchCardResultWrapper}>
                                <SearchCardResult
                                    entity={entity}
                                    onClick={() => {
                                        updateSelectedEntity(entity);
                                        history.push(`/app/entities/${entity.id}`);
                                    }}
                                    alwaysExpanded
                                />
                            </div>
                            {idx < searchResults.result.entities.length - 1 && <span className={styles.Separator} />}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchForm;

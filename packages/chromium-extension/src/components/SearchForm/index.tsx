import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../store/hooks';
import HorizontalSeparator from '../HorizontalSeparator';
import SearchCardResult from './SearchCardResult';
import SearchInput from './SearchInput';
import { useSearchInput } from './SearchInput/useSearchInput';
import BlankSearch from '../../../assets/blank-search.png';

/* ---------- STYLES ---------- */

const SBlankSearch = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #6d6f88;
    font-size: 14px;
`;

const SBlankSearchImage = styled.img`
    width: 250px;
`;

const SResults = styled.div`
    margin-top: 8px;
`;

const SResultsTitle = styled.p`
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #001030;
`;

const SResultsTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 29px;
    margin-bottom: 10px;
`;

const SSearchCardResultWrapper = styled.div`
    margin: 9px auto;
`;

const SSearchCardsResultWrapper = styled.div`
    overflow-y: scroll;
    position: absolute;
    top: 208px;
    right: 4px;
    left: 16px;
    bottom: 16px;
`;

const STagResultCount = styled.span`
    width: 21px;
    height: 17px;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 5px;
    color: #1035b1;
    background-color: #f3f6ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-left: 8px;
`;

/* ---------- COMPONENT ---------- */

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const history = useHistory();

    const { searchedArgs, searchResults } = useStoreState((state) => state.search);
    const { updateSelectedEntity } = useStoreActions((actions) => actions.search);
    const dispatch = useStoreDispatch();

    const { updateDisplayedEntity } = useStoreActions((actions) => actions.entity);

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

    useEffect(() => {
        updateDisplayedEntity(null);
        updateSelectedEntity(null);
    });

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {searchResults && (
                <>
                    <div>
                        <SearchInput
                            {...searchInputProps}
                            loading={loading}
                            placeholder={chrome.i18n.getMessage('search')}
                            success={success}
                        />
                    </div>
                    <SResults>
                        {searchedArgs.term !== '' && (
                            <SResultsTitleWrapper>
                                <SResultsTitle>{chrome.i18n.getMessage('search_results')}</SResultsTitle>
                                <STagResultCount>{searchResults.total}</STagResultCount>
                            </SResultsTitleWrapper>
                        )}
                        {searchResults.result.entities.length === 0 ? (
                            <SBlankSearch>
                                <SBlankSearchImage alt="empty result" src={BlankSearch} />
                                <p>{chrome.i18n.getMessage('search_blank_search')}</p>
                            </SBlankSearch>
                        ) : (
                            <SSearchCardsResultWrapper>
                                {searchResults.result.entities.map((entity, idx) => (
                                    <div key={entity.id}>
                                        <SSearchCardResultWrapper>
                                            <SearchCardResult
                                                entity={entity}
                                                entityPage={false}
                                                onClick={() => {
                                                    updateSelectedEntity(entity);
                                                    history.push(`/app/entities/${entity.id}/`);
                                                }}
                                                alwaysExpanded
                                            />
                                        </SSearchCardResultWrapper>
                                        {idx < searchResults.result.entities.length - 1 && <HorizontalSeparator />}
                                    </div>
                                ))}
                            </SSearchCardsResultWrapper>
                        )}
                    </SResults>
                </>
            )}
        </>
    );
};

export default SearchForm;

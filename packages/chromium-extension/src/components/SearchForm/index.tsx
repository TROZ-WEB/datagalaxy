import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EntityType } from 'shared';
import styled from 'styled-components';
import More from '../../icons/More';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../store/hooks';
import HorizontalSeparator from '../HorizontalSeparator';
import EntityHeader from '../ui/EntityHeader';
import Title from '../ui/Title';
import QuickFilters from './QuickFilters';
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

const SResultsTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const SSearchCardResultWrapper = styled.div`
    margin: 8px auto;
`;

const SSearchCardsResultWrapper = styled.div`
    overflow-y: scroll;
    position: absolute;
    height: 100%;
    width: 100%;
    margin-right: 4px;
    box-sizing: border-box;
`;

const STagResultCount = styled.span`
    width: 21px;
    height: 17px;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 5px;
    color: #1035b1;
    background-color: #f3f6ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-left: 8px;
`;

const SMore = styled.span`
    font-size: 16px;
    margin-right: 5px;
`;

const SMoreContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

/* ---------- COMPONENT ---------- */

const SearchForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const history = useHistory();

    const { searchedArgs, searchResults, exactMatches } = useStoreState((state) => state.search);

    const [displayMoreExactMatches, setDisplayMoreExactMatches] = useState(false);
    const [exactMatchesToDisplay, setExactMatchesToDisplay] = useState<EntityType[]>([]);

    useEffect(() => {
        setExactMatchesToDisplay(
            displayMoreExactMatches ? exactMatches?.result?.entities : exactMatches?.result?.entities.slice(0, 4),
        );
    }, [exactMatches, displayMoreExactMatches]);

    const dispatch = useStoreDispatch();

    const { updateIsLoaded } = useStoreActions((actions) => actions.entity);

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

    const hasSearchResults = searchResults.result.entities.length !== 0;
    const hasExactMatches = exactMatches.result.entities.length !== 0;

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {searchResults && (
                <>
                    <SearchInput
                        {...searchInputProps}
                        loading={loading}
                        placeholder={chrome.i18n.getMessage('search')}
                        success={success}
                    />
                    <QuickFilters />
                    <SResults>
                        {searchedArgs.term !== '' && hasExactMatches && (
                            <SResultsTitleWrapper>
                                <Title>{chrome.i18n.getMessage('exact_matches')}</Title>
                                <STagResultCount>{exactMatches?.total}</STagResultCount>
                            </SResultsTitleWrapper>
                        )}
                        {hasExactMatches && (
                            <SSearchCardsResultWrapper>
                                {exactMatchesToDisplay.map((entity, idx) => (
                                    <div key={entity.id}>
                                        <SSearchCardResultWrapper>
                                            <EntityHeader
                                                entity={entity}
                                                entityPage={false}
                                                id={`entityHeader${idx}`}
                                                onClick={() => {
                                                    updateIsLoaded(false);
                                                    const URLLocation = entity.location.replace(
                                                        new RegExp('/', 'g'),
                                                        '.',
                                                    ); // Replace "/" by "." in url
                                                    history.push(`/app/entities/${URLLocation}/`);
                                                }}
                                                alwaysExpanded
                                            />
                                        </SSearchCardResultWrapper>
                                        {idx < exactMatches?.result?.entities.length - 1 && <HorizontalSeparator />}
                                    </div>
                                ))}
                            </SSearchCardsResultWrapper>
                        )}
                    </SResults>
                    {hasExactMatches && !displayMoreExactMatches && (
                        <SMoreContainer onClick={() => setDisplayMoreExactMatches(true)}>
                            <SMore>{chrome.i18n.getMessage('showMore')}</SMore>
                            <More />
                        </SMoreContainer>
                    )}
                    <SResults>
                        {searchedArgs.term !== '' && (
                            <SResultsTitleWrapper>
                                <Title>
                                    {hasExactMatches
                                        ? chrome.i18n.getMessage('more_results')
                                        : chrome.i18n.getMessage('search_results')}
                                </Title>
                                <STagResultCount>{searchResults.total}</STagResultCount>
                            </SResultsTitleWrapper>
                        )}
                        {!hasSearchResults && !hasExactMatches && (
                            <SBlankSearch>
                                <SBlankSearchImage alt="empty result" src={BlankSearch} />
                                <p>{chrome.i18n.getMessage('search_blank_search')}</p>
                            </SBlankSearch>
                        )}
                        {hasSearchResults && (
                            <SSearchCardsResultWrapper>
                                {searchResults?.result?.entities.map((entity, idx) => (
                                    <div key={entity.id}>
                                        <SSearchCardResultWrapper>
                                            <EntityHeader
                                                entity={entity}
                                                entityPage={false}
                                                id={`entityHeader${idx}`}
                                                onClick={() => {
                                                    updateIsLoaded(false);
                                                    const URLLocation = entity.location.replace(
                                                        new RegExp('/', 'g'),
                                                        '.',
                                                    ); // Replace "/" by "." in url
                                                    history.push(`/app/entities/${URLLocation}/`);
                                                }}
                                                alwaysExpanded
                                            />
                                        </SSearchCardResultWrapper>
                                        {idx < searchResults?.result?.entities.length - 1 && <HorizontalSeparator />}
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

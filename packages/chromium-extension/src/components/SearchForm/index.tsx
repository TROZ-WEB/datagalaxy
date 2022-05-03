import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AttributeDefinitionType, EntityType, Filter, SearchHistoryType, TechnologyType } from 'shared';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../store/hooks';
import keyListener, { formatFilters } from '../../utils';
import LoadingScreen from '../LoadingScreen';
import EntityHeader from '../ui/EntityHeader';
import Title from '../ui/Title';
import { closeTooltips } from '../ui/Tooltip';
import QuickFiltersBar from './QuickFiltersBar';
import RecentSearchCard from './RecentSearchCard';
import SearchInput from './SearchInput';
import DomainsModal from './SearchInput/Modals/DomainsModal';
import EntityTypeModal from './SearchInput/Modals/EntityTypeModal';
import LastModifiedModal from './SearchInput/Modals/LastModifiedModal';
import ModuleModal from './SearchInput/Modals/ModuleModal';
import OwnersModal from './SearchInput/Modals/OwnersModal';
import StatusModal from './SearchInput/Modals/StatusModal';
import StewardsModal from './SearchInput/Modals/StewardsModal';
import TechnologiesModal from './SearchInput/Modals/TechnologiesModal';
import WorkspacesModal from './SearchInput/Modals/WorkspacesModal';
import { useSearchInput } from './SearchInput/useSearchInput';
import useEnhancedFilters from './useEnhancedFilters';
import useExactMatches from './useExactMatches';
import BlankSearch from '../../../assets/placeholder-plugin.svg';

/* ---------- STYLES ---------- */

const SBlankSearch = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: 100%;
    color: #6d6f88;
    font-size: 14px;
    flex: 1;
`;

const SBlankSearchImage = styled.img`
    width: 250px;
    margin-bottom: 40px;
`;

const SResultsTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 16px 0px 8px 0px;
`;

const SResultsTitleContainerWrapper = styled.div`
    margin: 8px 0px 8px 0px;
`;

const SSearchCardResultContainer = styled.div`
    ${(props) => !props.isLastElement && `border-bottom: 1px solid rgba(0, 76, 255, 0.08);`}
    border-top: 1px solid transparent;

    &:hover,
    &:focus {
        background: rgba(0, 76, 255, 0.08);
    }
`;

const SSearchCardResultWrapper = styled.div`
    margin: 8px auto;
    margin-left: 6px;
`;

const SSearchCardsResultWrapper = styled.div`
    width: 100%;
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

const SMore = styled.div`
    font-size: 12px;
    margin-right: 3px;
    margin-bottom: 3px;
    margin-top: 15px;
    cursor: pointer;
`;

const SExactMatchsContainer = styled.div`
    margin-bottom: 32px;
`;

const SOverlay = styled.div`
    position: fixed;
    width: 400px;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 300;
    background: #00103033;
`;

const SContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 14px rgba(16, 53, 177, 0.12);
    border-radius: 6px;
    padding: 10px 16px 10px 16px;
    margin-top: 20px;
    ${(props) => props.bottomMargin && `margin-bottom: 20px;`}
`;

/* ---------- COMPONENT ---------- */

enum AttributesWeight {
    LocalSynonym = 13,
    Description = 12,
    LongDescription = 11,
    GdprMainPurpose = 10,
    Code = 9,
    Technology = 8,
    Schema = 7,
    PrimaryKeyTechnicalName = 6,
    TechnicalComments = 5,
    TableDisplayName = 4,
    TableTechnicalName = 3,
    GdprSecondaryPurpose = 2,
    GdprUsageDuration = 1,
}

interface Payload {
    term: string;
    technologies: TechnologyType[];
    filters: Filter[];
    limit?: number;
    versionId?: string;
    attributes: AttributeDefinitionType[];
    saveSearchPayload: boolean;
}

const SearchForm = () => {
    const dispatch = useStoreDispatch();

    const history = useHistory();
    const { pickedFilters, versionId } = useStoreState((state) => state.filters);
    const { searchedArgs, searchResults, exactMatches, quickFilters, recentSearches } = useStoreState(
        (state) => state.search,
    );

    const { recentlyAccessedObjects } = useStoreState((state) => state.entity);
    const { updateIsLoaded, updateCurrentWorkspace } = useStoreActions((actions) => actions.entity);
    const { technologies, attributes } = useStoreState((state) => state.auth);
    const { filteredExactMatches } = useExactMatches(exactMatches);
    const { workspaces } = useStoreState((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [displayMoreExactMatches, setDisplayMoreExactMatches] = useState(false);
    const [exactMatchesEntitiesToDisplay, setExactMatchesEntitiesToDisplay] = useState<EntityType[]>([]);
    const [enhancedRecentlyAccessedObjects, setEnhancedRecentlyAccessedObjects] = useState<EntityType[]>();

    const historizeSearch = async () => {
        if (!searchedArgs.term && (!searchedArgs.filters || searchedArgs.filters.length === 0)) {
            return;
        }
        const payload: Payload = {
            term: searchedArgs.term,
            technologies,
            filters: searchedArgs.filters,
            attributes,
            saveSearchPayload: true,
        };

        await dispatch.search.search(payload);
    };

    const clickOnEntity = (entity) => {
        closeTooltips();
        historizeSearch();
        updateCurrentWorkspace(entity?.path?.split('\\')[1]); // API WORKAROUND 6 : workspace not present in entity route
        updateIsLoaded(false);
        const URLLocation = entity.location.replace(new RegExp('/', 'g'), '.'); // Replace "/" by "." in url
        history.push(`/app/entities/${URLLocation}/`);
    };

    useEffect(() => {
        if (recentlyAccessedObjects) {
            const enhanced = recentlyAccessedObjects.map((rao) => {
                const r = rao;
                const vid = rao.versionId;
                const linkedWorkspace = workspaces.find((workspace) => workspace.versions?.indexOf(vid) !== -1);
                r.path = rao.path.replace(/^/, `\\${linkedWorkspace?.name}`);

                return r;
            });
            setEnhancedRecentlyAccessedObjects(enhanced);
        }
    }, [recentlyAccessedObjects]);

    useEffect(() => {
        if (filteredExactMatches) {
            setExactMatchesEntitiesToDisplay(
                displayMoreExactMatches
                    ? filteredExactMatches?.result?.entities
                    : filteredExactMatches?.result?.entities.slice(0, 4),
            );
        }
    }, [filteredExactMatches, displayMoreExactMatches]);

    useEffect(() => {
        setDisplayMoreExactMatches(false);
    }, [searchedArgs.term]);

    const searchPickedFilters = pickedFilters
        .map((item) => item.filter)
        .filter((item) => item.attributeKey !== 'Workspace');

    const debounceOnChange = async ({ value }: { value: string }) => {
        const payload: Payload = {
            term: value,
            technologies,
            filters: searchPickedFilters,
            attributes,
            saveSearchPayload: false,
        };

        if (!value && searchPickedFilters.length === 0) {
            payload.limit = 0;
            setSuccess(false);
        }

        setLoading(true);

        if (versionId) {
            payload.versionId = versionId;
        }

        await dispatch.search.search(payload);

        setLoading(false);

        if (value || pickedFilters.length > 0) {
            setSuccess(true);
        }
    };

    const searchInputProps = useSearchInput({
        debounceDuration: 1000,
        debounceOnChange,
        initialState: { value: searchedArgs.term },
    });

    const { computeFilters } = useEnhancedFilters();

    const searchFromRecentSearch = async (term: string, filters: Filter[]) => {
        const newPickedFilters = formatFilters(filters, computeFilters);

        searchInputProps.searchFromPrevious(term, newPickedFilters);
    };

    const hasSearchResults = searchResults.result.entities.length !== 0;
    const hasExactMatches = filteredExactMatches?.result.entities.length !== 0;
    const hasRecentlyAccessedObjects = enhancedRecentlyAccessedObjects?.length !== 0;
    const hasRecentSearches = recentSearches?.length !== 0;
    const displayShowMoreButton = filteredExactMatches?.result.entities.length > 4;

    const { Overlay } = useStoreState((state) => state.modal);
    const { resetModalState } = useStoreActions((actions) => actions.modal);
    const handleClose = () => {
        resetModalState();
    };

    const handleClickEntity = (entity: EntityType) => () => {
        clickOnEntity(entity);
    };

    const handleClickMore = () => {
        setDisplayMoreExactMatches(true);
    };

    const handleClickSearchMore = (recentSearch: SearchHistoryType) => () => {
        searchFromRecentSearch(recentSearch.searchPayload.query, recentSearch.searchPayload.filters);
    };

    const sortExactMatchAttributes = (a, b) => {
        if (AttributesWeight[a.attributeKey] && !AttributesWeight[b.attributeKey]) {
            return 1;
        }

        if (!AttributesWeight[a.attributeKey] && AttributesWeight[b.attributeKey]) {
            return -1;
        }

        if (!AttributesWeight[a.attributeKey] && !AttributesWeight[b.attributeKey]) {
            return a.attributeKey.localeCompare(b.attributeKey);
        }

        return AttributesWeight[a.attributeKey] < AttributesWeight[b.attributeKey] ? -1 : 1;
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {searchResults && (
                <>
                    <SearchInput
                        {...searchInputProps}
                        loading={loading}
                        onBlur={() => {
                            window.removeEventListener('keypress', keyListener, true);
                            window.removeEventListener('keydown', keyListener, true);
                            window.removeEventListener('keyup', keyListener, true);
                        }}
                        onFocus={() => {
                            window.addEventListener('keypress', keyListener, true);
                            window.addEventListener('keydown', keyListener, true);
                            window.addEventListener('keyup', keyListener, true);
                        }}
                        placeholder={chrome.i18n.getMessage('search')}
                        success={success}
                    />
                    <QuickFiltersBar
                        pickedFilters={pickedFilters}
                        quickFilters={quickFilters}
                        search={searchedArgs.term}
                    />
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            {hasExactMatches && (
                                <>
                                    <SResultsTitleWrapper>
                                        <Title>{chrome.i18n.getMessage('exact_matches')}</Title>
                                        <STagResultCount>{exactMatches?.total}</STagResultCount>
                                    </SResultsTitleWrapper>
                                    <SExactMatchsContainer>
                                        <SSearchCardsResultWrapper>
                                            {exactMatchesEntitiesToDisplay.map((entity, idx, array) => (
                                                <SSearchCardResultContainer
                                                    key={entity.id}
                                                    isLastElement={idx === array.length - 1}
                                                >
                                                    <SSearchCardResultWrapper>
                                                        <EntityHeader
                                                            entity={entity}
                                                            entityPage={false}
                                                            exactMatches={entity.exactMatchAttributes.sort(
                                                                sortExactMatchAttributes,
                                                            )}
                                                            id={`entityHeader${idx}`}
                                                            onClick={handleClickEntity(entity)}
                                                            searchQuery={searchedArgs.term}
                                                            alwaysExpanded
                                                        />
                                                    </SSearchCardResultWrapper>
                                                </SSearchCardResultContainer>
                                            ))}
                                        </SSearchCardsResultWrapper>

                                        {displayShowMoreButton && !displayMoreExactMatches && (
                                            <SMore onClick={handleClickMore}>
                                                {chrome.i18n.getMessage('showMore')}
                                            </SMore>
                                        )}
                                    </SExactMatchsContainer>
                                </>
                            )}

                            {hasSearchResults && (
                                <>
                                    <SResultsTitleWrapper>
                                        <Title>
                                            {hasExactMatches
                                                ? chrome.i18n.getMessage('more_results')
                                                : chrome.i18n.getMessage('search_results')}
                                        </Title>
                                        <STagResultCount>{searchResults?.result?.entities?.length}</STagResultCount>
                                    </SResultsTitleWrapper>
                                    <SSearchCardsResultWrapper>
                                        {searchResults?.result?.entities.map((entity, idx, array) => (
                                            <SSearchCardResultContainer
                                                key={entity.id}
                                                isLastElement={idx === array.length - 1}
                                            >
                                                <SSearchCardResultWrapper>
                                                    <EntityHeader
                                                        entity={entity}
                                                        entityPage={false}
                                                        id={`entityHeader${idx}`}
                                                        onClick={handleClickEntity(entity)}
                                                        alwaysExpanded
                                                    />
                                                </SSearchCardResultWrapper>
                                            </SSearchCardResultContainer>
                                        ))}
                                    </SSearchCardsResultWrapper>
                                </>
                            )}

                            {!searchedArgs.term && searchedArgs?.filters?.length === 0 && (
                                // eslint-disable-next-line react/jsx-no-useless-fragment
                                <>
                                    {hasRecentSearches && (
                                        <SContainer bottomMargin={false}>
                                            <SResultsTitleContainerWrapper>
                                                <Title>{chrome.i18n.getMessage('recent_searches')}</Title>
                                            </SResultsTitleContainerWrapper>
                                            <SSearchCardsResultWrapper>
                                                {recentSearches?.map((recentSearch, idx, array) => (
                                                    <SSearchCardResultContainer
                                                        key={idx} // eslint-disable-line react/no-array-index-key
                                                        isLastElement={idx === array.length - 1}
                                                    >
                                                        <SSearchCardResultWrapper>
                                                            <RecentSearchCard
                                                                onClick={handleClickSearchMore(recentSearch)}
                                                                recentSearch={recentSearch}
                                                            />
                                                        </SSearchCardResultWrapper>
                                                    </SSearchCardResultContainer>
                                                ))}
                                            </SSearchCardsResultWrapper>
                                        </SContainer>
                                    )}
                                    {hasRecentlyAccessedObjects && (
                                        <SContainer bottomMargin>
                                            <SResultsTitleContainerWrapper>
                                                <Title>{chrome.i18n.getMessage('recently_accessed_objects')}</Title>
                                            </SResultsTitleContainerWrapper>
                                            <SSearchCardsResultWrapper>
                                                {enhancedRecentlyAccessedObjects?.map((entity, idx, array) => (
                                                    <SSearchCardResultContainer
                                                        key={entity.id}
                                                        isLastElement={idx === array.length - 1}
                                                    >
                                                        <SSearchCardResultWrapper>
                                                            <EntityHeader
                                                                entity={entity}
                                                                entityPage={false}
                                                                id={`entityHeader${idx}`}
                                                                maxWidth={240}
                                                                onClick={handleClickEntity(entity)}
                                                                alwaysExpanded
                                                            />
                                                        </SSearchCardResultWrapper>
                                                    </SSearchCardResultContainer>
                                                ))}
                                            </SSearchCardsResultWrapper>
                                        </SContainer>
                                    )}
                                </>
                            )}
                            {(searchedArgs?.filters?.length !== 0 || searchedArgs.term !== '') &&
                                !hasSearchResults &&
                                !hasExactMatches && (
                                    <SBlankSearch>
                                        <SBlankSearchImage alt="empty result" src={BlankSearch} />
                                    </SBlankSearch>
                                )}
                        </>
                    )}
                </>
            )}
            {Overlay && <SOverlay onClick={handleClose} />}
            <WorkspacesModal />
            <TechnologiesModal />
            <ModuleModal />
            <EntityTypeModal />
            <DomainsModal />
            <OwnersModal />
            <StewardsModal />
            <StatusModal />
            <LastModifiedModal />
        </>
    );
};

export default SearchForm;

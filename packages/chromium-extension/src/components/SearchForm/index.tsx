import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EntityType, PickedFilters } from 'shared';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../store/hooks';
import keyListener from '../../utils';
import LoadingScreen from '../LoadingScreen';
import EntityHeader from '../ui/EntityHeader';
import Title from '../ui/Title';
import QuickFiltersBar from './QuickFiltersBar';
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
    margin-bottom: 35px;
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

const SearchForm = () => {
    const dispatch = useStoreDispatch();
    const history = useHistory();
    const { pickedFilters, versionId } = useStoreState((state) => state.filters);
    const { searchedArgs, searchResults, exactMatches, quickFilters } = useStoreState((state) => state.search);
    const { updateIsLoaded, updateCurrentWorkspace } = useStoreActions((actions) => actions.entity);
    const { technologies } = useStoreState((state) => state.auth);
    const { filteredExactMatches } = useExactMatches(exactMatches);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [displayMoreExactMatches, setDisplayMoreExactMatches] = useState(false);
    const [exactMatchesEntitiesToDisplay, setExactMatchesEntitiesToDisplay] = useState<EntityType[]>([]);

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

    const debounceOnChange = async ({ value, pf }: { value: string; pf?: PickedFilters[] }) => {
        let spf;
        if (pf) {
            spf = pickedFilters.map((item) => item.filter).filter((item) => item.attributeKey !== 'Workspace');
        }
        const searchPicked = spf || searchPickedFilters;

        interface Payload {
            term: string;
            technologies: any[];
            filters: any[];
            limit?: number;
            versionId?: string;
        }

        const payload: Payload = {
            term: value,
            technologies,
            filters: searchPicked,
        };

        if (!value && pickedFilters.length === 0) {
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

    useEffect(() => {
        debounceOnChange({ value: searchedArgs.term });
    }, [dispatch, versionId, pickedFilters]);

    const searchInputProps = useSearchInput({
        debounceDuration: 1000,
        debounceOnChange,
        initialState: { value: searchedArgs.term },
    });

    const hasSearchResults = searchResults.result.entities.length !== 0;
    const hasExactMatches = filteredExactMatches?.result.entities.length !== 0;
    const displayShowMoreButton = filteredExactMatches?.result.entities.length > 4;

    const { Overlay } = useStoreState((state) => state.modal);
    const { resetModalState } = useStoreActions((actions) => actions.modal);
    const handleClose = () => {
        resetModalState();
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
                                            {exactMatchesEntitiesToDisplay.map((entity, idx, array) => {
                                                const exactMatchAttributes = entity.exactMatchAttributes.sort(
                                                    (a, b) => {
                                                        if (
                                                            AttributesWeight[a.attributeKey] &&
                                                            !AttributesWeight[b.attributeKey]
                                                        ) {
                                                            return 1;
                                                        }

                                                        if (
                                                            !AttributesWeight[a.attributeKey] &&
                                                            AttributesWeight[b.attributeKey]
                                                        ) {
                                                            return -1;
                                                        }

                                                        if (
                                                            !AttributesWeight[a.attributeKey] &&
                                                            !AttributesWeight[b.attributeKey]
                                                        ) {
                                                            return a.attributeKey.localeCompare(b.attributeKey);
                                                        }

                                                        return AttributesWeight[a.attributeKey] <
                                                            AttributesWeight[b.attributeKey]
                                                            ? -1
                                                            : 1;
                                                    },
                                                );

                                                return (
                                                    <SSearchCardResultContainer
                                                        key={entity.id}
                                                        isLastElement={idx === array.length - 1}
                                                    >
                                                        <SSearchCardResultWrapper>
                                                            <EntityHeader
                                                                entity={entity}
                                                                entityPage={false}
                                                                exactMatches={exactMatchAttributes}
                                                                id={`entityHeader${idx}`}
                                                                onClick={() => {
                                                                    updateCurrentWorkspace(entity.path.split('\\')[1]);

                                                                    updateIsLoaded(false);
                                                                    const URLLocation = entity.location.replace(
                                                                        new RegExp('/', 'g'),
                                                                        '.',
                                                                    ); // Replace "/" by "." in url
                                                                    history.push(`/app/entities/${URLLocation}/`);
                                                                }}
                                                                searchQuery={searchedArgs.term}
                                                                alwaysExpanded
                                                            />
                                                        </SSearchCardResultWrapper>
                                                    </SSearchCardResultContainer>
                                                );
                                            })}
                                        </SSearchCardsResultWrapper>

                                        {displayShowMoreButton && !displayMoreExactMatches && (
                                            <SMore onClick={() => setDisplayMoreExactMatches(true)}>
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
                                        <STagResultCount>{searchResults.total}</STagResultCount>
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
                                                        onClick={() => {
                                                            updateCurrentWorkspace(entity.path.split('\\')[1]);

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
                                            </SSearchCardResultContainer>
                                        ))}
                                    </SSearchCardsResultWrapper>
                                </>
                            )}

                            {!hasSearchResults && !hasExactMatches && (
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

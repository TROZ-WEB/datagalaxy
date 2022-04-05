import React, { FC, useEffect, useState } from 'react';
import { PickedFilter, SearchHistoryType } from 'shared';
import styled from 'styled-components';
import { formatFilters } from '../../../utils';
import FiltersDisplay from '../FiltersDisplay';
import useEnhancedFilters from '../useEnhancedFilters';
import recentSearchs from '../../../../assets/icons/recent-search.svg';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
`;

const SQueryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    ${(props) => props.hasSearchPayloadFilters && `margin-bottom: 8px;`}
`;

const SQueryText = styled.span`
    margin-left: 5px;
`;

const SRecentSearches = styled.img`
    width: 15px;
    height: 15px;
    position: absolute;
    left: 0;
    ${(props) => !props.hasSearchQuery && `top: 10px;`}
`;

const SFiltersDisplayContainer = styled.div`
    margin-left: 20px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    recentSearch: SearchHistoryType;
    onClick: () => void;
}

const RecentSearchCard: FC<Props> = ({ recentSearch, onClick }) => {
    const { searchPayload } = recentSearch;
    const { computeFilters } = useEnhancedFilters();

    const [enhancedFilters, setEnhancedFilters] = useState<PickedFilter[]>();

    useEffect(() => {
        setEnhancedFilters(formatFilters(searchPayload.filters, computeFilters));
    }, [searchPayload.filters]);

    const hasSearchPayloadFilters = searchPayload.filters.length !== 0;
    const hasSearchQuery = searchPayload.query;

    return (
        <>
            {hasSearchQuery ? (
                <SRoot onClick={() => onClick()}>
                    <SQueryContainer hasSearchPayloadFilters={hasSearchPayloadFilters}>
                        <SRecentSearches hasSearchQuery={hasSearchQuery} alt="recent-searches" src={recentSearchs} />
                        <SQueryText>{searchPayload.query}</SQueryText>
                    </SQueryContainer>
                    {hasSearchPayloadFilters && <FiltersDisplay filters={enhancedFilters} />}
                </SRoot>
            ) : (
                <>
                    <SRoot onClick={() => onClick()}>
                        <SRecentSearches hasSearchQuery={hasSearchQuery} alt="recent-searches" src={recentSearchs} />
                        <SFiltersDisplayContainer>
                            {hasSearchPayloadFilters && <FiltersDisplay filters={enhancedFilters} />}
                        </SFiltersDisplayContainer>
                    </SRoot>
                </>
            )}
        </>
    );
};

export default RecentSearchCard;

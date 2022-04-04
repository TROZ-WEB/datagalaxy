import React, { FC } from 'react';
import { SearchHistoryType } from 'shared';
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
`;

const SQueryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    margin-left: 4px;
`;

const SQueryText = styled.span`
    margin-left: 5px;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    recentSearch: SearchHistoryType;
    onClick: () => void;
}

const RecentSearchCard: FC<Props> = ({ recentSearch, onClick }) => {
    const { searchPayload } = recentSearch;
    const { computeFilters } = useEnhancedFilters();

    const filters = formatFilters(searchPayload.filters, computeFilters);

    return (
        <SRoot onClick={() => onClick()}>
            <SQueryContainer>
                <img alt="back" src={recentSearchs} />
                <SQueryText>{searchPayload.query}</SQueryText>
            </SQueryContainer>
            {searchPayload.filters.length !== 0 && <FiltersDisplay filters={filters} />}
        </SRoot>
    );
};

export default RecentSearchCard;

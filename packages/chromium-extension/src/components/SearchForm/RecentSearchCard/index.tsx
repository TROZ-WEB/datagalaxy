import React, { FC } from 'react';
import { SearchHistoryType } from 'shared';
import styled from 'styled-components';
import QuickFiltersDisplay from '../QuickFiltersDisplay';

/* ---------- STYLES ---------- */

const SRoot = styled.div``;

/* ---------- COMPONENT ---------- */

interface Props {
    recentSearch: SearchHistoryType;
}

const RecentSearchCard: FC<Props> = ({ recentSearch }) => {
    const { searchPayload } = recentSearch;

    return (
        <SRoot>
            {searchPayload.query}
            {searchPayload.filters.length !== 0 && <QuickFiltersDisplay quickFilters={searchPayload.filters} />}
        </SRoot>
    );
};

export default RecentSearchCard;

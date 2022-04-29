import React, { FC, useEffect, useState } from 'react';
import { PickedFilter, SearchHistoryType } from 'shared';
import styled from 'styled-components';
import { formatFilters } from '../../../utils';
import FiltersDisplay from '../FiltersDisplay';
import useEnhancedFilters from '../useEnhancedFilters';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
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

    return (
        <SRoot onClick={onClick}>
            <FiltersDisplay filters={enhancedFilters} searchQuery={searchPayload.query} />
        </SRoot>
    );
};

export default RecentSearchCard;

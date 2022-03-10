import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStoreDispatch, useStoreState, useStoreActions } from '../../../store/hooks';
import Glyph from '../../ui/Glyph';
import QuickFilter from './QuickFilter';
/* ---------- STYLES ---------- */

const SScrollButton = styled.button`
    height: 22px;
    width: 22px;
    border-radius: 22px;
    background-color: #1035b1;
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;

    &:disabled {
        opacity: 0 !important;
    }
`;

const SLeftButton = styled(SScrollButton)`
    left: 4px;
`;

const SRightButton = styled(SScrollButton)`
    right: 4px;
`;

const SGlyph = styled(Glyph)`
    transform: rotate(180deg);
`;

const SRoot = styled.div`
    margin-top: 16px;
    position: relative;
`;

const SScrollContainer = styled.div`
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;
    background-color: #f3f6ff;
    padding: 12px;

    &::-webkit-scrollbar-track {
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        display: none;
    }

    &::-webkit-scrollbar-thumb:hover {
        display: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    ${SScrollButton} {
        opacity: 0;
    }

    &:hover,
    &:focus {
        ${SScrollButton} {
            opacity: 1;
        }
    }
`;

/* ---------- COMPONENT ---------- */

const QuickFilters = () => {
    const dispatch = useStoreDispatch();
    const quickFilters = useStoreState((state) => state.quickFilters.quickFilters);
    const QuickFiltersArray = quickFilters?.quickFilters;

    useEffect(() => {
        const fetchEntity = async () => {
            await dispatch.quickFilters.fetchQuickFilters('TODO : versionId');
        };

        fetchEntity();
    }, [dispatch]);

    const [scrollValue, setScrollValue] = useState(0);
    const shadowRoot = document.getElementById('datagalaxy_shadow_root');
    const scrollContainer = shadowRoot.shadowRoot.getElementById('quickFilters');
    const maxScroll = scrollContainer?.scrollWidth - scrollContainer?.clientWidth;

    const handleScroll = () => {
        setScrollValue(scrollContainer.scrollLeft);
    };

    const handleScrollLeft = () => {
        scrollContainer.scrollLeft -= 300;
    };

    const handleScrollRight = () => {
        scrollContainer.scrollLeft += 300;
    };

    // const { updatePickedQuickFilters } = useStoreActions((actions) => actions.quickFilters);
    // const pickedQuickFilters = useStoreState((state) => state.quickFilters.pickedQuickFilters);

    // useEffect(() => {
    //     dispatch.pickedQuickFilters.updatePickedQuickFilters([]);
    // }, [dispatch]);

    // const handleClick = (filter) => {
    //     updatePickedQuickFilters([...pickedQuickFilters, filter]);
    // };

    return (
        <SRoot>
            <SScrollContainer id="quickFilters" onScroll={handleScroll}>
                <SLeftButton disabled={scrollValue === 0} onClick={handleScrollLeft}>
                    <SGlyph icon="ArrowDropRight" />
                </SLeftButton>
                {QuickFiltersArray?.map(({ filter }) => (
                    <QuickFilter
                        key={filter?.values?.[0]}
                        icon="Table"
                        kind="dictionary"
                        label={chrome.i18n.getMessage(`filter_${filter.attributeKey}`)}
                        onClick={() => handleClick(filter)}
                        value={filter?.values?.length === 1 && filter?.values?.[0]}
                    />
                ))}
                <SRightButton disabled={scrollValue === maxScroll} onClick={handleScrollRight}>
                    <Glyph icon="ArrowDropRight" />
                </SRightButton>
            </SScrollContainer>
        </SRoot>
    );
};

export default QuickFilters;

/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Glyph from '../../ui/Glyph';
import FilterTag from '../SearchInput/FilterTag';
import recentSearchs from '../../../../assets/icons/recent-search.svg';

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
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const SRightButton = styled(SScrollButton)`
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
`;

const SGlyph = styled(Glyph)`
    transform: rotate(180deg);
`;

const SQuickFiltersContainer = styled.div`
    display: flex;
`;

const SRoot = styled.div`
    position: relative;
`;

const SText = styled.p`
    font-size: 10px;
    height: 58px;
    padding: 0px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    color: #989cd9;
    margin: 0;
`;

const SScrollContainer = styled.div`
    overflow-x: hidden;
    scroll-behavior: smooth;
    display: flex;
    align-items: center;

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

const SQueryText = styled.span`
    font-size: 12px;
    margin-inline: 4px;
`;

const SRecentSearches = styled.img`
    margin-right: 15px;
    width: 15px;
    height: 15px;
    left: 0;
`;

/* ---------- COMPONENT ---------- */

interface Props {
    filters: any;
    searchQuery: string;
}

const FiltersDisplay: FC<Props> = ({ filters, searchQuery }) => {
    const [scrollValue, setScrollValue] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    const ref = useRef<HTMLDivElement>();
    useEffect(() => {
        if (ref.current) {
            setMaxScroll(ref.current.scrollWidth - ref.current.clientWidth);
        }
    }, [ref.current]);

    const handleScroll = () => {
        setScrollValue(ref.current.scrollLeft);
    };

    const handleScrollLeft = (e) => {
        e.stopPropagation();
        ref.current.scrollLeft -= 348;
    };

    const handleScrollRight = (e) => {
        e.stopPropagation();
        ref.current.scrollLeft += 348;
    };

    const filtersModal = useRef(null);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <SRoot>
            {filters?.length > 0 || searchQuery ? (
                <SScrollContainer ref={ref} onScroll={handleScroll}>
                    <SLeftButton disabled={scrollValue === 0} onClick={handleScrollLeft}>
                        <SGlyph icon="ArrowDropRight" />
                    </SLeftButton>
                    <SRecentSearches alt="recent-searches" src={recentSearchs} />
                    {searchQuery && <SQueryText>{searchQuery}</SQueryText>}
                    <SQuickFiltersContainer>
                        {filters?.map((f) => (
                            <FilterTag key={f?.filter?.attributeKey} ref={filtersModal} filter={f} displayMode />
                        ))}
                    </SQuickFiltersContainer>
                    <SRightButton disabled={scrollValue === maxScroll} onClick={handleScrollRight}>
                        <Glyph icon="ArrowDropRight" />
                    </SRightButton>
                </SScrollContainer>
            ) : (
                <SText>{chrome.i18n.getMessage(`no_quick_filters`)}</SText>
            )}
        </SRoot>
    );
};

export default FiltersDisplay;

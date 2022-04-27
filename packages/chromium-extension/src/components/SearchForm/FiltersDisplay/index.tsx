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
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;

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
const SQueryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 3px;
`;

const SQueryText = styled.span`
    margin-left: 5px;
    font-size: 11px;
`;

const SRecentSearches = styled.img`
    width: 15px;
    height: 15px;
    left: 0;
    ${(props) => !props.hasSearchQuery && `top: 10px;`}
`;

/* ---------- COMPONENT ---------- */

interface Props {
    filters: any;
    hasSearchPayloadFilters: boolean;
    hasSearchQuery: boolean;
    searchQuery: string;
}

const FiltersDisplay: FC<Props> = ({ filters, hasSearchPayloadFilters, hasSearchQuery, searchQuery }) => {
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
        <>
            {filters?.length > 0 && (
                <SRoot>
                    {filters?.length > 0 ? (
                        <SScrollContainer ref={ref} onScroll={handleScroll}>
                            <SLeftButton disabled={scrollValue === 0} onClick={handleScrollLeft}>
                                <SGlyph icon="ArrowDropRight" />
                            </SLeftButton>
                            <SQueryContainer hasSearchPayloadFilters={hasSearchPayloadFilters}>
                                <SRecentSearches
                                    alt="recent-searches"
                                    hasSearchQuery={hasSearchQuery}
                                    src={recentSearchs}
                                />
                                <SQueryText>{searchQuery}</SQueryText>
                            </SQueryContainer>
                            <SQuickFiltersContainer>
                                {filters?.map((f) => (
                                    <FilterTag
                                        key={f?.filter?.attributeKey}
                                        ref={filtersModal}
                                        filter={f}
                                        displayMode
                                    />
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
            )}
        </>
    );
};

export default FiltersDisplay;

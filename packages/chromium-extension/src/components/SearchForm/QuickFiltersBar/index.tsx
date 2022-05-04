import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { EnhancedFilter, PickedFilter, SearchResponse } from 'shared';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import Glyph from '../../ui/Glyph';
import useEnhancedFilters from '../useEnhancedFilters';
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
    margin-top: 16px;
    position: relative;
    background-color: #f3f6ff;
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
    padding: 12px 8px;

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

interface Props {
    quickFilters: SearchResponse;
    search: string;
    pickedFilters: PickedFilter[];
}

const QuickFiltersBar: FC<Props> = ({ quickFilters, search }) => {
    const [enhancedQuickFilters, setEnhancedQuickFilters] = useState<EnhancedFilter[]>();
    const filtersModalRef = useRef(null);
    const [scrollValue, setScrollValue] = useState(0);
    const ref = useRef<HTMLDivElement>();

    const quickFiltersArray: any = useMemo(
        () => quickFilters?.quickFilters?.filter((f) => !f?.filter?.attributeKey.includes('ObjectLinks')),
        [quickFilters],
    );

    const handleScroll = () => {
        setScrollValue(ref.current.scrollLeft);
    };

    const handleScrollLeft = () => {
        ref.current.scrollLeft -= 348;
    };

    const handleScrollRight = () => {
        ref.current.scrollLeft += 348;
    };

    const { pickedFilters } = useStoreState((state) => state.filters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    const { updateModalState, updateModalTop } = useStoreActions((actions) => actions.modal);

    const modalTop = filtersModalRef?.current?.getBoundingClientRect()?.bottom;

    const handleAddFilter = (f) => () => {
        if (f?.filter?.values?.length === 1) {
            // Closed filter
            const newPickedFilters = [...pickedFilters];
            const filterIndex = newPickedFilters?.findIndex(
                (item) => item?.filter?.attributeKey === f?.filter?.attributeKey,
            );
            if (filterIndex === -1) {
                const filter = {
                    icon: [f.icon],
                    name: f.name,
                    content: [f.content],
                    filter: f.filter,
                };
                newPickedFilters.push(filter);
            } else {
                const { icon, content, filter } = newPickedFilters[filterIndex];
                filter.values.push(f.id);
                icon.push(f.icon);
                content.push(f.content);
            }

            updatePickedFilters(newPickedFilters);
        } else {
            // Open filter
            updateModalTop(modalTop);
            updateModalState({ modal: 'Overlay', isOpen: true });
            updateModalState({ modal: f?.filter?.attributeKey, isOpen: true });
        }
    };

    const { computeFilters } = useEnhancedFilters();

    useEffect(() => {
        setEnhancedQuickFilters(computeFilters(quickFiltersArray)?.slice(0, 12));
    }, [quickFiltersArray]);

    const maxScroll = ref.current?.scrollWidth - ref.current?.clientWidth;

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {(pickedFilters?.length > 0 || search?.length > 0 || enhancedQuickFilters?.length > 0) && (
                <SRoot>
                    {enhancedQuickFilters?.length > 0 ? (
                        <SScrollContainer ref={ref} onScroll={handleScroll}>
                            <SLeftButton disabled={scrollValue === 0} onClick={handleScrollLeft}>
                                <SGlyph icon="ArrowDropRight" />
                            </SLeftButton>
                            <SQuickFiltersContainer>
                                {enhancedQuickFilters?.map((filter, i) => (
                                    <QuickFilter
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={i}
                                        ref={filtersModalRef}
                                        filter={filter}
                                        onClick={handleAddFilter(filter)}
                                    />
                                ))}
                            </SQuickFiltersContainer>
                            <SRightButton
                                disabled={Math.ceil(scrollValue) === maxScroll || enhancedQuickFilters.length < 3}
                                onClick={handleScrollRight}
                            >
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

export default QuickFiltersBar;

import React, { FC, useEffect, useState, useRef } from 'react';
import { QuickFilters } from 'shared';
import styled from 'styled-components';
import { EnhancedFilter } from '../../../../../shared/src/Filters/types';
import { useStoreState, useStoreActions } from '../../../store/hooks';
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
`;

const SScrollContainer = styled.div`
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;
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

interface Props {
    quickFilters: EnhancedFilter[];
    search: string;
}

const QuickFiltersBar: FC<Props> = ({ quickFilters, search }) => {
    const QuickFiltersArray = quickFilters.slice(0, 12);

    const [scrollValue, setScrollValue] = useState(0);
    const shadowRoot = document.getElementById('datagalaxy_shadow_root');
    const scrollContainer = shadowRoot.shadowRoot.getElementById('quickFilters');
    const maxScroll = scrollContainer?.scrollWidth - scrollContainer?.clientWidth;

    const handleScroll = () => {
        setScrollValue(scrollContainer.scrollLeft);
    };

    const handleScrollLeft = () => {
        scrollContainer.scrollLeft -= 325;
    };

    const handleScrollRight = () => {
        scrollContainer.scrollLeft += 325;
    };

    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    useEffect(() => {
        updatePickedFilters([]);
    }, []);

    const { updateModalState, updateModalTop } = useStoreActions((actions) => actions.modal);

    const filtersModal = useRef(null);
    const modalTop = filtersModal?.current?.getBoundingClientRect()?.bottom;

    const handleClick = (filter) => {
        if (filter?.values?.length === 1) {
            updatePickedFilters([...pickedFilters, { icon: null, filter }]);
        } else {
            updateModalTop(modalTop);
            updateModalState({ modal: 'Overlay', isOpen: true });
            updateModalState({ modal: filter?.attributeKey, isOpen: true });
        }
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {(search?.length > 0 || QuickFiltersArray?.length > 0) && (
                <SRoot>
                    {QuickFiltersArray?.length > 0 ? (
                        <SScrollContainer id="quickFilters" onScroll={handleScroll}>
                            <SLeftButton disabled={scrollValue === 0} onClick={handleScrollLeft}>
                                <SGlyph icon="ArrowDropRight" />
                            </SLeftButton>
                            <SQuickFiltersContainer>
                                {QuickFiltersArray?.map((filter, i) => (
                                    <QuickFilter
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={i}
                                        ref={filtersModal}
                                        filter={filter}
                                        onClick={() => handleClick(filter)}
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

export default QuickFiltersBar;

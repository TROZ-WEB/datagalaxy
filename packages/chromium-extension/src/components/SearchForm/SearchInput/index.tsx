import React, { ComponentPropsWithRef, forwardRef, ReactElement, useRef } from 'react';
import styled from 'styled-components';
import Refresh from '../../../icons/Refresh';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import RoundButton from '../../ui/RoundButton';
import FiltersModal from './FiltersModal';
import FilterTag from './FilterTag';

/* ---------- STYLES ---------- */

const SIconLoading = styled(Refresh)`
    @keyframes Rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(720deg);
        }
    }

    animation: Rotate 1700ms cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    display: block;
    font-size: inherit;
    margin-right: 4px;
`;

const SInput = styled.input`
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 13px;
    padding-left: 4px;
    padding-right: 4px;
    border: none;
    font-size: 14px;
    line-height: 18px;
    color: #6d6f88;
    outline: 0;
    background-color: transparent;
    transition: 150ms;
    font-family: 'Montserrat', sans-serif;
`;

const SLeft = styled.div`
    margin-left: 4px;
    white-space: nowrap;

    & svg {
        font-size: 16px;
        line-height: 10px;
        position: relative;
        top: 1px;
        color: #6d6f88;
        width: 16px;
        height: 16px;
    }
`;

const SRight = styled.div`
    margin-right: 4px;
    white-space: nowrap;

    & svg {
        font-size: 16px;
        line-height: 10px;
        position: relative;
        top: 1px;
        color: #6d6f88;
        width: 16px;
        height: 16px;
    }
`;

const SRoot = styled.div`
    border: 1px solid rgba(2, 42, 142, 0.1);
    border-radius: 3px;
`;

const SSearchInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    transition: 150ms;
`;

const SFilterTagsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

/* ---------- COMPONENT ---------- */

export interface IProps extends ComponentPropsWithRef<'input'> {
    onClearSearch?: () => void;
    loading?: boolean;
    success?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, IProps>(
    ({ onClearSearch, loading = false, success = false, ...props }, ref) => {
        const { pickedFilters } = useStoreState((state) => state.filters);
        let rightElement: ReactElement = null;

        if (loading) {
            rightElement = <SIconLoading />;
        } else if (success) {
            rightElement = <RoundButton icon="Cancelsearch" onClick={onClearSearch} />;
        } else {
            rightElement = <RoundButton icon="Search" />;
        }

        const { updateModalState, updateModalTop } = useStoreActions((actions) => actions.modal);
        const filtersModal = useRef(null);
        const modalTop = filtersModal?.current?.getBoundingClientRect()?.bottom;

        const handleClick = (attributeKey) => {
            updateModalTop(modalTop);
            updateModalState({ modal: 'Overlay', isOpen: true });
            updateModalState({ modal: attributeKey, isOpen: true });
        };

        return (
            <SRoot>
                <SFilterTagsContainer>
                    {pickedFilters?.map((filter) => (
                        <FilterTag
                            key={filter?.filter?.values?.[0]}
                            ref={filtersModal}
                            filter={filter}
                            onClick={() => handleClick(filter?.filter?.attributeKey)}
                        />
                    ))}
                </SFilterTagsContainer>

                <SSearchInputContainer>
                    <SLeft>
                        <FiltersModal />
                    </SLeft>
                    <SInput id="searchInput" {...props} ref={ref} />
                    <SRight>{rightElement}</SRight>
                </SSearchInputContainer>
            </SRoot>
        );
    },
);

export default SearchInput;

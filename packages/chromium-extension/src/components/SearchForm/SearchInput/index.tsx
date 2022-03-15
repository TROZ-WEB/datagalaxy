import React, { ComponentPropsWithRef, forwardRef, ReactElement } from 'react';
import styled from 'styled-components';
import Refresh from '../../../icons/Refresh';
import Search from '../../../icons/Search';
import { useStoreState, useStoreActions } from '../../../store/hooks';
import Glyph from '../../ui/Glyph';
import FiltersModal from './FiltersModal';
import FilterTag from './FilterTag';

/* ---------- STYLES ---------- */

const SClearButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    position: relative;
    top: 1px;
    font-family: 'Montserrat', sans-serif;

    @keyframes BounceIn {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    animation: BounceIn 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: block;
    font-weight: 700;
`;

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
`;

const SInput = styled.input`
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 13px;
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
    margin-left: 12px;
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
    margin-right: 12px;
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
        let rightElement: ReactElement = null;

        if (loading) {
            rightElement = <SIconLoading />;
        } else if (success) {
            rightElement = (
                <SClearButton aria-label="Clear" id="clearSearch" onClick={onClearSearch} type="button">
                    <Glyph icon="Cancelsearch" />
                </SClearButton>
            );
        } else {
            rightElement = <Search />;
        }

        const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
        const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

        const handleDeleteFilter = (filter) => {
            const payload = pickedFilters.filter((item) => item !== filter);
            updatePickedFilters(payload);
        };

        const versionId = useStoreState((state) => state.filters.versionId);
        const { updateVersionId } = useStoreActions((actions) => actions.filters);

        const handleDeleteVersion = () => {
            updateVersionId(null);
        };

        return (
            <SRoot>
                <SFilterTagsContainer>
                    {versionId && (
                        <FilterTag
                            key={versionId}
                            icon="Table"
                            kind="dictionary"
                            onClick={() => handleDeleteVersion()}
                            value="Version"
                        />
                    )}
                    {pickedFilters?.map((filter) => (
                        <FilterTag
                            key={filter?.values?.[0]}
                            icon="Table"
                            kind="dictionary"
                            onClick={() => handleDeleteFilter(filter)}
                            value={filter?.values?.[0] || 'test'}
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

SearchInput.displayName = 'Input';

export default SearchInput;

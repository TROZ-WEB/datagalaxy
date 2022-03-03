import React, { ComponentPropsWithRef, forwardRef, ReactElement } from 'react';
import styled from 'styled-components';
import CheckMark from '../../../icons/CheckMark';
import Close from '../../../icons/Close';
import Refresh from '../../../icons/Refresh';
import Search from '../../../icons/Search';

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

const SIconSuccess = styled(CheckMark)`
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
    margin-right: 8px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 1px solid rgba(2, 42, 142, 0.1);
    transition: 150ms;
`;

/* ---------- COMPONENT ---------- */

export interface IProps extends ComponentPropsWithRef<'input'> {
    onClearSearch?: () => void;
    loading?: boolean;
    success?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, IProps>(
    ({ onClearSearch, loading = false, success = false, ...props }, ref) => {
        let leftElement: ReactElement = null;

        if (loading) {
            leftElement = (
                <SLeft>
                    <SIconLoading />
                </SLeft>
            );
        } else if (success) {
            leftElement = (
                <SLeft>
                    <SIconSuccess />
                </SLeft>
            );
        } else {
            leftElement = (
                <SLeft>
                    <Search />
                </SLeft>
            );
        }

        return (
            <SRoot>
                {leftElement}

                <SInput {...props} ref={ref} />

                {props.value && (
                    <SRight>
                        <SClearButton aria-label="Clear" onClick={onClearSearch} type="button">
                            <Close />
                        </SClearButton>
                    </SRight>
                )}
            </SRoot>
        );
    },
);

SearchInput.displayName = 'Input';

export default SearchInput;

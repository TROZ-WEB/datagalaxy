import React, { ComponentPropsWithRef, forwardRef, ReactElement } from 'react';
import CheckMark from '../../../icons/CheckMark';
import Close from '../../../icons/Close';
import Refresh from '../../../icons/Refresh';
import Search from '../../../icons/Search';
import styles from './index.css';

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
                <div className={styles.Left}>
                    <Refresh className={styles.IconLoading} />
                </div>
            );
        } else if (success) {
            leftElement = (
                <div className={styles.Left}>
                    <CheckMark className={styles.IconSuccess} />
                </div>
            );
        } else {
            leftElement = (
                <div className={styles.Left}>
                    <Search />
                </div>
            );
        }

        return (
            <div className={styles.Root}>
                {leftElement}

                <input className={styles.Input} {...props} ref={ref} />

                {props.value && (
                    <div className={styles.Right}>
                        <button aria-label="Clear" className={styles.Clear} onClick={onClearSearch} type="button">
                            <Close />
                        </button>
                    </div>
                )}
            </div>
        );
    },
);

SearchInput.displayName = 'Input';

export default SearchInput;

import React, { ComponentPropsWithRef, forwardRef, ReactElement } from 'react';
import CheckMark from '../../../icons/CheckMark';
import Close from '../../../icons/Close';
import Refresh from '../../../icons/Refresh';
import styles from './index.css';

export interface IProps extends ComponentPropsWithRef<'input'> {
    onClearSearch?: () => void;
    loading?: boolean;
    success?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, IProps>(
    ({ onClearSearch, loading = false, success = false, ...props }, ref) => {
        let rightElement: ReactElement = null;

        if (loading) {
            rightElement = (
                <div className={styles.Right}>
                    <Refresh className={styles.IconLoading} />
                </div>
            );
        } else if (success) {
            rightElement = (
                <div className={styles.Right}>
                    <CheckMark className={styles.IconSuccess} />
                </div>
            );
        }

        return (
            <div className={styles.Root}>
                <input className={styles.Input} {...props} ref={ref} />

                {rightElement}

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

import { useReducer, useCallback, ChangeEvent, useEffect, useState } from 'react';
import { PickedFilters } from 'shared';
import useDebounce from '../../../hooks/useDebounce';
import { useStoreActions, useStoreState } from '../../../store/hooks';

interface IState {
    value: string;
    focused: string;
}

export const initialState = {
    value: '',
    focused: 'false',
};

export type TActionsEnum = { type: 'CHANGE'; value: string } | { type: 'FOCUS' } | { type: 'BLUR' };

export const reducer = (state: IState = initialState, action: TActionsEnum) => {
    switch (action.type) {
        case 'CHANGE': {
            return {
                ...state,
                value: action.value,
            };
        }
        case 'BLUR': {
            return {
                ...state,
                focused: 'false',
            };
        }
        case 'FOCUS': {
            return {
                ...state,
                focused: 'true',
            };
        }
        default:
            return state;
    }
};

export interface IUseSearchInputParams {
    initialState?: Partial<IState>;
    debounceDuration?: number;
    debounceOnChange?: (result: { value: string; pf?: PickedFilters[] }) => void;
    isNewFilter?: boolean;
}

export const useSearchInput = ({
    initialState: partialInitialState = {},
    debounceDuration = 0,
    debounceOnChange,
}: IUseSearchInputParams = {}) => {
    const [{ focused, value }, dispatch] = useReducer(reducer, {
        ...initialState,
        ...partialInitialState,
    });

    const { pickedFilters, versionId } = useStoreState((state) => state.filters);

    const [directSetting, setDirectSetting] = useState(false);
    const [alreadyDebounced, setAlreadyDebounced] = useState(false);
    const [previousSearchedTerm, setPreviousSearchedTerm] = useState('');

    const debouncedvalue = useDebounce(value, debounceDuration);

    const onBlur = useCallback(() => {
        dispatch({ type: 'BLUR' });
    }, [dispatch]);

    const onFocus = useCallback(() => {
        dispatch({ type: 'FOCUS' });
    }, [dispatch]);

    const onChange = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'CHANGE', value: target.value });
        },
        [dispatch],
    );

    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    const onClearSearch = useCallback(async () => {
        updatePickedFilters([]);
        dispatch({ type: 'CHANGE', value: '' });
        setDirectSetting(true);
    }, [dispatch]);

    const searchFromPrevious = useCallback(
        async (term, pf) => {
            updatePickedFilters(pf);
            dispatch({ type: 'CHANGE', value: term });
            setDirectSetting(true);
            setPreviousSearchedTerm(term);
        },
        [dispatch],
    );

    useEffect(() => {
        if (debounceOnChange) {
            if (directSetting) {
                setAlreadyDebounced(true);
            }
            if (!alreadyDebounced) {
                let term = '';
                if (previousSearchedTerm) {
                    term = previousSearchedTerm;
                    setPreviousSearchedTerm(null);
                } else if (directSetting) {
                    term = '';
                } else {
                    term = debouncedvalue;
                }
                debounceOnChange({ value: term });
            } else {
                setAlreadyDebounced(false);
            }
        }
        setDirectSetting(false);
    }, [debouncedvalue, pickedFilters, versionId]);

    return {
        focused,
        value,
        onBlur,
        onFocus,
        onChange,
        onClearSearch,
        debouncedvalue,
        searchFromPrevious,
    };
};

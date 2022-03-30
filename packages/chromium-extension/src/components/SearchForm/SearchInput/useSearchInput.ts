import { useReducer, useCallback, ChangeEvent, useEffect } from 'react';
import { PickedFilters } from 'shared';
import useDebounce from '../../../hooks/useDebounce';
import { useStoreActions } from '../../../store/hooks';

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
    const onClearSearch = useCallback(() => {
        updatePickedFilters([]);
        dispatch({ type: 'CHANGE', value: '' });
        if (debounceOnChange) {
            debounceOnChange({ value: '', pf: [] });
        }
    }, [dispatch, debounceOnChange]);

    useEffect(() => {
        if (debounceOnChange) {
            debounceOnChange({ value: debouncedvalue });
        }
    }, [debouncedvalue]);

    return {
        focused,
        value,
        onBlur,
        onFocus,
        onChange,
        onClearSearch,
        debouncedvalue,
    };
};

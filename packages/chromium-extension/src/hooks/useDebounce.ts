import { useState, useEffect } from 'react';

const useDebounce = <V extends any>(value: V, delay: number) => {
    const [debouncedvalue, setDebouncedvalue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedvalue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedvalue;
};

export default useDebounce;

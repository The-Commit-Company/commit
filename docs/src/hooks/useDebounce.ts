import { useState, useEffect } from 'react';

/**
 * Hook to debounce a value
 * @param value Value to be debounced
 * @param delay Delay in milliseconds (default 200)
 * @returns Debounced value
 */
export const useDebounce = <T = any>(value: T, delay = 200): T => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
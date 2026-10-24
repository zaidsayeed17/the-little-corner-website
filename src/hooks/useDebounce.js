import { useState, useEffect } from "react";

/**
 * Standard debounce hook.
 *
 * @param {*} value
 * @param {number} delay in ms
 * @returns {*} debouncedValue
 */
export function useDebounce(value, delay = 200) {
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

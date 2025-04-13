import { useEffect } from 'react';

/**
 * A custom hook to debounce a function call.
 *
 * @param {Function} callback - The function to debounce.
 * @param {any} value - The value to watch for changes.
 * @param {number} delay - The debounce delay in milliseconds.
 */
const useDebounce = (callback, value, delay) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
};

export default useDebounce;

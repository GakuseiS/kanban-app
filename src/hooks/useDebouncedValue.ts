import { useEffect, useState } from 'react';

/** Хук для отложенного изменения переданного значения
 *
 * @param value Значение
 * @param delay Задержка
 * @returns Отложенное значение
 */
export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  condition: boolean,
  optionalRef?: React.RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!condition) return;

      if (optionalRef && optionalRef?.current?.contains(e.target as Node))
        return;

      if (ref && !ref.current?.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback, condition, optionalRef]);
};

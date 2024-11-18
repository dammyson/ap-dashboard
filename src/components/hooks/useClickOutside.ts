import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  condition: boolean,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!condition) return;

      if (ref && !ref.current?.contains(e.target as Node)) callback();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback, condition]);
};

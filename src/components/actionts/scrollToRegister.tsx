import { useCallback } from 'react';

export const useScrollTo = () => {
  const handleClick = useCallback((elementId: string) => {
    const element = document.getElementById('speakers-registration');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Element with id "${elementId}" not found`);
    }
  }, []);

  return handleClick;
};

import { useEffect, useRef, useState } from 'react';

export function useIsFullyInView(): [boolean, React.RefObject<HTMLDivElement | null>] {
  const ref = useRef<HTMLDivElement>(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const isBottomVisible = rect.bottom <= window.innerHeight && rect.bottom > 0;
        setIsFullyVisible(isBottomVisible);
      },
      {
        threshold: 0.5, // Use threshold 0 to trigger on any intersection change
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [isFullyVisible, ref];
}

interface UseIsMobileReturn {
  isMobile: boolean;
  isLoading: boolean;
}

export const useIsMobile = (): UseIsMobileReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check using media query
      const mediaQuery = window.matchMedia("(max-width: 768px)");

      // Check using user agent (additional detection)
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android', 'webos', 'iphone', 'ipad', 'ipod',
        'blackberry', 'windows phone', 'mobile'
      ];

      const isMobileUA = mobileKeywords.some(keyword =>
        userAgent.includes(keyword)
      );

      // Combine both checks - prioritize media query but consider user agent
      const isMobileDevice = mediaQuery.matches ||
        (isMobileUA && window.innerWidth <= 768);

      setIsMobile(isMobileDevice);
      setIsLoading(false);
    };

    // Initial check
    checkIsMobile();

    // Listen for media query changes
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => checkIsMobile();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Listen for window resize
    window.addEventListener('resize', checkIsMobile);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return {
    isMobile,
    isLoading,
  };
};

export default useIsMobile;

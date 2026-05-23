import { useEffect } from 'react';

export default function useNoScroll() {
  useEffect(() => {
    // Only lock scroll on desktop — mobile needs to scroll past the hero content
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    if (!isDesktop) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Lock scroll on mount
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restore previous values on unmount
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);
}

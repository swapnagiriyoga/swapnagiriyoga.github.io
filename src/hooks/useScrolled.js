import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `offset` pixels.
 * Used to switch the navbar from transparent to soft white.
 *
 * @param {number} [offset=24]
 */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll(); // account for a page restored mid-scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}

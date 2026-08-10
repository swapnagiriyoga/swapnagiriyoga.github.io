import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view.
 *
 * Returns a ref to attach to the element and a boolean. The element stays
 * revealed after the first intersection — no re-hiding on scroll-up, which
 * reads as fussy rather than calm.
 *
 * Falls back to "visible" when IntersectionObserver is unavailable or the
 * visitor prefers reduced motion, so content is never trapped invisible.
 *
 * @param {{ threshold?: number, rootMargin?: string }} [options]
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

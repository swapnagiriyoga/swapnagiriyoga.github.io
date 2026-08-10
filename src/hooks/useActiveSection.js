import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the viewport, so the
 * navbar can highlight the matching link.
 *
 * @param {string[]} ids - Section ids to watch, in document order.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section rather than the first,
        // otherwise short sections never win.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // The band sits below the sticky navbar and above the fold's bottom third.
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node) => node !== null);

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

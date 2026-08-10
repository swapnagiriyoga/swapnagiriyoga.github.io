import { useEffect, useState } from 'react';

/**
 * A hairline bar across the very top showing how far down the page you are.
 *
 * Decorative for sighted users, so it is hidden from assistive technology —
 * a screen reader already knows the document position.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-linear-to-r from-accent via-accent-2 to-brand transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;

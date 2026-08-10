/**
 * Ambient backdrop for the alternating sections.
 *
 * Four large, heavily blurred lavender clouds drifting on long mismatched
 * cycles (34s–53s), plus a still wash to stop the corners reading flat. Slow
 * enough to notice only if you look for it — the point is that the section
 * breathes, not that it animates.
 *
 * Purely decorative, so hidden from assistive technology. The keyframes are
 * covered by the reduced-motion rules in index.css, which leaves the clouds
 * parked in place rather than removing them.
 */
export function ZenBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Still wash, so the edges never fall back to flat colour. */}
      <div className="absolute inset-0 bg-linear-to-br from-wash/12 via-transparent to-accent/10 dark:from-wash/20 dark:to-accent/10" />

      <span className="animate-zen-a absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[100px] dark:bg-accent/18" />
      <span className="animate-zen-b absolute -top-24 right-[-12%] h-[30rem] w-[30rem] rounded-full bg-wash/40 blur-[110px] dark:bg-brand/35" />
      <span className="animate-zen-c absolute bottom-[-18%] left-[22%] h-[32rem] w-[32rem] rounded-full bg-accent-2/18 blur-[120px] dark:bg-accent-2/14" />
      <span className="animate-zen-d absolute right-[18%] bottom-[-10%] h-[26rem] w-[26rem] rounded-full bg-wash/30 blur-[100px] dark:bg-brand/28" />
    </div>
  );
}

export default ZenBackdrop;

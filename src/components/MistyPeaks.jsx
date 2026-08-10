/**
 * The "dream mountain" backdrop — layered ridgelines dissolving into dawn fog.
 *
 * Entirely inline SVG, so it scales to any viewport, weighs almost nothing,
 * and uses the brand palette exactly. Purely decorative: hidden from
 * assistive technology.
 *
 * The viewBox carries 260 units of empty sky above the tallest peak. The
 * artwork is drawn with `slice`, which crops to fill the container — that
 * headroom is what gets sacrificed on wide, short viewports, so the peaks
 * themselves survive instead of being clipped off at the top.
 *
 * Each ridge accepts an independent parallax offset from the parent, which
 * creates depth as the hero scrolls away.
 *
 * @param {object} props
 * @param {number} [props.offset=0] - Scroll offset in px, driving parallax.
 * @param {string} [props.className]
 */
export function MistyPeaks({ offset = 0, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 880"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Ridge fills: each fades toward the bottom so peaks emerge from mist
            rather than sitting on a hard block of colour. */}
        <linearGradient id="peak-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0AAFF" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#E0AAFF" stopOpacity="0.04" />
        </linearGradient>

        <linearGradient id="peak-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C77DFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C77DFF" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="peak-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.46" />
          <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0.08" />
        </linearGradient>

        {/* The dawn sun, cresting well above the ridgeline.
            The fog, sun core and base veil are all painted in the page's own
            surface colour, so in dark mode they read as mist rather than as
            bright white blocks. */}
        <radialGradient id="dawn-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" style={{ stopColor: 'var(--color-glow)' }} stopOpacity="0.95" />
          <stop offset="45%" stopColor="#E0AAFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E0AAFF" stopOpacity="0" />
        </radialGradient>

        {/* Horizontal fog banks drifting across the slopes. */}
        <linearGradient id="fog-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="0" />
          <stop offset="35%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="0.9" />
          <stop offset="65%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="0.9" />
          <stop offset="100%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="0" />
        </linearGradient>

        {/* Everything melts into the page colour at the base, so the artwork
            never ends with a hard edge against the section below. */}
        <linearGradient id="base-veil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="0" />
          <stop offset="70%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="0.85" />
          <stop offset="100%" style={{ stopColor: 'var(--color-surface)' }} stopOpacity="1" />
        </linearGradient>

        <filter id="soft-blur" x="-20%" y="-60%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* --- Dawn glow --------------------------------------------------
          Kept low and off to the right, just above the ridgeline, so it never
          rises into the headline that sits over the middle of the hero. */}
      <g style={{ transform: `translateY(${offset * 0.08}px)` }}>
        <circle cx="1148" cy="486" r="230" fill="url(#dawn-sun)" />
        <circle cx="1148" cy="486" r="46" style={{ fill: 'var(--color-glow)' }} opacity="0.75" />
      </g>

      {/* --- Far ridge: palest, moves least ------------------------------- */}
      <g style={{ transform: `translateY(${offset * 0.06}px)` }}>
        <path
          d="M0 590 L118 492 L206 544 L318 420 L432 522 L536 456 L648 548 L742 486 L868 572 L978 504 L1096 568 L1210 492 L1322 560 L1440 506 L1440 880 L0 880 Z"
          fill="url(#peak-far)"
        />
      </g>

      {/* --- Middle ridge -------------------------------------------------- */}
      <g style={{ transform: `translateY(${offset * 0.14}px)` }}>
        <path
          d="M0 690 L146 602 L268 658 L392 546 L470 598 L586 506 L700 612 L812 564 L936 646 L1058 580 L1188 658 L1300 602 L1440 672 L1440 880 L0 880 Z"
          fill="url(#peak-mid)"
        />
        {/* A dusting of snow on the two tallest mid peaks. */}
        <path
          d="M586 506 L616 534 L600 536 L586 528 L572 536 L556 534 Z"
          style={{ fill: 'var(--color-glow)' }}
          opacity="0.75"
        />
        <path
          d="M392 546 L418 570 L404 572 L392 564 L378 572 L366 570 Z"
          style={{ fill: 'var(--color-glow)' }}
          opacity="0.6"
        />
      </g>

      {/* --- Drifting fog between the ranges ------------------------------ */}
      <g className="animate-fog" filter="url(#soft-blur)">
        <ellipse cx="420" cy="620" rx="330" ry="26" fill="url(#fog-band)" opacity="0.85" />
        <ellipse cx="1080" cy="654" rx="290" ry="22" fill="url(#fog-band)" opacity="0.7" />
        <ellipse cx="740" cy="570" rx="240" ry="18" fill="url(#fog-band)" opacity="0.55" />
      </g>

      {/* --- Near ridge: deepest tone, moves most ------------------------- */}
      <g style={{ transform: `translateY(${offset * 0.24}px)` }}>
        <path
          d="M0 880 L0 716 L124 650 L246 710 L372 626 L498 702 L622 636 L706 678 L830 612 L960 696 L1090 644 L1216 710 L1340 656 L1440 708 L1440 880 Z"
          fill="url(#peak-near)"
        />
      </g>

      {/* --- Base veil: dissolve into the page ---------------------------- */}
      <rect x="0" y="640" width="1440" height="240" fill="url(#base-veil)" />
    </svg>
  );
}

export default MistyPeaks;

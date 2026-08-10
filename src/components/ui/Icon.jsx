/**
 * Hand-drawn inline SVG icon set. No icon library, no image files.
 *
 * Icons are stroked with `currentColor` so they inherit the text colour of
 * their container. Decorative by default (`aria-hidden`); pass a `title` to
 * expose one to assistive technology as an image.
 */

const paths = {
  /* --- Brand values ------------------------------------------------------ */
  // Inner peace: a lotus opening
  lotus: (
    <>
      <path d="M12 21c-4.2 0-7.5-2.6-7.5-5.4 0-1 .5-1.9 1.3-2.5" />
      <path d="M12 21c4.2 0 7.5-2.6 7.5-5.4 0-1-.5-1.9-1.3-2.5" />
      <path d="M12 21c-2.3 0-4-2.4-4-5.4 0-3.4 1.9-6.6 4-8.6 2.1 2 4 5.2 4 8.6 0 3-1.7 5.4-4 5.4Z" />
      <path d="M12 21c-3.3-.6-5.6-3-5.6-5.6 0-1.3.4-2.4 1-3.3" />
      <path d="M12 21c3.3-.6 5.6-3 5.6-5.6 0-1.3-.4-2.4-1-3.3" />
    </>
  ),
  // Mindfulness: a head in profile with a still centre
  mindfulness: (
    <>
      <path d="M12 3a7.5 7.5 0 0 0-6 12v3.5a1.5 1.5 0 0 0 1.5 1.5H10v-2h4v2h2.5A1.5 1.5 0 0 0 18 18.5V15a7.5 7.5 0 0 0-6-12Z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  // Fitness: a rising energy arc
  fitness: (
    <>
      <path d="M4 17c2.5 0 3.5-3 5-6s3-6 5.5-6" />
      <path d="M20 6.5 14.5 5l-.8 5.4" />
      <path d="M4 21h16" />
    </>
  ),

  /* --- General UI -------------------------------------------------------- */
  mountain: (
    <>
      <path d="M3 19 9.5 7l4 6.5L16 9.5 21 19H3Z" />
      <circle cx="17.5" cy="5.5" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  signal: (
    <>
      <path d="M5 20v-4" />
      <path d="M10 20v-8" />
      <path d="M15 20v-12" />
      <path d="M20 20V4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="3" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronLeft: <path d="m14.5 5.5-6 6.5 6 6.5" />,
  chevronRight: <path d="m9.5 5.5 6 6.5-6 6.5" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  quote: (
    <path
      d="M9.5 6C6.5 7.4 5 9.9 5 13.5v4.5h5.5v-6H8.2c.2-1.8 1-3 2.6-3.8L9.5 6Zm9 0C15.5 7.4 14 9.9 14 13.5v4.5h5.5v-6h-2.3c.2-1.8 1-3 2.6-3.8L18.5 6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="m4.5 8 6.4 4.6a2 2 0 0 0 2.2 0L19.5 8" />
    </>
  ),
  spark: (
    <path d="M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9 12 3.5Z" />
  ),
  arrowUp: (
    <>
      <path d="M12 19.5v-15" />
      <path d="m5.5 11 6.5-6.5L18.5 11" />
    </>
  ),

  /* --- Preference controls ----------------------------------------------- */
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </>
  ),
  moon: <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />,
  system: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M8.5 21h7M12 17v4" />
    </>
  ),
  motion: (
    <>
      <path d="M3 12h3.5l2-6 3.5 12 2.5-8 1.8 4H21" />
    </>
  ),
  motionOff: (
    <>
      <path d="M3 12h5.5l2-4 2 4H21" />
      <path d="m4 4 16 16" />
    </>
  ),

  /* --- Brand marks ------------------------------------------------------- */
  whatsapp: (
    <path
      d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.19-1.36a9.9 9.9 0 0 0 4.85 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.26 8.26 0 0 1-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.4c0-4.57 3.72-8.28 8.29-8.28 2.21 0 4.29.86 5.85 2.43a8.22 8.22 0 0 1 2.42 5.86c0 4.57-3.72 8.25-8.29 8.25Zm4.55-6.18c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.13-.17.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.7 2.59 4.11 3.63.58.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.11-.22-.17-.47-.29Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.26 4c-2.32 0-3.9 1.42-3.9 4.02V10.5H7.7v3h2.66V21h3.14Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

/**
 * @param {object} props
 * @param {keyof typeof paths} props.name
 * @param {number|string} [props.size=24]
 * @param {string} [props.className]
 * @param {string} [props.title] - When provided the icon is announced; otherwise hidden.
 * @param {number} [props.strokeWidth=1.5]
 */
export function Icon({ name, size = 24, className = '', title, strokeWidth = 1.5, ...rest }) {
  const content = paths[name];
  if (!content) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  );
}

export default Icon;

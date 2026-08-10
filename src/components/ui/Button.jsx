/**
 * Shared button primitive.
 *
 * Renders an <a> when `href` is present, otherwise a <button>, so links stay
 * links (right-clickable, openable in a new tab) and actions stay buttons.
 *
 * Colours come from theme tokens, so every variant re-themes in dark mode
 * without a second set of classes.
 */

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium ' +
  'transition-all duration-300 ease-out will-change-transform ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-2';

const variants = {
  /** Filled CTA. Light: brand purple with white text. Dark: pale lavender with deep text. */
  primary:
    'bg-cta text-cta-fg shadow-soft ' +
    'hover:bg-cta-hover hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0',
  /** Outlined, for secondary actions. */
  outline:
    'border border-accent/60 bg-card/70 text-brand backdrop-blur-sm ' +
    'hover:border-accent hover:bg-card hover:shadow-soft hover:-translate-y-0.5',
  /** Quietest option: text with a soft hover wash. */
  ghost: 'text-brand hover:bg-surface-alt',
  /** Inverted, for use on the deep-purple footer (which stays dark in both themes). */
  light:
    'bg-white/95 text-[#5A189A] hover:bg-white hover:-translate-y-0.5 hover:shadow-glow',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm tracking-wide',
  lg: 'px-8 py-4 text-base tracking-wide',
};

/**
 * @param {object} props
 * @param {'primary'|'outline'|'ghost'|'light'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.href] - Renders an anchor when set.
 * @param {boolean} [props.external] - Adds target/rel for off-site links.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;

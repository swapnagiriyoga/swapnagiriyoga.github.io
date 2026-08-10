import logoDark from '../../assets/logo.png';
import logoLight from '../../assets/logo-light.png';
import { brand } from '../../site.config.js';

/**
 * The Swapnagiri brand lockup.
 *
 * Two assets, both cut out of the supplied banner with its background removed:
 *   logo.png        deep purple ink, for light surfaces
 *   logo-light.png  the same artwork remapped to pale lavender, for dark ones
 *
 * Both are rendered and swapped with the `dark:` variant rather than by React
 * state, so the correct one is already showing on first paint.
 *
 * @param {object} props
 * @param {'auto'|'onDark'} [props.tone='auto'] - 'onDark' always uses the pale
 *   variant, for the footer, which stays dark in both themes.
 * @param {string} [props.className] - Sizing, applied to the image height.
 */
export function Logo({ tone = 'auto', className = 'h-11 sm:h-13' }) {
  const shared = `${className} w-auto`;
  const alt = `${brand.name} logo`;

  if (tone === 'onDark') {
    return <img src={logoLight} alt={alt} className={shared} width="820" height="252" />;
  }

  return (
    <>
      <img
        src={logoDark}
        alt={alt}
        className={`${shared} dark:hidden`}
        width="820"
        height="252"
      />
      <img
        src={logoLight}
        alt=""
        aria-hidden="true"
        className={`${shared} hidden dark:block`}
        width="820"
        height="252"
      />
    </>
  );
}

export default Logo;

import Icon from './Icon.jsx';
import { useMotionPreference } from '../../hooks/useMotionPreference.js';
import { useTranslation } from '../../i18n/index.js';

/**
 * Lets a visitor turn this site's animation down without changing an
 * operating-system setting. Sits in the footer next to the theme switch.
 */
export function MotionToggle({ className = '' }) {
  const { reduced, toggle } = useMotionPreference();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      className={`inline-flex items-center gap-2 rounded-pill border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:border-accent/60 hover:bg-white/5 hover:text-accent ${className}`}
    >
      <Icon name={reduced ? 'motionOff' : 'motion'} size={16} />
      {reduced ? t.footer.animationOff : t.footer.animationOn}
      <span aria-live="polite" className="sr-only">
        {reduced ? 'Animation is reduced.' : 'Animation is enabled.'}
      </span>
    </button>
  );
}

export default MotionToggle;

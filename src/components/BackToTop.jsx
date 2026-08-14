import Icon from './ui/Icon.jsx';
import { useScrolled } from '../hooks/useScrolled.js';
import { useMotionPreference } from '../hooks/useMotionPreference.js';
import { useTranslation } from '../i18n/index.js';

/**
 * Returns to the top of the page. Sits directly above the WhatsApp bubble and
 * appears on the same scroll threshold, so the two read as one stack.
 *
 * Focus is moved to the skip link's target afterwards, so a keyboard user is
 * actually returned to the top of the document rather than left mid-page with
 * the viewport scrolled away from their focus.
 */
export function BackToTop() {
  const { t } = useTranslation();
  const visible = useScrolled(600);
  const { reduced } = useMotionPreference();

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.floating.backToTopLabel}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : 'true'}
      className={`fixed right-5 bottom-20 z-40 inline-flex rounded-pill border border-line bg-card/90 p-3 text-brand shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift sm:right-8 sm:bottom-24 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="arrowUp" size={19} />
    </button>
  );
}

export default BackToTop;

import Icon from './ui/Icon.jsx';
import { useScrolled } from '../hooks/useScrolled.js';
import { buildWhatsAppLink, messages } from '../lib/whatsapp.js';

/**
 * Persistent WhatsApp bubble, bottom-right.
 * Hidden over the hero (where the main CTA already sits) and fading in once
 * the visitor starts scrolling, so it never competes with the first impression.
 */
export function FloatingWhatsApp() {
  const visible = useScrolled(600);

  return (
    <a
      href={buildWhatsAppLink(messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Swapnagiri Yoga on WhatsApp"
      className={`group fixed right-5 bottom-5 z-40 inline-flex items-center gap-3 rounded-pill bg-cta py-3.5 pr-5 pl-4 text-cta-fg shadow-glow transition-all duration-500 hover:bg-cta-hover sm:right-8 sm:bottom-8 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : 'true'}
    >
      <Icon name="whatsapp" size={22} />
      {/* The label collapses on small screens, leaving a clean circle. */}
      <span className="hidden text-sm font-medium tracking-wide sm:inline">Book a class</span>
    </a>
  );
}

export default FloatingWhatsApp;

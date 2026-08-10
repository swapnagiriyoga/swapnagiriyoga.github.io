import Icon from './ui/Icon.jsx';
import Logo from './ui/Logo.jsx';
import ThemeToggle from './ui/ThemeToggle.jsx';
import MotionToggle from './ui/MotionToggle.jsx';
import { buildWhatsAppLink, messages } from '../lib/whatsapp.js';
import { brand, navLinks, socials } from '../site.config.js';

/**
 * The one intentionally dark section (#10002B), with light text throughout.
 * A soft lavender ridgeline sits at the top edge so the transition from the
 * light page above is a fade rather than a hard line.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-night text-white/70">
      {/* --- Ridgeline transition from the light page above --------------- */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="block h-16 w-full sm:h-24"
      >
        <defs>
          {/* Fades from whatever colour the page above happens to be into the
              footer, so the seam holds in both themes. */}
          <linearGradient id="footer-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--color-surface-alt)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-night)' }} />
          </linearGradient>
        </defs>
        <rect width="1440" height="120" fill="url(#footer-fade)" opacity="0.9" />
        <path
          d="M0 120 L160 62 L300 100 L470 44 L620 92 L780 40 L940 96 L1100 52 L1260 100 L1440 58 L1440 120 Z"
          style={{ fill: 'var(--color-night)' }}
        />
      </svg>

      {/* Soft glow, so the dark block still feels airy. */}
      <span
        aria-hidden="true"
        className="orb top-0 left-1/4 h-72 w-96 bg-brand/25"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-12 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* --- Brand ---------------------------------------------------- */}
          <div>
            <Logo tone="onDark" className="h-14 sm:h-16" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
              Live online yoga for anyone willing to begin. Roll out a mat, wherever you are, and
              climb inward.
            </p>

            <ul className="mt-7 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.name} on ${social.label}`}
                    className="inline-flex rounded-pill border border-white/15 p-2.5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/5 hover:text-accent"
                  >
                    <Icon name={social.icon} size={19} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Quick links ---------------------------------------------- */}
          <nav aria-label="Footer">
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-white/45 uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[0.95rem] text-white/70 transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- Get in touch ---------------------------------------------- */}
          <div>
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-white/45 uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <a
                  href={buildWhatsAppLink(messages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-accent"
                >
                  <Icon name="whatsapp" size={17} />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-accent"
                >
                  <Icon name="mail" size={17} />
                  {brand.email}
                </a>
              </li>
              <li className="text-white/55">Live on {brand.platform}</li>
            </ul>
          </div>
        </div>

        {/* --- Closing line ---------------------------------------------- */}
        <p className="mt-14 border-t border-white/10 pt-10 text-center font-display text-2xl leading-relaxed text-white/85 italic sm:text-[1.75rem]">
          May your breath be steady, your shoulders soft,
          <br className="hidden sm:block" /> and the climb gentler than you feared.
        </p>

        {/* --- Display preferences ----------------------------------------- */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-10 sm:flex-row">
          <span className="text-xs tracking-[0.18em] text-white/45 uppercase">
            Display
          </span>
          <ThemeToggle compact />
          <MotionToggle />
        </div>

        {/* --- Legal line -------------------------------------------------- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent"
          >
            <Icon name="arrowUp" size={14} />
            Back to the top
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

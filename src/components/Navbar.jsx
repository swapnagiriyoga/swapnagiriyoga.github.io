import { useEffect, useId, useRef, useState } from 'react';
import Icon from './ui/Icon.jsx';
import Logo from './ui/Logo.jsx';
import ThemeToggle from './ui/ThemeToggle.jsx';
import LanguageToggle from './ui/LanguageToggle.jsx';
import WhatsAppCTA from './ui/WhatsAppCTA.jsx';
import { useScrolled } from '../hooks/useScrolled.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useTranslation } from '../i18n/index.js';
import { brand, navLinks } from '../site.config.js';

const SECTION_IDS = navLinks.map((link) => link.id);

export function Navbar() {
  const { t } = useTranslation();
  const scrolled = useScrolled(24);
  const activeId = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  /* Close on Escape, lock body scroll, and trap focus inside the open panel. */
  useEffect(() => {
    if (!menuOpen) return;

    document.body.classList.add('is-locked');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    // Move focus into the panel so keyboard users land where the menu opened.
    panelRef.current?.querySelector('a[href]')?.focus();

    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  /* Close the menu once the viewport is wide enough to show the full nav. */
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => event.matches && setMenuOpen(false);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const shellClasses = scrolled
    ? 'bg-card/85 shadow-nav backdrop-blur-xl'
    : 'bg-transparent';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${shellClasses}`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-8 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <a
          href="#top"
          className="rounded-soft transition-opacity duration-300 hover:opacity-80"
          aria-label={`${brand.name} — ${t.nav.backToTop}`}
        >
          {/* The banner carries its own internal margin, so it is set larger
              than a tight lockup would need in order to read at the same size. */}
          <Logo className={scrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'} />
        </a>

        {/* --- Desktop links --------------------------------------------- */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-pill px-4 py-2 text-sm tracking-wide transition-colors duration-300 hover:text-brand ${
                    isActive ? 'text-brand' : 'text-ink/75'
                  }`}
                >
                  {t.nav[link.id]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle compact />
          <WhatsAppCTA message={t.whatsapp.startJourney} size="sm">
            {t.nav.book}
          </WhatsAppCTA>
        </div>

        {/* --- Mobile toggle ---------------------------------------------- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          className="rounded-pill border border-accent/40 bg-card/70 p-2.5 text-brand-deep transition-colors duration-300 hover:bg-card lg:hidden"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          <span className="sr-only">{menuOpen ? t.nav.closeMenu : t.nav.openMenu}</span>
        </button>
      </nav>

      {/* --- Mobile panel ------------------------------------------------- */}
      <div
        id={menuId}
        ref={panelRef}
        hidden={!menuOpen}
        className="border-t border-accent/20 bg-card/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-soft px-4 py-3 text-base transition-colors duration-200 hover:bg-surface-alt hover:text-brand ${
                  activeId === link.id ? 'text-brand' : 'text-ink'
                }`}
              >
                {t.nav[link.id]}
              </a>
            </li>
          ))}
          <li className="mt-3">
            <WhatsAppCTA
              message={t.whatsapp.startJourney}
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.book}
            </WhatsAppCTA>
          </li>
          <li className="mt-4 flex justify-center border-t border-line pt-4">
            <LanguageToggle />
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;

import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { LANGUAGES, useTranslation } from '../../i18n/index.js';

/**
 * Language picker.
 *
 * A disclosure button plus a listbox rather than a native <select>, so the menu
 * can be styled to match the rest of the navbar. That means the keyboard
 * contract has to be built by hand: arrow keys and Home/End move through the
 * options, Enter/Space choose, Escape closes and returns focus to the button.
 */
export function LanguageToggle({ className = '' }) {
  const { lang, t, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, LANGUAGES.findIndex((l) => l.code === lang)),
  );
  const listId = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  /* Close on outside click or Escape, and keep focus somewhere sensible. */
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  /* Move real focus onto the highlighted option so screen readers follow. */
  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const choose = (code) => {
    setLang(code);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onListKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % LANGUAGES.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + LANGUAGES.length) % LANGUAGES.length);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(LANGUAGES.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(LANGUAGES[activeIndex].code);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${t.nav.language}: ${current.label}`}
        onClick={() => {
          setActiveIndex(Math.max(0, LANGUAGES.findIndex((l) => l.code === lang)));
          setOpen((o) => !o);
        }}
        className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-card/70 px-3 py-1.5 text-xs font-medium text-ink/70 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 hover:text-brand"
      >
        <Icon name="globe" size={15} />
        <span>{current.native}</span>
        <Icon
          name="chevronDown"
          size={13}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t.nav.language}
          onKeyDown={onListKeyDown}
          className="absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-soft border border-line bg-card py-1 shadow-lift"
        >
          {LANGUAGES.map((option, index) => {
            const isSelected = option.code === lang;
            return (
              <li key={option.code}>
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onClick={() => choose(option.code)}
                  onFocus={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                    isSelected
                      ? 'bg-surface-alt text-brand'
                      : 'text-ink/75 hover:bg-surface-alt hover:text-brand'
                  }`}
                >
                  <span>{option.native}</span>
                  {isSelected && <Icon name="check" size={15} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageToggle;

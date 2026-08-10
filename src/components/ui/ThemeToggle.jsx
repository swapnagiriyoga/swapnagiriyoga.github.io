import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { useTheme } from '../../hooks/useTheme.js';

const LABELS = {
  light: { icon: 'sun', text: 'Light' },
  dark: { icon: 'moon', text: 'Dark' },
  system: { icon: 'system', text: 'System' },
};

const ORDER = ['light', 'dark', 'system'];

/**
 * Theme switch.
 *
 * A real radio group rather than a single cycling button, so assistive
 * technology announces all three choices and which is active. Because
 * `role="radio"` sets that expectation, it implements the matching keyboard
 * contract by hand: a roving tabindex (one stop for the whole group) with
 * arrow keys, Home and End moving — and selecting — between options.
 *
 * @param {object} props
 * @param {boolean} [props.compact=false] - Icon-only, for the navbar and footer.
 */
export function ThemeToggle({ compact = false, className = '' }) {
  const { mode, resolved, setMode } = useTheme();
  const groupRef = useRef(null);
  const movedByKeyboard = useRef(false);

  /* After the selection commits, move focus onto the newly checked option —
     but only when the change came from a key press inside this group, so that
     using the switch elsewhere on the page never steals focus. */
  useEffect(() => {
    if (!movedByKeyboard.current) return;
    movedByKeyboard.current = false;
    groupRef.current?.querySelector('[role="radio"][aria-checked="true"]')?.focus();
  }, [mode]);

  const selectAt = (index) => {
    movedByKeyboard.current = true;
    setMode(ORDER[(index + ORDER.length) % ORDER.length]);
  };

  const onKeyDown = (event) => {
    const current = ORDER.indexOf(mode);
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        selectAt(current + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        selectAt(current - 1);
        break;
      case 'Home':
        event.preventDefault();
        selectAt(0);
        break;
      case 'End':
        event.preventDefault();
        selectAt(ORDER.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Colour theme"
      onKeyDown={onKeyDown}
      className={`inline-flex items-center gap-0.5 rounded-pill border border-line bg-card/70 p-1 backdrop-blur-sm ${className}`}
    >
      {ORDER.map((option) => {
        const isActive = mode === option;
        const { icon, text } = LABELS[option];

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isActive}
            /* Roving tabindex: the group is a single stop in the tab order. */
            tabIndex={isActive ? 0 : -1}
            onClick={() => setMode(option)}
            title={`${text} theme`}
            className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
              isActive
                ? 'bg-cta text-cta-fg shadow-soft'
                : 'text-ink/60 hover:bg-surface-alt hover:text-brand'
            }`}
          >
            <Icon name={icon} size={15} />
            {compact ? <span className="sr-only">{text}</span> : <span>{text}</span>}
          </button>
        );
      })}

      {/* Announces the change without moving focus. */}
      <span aria-live="polite" className="sr-only">
        {mode === 'system'
          ? `Theme follows your system setting, currently ${resolved}.`
          : `${LABELS[mode].text} theme.`}
      </span>
    </div>
  );
}

export default ThemeToggle;

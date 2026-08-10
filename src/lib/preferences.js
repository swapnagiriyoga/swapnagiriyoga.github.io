/**
 * Tiny shared stores for the two display preferences.
 *
 * The theme switch is rendered in three places (navbar, mobile menu, footer)
 * and the motion preference is read by two components. Plain `useState` inside
 * each hook call would give every copy its own private state, so flipping one
 * control would leave the others showing the wrong selection. These stores keep
 * a single value per preference and notify every subscriber, which
 * `useSyncExternalStore` then renders from.
 */

/**
 * @param {string} key - localStorage key.
 * @param {(value: string|null) => string} normalise - Coerces stored/unknown values.
 * @param {(value: string) => void} apply - Writes the value to the document.
 */
function createPreferenceStore(key, normalise, apply) {
  let value = normalise(readStored(key));
  const listeners = new Set();

  function readStored(storageKey) {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  return {
    get: () => value,
    set(next) {
      const normalised = normalise(next);
      if (normalised === value) return;
      value = normalised;
      try {
        localStorage.setItem(key, value);
      } catch {
        /* Private browsing — the choice still applies for this session. */
      }
      apply(value);
      listeners.forEach((listener) => listener());
    },
    /** Re-applies to the document without changing the stored value. */
    refresh() {
      apply(value);
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/* --- Theme ---------------------------------------------------------------- */

export const THEME_MODES = ['light', 'dark', 'system'];

export function systemPrefersDark() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export function resolveTheme(mode) {
  return mode === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : mode;
}

export const themeStore = createPreferenceStore(
  'swapnagiri-theme',
  (value) => (THEME_MODES.includes(value) ? value : 'system'),
  (mode) => document.documentElement.setAttribute('data-theme', resolveTheme(mode)),
);

/* --- Motion --------------------------------------------------------------- */

export function systemPrefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function resolveReducedMotion(preference) {
  return preference === 'reduce' || (preference === 'system' && systemPrefersReducedMotion());
}

export const motionStore = createPreferenceStore(
  'swapnagiri-motion',
  (value) => (value === 'reduce' || value === 'full' ? value : 'system'),
  (preference) =>
    document.documentElement.classList.toggle(
      'force-reduce-motion',
      resolveReducedMotion(preference),
    ),
);

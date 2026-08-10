import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { THEME_MODES, resolveTheme, themeStore } from '../lib/preferences.js';

export { THEME_MODES };

/**
 * Light / dark / system theme, persisted to localStorage and applied as
 * `data-theme` on <html>.
 *
 * The initial value is written by the inline script in index.html before first
 * paint, and this hook reads from the same shared store — so every copy of the
 * switch (navbar, mobile menu, footer) stays in agreement.
 *
 * @returns {{ mode: string, resolved: 'light'|'dark', setMode: (m: string) => void, cycle: () => void }}
 */
export function useTheme() {
  const mode = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.get,
    () => 'system', // server snapshot; the inline script has already painted
  );

  const [resolved, setResolved] = useState(() => resolveTheme(mode));

  useEffect(() => {
    setResolved(resolveTheme(mode));
  }, [mode]);

  /* While on "system", follow the OS if it changes underneath us. */
  useEffect(() => {
    if (mode !== 'system' || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      themeStore.refresh();
      setResolved(resolveTheme('system'));
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [mode]);

  const setMode = useCallback((next) => themeStore.set(next), []);

  const cycle = useCallback(() => {
    const index = THEME_MODES.indexOf(themeStore.get());
    themeStore.set(THEME_MODES[(index + 1) % THEME_MODES.length]);
  }, []);

  return { mode, resolved, setMode, cycle };
}

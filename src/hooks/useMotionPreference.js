import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { motionStore, resolveReducedMotion } from '../lib/preferences.js';

/**
 * Lets a visitor reduce motion on this site even when their operating system
 * is not set to do so — useful on shared or borrowed machines, and for people
 * who want animation off here but not everywhere.
 *
 * 'system' defers to `prefers-reduced-motion`. 'reduce' adds
 * `.force-reduce-motion` to <html>, which index.css treats identically to the
 * media query. 'full' opts back in explicitly.
 *
 * Backed by a shared store, so the footer control and the components that read
 * the preference never disagree.
 *
 * @returns {{ preference: 'system'|'reduce'|'full', reduced: boolean, setPreference: Function, toggle: Function }}
 */
export function useMotionPreference() {
  const preference = useSyncExternalStore(
    motionStore.subscribe,
    motionStore.get,
    () => 'system',
  );

  const [reduced, setReduced] = useState(() => resolveReducedMotion(preference));

  useEffect(() => {
    setReduced(resolveReducedMotion(preference));
  }, [preference]);

  /* Follow the OS setting while the visitor has not overridden it. */
  useEffect(() => {
    if (preference !== 'system' || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      motionStore.refresh();
      setReduced(resolveReducedMotion('system'));
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [preference]);

  const setPreference = useCallback((next) => motionStore.set(next), []);
  const toggle = useCallback(
    () => motionStore.set(motionStore.get() === 'reduce' ? 'full' : 'reduce'),
    [],
  );

  return { preference, reduced, setPreference, toggle };
}

import { useMotionPreference } from './useMotionPreference.js';

/**
 * True when motion should be suppressed — either because the operating system
 * asks for it, or because the visitor turned animation off with the site's own
 * control in the footer.
 *
 * JS-driven motion (hero parallax, carousel autoplay) checks this. CSS
 * animations are handled by the media query and `.force-reduce-motion` rules
 * in index.css.
 */
export function useReducedMotion() {
  return useMotionPreference().reduced;
}

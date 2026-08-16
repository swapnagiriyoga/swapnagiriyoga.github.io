import { useCallback, useSyncExternalStore } from 'react';
import { en } from './en.js';
import { hi } from './hi.js';
import { mr } from './mr.js';

/** Every language the site is offered in, in the order the picker shows them. */
export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

const DICTIONARIES = { en, hi, mr };
const STORAGE_KEY = 'swapnagiri-lang';

/** English is served from the root; the others get their own directory. */
export const DEFAULT_LANGUAGE = 'en';

function normalise(value) {
  return DICTIONARIES[value] ? value : DEFAULT_LANGUAGE;
}

/**
 * The URL each language is served from.
 * `/hi/` and `/mr/` are prerendered as real pages at build time, which is what
 * makes the Hindi and Marathi copy indexable — a language held only in
 * localStorage is invisible to search engines.
 */
export function pathForLanguage(code) {
  return code === DEFAULT_LANGUAGE ? '/' : `/${code}/`;
}

/** Reads the language out of the current URL, e.g. `/hi/` -> `'hi'`. */
function readPath() {
  if (typeof location === 'undefined') return null;
  const segment = location.pathname.split('/').filter(Boolean)[0];
  return DICTIONARIES[segment] ? segment : null;
}

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Applies the language to the document.
 *
 * `lang` matters beyond styling: it tells screen readers which pronunciation
 * rules to use, and drives the Devanagari font stack in index.css.
 */
function apply(code) {
  document.documentElement.setAttribute('lang', code);
}

/**
 * Keeps the address bar in step with the chosen language without a reload, so
 * a visitor who switches to Marathi can share the URL they are looking at and
 * the recipient lands on Marathi. `replaceState` rather than `pushState`: the
 * back button should leave the site, not walk back through language flips.
 */
function syncUrl(code) {
  if (typeof history === 'undefined' || typeof location === 'undefined') return;
  const next = pathForLanguage(code) + location.hash;
  if (next !== location.pathname + location.hash) {
    history.replaceState(null, '', next);
  }
}

/* A single shared value, like the theme and motion stores — the picker is
   rendered in both the navbar and the mobile menu, and separate useState would
   let those two copies disagree.

   The URL wins over the stored preference: someone opening /hi/ from a search
   result must get Hindi even if they once chose English on this device. */
let current = normalise(readPath() ?? readStored());
const listeners = new Set();

export const languageStore = {
  get: () => current,
  set(next) {
    const code = normalise(next);
    if (code === current) return;
    current = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* Private browsing — the choice still holds for this session. */
    }
    apply(code);
    syncUrl(code);
    listeners.forEach((listener) => listener());
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/**
 * Returns the active language code, its dictionary, and a setter.
 *
 * @returns {{ lang: string, t: typeof en, setLang: (code: string) => void }}
 */
export function useTranslation() {
  const lang = useSyncExternalStore(languageStore.subscribe, languageStore.get, () => 'en');
  const setLang = useCallback((next) => languageStore.set(next), []);
  return { lang, t: DICTIONARIES[lang], setLang };
}

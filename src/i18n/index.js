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

function normalise(value) {
  return DICTIONARIES[value] ? value : 'en';
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

/* A single shared value, like the theme and motion stores — the picker is
   rendered in both the navbar and the mobile menu, and separate useState would
   let those two copies disagree. */
let current = normalise(readStored());
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

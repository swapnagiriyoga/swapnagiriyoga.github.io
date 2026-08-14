import { WHATSAPP_NUMBER } from '../site.config.js';

/**
 * Build a wa.me deep link that opens a WhatsApp chat with a pre-filled message.
 * Works on both mobile (opens the app) and desktop (opens WhatsApp Web).
 *
 * The message text itself lives in the language dictionaries (`src/i18n`), so
 * the chat opens in whichever language the visitor is reading the site in.
 *
 * @param {string} message - Plain-text message to pre-fill in the chat box.
 * @returns {string} A fully-encoded wa.me URL.
 */
export function buildWhatsAppLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

import { WHATSAPP_NUMBER } from '../site.config.js';

/**
 * Build a wa.me deep link that opens a WhatsApp chat with a pre-filled message.
 * Works on both mobile (opens the app) and desktop (opens WhatsApp Web).
 *
 * @param {string} message - Plain-text message to pre-fill in the chat box.
 * @returns {string} A fully-encoded wa.me URL.
 */
export function buildWhatsAppLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Contextual message templates, so every CTA arrives with the right intent
 * already typed out for the visitor.
 *
 * Sessions are arranged personally between student and teacher — there is no
 * fixed timetable or published price list — so every message opens that
 * conversation rather than pointing at a schedule.
 */
export const messages = {
  general:
    "Hi Swapnagiri Yoga! I'd love to know more about your online yoga sessions.",
  startJourney:
    "Hi Swapnagiri Yoga! I'm ready to start my journey — could we talk about session timings that suit me?",
  planSessions:
    "Hi Swapnagiri Yoga! I'd like to arrange a session. Here are the days and times that usually work for me:",
  askDetails:
    "Hi Swapnagiri Yoga! Could you tell me about session formats and what they cost?",
  beginner:
    "Hi Swapnagiri Yoga! I'm completely new to yoga and would like some guidance on where to begin.",
};

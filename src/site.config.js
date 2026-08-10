/**
 * Central site configuration.
 * Edit copy and contact details here rather than inside components.
 */

/**
 * WhatsApp number in E.164 format, digits only — no "+", spaces, or dashes.
 * +971 55 411 411 3  ->  '971554114113'
 * Every call-to-action on the site routes through this one value.
 */
export const WHATSAPP_NUMBER = '971554114113';

/* ============================================================================
 * CONTACT FORM DELIVERY
 *
 * This is a static site with no server, so the contact form posts to
 * Web3Forms, which relays the message to `brand.email` below.
 *
 * Web3Forms access keys are designed to live in client-side code, so this one
 * is visible in the built bundle by design. It only authorises delivery to the
 * address it was registered against (swapnagiriyoga@gmail.com) — it cannot be
 * used to read anything. If it ever starts attracting spam, generate a fresh
 * key at https://web3forms.com and replace it here.
 *
 * If this is ever blanked out, the form still works: it falls back to opening
 * the visitor's own email app with the message pre-written.
 * ========================================================================== */
export const CONTACT_ACCESS_KEY = 'c6a35a3d-418a-419b-bbb4-0e826afc18d8';

export const brand = {
  name: 'Swapnagiri Yoga',
  tagline: 'Find Your Inner Peak',
  email: 'swapnagiriyoga@gmail.com',
  /** Display form of the WhatsApp number, shown in the contact section. */
  phoneDisplay: '+971 55 411 411 3',
  /** Used only for stating when messages get answered — not a class timetable. */
  timezone: 'GST (GMT+4)',
  /** The platform every live session runs on. */
  platform: 'Google Meet',
};

/** Anchor links used by the navbar and the footer. */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'The Practice' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

/** Social profiles shown in the footer. Swap the hrefs for real accounts. */
export const socials = [
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
  { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
  { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
];

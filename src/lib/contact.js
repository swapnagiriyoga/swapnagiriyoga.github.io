import { CONTACT_ACCESS_KEY, brand } from '../site.config.js';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * True once a real Web3Forms access key has been pasted into site.config.js.
 * Until then the form degrades to a mailto handoff rather than pretending to
 * have sent something into a void.
 */
export function hasDeliveryKey() {
  return (
    typeof CONTACT_ACCESS_KEY === 'string' &&
    CONTACT_ACCESS_KEY.length > 20 &&
    !CONTACT_ACCESS_KEY.startsWith('REPLACE_WITH')
  );
}

/**
 * Sends a contact message.
 *
 * With a key configured this POSTs to Web3Forms, which relays the message to
 * `brand.email` — the visitor stays on the page and never sees an email client.
 *
 * Without one it opens the visitor's own mail app with everything pre-written,
 * addressed to the same inbox. Less seamless, but the message still arrives.
 *
 * @param {{ name: string, email: string, message: string }} values
 * @returns {Promise<{ via: 'web3forms' | 'mailto' }>}
 */
export async function sendContactMessage({ name, email, message }) {
  const subject = `Website enquiry from ${name}`;

  if (!hasDeliveryKey()) {
    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    return { via: 'mailto' };
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: CONTACT_ACCESS_KEY,
      subject,
      from_name: `${brand.name} website`,
      // Replies from the inbox go straight back to the visitor.
      replyto: email,
      name,
      email,
      message,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'The message could not be sent.');
  }

  return { via: 'web3forms' };
}

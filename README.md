# Swapnagiri Yoga

Marketing website for **Swapnagiri Yoga** — live online yoga sessions.
_"Find Your Inner Peak."_

**Live at https://swapnagiriyoga.github.io/** — deployed automatically from
`main` by [the Pages workflow](.github/workflows/deploy.yml).

Single-page React site: serene, light-led, mobile-first, and fully keyboard
accessible. Sessions are arranged personally over WhatsApp — there is no fixed
timetable, no price list, and no booking system to maintain.

---

## Contact details

All contact details live in [`src/site.config.js`](src/site.config.js) — nothing
is hardcoded in a component, so changing them here updates every CTA, the
contact block, and the footer at once.

```js
export const WHATSAPP_NUMBER = '971554114113'; // E.164, digits only

export const brand = {
  email: 'swapna.dumbali@gmail.com',
  phoneDisplay: '+971 55 411 411 3',
  timezone: 'GST (GMT+4)',      // reply hours shown in the contact block
  …
};
```

Still placeholders: the `socials` URLs at the bottom of that file point at
generic instagram.com / youtube.com / facebook.com.

### Turning on the contact form

The form posts to [Web3Forms](https://web3forms.com), which relays messages to
`brand.email`. To activate real sending — free, no account, about 30 seconds:

1. Go to https://web3forms.com
2. Enter **swapnagiriyoga@gmail.com** and press "Create Access Key"
3. Paste the key from that inbox into `CONTACT_ACCESS_KEY` in `site.config.js`

Until then the form still works: it opens the visitor's own mail client with
the message pre-written and addressed to the same inbox. The code path is in
[`src/lib/contact.js`](src/lib/contact.js).

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production bundle into `dist/` |
| `npm run preview` | Serve the built bundle locally |

`dist/` is a static folder — deploy it to Netlify, Vercel, Cloudflare Pages, or
any static host. No backend is required.

---

## Page structure

Hero → About → Instructor → Testimonials → FAQ → Contact → Footer.

Everything transactional — session timings, formats, and cost — is deliberately
left to a WhatsApp conversation rather than published on the page.

```
src/
  site.config.js      Brand details, WhatsApp number, nav links, socials
  lib/whatsapp.js     buildWhatsAppLink() + the contextual message templates
  data/               Page copy — testimonials, faqs
  hooks/              Scroll reveal, navbar scroll state, active section, reduced motion
  assets/             logo.png + the three brand-value illustrations
  components/
    ui/               Section, Reveal, Button, WhatsAppCTA, Logo, Icon primitives
    ...               One component per page section
  index.css           Design tokens (@theme), base styles, keyframes
```

**Editing copy** rarely means touching a component — FAQ answers live in
`data/faqs.js`, student quotes in `data/testimonials.js`, and the three brand
values in the `values` array at the top of `components/About.jsx`.

**Adding a section**: build it from `<Section>` (handles the anchor id,
alternating background, and the eyebrow/title/lead header), wrap blocks in
`<Reveal delay={n}>` for the staggered scroll-in, then add it to `App.jsx` and to
`navLinks` in `site.config.js`.

---

## Images

| File | What it is |
| --- | --- |
| `assets/logo.png` | Your logo with its background removed, for light surfaces. |
| `assets/logo-light.png` | The same artwork remapped to pale lavender, for dark surfaces. `Logo.jsx` renders both and swaps them with the `dark:` variant, so the right one is showing on first paint. |
| `assets/value-*.png` | The three brand-value illustrations, AI-generated to match the palette, background-removed and resized to 512×512. |

**Rebuilding the logo assets.** The supplied banner is a full artwork — a lavender
gradient carrying soft waves, a lotus mandala and a lotus/swoosh flourish — so its
background cannot be keyed out by colour alone: the flourish is *darker* than parts
of the background. `scripts/build-logo.ps1` instead keeps only the monogram and the
wordmark, keys those regions on luminance, unpremultiplies the edges so they carry
no pale fringe, trims to content, and writes both variants. Re-run it if the source
artwork changes:

```bash
powershell -File scripts/build-logo.ps1
```

The hero's misty peaks are hand-coded inline SVG in `components/MistyPeaks.jsx` —
no image file. Its viewBox carries deliberate empty sky above the tallest peak:
the artwork is drawn with `slice`, so on wide, short viewports that headroom is
what gets cropped instead of the peaks themselves.

The instructor portrait is still an SVG placeholder in `components/Instructor.jsx`,
clearly marked — swap it for an `<img>` when a real photo exists.

---

## Design system

Tailwind CSS v4 is configured from CSS — tokens live in the `@theme` block of
`src/index.css`, so there is no `tailwind.config.js`.

| Token | Hex | Used for |
| --- | --- | --- |
| `surface` | `#FFFFFF` | Primary background |
| `surface-alt` | `#F6EEFF` | Alternating sections |
| `wash` | `#E0AAFF` | Gradient blends, glows |
| `accent` | `#C77DFF` | Icons, borders, decoration |
| `accent-2` | `#9D4EDD` | Highlights, focus ring |
| `brand` | `#7B2CBF` | Primary buttons and CTAs |
| `brand-deep` | `#5A189A` | Button hover, strong emphasis |
| `ink-heading` | `#3C096C` | Headings |
| `ink` | `#240046` | Body copy |
| `night` | `#10002B` | Footer background only |

**One rule worth keeping:** `accent` (`#C77DFF`) sits at roughly 2.4:1 against
white and fails WCAG for text. Use it for icons, borders, and decoration only —
text should use `ink`, `ink-heading`, `brand`, or `brand-deep`.

Headings are Cormorant Garamond, body is Inter, both loaded from Google Fonts in
`index.html` with full system fallbacks.

---

## Display preferences

Two controls, both persisted to `localStorage` and both applied before first
paint by the inline script in `index.html`, so the page never flashes the wrong
state:

| Control | Where | What it does |
| --- | --- | --- |
| **Theme** | Navbar, mobile menu, footer | Light / Dark / System. Sets `data-theme` on `<html>`; every colour token in `index.css` re-points, so the whole site re-themes without a second set of classes. "System" follows `prefers-color-scheme` live. |
| **Animation** | Footer | Turns this site's motion down without changing an OS setting. Adds `.force-reduce-motion` to `<html>`, which `index.css` treats identically to `prefers-reduced-motion`. |

Both are backed by small shared stores in `lib/preferences.js` and read through
`useSyncExternalStore`. That matters because the theme switch is rendered in
three places — with plain `useState` each copy would keep its own private value
and the others would show a stale selection after a change.

Measured contrast, both themes, against the surface each token lands on:

| | Light | Dark |
| --- | --- | --- |
| Body text | 18.1:1 | 14.3:1 |
| Headings | 14.5:1 | 17.6:1 |
| Eyebrow / accent text | 7.1:1 | 10.0:1 |
| CTA label on its button | 7.1:1 | 6.8:1 |

---

## Accessibility notes

- Skip-to-content link is the first focusable element; single `<h1>`; landmark elements throughout.
- Theme switch is a real `radiogroup` with a roving tabindex — one tab stop, with arrow keys, Home and End moving and selecting, matching what `role="radio"` leads a screen-reader user to expect.
- A scroll-progress bar tracks position for sighted users and is hidden from assistive technology, which already knows the document position.
- Back-to-top returns focus to `#main`, so a keyboard user is actually taken to the top rather than left mid-page with focus scrolled away.
- Mobile menu traps focus, closes on `Escape`, and restores focus to its toggle.
- FAQ accordion uses real buttons with `aria-expanded`/`aria-controls`; collapsed panels are `inert`, so they stay out of the tab order and the screen-reader tree.
- Testimonial carousel supports ← / → keys, pauses on hover and focus, and announces slide changes through a polite live region.
- Forms have real labels, `aria-invalid`, `aria-describedby` error links, and focus moves to the first invalid field on submit.
- Every image carries descriptive alt text; decorative SVG is `aria-hidden`.
- `prefers-reduced-motion` disables reveals, parallax, carousel autoplay, and smooth scrolling — content renders visible, never hidden.

---

## Not included

The contact and newsletter forms are front-end only: they validate, show a
success state, and offer a WhatsApp handoff, but nothing is sent anywhere. To
make them live, POST to your endpoint at the `// TODO` in
`src/components/Contact.jsx` (Formspree, Resend, or your own API all drop in
cleanly).

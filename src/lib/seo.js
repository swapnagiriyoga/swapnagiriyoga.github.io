/**
 * Keeps the document head in step with the active language.
 *
 * Why this runs in the browser rather than being baked into index.html: the
 * build prerenders the app with a real browser (see scripts/prerender.mjs), so
 * whatever this writes to the head ends up in the static HTML that crawlers and
 * social scrapers read. One implementation serves both the live language switch
 * and the three prerendered pages, instead of a template and a build script
 * drifting apart.
 *
 * Every tag it touches is marked `data-seo="…"` in index.html.
 */

import { brand, socials, WHATSAPP_NUMBER } from '../site.config.js';
import { LANGUAGES, DEFAULT_LANGUAGE, pathForLanguage } from '../i18n/index.js';

/**
 * Canonical origin. The apex domain 301s here, so this must stay the `www`
 * form — a canonical pointing at a redirect throws the signal away.
 */
export const SITE_URL = 'https://www.swapnagiriyoga.com';

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Absolute URL for a language's page, e.g. 'hi' -> '…/hi/'. */
export function urlForLanguage(code) {
  return `${SITE_URL}${pathForLanguage(code)}`;
}

/* --- Head tags ------------------------------------------------------------ */

function setTag(key, value) {
  const el = document.querySelector(`[data-seo="${key}"]`);
  if (!el) return;
  if (el.tagName === 'TITLE') el.textContent = value;
  else if (el.tagName === 'LINK') el.setAttribute('href', value);
  else el.setAttribute('content', value);
}

/* --- Structured data ------------------------------------------------------ */

/**
 * A single `@graph` rather than several loose blocks, so the entities can point
 * at each other by `@id` — that is what lets Google tie the FAQ, the teacher and
 * the business together instead of reading three unrelated fragments.
 *
 * Deliberately NOT typed as `LocalBusiness`: that expects a verified postal
 * address, and inventing one is both dishonest and a fast way to lose the rich
 * result. Once the Google Business Profile is live with a real address, this can
 * be upgraded and `address` filled in from it.
 */
function buildGraph(lang, t) {
  const url = urlForLanguage(lang);
  const org = `${SITE_URL}/#organization`;
  const person = `${SITE_URL}/#swapna`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: brand.name,
        url: SITE_URL,
        email: brand.email,
        telephone: `+${WHATSAPP_NUMBER}`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: 820,
          height: 252,
        },
        image: OG_IMAGE,
        description: t.seo.description,
        sameAs: socials.map((s) => s.href),
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'India' },
        ],
        knowsLanguage: ['en', 'hi', 'mr'],
        founder: { '@id': person },
      },
      {
        '@type': 'Person',
        '@id': person,
        name: 'Swapna',
        jobTitle: 'Yoga Teacher',
        worksFor: { '@id': org },
        knowsLanguage: ['en', 'hi', 'mr'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: brand.name,
        publisher: { '@id': org },
        inLanguage: LANGUAGES.map((l) => l.code),
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': org },
        primaryImageOfPage: OG_IMAGE,
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: t.seo.headingDescriptor,
        serviceType: 'Online yoga class',
        provider: { '@id': org },
        areaServed: 'Online',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: url,
          name: brand.platform,
        },
      },
      /* The four FAQ answers are already written and can win a rich result,
         which is free extra height in the search listing. */
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang,
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

const JSON_LD_ID = 'seo-jsonld';

function setStructuredData(lang, t) {
  let script = document.getElementById(JSON_LD_ID);
  if (!script) {
    script = document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(buildGraph(lang, t), null, 2);
}

/* --- Entry point ---------------------------------------------------------- */

/**
 * Applies every language-dependent head tag for the current page.
 *
 * @param {string} lang - Active language code.
 * @param {object} t - That language's dictionary.
 */
export function applySeo(lang, t) {
  if (typeof document === 'undefined' || !t?.seo) return;

  const url = urlForLanguage(lang);

  setTag('title', t.seo.title);
  setTag('description', t.seo.description);
  setTag('canonical', url);
  setTag('og:url', url);
  setTag('og:locale', t.seo.ogLocale);
  setTag('og:title', t.seo.title);
  setTag('og:description', t.seo.description);
  setTag('twitter:title', t.seo.title);
  setTag('twitter:description', t.seo.description);

  setStructuredData(lang, t);
}

export { DEFAULT_LANGUAGE };

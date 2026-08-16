/**
 * Builds the 1200x630 social share card at public/og-image.jpg.
 *
 * Without an og:image, every WhatsApp forward and Instagram link renders as a
 * bare grey rectangle — which matters here more than for most sites, since
 * WhatsApp is where enquiries actually arrive.
 *
 * The card is laid out as HTML and screenshotted, so it stays editable in CSS
 * and reuses the same palette as src/index.css. Output is committed, so this
 * only needs re-running when the design or wording changes:
 *
 *   npm run og
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

const COPY = {
  headline: 'Live Online Yoga Classes',
  sub: 'Personal 1-on-1 sessions on Google Meet',
  langs: 'English · हिन्दी · मराठी',
  domain: 'swapnagiriyoga.com',
};

/** Inlined as a data URI so the page needs no file:// access. */
async function dataUri(relPath, mime) {
  const buf = await readFile(join(ROOT, relPath));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function card({ logo, photo }) {
  return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; overflow: hidden;
    font-family: 'Segoe UI', 'Nirmala UI', system-ui, sans-serif;
    background: linear-gradient(135deg, #F6EEFF 0%, #EADCFB 55%, #DCC7F7 100%);
    color: #2A0A4A;
  }
  .text { flex: 1 1 62%; padding: 68px 0 68px 72px; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .logo { height: 74px; width: auto; align-self: flex-start; }
  h1 { font-size: 62px; line-height: 1.05; font-weight: 600; letter-spacing: -0.5px; }
  .accent { display: block;
    background: linear-gradient(90deg, #7B2CBF, #C77DFF 60%, #5A189A);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-style: italic; font-weight: 500; }
  .sub { font-size: 27px; color: #4A2270; line-height: 1.35; }
  .langs { font-size: 23px; color: #7B2CBF; letter-spacing: 0.4px; }
  .domain { margin-top: 8px; font-size: 21px; letter-spacing: 2.6px; text-transform: uppercase; color: #6B3FA0; }
  /* The photo is masked into a soft arc so it reads as part of the gradient
     rather than a pasted-on rectangle. */
  .art { position: relative; flex: 1 1 38%; }
  .art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 32%; }
  .art::after { content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, #EADCFB 0%, rgba(234,220,251,0.55) 26%, rgba(234,220,251,0) 62%); }
  .peak { position: absolute; bottom: 0; left: 0; width: 100%; }
</style></head>
<body>
  <div class="text">
    <img class="logo" src="${logo}" alt="" />
    <h1>${COPY.headline.replace(/ ([^ ]+)$/, '<span class="accent">$1</span>')}</h1>
    <p class="sub">${COPY.sub}</p>
    <p class="langs">${COPY.langs}</p>
    <p class="domain">${COPY.domain}</p>
  </div>
  <div class="art">
    <img src="${photo}" alt="" />
    <svg class="peak" viewBox="0 0 460 120" preserveAspectRatio="none" height="120">
      <path d="M0 120 L110 42 L210 92 L300 50 L460 120 Z" fill="#5A189A" opacity="0.13" />
      <path d="M0 120 L150 72 L250 104 L350 78 L460 120 Z" fill="#7B2CBF" opacity="0.10" />
    </svg>
  </div>
</body></html>`;
}

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(
    card({
      logo: await dataUri('public/logo.png', 'image/png'),
      photo: await dataUri('src/assets/practice-tree.jpg', 'image/jpeg'),
    }),
    { waitUntil: 'networkidle0' },
  );

  const jpeg = await page.screenshot({ type: 'jpeg', quality: 88 });
  const out = join(ROOT, 'public', 'og-image.jpg');
  await writeFile(out, jpeg);
  console.log(`og-image.jpg written (${(jpeg.length / 1024).toFixed(0)} KB) -> public/og-image.jpg`);
} finally {
  await browser.close();
}

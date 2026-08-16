/**
 * Turns the built SPA into real HTML, one file per language.
 *
 * The problem this solves: `vite build` emits an index.html whose <body> is a
 * single empty <div id="root">. Google can execute JavaScript, but it does so
 * on a delayed second pass and not always; Bing, DuckDuckGo and most AI
 * crawlers largely do not. Every word of copy on this site lives in
 * src/i18n/*.js, so without this step none of it is indexable.
 *
 * How it works: serve dist/ locally, drive a real Chrome over the three
 * language URLs, and save the fully-rendered DOM back into dist/. Using a real
 * browser rather than react-dom/server matters here — the language, theme and
 * motion stores all read localStorage at module scope, which would throw
 * outright under Node.
 *
 * Run automatically after `npm run build`.
 */

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');

const SITE_URL = 'https://www.swapnagiriyoga.com';

/** Must match LANGUAGES / pathForLanguage in src/i18n/index.js. */
const ROUTES = [
  { lang: 'en', path: '/', out: 'index.html' },
  { lang: 'hi', path: '/hi/', out: join('hi', 'index.html') },
  { lang: 'mr', path: '/mr/', out: join('mr', 'index.html') },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/**
 * Static file server with a SPA fallback.
 *
 * The fallback is the point: when this runs, dist/hi/index.html does not exist
 * yet, so a request for /hi/ has to be answered with the shell — exactly as the
 * dev server does — and let the app decide what to render from the URL.
 */
function serve(dir) {
  return new Promise((resolvePort) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, 'http://localhost');
      let filePath = join(dir, decodeURIComponent(url.pathname));

      if (!extname(url.pathname)) filePath = join(dir, 'index.html');
      else if (!existsSync(filePath)) {
        res.writeHead(404).end('Not found');
        return;
      }

      try {
        const body = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(500).end('Server error');
      }
    });
    server.listen(0, '127.0.0.1', () => resolvePort({ server, port: server.address().port }));
  });
}

/** A sitemap in which every page also declares its translations. */
function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const alternates = ROUTES.map(
    (r) =>
      `    <xhtml:link rel="alternate" hreflang="${r.lang}" href="${SITE_URL}${r.path}" />`,
  )
    .concat(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
    )
    .join('\n');

  const urls = ROUTES.map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.lang === 'en' ? '1.0' : '0.8'}</priority>
${alternates}
  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    throw new Error('dist/index.html not found — run `vite build` first.');
  }

  const { server, port } = await serve(DIST);
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();

      // A desktop viewport: some sections render different markup on mobile,
      // and the desktop layout is the fuller one.
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`http://127.0.0.1:${port}${route.path}`, { waitUntil: 'networkidle0' });

      // The JSON-LD block is written by applySeo(), which runs in an effect
      // after the tree has mounted — so its presence means both the body and
      // the head have finished. Waiting on it is more reliable than a timeout.
      await page.waitForSelector('#seo-jsonld', { timeout: 30_000 });
      await page.waitForFunction(
        (lang) => document.documentElement.lang === lang && document.querySelector('#root')?.children.length > 0,
        { timeout: 30_000 },
        route.lang,
      );

      const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`);
      await page.close();

      const target = join(DIST, route.out);
      await mkdir(join(target, '..'), { recursive: true });
      await writeFile(target, html, 'utf8');

      const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
      console.log(`  prerendered ${route.path.padEnd(5)} -> dist/${route.out.replace(/\\/g, '/')} (${kb} KB)`);
    }

    await writeFile(join(DIST, 'sitemap.xml'), buildSitemap(), 'utf8');
    console.log('  wrote        dist/sitemap.xml');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error('\nPrerender failed:', error.message);
  process.exit(1);
});

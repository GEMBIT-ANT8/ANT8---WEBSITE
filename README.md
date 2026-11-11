# ANT8 website

Static, multi-page corporate site for Ant8 (part of Gembit), hosted on GoDaddy (cPanel, Apache + PHP). One small PHP endpoint sends the contact and assessment forms through Microsoft 365. No framework, no client-side dependencies, no cookies, no trackers.

## Run locally

Requires Node 20 or newer.

```
npm install
npm run dev        # review build (shows “Needs ANT8 input” markers) on http://localhost:4173
npm run preview    # production build, markers stripped
npm run check      # production build + verifies every internal link and asset
```

The Node preview server does not run PHP; forms then fall back to opening a prefilled email. To test the forms locally, build first and run PHP's own server, with a test config in `ant8-private/` (copy `ant8-private.example/`, set `'mail_mode' => 'file'`; emails then land in `ant8-private/outbox/`):

```
node build.mjs
php -S localhost:8080 -t dist
```

## Project structure

```
src/content.mjs     All copy, company data, services, FAQ, assessment questions and page templates  ← edit here
src/site.css        Design tokens (brand colours, type scale, spacing, radii, motion) and components
src/runtime.js      Browser behaviour: header, mobile menu, hero video, digital-twin tabs, assessment, forms
build.mjs           Renders every page to dist/<path>/index.html, plus sitemap.xml, robots.txt, 404.html
public/             Copied as-is into dist/: fonts, images, favicon, video folder, .htaccess, PHP
public/.htaccess    Apache settings: main-domain redirect, HTTPS, security headers (CSP, HSTS), caching
public/api/contact.php   Form endpoint: validates, rate-limits, emails via Microsoft 365 (Graph)
public/lib/         Shared PHP (not reachable from the web)
ant8-private.example/    Template for the private settings folder (secrets never go in Git)
```

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services/` | Services (with `#project-management`, `#interim-management`, `#analysis`, `#network-analysis`, `#expertise-on-demand`, `#ai-agents`, `#faq`) |
| `/free-assessment/` | Free logistics assessment |
| `/about/` | About |
| `/contact/` | Contact (`?topic=…` preselects the topic) |
| `/insights/` | Insights overview |
| `/insights/why-wms-go-lives-slip/` | Article |
| `/insights/case-network-analysis/` | Network analysis case |
| `/careers/`, `/privacy/`, `/cookies/` | Supporting pages |

Paths are defined once in `ROUTES` in `build.mjs`; internal links are written as `#key` in the templates and rewritten at build time. The build fails if a link points to a page that does not exist.

## Editing content

Everything a non-developer is likely to change sits in `src/content.mjs`:

- `CONFIG`: hero headline, contact details, production domain (`siteUrl`), external links (LinkedIn, Gembit, sister companies), hero video paths, form endpoint. External links left empty render as plain text, so there are never dead links.
- `SERVICES`, `FAQ`, `WHY`, `STEPS`: service rows, FAQ, “Why Ant8” reasons, how-we-work steps.
- `TWIN`: the four floor ⇄ system examples on the homepage.
- `ASSESS`, `THEME_TXT`, `THEME_SVC`: assessment questions (scored 0–3), the explanation line per theme and score band, and which service each weakest theme points to. Level names are in `level()` in `src/runtime.js`.
- `PAGES`: one template per page, with its `<title>` and meta description.

After editing, run `npm run check`.

## Replacing images and the hero video

Images live in `public/assets/img/`. Photo slots are marked in the templates with `photo("…caption…")`; replace a slot with `<div class="media"><img src="/assets/img/your-photo.webp" alt="…"></div>`. Export photos as WebP, about 1600 px wide, under 250 KB.

Hero video: follow `public/assets/video/README.md`, then fill `CONFIG.heroVideo`. The video loads only when a source is set, plays muted, inline and looped, and is skipped for visitors with reduced-motion or data-saver settings. Until then, the isometric warehouse illustration is shown.

## Deploying (GoDaddy cPanel)

1. `npm run check` (or `node build.mjs`), then upload the **contents** of `dist/` into `public_html/` (cPanel File Manager or FTP). Uploading adds and overwrites files; it never deletes server-only folders.
2. One time only: create `ant8-private/` **next to** `public_html/` (in your home folder, not inside the website), copy both files from `ant8-private.example/` into it and fill in the real values. See `docs/microsoft-365-setup.md` for the Microsoft 365 part.
3. cPanel → *Select PHP Version*: PHP 8.1 or newer, with the `curl` and `mbstring` extensions enabled.
4. Submit `https://ant8.be/sitemap.xml` in Google Search Console.

Without `ant8-private/config.php`, `/api/contact.php` answers 503 and the site falls back to a prefilled email, so the form never pretends to send.

## Known limitations

- Spam protection is a honeypot field plus 5 submissions per 10 minutes per IP; add a captcha (e.g. Cloudflare Turnstile) if spam appears.
- Assessment answers are not stored; they travel in the report email.
- Insights are hand-written templates. With regular publishing, move `PAGES` for insights into a headless CMS (e.g. Sanity or Storyblok); the content blocks map one-to-one.

## Licences

Uncut Sans by Kasper Nordkvist, SIL Open Font License 1.1 (`public/assets/fonts/OFL-UncutSans.txt`). Logo, pattern and illustrations from the ANT8 brand export.

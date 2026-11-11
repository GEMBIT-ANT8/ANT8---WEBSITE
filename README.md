# ANT8 website

Static, multi-page corporate site for Ant8 (part of Gembit), plus one serverless function for the contact and assessment forms. No framework, no client-side dependencies, no cookies, no trackers.

## Run locally

Requires Node 20 or newer.

```
npm install
npm run dev        # review build (shows “Needs ANT8 input” markers) on http://localhost:4173
npm run preview    # production build, markers stripped
npm run check      # production build + verifies every internal link and asset
```

The local server does not run `/api/contact`; forms then fall back to opening a prefilled email, which is the expected behaviour.

## Project structure

```
src/content.mjs     All copy, company data, services, FAQ, assessment questions and page templates  ← edit here
src/site.css        Design tokens (brand colours, type scale, spacing, radii, motion) and components
src/runtime.js      Browser behaviour: header, mobile menu, hero video, digital-twin tabs, assessment, forms
build.mjs           Renders every page to dist/<path>/index.html, plus sitemap.xml, robots.txt, 404.html
api/contact.js      Vercel serverless function that emails form submissions via Resend
public/             Static files copied as-is: fonts, images, favicon, video folder
vercel.json         Build settings, security headers (CSP, HSTS) and caching
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

## Deploying (Vercel)

1. Push this folder to a Git repository and import it in Vercel. Build command and output folder come from `vercel.json`.
2. Set environment variables for the form: `RESEND_API_KEY`, `CONTACT_TO` (e.g. `info@ant8.eu`), `CONTACT_FROM` (e.g. `Ant8 website <website@ant8.eu>`). Verify the sending domain in Resend; choose its EU region for GDPR.
3. Confirm `CONFIG.siteUrl` matches the live domain, then connect the domain in Vercel.
4. Submit `https://<domain>/sitemap.xml` in Google Search Console.

Without the form variables, `/api/contact` answers 503 and the site falls back to a prefilled email, so the form never pretends to send.

Other hosts work too: `dist/` is plain static HTML. Only `api/contact.js` needs porting to that host’s functions (Netlify, Cloudflare, Azure Static Web Apps).

## Known limitations

- The contact endpoint’s rate limit is per function instance only; add a captcha (e.g. Cloudflare Turnstile) if spam appears.
- Assessment answers are not stored; they travel in the report email.
- English only.
- Insights are hand-written templates. With regular publishing, move `PAGES` for insights into a headless CMS (e.g. Sanity or Storyblok); the content blocks map one-to-one.

## Licences

Uncut Sans by Kasper Nordkvist, SIL Open Font License 1.1 (`public/assets/fonts/OFL-UncutSans.txt`). Logo, pattern and illustrations from the ANT8 brand export.

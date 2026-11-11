// ANT8 static site build. `npm run build` → /dist (production), `npm run build:review` → review markers on.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { parse } from "node-html-parser";
import * as C from "./src/content.mjs";
const DICT = JSON.parse(readFileSync("src/i18n-dict.json", "utf8"));
const LANGS = ["en", "fr", "nl"];

const { CONFIG, PAGES, NAV, ROUTE_NAV, FAQ, SERVICES, TWIN, ASSESS, LEVELS, DOMAIN_W, DOMAIN_SVC, esc, extLink } = C;
const REVIEW = CONFIG.reviewMode;
const OUT = "dist";
const SITE = CONFIG.siteUrl.replace(/\/$/, "");

// Page key → public URL. Change a path here and every internal link follows.
const ROUTES = {
  home: "/", services: "/services/", assessment: "/free-assessment/", about: "/about/", contact: "/contact/",
  insights: "/insights/", "why-wms-go-lives-slip": "/insights/why-wms-go-lives-slip/",
  "case-network-analysis": "/insights/case-network-analysis/", careers: "/careers/", privacy: "/privacy/", cookies: "/cookies/"
};
const EXTRA_ANCHORS = { faq: "/services/#faq" };
const IN_PAGE = new Set(["main", "intro", "tool"]);

function rewriteLinks(html) {
  // service deep links: href="#services" … data-goto="analysis"  →  /services/#analysis
  html = html.replace(/href="#([a-z0-9-]+)"([^>]*?)\sdata-goto="([^"]+)"/g, (m, k, mid, id) => `href="${ROUTES[k] || "/"}#${id}"${mid}`);
  // topic prefill: href="#contact" … data-topic="X"  →  /contact/?topic=X
  html = html.replace(/href="#contact"([^>]*?)\sdata-topic="([^"]+)"/g, (m, mid, t) => `href="/contact/?topic=${encodeURIComponent(t.replace(/&amp;/g, "&"))}"${mid}`);
  html = html.replace(/href="#([a-z0-9-]+)"/g, (m, k) => {
    if (ROUTES[k]) return `href="${ROUTES[k]}"`;
    if (EXTRA_ANCHORS[k]) return `href="${EXTRA_ANCHORS[k]}"`;
    if (IN_PAGE.has(k)) return m;
    throw new Error(`Unknown internal link #${k}`);
  });
  return html;
}

const orgLd = {
  "@context": "https://schema.org", "@type": "ProfessionalService", name: "Ant8", url: SITE + "/",
  logo: SITE + "/assets/img/icon-512.png", image: SITE + "/assets/img/og-image.jpg",
  description: "Independent logistics experts: project management, interim management and analysis for warehouses going digital.",
  email: CONFIG.email, telephone: CONFIG.phone, vatID: CONFIG.vat.replace(/[\s.]/g, ""),
  address: { "@type": "PostalAddress", streetAddress: "Koudebeekstraat 6", postalCode: "2100", addressLocality: "Antwerpen", addressCountry: "BE" },
  parentOrganization: { "@type": "Organization", name: "Gembit" }, areaServed: ["BE", "NL", "LU", "FR", "DE"],
  sameAs: [CONFIG.links.linkedin].filter(Boolean)
};
const extraLd = {
  services: { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  "why-wms-go-lives-slip": { "@context": "https://schema.org", "@type": "Article", headline: "Why do most WMS go-lives slip?", author: { "@type": "Person", name: "Kris Lalou" }, publisher: { "@type": "Organization", name: "Ant8" } },
  "case-network-analysis": { "@context": "https://schema.org", "@type": "Article", headline: "19% lower transport cost, within today’s capacity", author: { "@type": "Person", name: "Kris Lalou" }, publisher: { "@type": "Organization", name: "Ant8" } }
};
const ld = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const LOGO = `<img src="/assets/img/logo.webp" alt="ANT8" width="360" height="122">`;
function shell(key, page, lang = "en") {
  const path = ROUTES[key] ?? null;
  const navKey = ROUTE_NAV[key] || key;
  const cur = h => (h === navKey ? ' aria-current="page"' : "");
  const navLinks = NAV.map(([h, l, hl]) => h === "services"
    ? `<li class="has-mega"><a href="#services"${cur(h)}>Services</a><button class="mega-btn" type="button" aria-expanded="false" aria-controls="mega" aria-label="Show all services"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>${C.megaHtml()}</li>`
    : `<li><a href="#${h}"${cur(h)} class="${hl ? "hl" : ""}">${l}</a></li>`).join("");
  const mnav = `<a href="#home"${cur("home")}>Home</a>` + NAV.map(([h, l]) => `<a href="#${h}"${cur(h)}>${l}</a>`).join("");
  const body = (page.overHero ? "" : '<div class="page-top" aria-hidden="true"></div>') + page.html();
  const title = esc(page.title), desc = esc(page.desc || "");
  const canonical = path ? SITE + path : "";
  const html = `<!doctype html>
<html lang="${lang}"${REVIEW ? ' class="review"' : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
${canonical ? `<link rel="canonical" href="${SITE}${lang === "en" ? "" : "/" + lang}${path}">` + LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${SITE}${l === "en" ? "" : "/" + l}${path}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${canonical}">` : `<meta name="robots" content="noindex">`}
${REVIEW ? `<meta name="robots" content="noindex, nofollow">` : ""}
<meta name="theme-color" content="#013538">
<meta property="og:type" content="website"><meta property="og:site_name" content="Ant8">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}">
${canonical ? `<meta property="og:url" content="${canonical}">` : ""}
<meta property="og:image" content="${SITE}/assets/img/og-image.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" href="/assets/img/favicon-32.png"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/UncutSans-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/UncutSans-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
${ld(orgLd)}${extraLd[key] ? ld(extraLd[key]) : ""}
</head>
<body data-page="${key}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header${page.overHero ? " over-hero" : ""}" id="header">
  <div class="groupbar"><div class="wrap">
    ${extLink("gembit", `<img src="/assets/img/gembit-mark.png" alt="" width="20" height="20">Part of Gembit`, "gb-mark")}
    <div class="gb-right"><nav class="teams" aria-label="Gembit expertise teams"><span class="lbl">Our expertise teams</span><span aria-current="true">Ant8</span>${extLink("logicore", "Logicore")}${extLink("logiminds", "Logiminds")}${extLink("mitralogic", "Mitralogic")}</nav><span id="__ls"></span></div>
  </div></div>
  <div class="navbar"><div class="wrap">
    <a class="logo" href="#home" aria-label="Ant8 home">${LOGO}</a>
    <nav aria-label="Main"><ul class="nav-links">${navLinks}</ul></nav>
    <a class="btn btn-neon nav-cta" href="#contact">Talk to an expert</a>
    <button class="menu-btn" id="menubtn" aria-label="Open menu" aria-expanded="false" aria-controls="mpanel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h12"/></svg></button>
  </div></div>
</header>
<div class="mobile-panel" id="mpanel" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="top"><a class="logo" href="#home" aria-label="Ant8 home">${LOGO}</a>
  <button class="menu-btn" id="menuclose" aria-label="Close menu" style="display:inline-flex"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <nav aria-label="Main (mobile)">${mnav}</nav>
  <div class="foot"><span id="__ls"></span><a class="btn btn-neon" href="#contact">Talk to an expert</a><span><a href="mailto:${CONFIG.email}">${CONFIG.email}</a> · <a href="tel:${CONFIG.phoneHref}">${CONFIG.phone}</a></span></div>
</div>
<main id="main" tabindex="-1">${body}</main>
<footer class="site-footer">
  <div class="wrap cols">
    <div><p class="h-3" style="color:#fff">Let’s simplify logistics.</p><p style="margin-top:10px;max-width:32ch;color:#C9D6D5">Project management, interim management and analysis for warehouses going digital.</p></div>
    <div><h2 class="fh">Ant8</h2><ul>${NAV.map(([h, l]) => `<li><a href="#${h}">${l}</a></li>`).join("")}</ul></div>
    <div><h2 class="fh">Follow</h2><ul><li>${extLink("linkedin", "LinkedIn")}</li><li><a href="#careers">Careers at Ant8</a></li></ul></div>
    <div><h2 class="fh">Contact</h2><address style="font-style:normal"><ul><li>${CONFIG.address}</li><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li><a href="tel:${CONFIG.phoneHref}">${CONFIG.phone}</a></li><li>${CONFIG.vat}</li></ul></address></div>
  </div>
  <div class="strip"><div class="wrap"><span>Ant8 is part of ${CONFIG.links.gembit ? `<a href="${esc(CONFIG.links.gembit)}" rel="noopener" style="color:#fff">Gembit</a>` : `<b style="color:#fff">Gembit</b>`}, the expert partner where logistics and IT meet.</span><span class="strip-r"><span id="__ls"></span><a href="#privacy">Privacy</a> &nbsp; <a href="#cookies">Cookies</a> &nbsp; © ${new Date().getFullYear()} Ant8</span></div></div>
</footer>
${REVIEW ? '<button class="review-toggle" id="reviewtoggle" type="button" aria-pressed="true">Review mode: on</button>' : ""}
${lang === "en" ? "" : `<script src="/assets/i18n.js" defer></script>\n<script src="/assets/i18n-${lang}.js" defer></script>\n`}<script src="/assets/iso.js" defer></script>
<script src="/assets/data.js" defer></script>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
  let out = rewriteLinks(html);
  if (!REVIEW) { // strip every reviewer-only element so placeholders never reach production HTML
    const root = parse(out, { comment: false });
    root.querySelectorAll(".review-only, .todo-label").forEach(n => n.remove());
    out = "<!doctype html>\n" + root.toString().replace(/^<!doctype html>\s*/i, "");
  }
  if (lang !== "en") out = translateHtml(out.replace(/href="\/(?!assets\/|api\/|favicon)/g, `href="/${lang}/`), lang);
  const sw = `<span class="lang" role="group" aria-label="${lang === "en" ? "Language" : DICT.Language[lang]}">` + LANGS.map(l => `<a href="${l === "en" ? "" : "/" + l}${path ?? "/"}" lang="${l}" hreflang="${l}"${l === lang ? ' aria-current="true"' : ""}>${l.toUpperCase()}</a>`).join("") + "</span>";
  return out.replaceAll('<span id="__ls"></span>', sw);
}

// ---------- build-time translation (same dictionary and patterns as /assets/i18n.js) ----------
const PATTERNS = [
  [/^(\d+) questions · about (\d+) minutes$/, { fr: m => `${m[1]} questions · environ ${m[2]} minutes`, nl: m => `${m[1]} vragen · ongeveer ${m[2]} minuten` }]
];
const norm = s => s.replace(/\s+/g, " ").trim();
const escText = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = s => escText(s).replace(/"/g, "&quot;");
function tr(k, lang) {
  if (!k) return null; const e = DICT[k]; if (e && e[lang] != null) return e[lang];
  for (const [re, f] of PATTERNS) { const m = k.match(re); if (m) return f[lang](m); }
  return null;
}
const decode = s => s.replace(/&nbsp;/g, "\u00a0").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
function translateHtml(html, lang) {
  const root = parse(html, { comment: false });
  const SKIP = new Set(["script", "style"]);
  const walk = n => {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) { const raw = decode(c.rawText); const v = tr(norm(raw), lang); if (v != null) c.rawText = escText(raw.match(/^\s*/)[0] + v + raw.match(/\s*$/)[0]); }
      else if (c.nodeType === 1) {
        const tag = (c.rawTagName || "").toLowerCase(); if (SKIP.has(tag)) continue;
        const cls = c.getAttribute && (c.getAttribute("class") || "");
        if (/\b(review-only|todo-label|review-toggle)\b/.test(cls)) continue;
        for (const a of ["aria-label", "alt", "placeholder", "title"]) { const v0 = c.getAttribute(a); if (v0) { const v = tr(norm(v0), lang); if (v != null) c.setAttribute(a, escAttr(v)); } }
        if (tag === "meta") { const nm = c.getAttribute("name") || c.getAttribute("property"); if (["description", "og:title", "og:description"].includes(nm)) { const v = tr(norm(c.getAttribute("content") || ""), lang); if (v != null) c.setAttribute("content", escAttr(v)); } }
        walk(c);
      }
    }
  };
  walk(root);
  return "<!doctype html>\n" + root.toString().replace(/^<!doctype html>\s*/i, "");
}

const write = (file, data) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, data); };

rmSync(OUT, { recursive: true, force: true });
cpSync("public", OUT, { recursive: true });
write(join(OUT, "assets/site.css"), readFileSync("src/site.css", "utf8") + "\n.site-footer .fh{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--teal-40);margin-bottom:14px}\n");
write(join(OUT, "assets/site.js"), readFileSync("src/runtime.js", "utf8"));
write(join(OUT, "assets/iso.js"), readFileSync("src/iso.js", "utf8"));
write(join(OUT, "assets/i18n.js"), readFileSync("src/i18n.js", "utf8"));
for (const l of ["fr", "nl"]) { const sub = {}; for (const [k, v] of Object.entries(DICT)) sub[k] = { [l]: v[l] }; write(join(OUT, `assets/i18n-${l}.js`), `window.ANT8_LANG="${l}";window.ANT8_I18N=${JSON.stringify(sub)};\n`); }
const runtimeConfig = { email: CONFIG.email, heroVideo: CONFIG.heroVideo, formEndpoint: CONFIG.formEndpoint };
write(join(OUT, "assets/data.js"), "window.ANT8=" + JSON.stringify({ CONFIG: runtimeConfig, TWIN, ASSESS, LEVELS, DOMAIN_W, DOMAIN_SVC, SERVICES: SERVICES.map(s => ({ id: s.id, name: s.name })) }) + ";\n");

for (const lang of LANGS) for (const [key, path] of Object.entries(ROUTES)) write(join(OUT, lang === "en" ? "" : lang, path, "index.html"), shell(key, PAGES[key], lang));
write(join(OUT, "404.html"), shell("404", PAGES["404"]));

const urls = LANGS.flatMap(l => Object.values(ROUTES).filter(p => !["/privacy/", "/cookies/"].includes(p)).map(p => (l === "en" ? "" : "/" + l) + p));
write(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(p => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}\n</urlset>\n`);
write(join(OUT, "robots.txt"), REVIEW ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Built ${Object.keys(ROUTES).length * LANGS.length + 1} pages → ${OUT}/ (review mode ${REVIEW ? "on" : "off"})`);

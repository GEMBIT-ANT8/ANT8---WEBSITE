/* ANT8 i18n: translates the rendered page (text nodes + key attributes) from English into FR/NL using a
   reviewed dictionary, and keeps translating content the page adds later (assessment, form messages). */
const I18N = (() => {
  let lang = "en", D = {}, observer = null;
  const ATTRS = ["aria-label", "alt", "placeholder", "title"];
  const orig = new WeakMap(), origAttr = new WeakMap();
  const norm = s => s.replace(/\s+/g, " ").trim();
  // Patterns for strings with numbers or nested terms (t = translate a sub-string)
  const P = [
    { re: /^(\d+) questions · about (\d+) minutes$/, fr: m => `${m[1]} questions · environ ${m[2]} minutes`, nl: m => `${m[1]} vragen · ongeveer ${m[2]} minuten` },
    { re: /^(\d+) of (\d+) · (\d+\/\d+)$/, fr: m => `${m[1]} sur ${m[2]} · ${m[3]}`, nl: m => `${m[1]} van ${m[2]} · ${m[3]}` },
    { re: /^Level: (.+)$/, fr: (m, t) => `Niveau : ${t(m[1])}`, nl: (m, t) => `Niveau: ${t(m[1])}` },
    { re: /^(.+) · (\d+) of (\d+) answered$/, fr: (m, t) => `${t(m[1])} · ${m[2]} sur ${m[3]} répondues`, nl: (m, t) => `${t(m[1])} · ${m[2]} van ${m[3]} beantwoord` },
    { re: /^(.+) · start here$/, fr: (m, t) => `${t(m[1])} · commencez ici`, nl: (m, t) => `${t(m[1])} · begin hier` }
  ];
  function tr(k) {
    if (lang === "en" || !k) return null;
    const e = D[k]; if (e && e[lang] != null) return e[lang];
    for (const p of P) { const m = k.match(p.re); if (m) return p[lang](m, s => tr(s) ?? s); }
    return null;
  }
  const skip = el => !el || el.closest("script,style,.review-only,.todo-label,.review-toggle,[translate=no]");
  function textNode(n) {
    if (skip(n.parentElement)) return;
    let en = orig.get(n); if (en === undefined) { en = n.nodeValue; orig.set(n, en); }
    const v = tr(norm(en));
    const out = v == null ? en : en.match(/^\s*/)[0] + v + en.match(/\s*$/)[0];
    if (n.nodeValue !== out) n.nodeValue = out;
  }
  function attrs(el) {
    if (skip(el)) return;
    let o = origAttr.get(el); if (!o) { o = {}; origAttr.set(el, o); }
    for (const a of ATTRS) { if (!el.hasAttribute(a)) continue; if (!(a in o)) o[a] = el.getAttribute(a);
      const v = tr(norm(o[a])); const out = v == null ? o[a] : v; if (el.getAttribute(a) !== out) el.setAttribute(a, out); }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1) return;
    attrs(root); root.querySelectorAll("[aria-label],[alt],[placeholder],[title]").forEach(attrs);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) textNode(n);
  }
  let enTitle = document.title, enDesc = (document.querySelector('meta[name="description"]') || {}).content || "";
  function head() {
    document.documentElement.lang = lang;
    document.title = tr(norm(enTitle)) ?? enTitle;
    const m = document.querySelector('meta[name="description"]'); if (m) m.setAttribute("content", tr(norm(enDesc)) ?? enDesc);
  }
  function observe() {
    if (observer) return;
    observer = new MutationObserver(recs => {
      observer.disconnect();
      for (const r of recs) {
        if (r.type === "characterData") { orig.set(r.target, r.target.nodeValue); textNode(r.target); }
        else if (r.type === "attributes") { const o = origAttr.get(r.target); if (o) delete o[r.attributeName]; attrs(r.target); }
        else r.addedNodes.forEach(walk);
      }
      connect();
    });
    connect();
  }
  function connect() { observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS }); }
  return {
    init(dict, l) { D = dict || {}; lang = l || "en"; if (lang !== "en") { observer && observer.disconnect(); walk(document.body); head(); } observe(); },
    set(l) { lang = l; observer && observer.disconnect(); walk(document.body); head(); observer && connect(); },
    page(title, desc) { enTitle = title; enDesc = desc || ""; head(); },
    t: k => tr(norm(k)) ?? k,
    get lang() { return lang; }
  };
})();
window.I18N = I18N;

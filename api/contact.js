// Vercel serverless function: POST /api/contact
// Sends website enquiries and assessment report requests to ANT8 by email via Resend (EU region available).
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   API key from resend.com (domain ant8.eu must be verified there)
//   CONTACT_TO       inbox that receives enquiries, e.g. info@ant8.eu
//   CONTACT_FROM     verified sender, e.g. "Ant8 website <website@ant8.eu>"
// Without these variables the endpoint answers 503 and the site falls back to a prefilled email.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map(); // best-effort per-instance rate limit

export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Method not allowed" }); }
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return res.status(503).json({ error: "Form delivery not configured" });

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ error: "Too many requests" });
  hits.set(ip, [...recent, now]);

  const b = typeof req.body === "string" ? safeJson(req.body) : (req.body || {});
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: pretend success, send nothing
  const name = clip(b.name, 120), email = clip(b.email, 160), subject = clip(b.subject, 200), body = clip(b.body, 15000);
  if (!name || !EMAIL.test(email) || !subject || !body || !["contact", "report"].includes(b.kind))
    return res.status(400).json({ error: "Invalid submission" });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: CONTACT_FROM, to: [CONTACT_TO], reply_to: email, subject: `[ant8.eu] ${subject}`, text: body })
  });
  if (!r.ok) return res.status(502).json({ error: "Delivery failed" });
  return res.status(200).json({ ok: true });
}
const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }

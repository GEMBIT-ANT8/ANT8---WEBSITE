// Minimal local server for /dist (no dependencies). The /api/contact endpoint is not emulated locally:
// forms fall back to a prefilled email when the endpoint does not answer.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
const TYPES = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".webp":"image/webp", ".png":"image/png", ".jpg":"image/jpeg", ".ico":"image/x-icon", ".woff2":"font/woff2", ".xml":"application/xml", ".txt":"text/plain", ".mp4":"video/mp4", ".webm":"video/webm", ".md":"text/plain" };
const port = Number(process.env.PORT || 4173);
createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.includes("..")) { res.writeHead(400).end(); return; }
  let file = join("dist", p);
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); }
  catch { file = join("dist", "404.html"); res.statusCode = 404; }
  try { const body = await readFile(file); res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream"); res.end(body); }
  catch { res.writeHead(404).end("Not found"); }
}).listen(port, () => console.log(`ANT8 site on http://localhost:${port}`));

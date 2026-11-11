// Verifies that every internal link and asset reference in /dist resolves to a real file.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
const files = []; const walk = d => readdirSync(d).forEach(f => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && files.push(p); });
walk("dist");
let bad = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  for (const [, u] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const t = join("dist", u.endsWith("/") ? u + "index.html" : u);
    if (!existsSync(t)) { console.log(`✗ ${f}: ${u}`); bad++; }
  }
  for (const [, id] of html.matchAll(/href="\/services\/#([^"]+)"/g)) {
    if (!readFileSync("dist/services/index.html", "utf8").includes(`id="${id}"`)) { console.log(`✗ ${f}: missing anchor #${id}`); bad++; }
  }
}
console.log(bad ? `${bad} broken references` : `All internal links OK across ${files.length} pages`);
process.exit(bad ? 1 : 0);

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");
const serverEntry = resolve(root, "dist/server/index.js");

if (!existsSync(clientDir)) throw new Error("dist/client missing — run `vite build` first.");
if (!existsSync(serverEntry)) throw new Error("dist/server/index.js missing — run `vite build` first.");

// Render the homepage HTML via the bundled Worker entry.
process.env.NODE_ENV = "production";
const mod = await import(pathToFileURL(serverEntry).toString());
const handler = mod.default ?? mod;

async function render(path) {
  const url = `http://localhost${path}`;
  const res = await handler.fetch(new Request(url), {}, {});
  if (!res.ok && res.status >= 500) {
    const body = await res.text();
    throw new Error(`SSR render failed for ${path}: ${res.status}\n${body.slice(0, 500)}`);
  }
  return await res.text();
}

const html = await render("/");
writeFileSync(resolve(clientDir, "index.html"), html);
console.log(`Prerendered / -> dist/client/index.html (${html.length} bytes)`);

// Mirror to /public for Vercel static hosting.
const target = resolve(root, "public");
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(clientDir, target, { recursive: true });
console.log(`Copied dist/client -> public`);

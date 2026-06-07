import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");

if (!existsSync(clientDir)) {
  throw new Error("dist/client missing — run `vite build` first.");
}

// Mirror dist/client to /public for Vercel static hosting.
const target = resolve(root, "public");
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(clientDir, target, { recursive: true });
console.log(`Copied dist/client -> public`);

// TanStack Start's worker build produces no static index.html (SSR on Cloudflare).
// Vercel only serves static files here, so we generate a SPA shell index.html
// that boots the client bundle directly. The client router takes over for all routes.
const assetsDir = join(target, "assets");
const assetFiles = readdirSync(assetsDir);

// Find the app entry JS: it is the bundle that bootstraps TanStack Start in the browser.
// Route files are lazy-loaded chunks and may also import the vendor bundle, so choosing
// "the index file that imports another index file" can point at a page chunk and leave
// the deployed site as a blank white screen.
const indexJs = assetFiles.filter((f) => /^index-.*\.js$/.test(f));
let entryJs = indexJs.find((candidate) => {
  const body = readFileSync(join(assetsDir, candidate), "utf8");
  return body.includes("hydrateRoot(document") || body.includes(".hydrateRoot(document");
}) ?? indexJs.find((candidate) => {
  const body = readFileSync(join(assetsDir, candidate), "utf8");
  return body.includes("__TSS_START_OPTIONS__") || body.includes("$_TSR");
}) ?? indexJs[0];
const stylesCss = assetFiles.find((f) => /^styles-.*\.css$/.test(f)) ?? assetFiles.find((f) => f.endsWith(".css"));

if (!entryJs) throw new Error("Could not find client entry JS in dist/client/assets");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GLT DSA & Internship Guidance Cohort — Girls Leading Tech</title>
    <meta name="description" content="A focused 4-week DSA and internship guidance cohort. Get guidance in DSA and cracking internships from women in tech who've done it." />
    <meta property="og:title" content="GLT DSA & Internship Guidance Cohort" />
    <meta property="og:description" content="Master DSA fundamentals and land your first internship in 4 weeks with mentors who've done it." />
    ${stylesCss ? `<link rel="stylesheet" href="/assets/${stylesCss}" />` : ""}
    <link rel="modulepreload" href="/assets/${entryJs}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entryJs}"></script>
  </body>
</html>
`;

writeFileSync(join(target, "index.html"), html);
console.log(`Wrote public/index.html (entry=${entryJs}${stylesCss ? `, styles=${stylesCss}` : ""})`);

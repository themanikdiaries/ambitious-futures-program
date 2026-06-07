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

// Find the app entry JS: the index-*.js that imports from the other index-*.js (the vendor chunk).
const indexJs = assetFiles.filter((f) => /^index-.*\.js$/.test(f));
let entryJs = indexJs[0];
if (indexJs.length > 1) {
  for (const candidate of indexJs) {
    const body = readFileSync(join(assetsDir, candidate), "utf8").slice(0, 4000);
    const others = indexJs.filter((f) => f !== candidate);
    if (others.some((o) => body.includes(o))) {
      entryJs = candidate;
      break;
    }
  }
}
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

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const candidates = ["dist/client", ".output/public", "dist"].map((path) => resolve(root, path));
const source = candidates.find((path) => existsSync(path));

if (!source) {
  throw new Error(
    `Vercel output source not found. Checked: ${candidates.map((path) => path.replace(`${root}/`, "")).join(", ")}`,
  );
}

const target = resolve(root, "public");
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

if (!existsSync(resolve(target, "index.html"))) {
  const assetsDir = resolve(target, "assets");
  const files = readdirSync(assetsDir);
  const entry = files.find((file) => file.endsWith(".js") && readFileSync(resolve(assetsDir, file), "utf8").includes("hydrateRoot(document"));
  const stylesheet = files.find((file) => file.startsWith("styles-") && file.endsWith(".css"));

  if (!entry) {
    throw new Error("Could not find the browser entry bundle for Vercel static output.");
  }

  writeFileSync(
    resolve(target, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GLT DSA & Internship Guidance Cohort — Girls Leading Tech</title>
    <meta name="description" content="A focused 4-week DSA and internship guidance cohort by Girls Leading Tech." />
    ${stylesheet ? `<link rel="stylesheet" href="/assets/${stylesheet}" />` : ""}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" />
    <script type="module" src="/assets/${entry}"></script>
  </head>
  <body></body>
</html>
`,
  );
}

console.log(`Prepared Vercel static output from ${source.replace(`${root}/`, "")} to public`);
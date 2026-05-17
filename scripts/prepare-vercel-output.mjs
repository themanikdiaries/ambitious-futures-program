import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const candidates = ["dist/client", ".output/public", "dist"].map((path) => resolve(root, path));
const source = candidates.find((path) => existsSync(resolve(path, "index.html")));

if (!source) {
  throw new Error(
    `Vercel output source not found. Checked: ${candidates.map((path) => path.replace(`${root}/`, "")).join(", ")}`,
  );
}

const target = resolve(root, "public");
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log(`Prepared Vercel static output from ${source.replace(`${root}/`, "")} to public`);
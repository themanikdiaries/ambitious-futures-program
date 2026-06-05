import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");

if (!existsSync(clientDir)) {
  throw new Error("dist/client missing — run `vite build` first.");
}

// Mirror dist/client to /public for Vercel static hosting.
// vite build already produces dist/client/index.html (SSR shell) — no re-render needed.
const target = resolve(root, "public");
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(clientDir, target, { recursive: true });
console.log(`Copied dist/client -> public`);

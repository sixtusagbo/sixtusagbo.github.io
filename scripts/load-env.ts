import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env reader for one-off scripts. Loads the given files in order; the
// first file to define a key wins, and anything already in process.env (e.g.
// from `node --env-file`) is never overridden. Surrounding quotes are stripped.
export function loadEnv(
  files: string[] = [".env.production", ".env.local"]
): void {
  for (const file of files) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1").trim();
    }
  }
}

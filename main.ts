// news-image-20261119 — writes the day's front-page image to the output dir.
// The image itself is pre-rendered (entry.png in the repo root); this script
// just places a byte-exact copy where the harness expects it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const SOURCE_FILE = "entry.png";

function resolveSource(): string {
  // The entry image ships at the root of the bot directory.
  return join(botDir, SOURCE_FILE);
}

// Read the bytes once and write them out verbatim, so the output is a
// byte-exact copy of the entry image on every run.
const sourcePath = resolveSource();
const bytes = readFileSync(sourcePath);
mkdirSync(outDir, { recursive: true });
const destPath = join(outDir, SOURCE_FILE);
writeFileSync(destPath, bytes);
console.log(`wrote ${bytes.length} bytes to ${destPath}`);

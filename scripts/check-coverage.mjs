// Checks docs/COVERAGE.md against the site: every row must name a cipher page that
// exists, and every phrase the row quotes ("...") must really appear on that page.
// Run with: npm run check:coverage
import { existsSync, readdirSync, readFileSync } from "node:fs";

const PAGES = new URL("../apps/web/app/ciphers/", import.meta.url);
const ENGINE = new URL("../packages/cipher-engine/src/", import.meta.url);
const TABLE = new URL("../docs/COVERAGE.md", import.meta.url);

const slugs = readdirSync(PAGES).filter((name) => existsSync(new URL(`${name}/route.tsx`, PAGES)));

/** Everything a reader can meet on a page: its story, presets, controls and engine data. */
function textOf(slug) {
  const folders = [new URL(`${slug}/`, PAGES), new URL(`${slug}/`, ENGINE)].filter(existsSync);
  return folders
    .flatMap((folder) => readdirSync(folder, { recursive: true }).map((file) => new URL(String(file), folder)))
    .filter((file) => /\.(mdx|tsx?|css)$/.test(file.pathname))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
}

/** Straight quotes and entities, so a phrase matches however the page writes it. */
const plain = (text) =>
  text.replace(/[“”]/g, '"').replace(/[‘’]|&apos;/g, "'").replace(/\\(.)/g, "$1").replace(/`/g, "");

const rows = readFileSync(TABLE, "utf8")
  .split("\n")
  .filter((line) => line.startsWith("| ") && !line.startsWith("| Book item") && !line.startsWith("|---"))
  .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));

const problems = [];
for (const [item, , , page, where] of rows) {
  // A row may send the reader to a second page inside its "where" cell.
  const named = slugs.filter((slug) => new RegExp(`(^|[^a-z-])${slug}($|[^a-z-])`).test(`${page} ${where}`));
  if (!slugs.some((slug) => page.includes(slug))) {
    problems.push(`No page for: ${item} (the table says "${page}")`);
    continue;
  }
  const text = plain(named.map(textOf).join("\n"));
  for (const [, phrase] of plain(where).matchAll(/"([^"]{4,})"/g)) {
    if (!text.includes(phrase)) problems.push(`"${phrase}" is not on ${named.join(", ")} (row: ${item})`);
  }
}

console.log(`${rows.length} book items, ${slugs.length} pages, ${problems.length} problems`);
for (const problem of problems) console.log(`- ${problem}`);
process.exit(problems.length ? 1 : 0);

// Checks that every cipher page is translated into Vietnamese and that each
// story.vi.mdx has the same shape as its story.mdx: the same parts, the same
// buttons (action names), the same challenge answers and the same links.
// Cipher letters in `code` should match too; differences there are warnings.
//
// Usage: node scripts/check-i18n.mjs [slug ...]

import { existsSync, readFileSync, readdirSync } from "node:fs";

const root = new URL("../apps/web/app/ciphers/", import.meta.url);
const only = process.argv.slice(2);
const slugs = readdirSync(root)
  .filter((name) => existsSync(new URL(`${name}/route.tsx`, root)))
  .filter((name) => only.length === 0 || only.includes(name));

const all = (text, pattern) => [...text.matchAll(pattern)].map((match) => match[1]);
const count = (text, pattern) => (text.match(pattern) ?? []).length;
const stripComments = (text) => text.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
const sorted = (list) => [...list].sort();
const same = (a, b) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));
const difference = (a, b) => {
  const rest = [...b];
  return a.filter((item) => {
    const at = rest.indexOf(item);
    if (at === -1) return true;
    rest.splice(at, 1);
    return false;
  });
};

const BLOCKS = ["Standfirst", "Label", "Try", "Check", "DigDeeper", "Challenge"];
// Common English words that should not survive in Vietnamese prose.
const ENGLISH = /\b(the|and|with|which|that|this|would|could|their|there|from|when|what)\b/gi;

let problems = 0;
let warnings = 0;
const problem = (slug, text) => (problems++, console.log(`✗ ${slug}: ${text}`));
const warning = (slug, text) => (warnings++, console.log(`! ${slug}: ${text}`));

for (const slug of slugs) {
  const en = stripComments(readFileSync(new URL(`${slug}/story.mdx`, root), "utf8"));
  const viFile = new URL(`${slug}/story.vi.mdx`, root);
  if (!existsSync(viFile)) {
    problem(slug, "story.vi.mdx is missing");
    continue;
  }
  const viRaw = readFileSync(viFile, "utf8");
  if (viRaw.includes("UNTRANSLATED")) {
    problem(slug, "story.vi.mdx is still the English placeholder");
    continue;
  }
  const vi = stripComments(viRaw);

  for (const block of BLOCKS) {
    const pattern = new RegExp(`<${block}[\\s>/]`, "g");
    if (count(en, pattern) !== count(vi, pattern)) {
      problem(slug, `<${block}> appears ${count(en, pattern)} times in English, ${count(vi, pattern)} in Vietnamese`);
    }
  }
  const headings = /^#{2,3} /gm;
  if (count(en, headings) !== count(vi, headings)) {
    problem(slug, `${count(en, headings)} headings in English, ${count(vi, headings)} in Vietnamese`);
  }

  const actions = /action="([^"]+)"/g;
  if (!same(all(en, actions), all(vi, actions))) {
    problem(slug, `button actions differ: en [${all(en, actions)}] vi [${all(vi, actions)}]`);
  }
  const answers = /answer="([^"]+)"/g;
  if (!same(all(en, answers), all(vi, answers))) {
    problem(slug, `challenge answers differ: en [${all(en, answers)}] vi [${all(vi, answers)}]`);
  }
  const links = /\]\(([^)]+)\)/g;
  if (!same(all(en, links), all(vi, links))) {
    problem(slug, `links differ: missing [${difference(all(en, links), all(vi, links))}] extra [${difference(all(vi, links), all(en, links))}]`);
  }

  const code = /`([^`\n]+)`/g;
  const missing = difference(all(en, code), all(vi, code));
  const extra = difference(all(vi, code), all(en, code));
  if (missing.length || extra.length) {
    warning(slug, `code spans differ: missing [${missing.join(" | ")}] extra [${extra.join(" | ")}]`);
  }

  // Further reading (the last part) keeps sources' English titles, and *italic* titles are exempt everywhere.
  const lastLabel = vi.lastIndexOf("<Label>");
  const body = lastLabel > 0 ? vi.slice(0, lastLabel) : vi;
  const prose = body
    .replace(/\*[^*\n]+\*/g, "")
    .replace(/“[^”\n]*”/g, (quote) => (quote.match(ENGLISH)?.length ?? 0) > 1 ? "" : quote)
    .replace(/`[^`]*`/g, "").replace(/\]\([^)]*\)/g, "](…)").replace(/<[^>]*>/g, "");
  const english = prose.match(ENGLISH) ?? [];
  if (english.length > 3) {
    warning(slug, `${english.length} common English words left in the prose (${[...new Set(english)].slice(0, 6).join(", ")})`);
  }

  const meta = readFileSync(new URL(`${slug}/meta.ts`, root), "utf8");
  if (!/\bvi:\s*\{/.test(meta)) problem(slug, "meta.ts has no vi text");
}

console.log(`\n${slugs.length} pages checked: ${problems} problems, ${warnings} warnings.`);
process.exit(problems ? 1 : 0);

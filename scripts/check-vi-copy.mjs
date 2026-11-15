// Checks that the Vietnamese pages are written in our own words and do not copy
// sentences from the Vietnamese edition of the book (Mật mã: Từ cổ điển đến lượng tử).
// The book's text is not in the repository: put the extracted text at
// resource/vi-book/full.txt (resource/ is git-ignored). Without it, this check is skipped.
//
// A run of 10 or more words shared with the book is a problem. Runs of 8 or 9 words,
// short quotes (inside “…”) and titles of works (in *italics*), 15 words at most, are
// warnings; chapter titles are allowed.
//
// Usage: node scripts/check-vi-copy.mjs [slug ...]

import { existsSync, readFileSync, readdirSync } from "node:fs";

const N = 8;
const PROBLEM = 10;
const QUOTE_LIMIT = 15;
const bookFile = new URL("../resource/vi-book/full.txt", import.meta.url);
const root = new URL("../apps/web/app/ciphers/", import.meta.url);

if (!existsSync(bookFile)) {
  console.log("Skipped: resource/vi-book/full.txt is not here (the book is kept out of the repository).");
  process.exit(0);
}

// The book's chapter titles may be used as names.
const TITLES = [
  "Bản mật mã của Nữ hoàng Mary xứ Scotland",
  "Le chiffre indéchiffrable",
  "Cơ giới hóa việc giữ bí mật",
  "Công phá Enigma",
  "Rào cản ngôn ngữ",
  "Alice và Bob ra công khai",
  "Riêng tư tốt đẹp",
  "Bước nhảy lượng tử vào tương lai",
  "Mật mã: Từ cổ điển đến lượng tử",
  "Một thách thức giải mã: mười bước tiến đến 15 ngàn đôla",
];

const words = (text) =>
  text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

// Alphabets, letter strings ("a b c d …"), numbers and English cipher data are not Vietnamese prose.
const isLetters = (gram) =>
  gram.filter((word) => /^([a-z]|\d+)$/.test(word)).length * 2 >= gram.length || gram.every((word) => /^[a-z0-9]+$/.test(word));

const book = readFileSync(bookFile, "utf8")
  .replace(/\[tr\. \d+\]/g, " ")
  .replace(/^.*-\s+\d+\s*$|^\s*\d+\s+-\s+MẬT MÃ\s*$/gm, " ");
const bookWords = words(book);
const grams = new Set();
for (let i = 0; i + N <= bookWords.length; i++) grams.add(bookWords.slice(i, i + N).join(" "));
const titleWords = TITLES.map((title) => words(title).join(" "));

const only = process.argv.slice(2);
const slugs = readdirSync(root)
  .filter((name) => existsSync(new URL(`${name}/route.tsx`, root)))
  .filter((name) => only.length === 0 || only.includes(name));

// The Vietnamese text of a page: its story, and every source file except the English story.
function sources(slug) {
  const folder = new URL(`${slug}/`, root);
  const files = readdirSync(folder, { recursive: true })
    .map(String)
    .filter((name) => /\.(mdx|tsx?)$/.test(name) && name !== "story.mdx" && !name.includes(".test."));
  return files.map((name) => {
    let text = readFileSync(new URL(name, folder), "utf8");
    if (name.endsWith(".mdx")) text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, " ").replace(/`[^`]*`/g, " ").replace(/\]\([^)]*\)/g, "]");
    return { name, text };
  });
}

let problems = 0;
let warnings = 0;
for (const slug of slugs) {
  for (const { name, text } of sources(slug)) {
    // Split by quotes so a run inside “…” can be told apart.
    const pieces = text.split(/(“[^”]*”|\*[^*\n]+\*)/);
    for (const piece of pieces) {
      const quoted = piece.startsWith("“") || piece.startsWith("*");
      const list = words(piece);
      let start = -1;
      const runs = [];
      for (let i = 0; i + N <= list.length + 1; i++) {
        const gram = list.slice(i, i + N);
        const hit = gram.length === N && !isLetters(gram) && grams.has(gram.join(" "));
        if (hit && start < 0) start = i;
        if (!hit && start >= 0) {
          runs.push(list.slice(start, i - 1 + N));
          start = -1;
        }
      }
      for (const run of runs) {
        const joined = run.join(" ");
        const isTitle = titleWords.some((title) => title.includes(joined) || joined.includes(title) && run.length <= words(title).length + 3);
        const shortQuote = quoted && run.length <= QUOTE_LIMIT;
        const shortRun = run.length < PROBLEM;
        if (isTitle) continue;
        if (shortQuote || shortRun) {
          warnings++;
          console.log(`! ${slug}/${name}: ${shortQuote ? "short quote" : "short phrase"} from the book (${run.length} words): “${joined}”`);
        } else {
          problems++;
          console.log(`✗ ${slug}/${name}: ${run.length} words copied from the book: “${joined}”`);
        }
      }
    }
  }
}

console.log(`\n${slugs.length} pages checked against the book: ${problems} problems, ${warnings} warnings.`);
process.exit(problems ? 1 : 0);

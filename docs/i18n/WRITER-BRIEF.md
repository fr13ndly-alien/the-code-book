# Writer brief: rework a batch of Vietnamese pages from the Vietnamese edition

The site (repo root `/Users/henryle/Projects/the-code-book`) is bilingual. English pages are at `/ciphers/<slug>`, Vietnamese at `/vi/ciphers/<slug>`, served by the same route.

Each page already has a Vietnamese version, but it was **translated from our English retelling**. The owner wants the Vietnamese pages **based on the Vietnamese edition of the book** instead: *Mật mã: Từ cổ điển đến lượng tử* (NXB Trẻ, translated by Phạm Văn Thiều and Phạm Thu Hằng). That means the reader who knows the Vietnamese book should recognise it: its terms, its spelling of names, its examples, the details it chooses, the order it tells things in.

The English pages follow the English book the same way: the book's facts and story, retold in our own words. Do the same in Vietnamese, from the Vietnamese book.

## The one hard limit: our own sentences

The Vietnamese edition is copyrighted, and this repository and the site are public. **Do not copy the book's sentences.** Read the passage, then close it and write the page yourself.

- No run of 10 or more words taken from the book (`npm run check:vi-copy` fails on these). Avoid runs of 8 or 9 as well (warnings), unless it is a fixed name or a set phrase.
- A short quote is allowed where the English page also quotes: at most 15 words, inside “…”, said who said it. At most two per page.
- Terms, names, titles and numbers from the book are fine; that is the point.

## The text of the book

It is in `resource/vi-book/` (git-ignored; never move it into the repo or commit it):
`0-mo-dau.txt`, `1-mary.txt`, `2-le-chiffre.txt`, `3-co-gioi-hoa.txt`, `4-cong-pha-enigma.txt`, `5-rao-can-ngon-ngu.txt`, `6-alice-bob.txt`, `7-rieng-tu.txt`, `8-luong-tu.txt`, `9-phu-luc.txt`, and `full.txt`. `[tr. N]` marks the start of printed page N. It is the full edition (8 chapters, appendices A–J), so a page's material may be in a different chapter number from our site's chapter. Find it by grepping for names, dates and cipher words.

## Read first

1. `docs/i18n/vi-glossary.md`. It has just been updated to follow the Vietnamese edition. **Section 0 overrides every other row**, and the "Names as the Vietnamese edition writes them" table gives name spellings. Where the glossary and the book disagree, follow the book and say so in your report.
2. `docs/ARCHITECTURE.md`, section "Two languages".
3. `apps/web/app/i18n.ts`: `useT`, `useLocale`, `Bilingual`.

## For each slug in your batch

1. **Find the book's passage.** Locate every passage in the Vietnamese edition that our English `story.mdx` draws on, and read it whole. Note its page numbers.
2. **Rewrite `story.vi.mdx`** from that passage, not from our English sentences.
   - Keep the shape the page needs, because the simulator and the checks depend on it: every block (`Standfirst`, `Label`, `Try`, `Check`, `DigDeeper`, `Challenge`) in the same order, the same number of headings, the same `action="…"` and `answer="…"` values exactly, and the same link targets. The `Try` buttons must still describe what their action sets up.
   - Inside the blocks, tell it the way the Vietnamese book tells it: its terms, its spelling of names, its examples and its details. You may follow the book's order and emphasis within a part, and you may add a detail the book has that our English lacks, if it fits the part and is short.
   - Text in `backticks` is cipher data and must match the simulator: keep it as in the English page. Where the book gives a Vietnamese gloss of an example, you may use the book's gloss in prose.
   - Facts, numbers and dates must agree with our English page. If the Vietnamese book differs from our English (a translation slip, a different figure), don't silently pick one: keep the English page's fact and list the difference in your report.
   - Keep the top `{/* … */}` comment, now saying the page is retold from *Mật mã: Từ cổ điển đến lượng tử* (pages …) and follows docs/i18n/vi-glossary.md.
   - The voice stays warm and plain, for a curious 13-year-old reader on a phone. Call the reader "bạn". Use short sentences. The book's tone is more formal; ours isn't.
3. **`meta.ts`, the `vi` field.** Bring `title`, `era`, `hook` and `firstStep` in line with the book's terms. Set `source` to the Vietnamese edition's chapter where the material is: `"Mật mã: Từ cổ điển đến lượng tử, chương 4: Công phá Enigma"` (or `"…, phụ lục E"` and so on). Don't change the English fields or `chapter`/`order`.
4. **The page's components** (`*Board.tsx`, `*Controls.tsx`, `scene/`, `vi.ts`, helpers): change only the Vietnamese strings, and only so that their terms match section 0 and the story. Keep every English string byte-for-byte.

## Rules

- Edit only files inside your own `apps/web/app/ciphers/<slug>/` folders. Five other writers are working in the same checkout at the same time. Changes needed in shared files (`i18n.ts`, `components/`, `chapters.ts`, the glossary): put them in your report.
- Don't run `npm run build`, typegen or a dev server, and don't commit.
- When a page is done, reread it against the book's passage (for copied runs and wrong facts) and against our English page (for missing parts).

## Checks, before you report

From the repo root, for your slugs:

```bash
node scripts/check-i18n.mjs <slugs…>
node scripts/check-vi-copy.mjs <slugs…>
cd apps/web && npx tsc --noEmit 2>&1 | grep -E "app/ciphers/(<slug1>|<slug2>|…)/"
npm test
```

`check-i18n` and `check-vi-copy` must show 0 problems. Look at every copy warning and reword it unless it is a name or set phrase. `tsc` must print nothing for your folders, and the tests must pass.

## Report

Keep it under 300 words:

- The pages done, with the book pages each one draws on.
- Facts where the Vietnamese book differs from our English page.
- Copy warnings you kept, and why.
- Shared changes you need.

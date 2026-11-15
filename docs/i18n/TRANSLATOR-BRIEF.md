# Translator brief: one batch of cipher pages into Vietnamese

The site (repo root `/Users/henryle/Projects/the-code-book`) is bilingual. English pages are at `/ciphers/<slug>`, Vietnamese at `/vi/ciphers/<slug>`, served by the same route. The language switch is built. Your job is to fill in the Vietnamese for the cipher folders in your batch, so a reader who switches to Vietnamese sees no English except cipher data.

## Read first

1. `docs/i18n/vi-glossary.md`. **Section 0 overrides every other row.** Follow the style rules (§2) and pitfalls (§3).
2. `docs/ARCHITECTURE.md`, section "Two languages".
3. `docs/i18n/content-map.md`: the rows for your slugs list every English string, with file:line, marked UI (translate), UI? (check) or DATA (leave alone).
4. `apps/web/app/i18n.ts`: `useT`, `useLocale`, `Bilingual`.
5. `docs/i18n/vi-edition.md`, for the Vietnamese edition's names of things. **Never copy its sentences**: it is copyrighted, and our rule is the book's facts in our own words. Terms and titles only.

## For each slug in your batch

1. **`story.vi.mdx`.** It is currently a copy of the English story marked `UNTRANSLATED`. Replace the whole file with a Vietnamese translation of `story.mdx`. Write it fresh from our English text.
   - Keep the top `{/* … */}` comment, saying it translates story.mdx and follows docs/i18n/vi-glossary.md.
   - Keep every block (`Standfirst`, `Label`, `Try`, `Check`, `DigDeeper`, `Challenge`) in the same order, the same headings (`##`, `###`), and the same paragraph structure.
   - Keep the values of `action="…"` and `answer="…"` exactly. Translate `button="…"`, `question="…"` and `title="…"`.
   - The eight part labels: use the glossary's Vietnamese for "The hook", "Try it", "How it works", etc.
   - Links: keep the same targets, unchanged. Write internal links as `/ciphers/<slug>`; the page adds `/vi` itself.
   - Text in `backticks` is cipher data (letters, example messages, keys): copy it exactly, and explain its meaning in Vietnamese where the English does.
   - Facts, numbers, names and dates must match the English exactly. Format them the Vietnamese way (glossary §2).
2. **`meta.ts`.** Add a `vi` field: `vi: { title, era, hook, firstStep, source }`. Use the glossary's page title. `source` follows this pattern: `"The Code Book, chương 1: Bản mật mã của Nữ hoàng Mary xứ Scotland"`, with the chapter number from the English and the Vietnamese chapter title from `apps/web/app/ciphers/chapters.ts` (`vi.title`). Keep "The Code Book" in Latin type.
3. **The page's components** (`*Board.tsx`, `*Controls.tsx`, `scene/`, helpers). Every user-visible string marked UI or UI? in the content map becomes bilingual: inside a component, `const t = useT();` then `t({ en: "Shift", vi: "Độ dịch" })`. This covers labels, captions, options, buttons, aria-labels and titles.
   - For JSX with markup inside, use `t({ en: <>…</>, vi: <>…</> })`.
   - Outside a component (a helper function), take a `locale: Locale` argument or return a `Bilingual`.
   - Where English splices words into a sentence (plurals, ordinals, "left"/"right", joined lists), write each language's sentence whole. Don't translate the fragments.
   - DATA stays as it is.
   - Keep the English text byte-for-byte identical: the English pages must not change.
4. **Engine strings shown on your pages** (listed in the content map's engine section). **Do not edit `packages/cipher-engine`.** Put a Vietnamese map in the cipher's web folder (e.g. `vi.ts`, keyed by the engine's id or English string) and use it when the locale is `vi`. Anything the content map marks DATA stays English.

## Rules

- Edit only files inside your own `apps/web/app/ciphers/<slug>/` folders. Five other translators are working in the same checkout at the same time, on other folders. If something shared needs changing (`i18n.ts`, `components/`, `chapters.ts`, the engine), don't change it: say so in your report.
- Do **not** run `npm run build`, `react-router typegen` or a dev server, and do not commit. Others are working in parallel.
- The voice is warm and plain, for a curious 13-year-old Vietnamese reader on a phone. Address the reader as "bạn". Use short sentences. It should read as if written in Vietnamese, not translated.
- When a page is done, reread the whole Vietnamese story against the English once, looking for meaning drift, dropped sentences and wrong numbers.

## Checks, before you report

From the repo root:

```bash
node scripts/check-i18n.mjs <your slugs…>
```

The result must show 0 problems. Resolve the warnings too. A code-span difference is acceptable only if you can justify it, and you must list it in your report.

```bash
cd apps/web && npx tsc --noEmit 2>&1 | grep -E "app/ciphers/(<slug1>|<slug2>|…)/"
```

This must print nothing. Errors in other folders are other translators' unfinished work; ignore them.

```bash
npm test
```

This must pass.

## Report

Keep it short:

- The pages done.
- Any user-visible English left on your pages, and why.
- Shared changes you need from the orchestrator.
- Any facts or terms you were unsure of.

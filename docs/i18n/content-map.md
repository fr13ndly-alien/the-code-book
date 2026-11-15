# Vietnamese translation: content map

An inventory of every piece of user-visible English text in `apps/web/app` (and the parts of
`packages/cipher-engine/src` that reach the screen), so each can be mapped to Vietnamese.

## How this was made

- Story sizes: `wc -w story.mdx` (raw, as asked) and a **prose** count that drops MDX comments, the
  `action=`/`answer=` attributes, tag names and inline code, but keeps the visible `button=`, `question=`
  and `title=` attribute text. The prose count is the real translation load.
- Code strings: every string literal, template literal and JSX text node in each `.ts`/`.tsx` file was
  pulled out with the TypeScript compiler API (scratch script, not committed), then filtered. Dropped as
  code: imports, class names, CSS values, SVG paths, routes, `type:`/`mode:` action tags, comparison
  operands, `case` labels, `data-*`/`on*`/`key`/`id` attributes, and single lowercase identifier words.
- **UI** = shown to the reader (or read out by a screen reader) and should be translated.
- **UI? (review)** = probably shown, but a single word or token whose use should be checked when translating.
- **DATA** = cipher material: plaintext/ciphertext examples, keys, alphabets, letter pairs, rotor names,
  code words. These stay untranslated (translating them would break the cipher or the book's example).
- Strings are listed in source order; `${…}` marks an interpolation. JSX text broken by `{…}` shows up as
  separate fragments on the same line: translate the whole sentence, not fragment by fragment.
- Word counts strip `${…}` and count tokens that contain a letter.

**Snapshot note.** Taken from the working tree on branch `enigma-prototype` on 2026-11-15. The tree already
holds uncommitted i18n work: `app/i18n.ts` (a bilingual `UI` table), `components/LanguageToggle.tsx`,
reworked `CipherPage.tsx`, `Story.tsx`, `root.tsx`, `routes/home.tsx`, `sim/Fields.tsx`, every `route.tsx`,
and a `story.vi.mdx` in each of the 38 folders. Every `story.vi.mdx` is still the English text with an
`UNTRANSLATED` comment on top (each is exactly 15 words longer than its `story.mdx`). Line numbers in
files that are still being edited may drift.

## Totals

| What | Count |
|---|---:|
| Cipher folders | 38 |
| `story.mdx`, raw `wc -w` | 52,417 |
| `story.mdx`, prose words to translate | 45,036 |
| `meta.ts` (title, era, hook, firstStep, source), words | 1,474 (38 × 5 = 190 strings) |
| Cipher component strings, UI (incl. 23 UI? to review) | 1,195 strings, 5,380 words |
| Cipher component strings, DATA (stay English) | 227 |
| Story `<Challenge answer=…>` values (DATA) | 38 |
| **Cipher folders, translation load** (prose + meta + UI words) | **51,890 words** |
| Shared files still hard-coded (UI) | 16 strings, 123 words (plus 2 language names to keep) |
| Shared strings already moved into `i18n.ts` with a Vietnamese version | 30 strings, 128 words |
| Engine strings that reach the screen and need translating | 63 strings, 141 words |

## Proposed batches

Six batches of roughly equal load, in book order. Load = story prose + meta.ts + component UI words.
The split was chosen by trying every way of cutting the 38 pages, in menu order, into 6 runs and
keeping the most even one. Chapters 5, 6 and 7 stay whole and Enigma stays with Cracking Enigma;
chapters 1 to 4 are each cut once, because chapters 1, 2 and 3 are each larger than one batch.

| Batch | Pages (chapter) | Story prose | meta | UI words | Load |
|---|---|---:|---:|---:|---:|
| 1 | hidden-writing (1), rail-fence (1), scytale (1), kama-sutra (1), caesar (1), keyword-substitution (1), frequency-analysis (1) | 7,423 | 293 | 604 | **8,320** |
| 2 | bible-code (1), mary-queen-of-scots (1), vigenere (2), homophonic (2), pigpen (2), babbage (2), pinprick (2) | 8,011 | 269 | 697 | **8,977** |
| 3 | dancing-men (2), playfair (2), beale (2), morse (3), zimmermann (3), adfgvx (3), one-time-pad (3) | 8,278 | 267 | 907 | **9,452** |
| 4 | cipher-disc (3), enigma (3), cracking-enigma (3), purple (4), navajo (4), hieroglyphs (4) | 8,007 | 233 | 827 | **9,067** |
| 5 | linear-b (4), lorenz (5), binary (5), lucifer (5), key-exchange (5), rsa (5) | 7,133 | 231 | 960 | **8,324** |
| 6 | pgp (6), key-escrow (6), digital-signatures (6), quantum (6), codebreakers-challenge (7) | 6,184 | 181 | 1,385 | **7,750** |

The shared strings (chapters.ts, AlphabetRows, the engine strings below) are small; give them to batch 6,
the lightest, or do them first with the glossary. Engine strings belong with their page's batch:
bible-code, pigpen, pinprick (batch 2); dancing-men, beale, zimmermann (batch 3); navajo, hieroglyphs
(batch 4); linear-b (batch 5); key-escrow (batch 6).

## Per-page summary

| # | Page | Ch. | Order | wc -w | Prose | meta | UI strings | UI words | DATA | Load | story.vi.mdx |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | [hidden-writing](#hidden-writing) | 1 | 0 | 1,376 | 1,214 | 41 | 36 | 201 | 3 | 1,456 | placeholder |
| 2 | [rail-fence](#rail-fence) | 1 | 1 | 1,111 | 978 | 42 | 14 | 70 | 5 | 1,090 | placeholder |
| 3 | [scytale](#scytale) | 1 | 2 | 1,097 | 970 | 43 | 12 | 49 | 4 | 1,062 | placeholder |
| 4 | [kama-sutra](#kama-sutra) | 1 | 3 | 1,042 | 897 | 41 | 16 | 64 | 4 | 1,002 | placeholder |
| 5 | [caesar](#caesar) | 1 | 4 | 1,025 | 875 | 40 | 15 | 32 | 2 | 947 | placeholder |
| 6 | [keyword-substitution](#keyword-substitution) | 1 | 5 | 1,198 | 1,023 | 44 | 19 | 74 | 7 | 1,141 | placeholder |
| 7 | [frequency-analysis](#frequency-analysis) | 1 | 6 | 1,741 | 1,466 | 42 | 22 | 114 | 0 | 1,622 | placeholder |
| 8 | [bible-code](#bible-code) | 1 | 6.5 | 1,174 | 1,046 | 37 | 24 | 87 | 8 | 1,170 | placeholder |
| 9 | [mary-queen-of-scots](#mary-queen-of-scots) | 1 | 7 | 1,518 | 1,330 | 44 | 37 | 186 | 2 | 1,560 | placeholder |
| 10 | [vigenere](#vigenere) | 2 | 1 | 1,384 | 1,166 | 35 | 22 | 73 | 11 | 1,274 | placeholder |
| 11 | [homophonic](#homophonic) | 2 | 2 | 1,405 | 1,199 | 37 | 26 | 99 | 6 | 1,335 | placeholder |
| 12 | [pigpen](#pigpen) | 2 | 3 | 1,135 | 978 | 38 | 12 | 64 | 3 | 1,080 | placeholder |
| 13 | [babbage](#babbage) | 2 | 4 | 1,364 | 1,197 | 39 | 26 | 104 | 0 | 1,340 | placeholder |
| 14 | [pinprick](#pinprick) | 2 | 5 | 1,218 | 1,095 | 39 | 17 | 84 | 4 | 1,218 | placeholder |
| 15 | [dancing-men](#dancing-men) | 2 | 5.5 | 1,309 | 1,131 | 44 | 48 | 286 | 4 | 1,461 | placeholder |
| 16 | [playfair](#playfair) | 2 | 6 | 1,384 | 1,152 | 36 | 23 | 91 | 10 | 1,279 | placeholder |
| 17 | [beale](#beale) | 2 | 7 | 1,468 | 1,259 | 39 | 23 | 68 | 2 | 1,366 | placeholder |
| 18 | [morse](#morse) | 3 | 1 | 1,270 | 1,110 | 33 | 25 | 103 | 5 | 1,246 | placeholder |
| 19 | [zimmermann](#zimmermann) | 3 | 2 | 1,433 | 1,261 | 38 | 19 | 101 | 11 | 1,400 | placeholder |
| 20 | [adfgvx](#adfgvx) | 3 | 3 | 1,386 | 1,151 | 40 | 22 | 104 | 5 | 1,295 | placeholder |
| 21 | [one-time-pad](#one-time-pad) | 3 | 4 | 1,424 | 1,214 | 37 | 36 | 154 | 9 | 1,405 | placeholder |
| 22 | [cipher-disc](#cipher-disc) | 3 | 5 | 1,213 | 1,038 | 42 | 21 | 53 | 10 | 1,133 | placeholder |
| 23 | [enigma](#enigma) | 3 | 6 | 1,643 | 1,416 | 34 | 50 | 180 | 13 | 1,630 | placeholder |
| 24 | [cracking-enigma](#cracking-enigma) | 3 | 7 | 1,897 | 1,622 | 38 | 50 | 266 | 13 | 1,926 | placeholder |
| 25 | [purple](#purple) | 4 | 0 | 1,585 | 1,306 | 41 | 49 | 156 | 7 | 1,503 | placeholder |
| 26 | [navajo](#navajo) | 4 | 1 | 1,445 | 1,258 | 39 | 18 | 84 | 5 | 1,381 | placeholder |
| 27 | [hieroglyphs](#hieroglyphs) | 4 | 2 | 1,573 | 1,367 | 39 | 20 | 88 | 0 | 1,494 | placeholder |
| 28 | [linear-b](#linear-b) | 4 | 3 | 1,488 | 1,304 | 34 | 35 | 272 | 2 | 1,610 | placeholder |
| 29 | [lorenz](#lorenz) | 5 | 1 | 1,392 | 1,189 | 45 | 20 | 74 | 3 | 1,308 | placeholder |
| 30 | [binary](#binary) | 5 | 2 | 1,044 | 904 | 39 | 15 | 74 | 5 | 1,017 | placeholder |
| 31 | [lucifer](#lucifer) | 5 | 3 | 1,483 | 1,273 | 39 | 39 | 181 | 5 | 1,493 | placeholder |
| 32 | [key-exchange](#key-exchange) | 5 | 4 | 1,450 | 1,177 | 35 | 35 | 167 | 5 | 1,379 | placeholder |
| 33 | [rsa](#rsa) | 5 | 5 | 1,510 | 1,286 | 39 | 43 | 192 | 6 | 1,517 | placeholder |
| 34 | [pgp](#pgp) | 6 | 1 | 1,371 | 1,214 | 35 | 81 | 379 | 6 | 1,628 | placeholder |
| 35 | [key-escrow](#key-escrow) | 6 | 1.5 | 1,425 | 1,179 | 34 | 86 | 371 | 16 | 1,584 | placeholder |
| 36 | [digital-signatures](#digital-signatures) | 6 | 2 | 1,450 | 1,252 | 36 | 38 | 149 | 7 | 1,437 | placeholder |
| 37 | [quantum](#quantum) | 6 | 3 | 1,505 | 1,318 | 39 | 45 | 232 | 19 | 1,589 | placeholder |
| 38 | [codebreakers-challenge](#codebreakers-challenge) | 7 | 1 | 1,481 | 1,221 | 37 | 56 | 254 | 0 | 1,512 | placeholder |

## 1. Cipher folders

### hidden-writing

Chapter 1, order 0. Load 1,456 words.

- `story.mdx`: 1,376 words (`wc -w`), 1,214 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `THE GUARD IS ASLEEP`
- Files scanned: `HiddenWritingBoard.tsx`, `HiddenWritingControls.tsx`, `presets.ts`, `route.tsx`, `useHiddenWriting.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Hidden writing |
| era | 6 | About 500 BC |
| hook | 9 | The oldest trick in secret writing: hide the message so well that nobody looks for it. |
| firstStep | 10 | Press "Cover with wax". Then send it past the guard. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (36 UI, 3 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `HiddenWritingBoard.tsx:10` | UI | visattr:aria-label | Wooden writing tablet |
| `HiddenWritingBoard.tsx:22` | UI | visattr:aria-label | Strip ${index + 1}: blank wax. Scrape it. |
| `HiddenWritingBoard.tsx:36` | UI | visattr:aria-label | Sheet of paper |
| `HiddenWritingBoard.tsx:43` | UI | visattr:aria-label | Warmth: ${page.heat} of ${MAX_HEAT} |
| `HiddenWritingBoard.tsx:54` | UI | return | Nothing is written yet. Type a message in the controls. |
| `HiddenWritingBoard.tsx:56` | UI | return | The message is cut into the bare wood. Anyone who picks the tablet up can read it. |
| `HiddenWritingBoard.tsx:57` | UI | return | Fresh wax covers the wood. The tablet looks blank. Tap a strip to scrape it. |
| `HiddenWritingBoard.tsx:58` | UI | return | Some of the wax is gone. Tap another strip to scrape it. |
| `HiddenWritingBoard.tsx:60` | UI | return | The ink has dried clear. The sheet looks blank until it is warmed. |
| `HiddenWritingBoard.tsx:61` | UI | return | Faint marks appear, too pale to read. Warm the page again. |
| `HiddenWritingBoard.tsx:62` | UI | return | The heat has charred the ink brown. It can be read now. |
| `HiddenWritingBoard.tsx:63` | UI | return | The writing shows. Anyone who picks the sheet up can read it. |
| `HiddenWritingBoard.tsx:75` | UI | jsxtext | The guard: |
| `HiddenWritingControls.tsx:17` | UI | visattr:label | What anyone can read now |
| `HiddenWritingControls.tsx:17` | UI | jsxchild | Nothing. It looks blank. |
| `HiddenWritingControls.tsx:19` | UI | visattr:label | Hide it with |
| `HiddenWritingControls.tsx:23` | UI | visprop:label | Wax |
| `HiddenWritingControls.tsx:24` | UI | visprop:label | Invisible ink |
| `HiddenWritingControls.tsx:30` | UI | visattr:label | Your message (typing starts a fresh page) |
| `HiddenWritingControls.tsx:35` | UI | jsxchild | Cover with wax |
| `HiddenWritingControls.tsx:35` | UI | jsxchild | Let the ink dry |
| `HiddenWritingControls.tsx:39` | UI | jsxtext | Scrape the next strip |
| `HiddenWritingControls.tsx:43` | UI | jsxtext | Warm the page |
| `HiddenWritingControls.tsx:49` | UI | visattr:label | The guard is |
| `HiddenWritingControls.tsx:53` | UI | visprop:label | In a hurry |
| `HiddenWritingControls.tsx:54` | UI | visprop:label | Thorough |
| `HiddenWritingControls.tsx:57` | UI | jsxtext | Send it past the guard |
| `HiddenWritingControls.tsx:58` | UI | visattr:label | The guard says |
| `HiddenWritingControls.tsx:58` | UI | jsxchild | He has not looked yet. |
| `presets.ts:4` | DATA | var:WARNING | XERXES IS COMING. ARM SPARTA AND BUILD SHIPS. |
| `presets.ts:5` | DATA | var:NOTE | MEET ME AT THE HARBOUR AT NOON |
| `presets.ts:38` | DATA | call:hidden | THE GUARD IS ASLEEP |
| `useHiddenWriting.ts:75` | UI? (review) | var:thing | tablet |
| `useHiddenWriting.ts:75` | UI? (review) | var:thing | sheet |
| `useHiddenWriting.ts:76` | UI | return | "A blank ${thing}. On your way." |
| `useHiddenWriting.ts:77` | UI | var:how | I scraped off the wax |
| `useHiddenWriting.ts:77` | UI | var:how | I held it over a flame |
| `useHiddenWriting.ts:78` | UI | return | "${how}. Seize the messenger!" |
| `useHiddenWriting.ts:78` | UI | return | "I can read this. Seize the messenger!" |

### rail-fence

Chapter 1, order 1. Load 1,090 words.

- `story.mdx`: 1,111 words (`wc -w`), 978 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `XERXES SAILS FOR GREECE`
- Files scanned: `RailFenceBoard.tsx`, `RailFenceControls.tsx`, `RailReadout.tsx`, `presets.ts`, `route.tsx`, `useRailFence.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The rail fence |
| era | 6 | Ancient world |
| hook | 9 | Keep every letter of your message, but shuffle their order with a zig-zag only your friend knows. |
| firstStep | 10 | Tap a rail to see where its letters go. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (14 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `RailFenceBoard.tsx:20` | UI | visattr:label | The message written on the rails |
| `RailFenceBoard.tsx:30` | UI | jsxchild | Write the message down and up the rails. Then read rail 1, rail 2 and so on: that is the ciphertext. |
| `RailFenceBoard.tsx:31` | UI | jsxchild | The ciphertext is cut into rails and laid back on the fence. Follow the zig-zag to read the message. |
| `RailFenceControls.tsx:21` | UI | visattr:label | Rails |
| `RailFenceControls.tsx:22` | UI | visattr:label | Ciphertext |
| `RailFenceControls.tsx:22` | UI | visattr:label | Plaintext |
| `RailFenceControls.tsx:26` | UI | visattr:label | Your message |
| `RailFenceControls.tsx:26` | UI | visattr:label | The ciphertext |
| `RailFenceControls.tsx:31` | UI | visattr:label | I want to |
| `RailFenceControls.tsx:35` | UI | visprop:label | Encipher |
| `RailFenceControls.tsx:36` | UI | visprop:label | Decipher |
| `RailFenceControls.tsx:42` | UI | jsxtext | Try every number of rails at once |
| `RailReadout.tsx:9` | UI | visattr:aria-label | The rails, read off in order |
| `RailReadout.tsx:13` | UI | jsxtext | Rail |
| `presets.ts:6` | DATA | dataprop:text | SCRAPE OFF THE WAX |
| `presets.ts:12` | DATA | dataprop:text | THY SECRET IS THY PRISONER; IF THOU LET IT GO, THOU ART A PRISONER TO IT |
| `presets.ts:16` | DATA | dataprop:text | SCRAPE OFF THE WAX |
| `presets.ts:19` | DATA | dataprop:text | SRPOFHWXCAEFTEA |
| `presets.ts:22` | DATA | dataprop:text | XSOCESAFREEREISGEXLR |

### scytale

Chapter 1, order 2. Load 1,062 words.

- `story.mdx`: 1,097 words (`wc -w`), 970 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `PHARNABAZUS PLANS TO ATTACK YOU`
- Files scanned: `ScytaleControls.tsx`, `presets.ts`, `route.tsx`, `scene/ScytaleScene.tsx`, `scene/Staff.tsx`, `scene/Strip.tsx`, `scene/layout.ts`, `scene/useStripTexture.ts`, `useScytale.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Spartan scytale |
| era | 6 | Fifth century BC |
| hook | 9 | A strip of leather, a wooden staff, and a message that only appears at the right thickness. |
| firstStep | 10 | Change the thickness. Tap the staff to turn it. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (12 UI, 4 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `ScytaleControls.tsx:25` | UI | visattr:label | Thickness: letters a turn |
| `ScytaleControls.tsx:29` | UI | visattr:label | Ciphertext: the unwound strip |
| `ScytaleControls.tsx:29` | UI | visattr:label | Plaintext: read along the staff |
| `ScytaleControls.tsx:35` | UI | visattr:label | Your message (${MAX_LETTERS} letters at most) |
| `ScytaleControls.tsx:35` | UI | visattr:label | The letters on the strip |
| `ScytaleControls.tsx:40` | UI | visattr:label | I want to |
| `ScytaleControls.tsx:44` | UI | visprop:label | Encipher |
| `ScytaleControls.tsx:45` | UI | visprop:label | Decipher |
| `ScytaleControls.tsx:51` | UI | visattr:label | Turn the staff |
| `ScytaleControls.tsx:55` | UI | visattr:label | The lines on the staff |
| `ScytaleControls.tsx:58` | UI | visattr:label | The unwound strip, one group for each turn |
| `ScytaleControls.tsx:62` | UI | jsxtext | Try every staff at once |
| `presets.ts:6` | DATA | dataprop:text | SEND MORE TROOPS TO SOUTHERN FLANK AND |
| `presets.ts:9` | DATA | dataprop:text | HELP IS COMING |
| `presets.ts:12` | DATA | dataprop:text | STSFEROLNOUADOTNMPHKOSEARTRNEOND |
| `presets.ts:15` | DATA | dataprop:text | PUAHSTAPTRLANACANKBSYATOZOU |

### kama-sutra

Chapter 1, order 3. Load 1,002 words.

- `story.mdx`: 1,042 words (`wc -w`), 897 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `MEET ME BY THE RIVER AT DAWN`
- Files scanned: `KamaSutraBoard.tsx`, `KamaSutraControls.tsx`, `PairCards.tsx`, `presets.ts`, `route.tsx`, `useKamaSutra.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Kama Sutra cipher |
| era | 6 | Fourth century AD |
| hook | 9 | Pair off the letters of the alphabet at random, then swap every letter for its partner. |
| firstStep | 10 | Tap a letter to find its partner. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (16 UI, 4 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `KamaSutraBoard.tsx:19` | UI? (review) | return | cipher |
| `KamaSutraBoard.tsx:27` | UI | visattr:label | Your text on the top line, and each letter's partner below it |
| `KamaSutraBoard.tsx:37` | UI | jsxtext | and |
| `KamaSutraBoard.tsx:37` | UI | jsxtext | are partners. Every |
| `KamaSutraBoard.tsx:38` | UI | jsxtext | becomes |
| `KamaSutraBoard.tsx:38` | UI | jsxtext | , and every |
| `KamaSutraBoard.tsx:39` | UI | jsxtext | becomes |
| `KamaSutraBoard.tsx:42` | UI | jsxchild | Thirteen pairs hold all 26 letters. Tap a letter to light up its partner. |
| `KamaSutraControls.tsx:19` | UI | visattr:label | The pairs (from the book) |
| `KamaSutraControls.tsx:19` | UI | visattr:label | The pairs (shuffle ${state.seed}) |
| `KamaSutraControls.tsx:22` | UI | visattr:label | After the swap |
| `KamaSutraControls.tsx:26` | UI | visattr:label | Your message, or a ciphertext |
| `KamaSutraControls.tsx:33` | UI | jsxtext | Shuffle the pairs |
| `KamaSutraControls.tsx:36` | UI | jsxtext | Use the book's pairs |
| `PairCards.tsx:17` | UI | visattr:aria-label | The thirteen pairs of letters |
| `PairCards.tsx:34` | UI | visattr:aria-label | ${props.letter}, paired with ${props.partner} |
| `presets.ts:6` | DATA | dataprop:text | MEET AT MIDNIGHT |
| `presets.ts:9` | DATA | dataprop:text | CUUZ VZ CGXSGIBZ |
| `presets.ts:12` | DATA | dataprop:text | CUUZ VZ CGXSGIBZ |
| `presets.ts:15` | DATA | dataprop:text | CUUZ CU HP ZBU LGAUL VZ XVFS |

### caesar

Chapter 1, order 4. Load 947 words.

- `story.mdx`: 1,025 words (`wc -w`), 875 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `BEWARE THE IDES OF MARCH`
- Files scanned: `CaesarBoard.tsx`, `CaesarControls.tsx`, `presets.ts`, `route.tsx`, `useCaesar.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Caesar shift |
| era | 6 | About 50 BC |
| hook | 9 | Julius Caesar slid the alphabet three places along, and his generals read what his enemies could not. |
| firstStep | 10 | Type a message below. Change the shift. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (15 UI, 2 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `CaesarBoard.tsx:17` | UI | visprop:label | Plain |
| `CaesarBoard.tsx:18` | UI | visprop:label | Cipher |
| `CaesarBoard.tsx:24` | UI | jsxtext | A shift of |
| `CaesarBoard.tsx:24` | UI | jsxtext | : plain |
| `CaesarBoard.tsx:24` | UI | jsxtext | becomes cipher |
| `CaesarBoard.tsx:25` | UI | jsxtext | . Tap under a letter to follow it. |
| `CaesarControls.tsx:15` | UI | visattr:label | Shift |
| `CaesarControls.tsx:16` | UI | visattr:label | Ciphertext |
| `CaesarControls.tsx:16` | UI | visattr:label | Plaintext |
| `CaesarControls.tsx:20` | UI | visattr:label | Your message |
| `CaesarControls.tsx:20` | UI | visattr:label | The ciphertext |
| `CaesarControls.tsx:25` | UI | visattr:label | I want to |
| `CaesarControls.tsx:29` | UI | visprop:label | Encipher |
| `CaesarControls.tsx:30` | UI | visprop:label | Decipher |
| `CaesarControls.tsx:36` | UI | jsxtext | Try every shift at once |
| `presets.ts:6` | DATA | dataprop:text | I CAME, I SAW, I CONQUERED |
| `presets.ts:12` | DATA | dataprop:text | UXPTKX MAX BWXL HY FTKVA |

### keyword-substitution

Chapter 1, order 5. Load 1,141 words.

- `story.mdx`: 1,198 words (`wc -w`), 1,023 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `NEVER WRITE THE KEY DOWN`
- Files scanned: `KeywordBoard.tsx`, `KeywordControls.tsx`, `presets.ts`, `route.tsx`, `useKeyword.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The keyword cipher |
| era | 6 | First millennium AD |
| hook | 9 | Shuffle the whole alphabet with one word you can remember, and nobody can try all the keys. |
| firstStep | 10 | Change the keyword. Tap under a letter to follow it. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (19 UI, 7 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `KeywordBoard.tsx:11` | UI | jsxtext | No keyword yet, so the cipher alphabet is the plain one. Type a keyword. |
| `KeywordBoard.tsx:14` | UI | jsxtext | Without spaces and repeated letters the keyword is |
| `KeywordBoard.tsx:14` | UI | jsxtext | . It starts the cipher alphabet. The unused letters follow in order, beginning after |
| `KeywordBoard.tsx:29` | UI | visprop:label | Plain |
| `KeywordBoard.tsx:30` | UI | visprop:label | Cipher |
| `KeywordBoard.tsx:36` | UI | jsxtext | Plain |
| `KeywordBoard.tsx:36` | UI | jsxtext | becomes cipher |
| `KeywordBoard.tsx:36` | UI | jsxtext | . Tap under a letter to follow it. |
| `KeywordBoard.tsx:40` | UI | jsxtext | This is one of |
| `KeywordBoard.tsx:40` | UI | jsxtext | possible cipher alphabets. |
| `KeywordControls.tsx:15` | UI | visattr:label | Keyword or keyphrase |
| `KeywordControls.tsx:20` | UI | visattr:label | Ciphertext |
| `KeywordControls.tsx:20` | UI | visattr:label | Plaintext |
| `KeywordControls.tsx:24` | UI | visattr:label | Your message |
| `KeywordControls.tsx:24` | UI | visattr:label | The ciphertext |
| `KeywordControls.tsx:29` | UI | visattr:label | I want to |
| `KeywordControls.tsx:33` | UI | visprop:label | Encipher |
| `KeywordControls.tsx:34` | UI | visprop:label | Decipher |
| `KeywordControls.tsx:40` | UI | visattr:label | The commonest letter in the ciphertext |
| `presets.ts:6` | DATA | dataprop:keyword | JULIUS CAESAR |
| `presets.ts:6` | DATA | dataprop:text | BEWARE THE IDES OF MARCH |
| `presets.ts:9` | DATA | dataprop:text | BEWARE THE IDES OF MARCH |
| `presets.ts:12` | DATA | dataprop:keyword | JULIUS CAESAR |
| `presets.ts:12` | DATA | dataprop:text | USNJFS HES RISG ZC XJFLE |
| `presets.ts:18` | DATA | dataprop:text | HES SYSXP YSMSF YSSIG SMSFP VSP NESY HES WSHHSFG HESXGSWMSG HSWW HES GSLFSH |
| `presets.ts:22` | DATA | dataprop:text | VQIQB JBOGQ GNQ SQL YWJV |

### frequency-analysis

Chapter 1, order 6. Load 1,622 words.

- `story.mdx`: 1,741 words (`wc -w`), 1,466 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `LANTERN`
- Files scanned: `FrequencyAnalysisBoard.tsx`, `FrequencyAnalysisControls.tsx`, `PlainLetters.tsx`, `WorkingText.tsx`, `presets.ts`, `route.tsx`, `useFrequencyAnalysis.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Frequency analysis |
| era | 6 | Ninth century |
| hook | 9 | Every language has favourite letters. A scholar in Baghdad used them to break the unbreakable cipher. |
| firstStep | 10 | Tap the tallest bar. Then pick the plain letter it hides. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (22 UI, 0 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `FrequencyAnalysisBoard.tsx:26` | UI | visattr:label | Letter counts in the ciphertext, most common first, over the letters of normal English |
| `FrequencyAnalysisBoard.tsx:46` | UI | var:NOTHING_PICKED | Solid bars count the cipher letters. Outlines show normal English. Tap a bar or a letter of the message to work on it. |
| `FrequencyAnalysisBoard.tsx:55` | UI | jsxtext | Cipher |
| `FrequencyAnalysisBoard.tsx:55` | UI | jsxtext | appears |
| `FrequencyAnalysisBoard.tsx:55` | UI | jsxtext | times ( |
| `FrequencyAnalysisBoard.tsx:55` | UI | jsxtext | %) and touches |
| `FrequencyAnalysisBoard.tsx:56` | UI | jsxtext | different letters. |
| `FrequencyAnalysisBoard.tsx:57` | UI | jsxchild | You read it as ${plain.toLowerCase()}. |
| `FrequencyAnalysisBoard.tsx:57` | UI | jsxchild | Pick the plain letter you think it hides. |
| `FrequencyAnalysisControls.tsx:28` | UI | visattr:label | Key so far: ${solved} of ${inUse} cipher letters |
| `FrequencyAnalysisControls.tsx:30` | UI | jsxtext | Guess every letter by rank |
| `FrequencyAnalysisControls.tsx:35` | UI | jsxtext | Rub out |
| `FrequencyAnalysisControls.tsx:35` | UI | jsxchild | this letter |
| `FrequencyAnalysisControls.tsx:38` | UI | jsxtext | Rub out every guess |
| `FrequencyAnalysisControls.tsx:42` | UI | visattr:label | The message so far (small letters are your guesses) |
| `FrequencyAnalysisControls.tsx:48` | UI | visattr:label | The ciphertext (a new one clears your guesses) |
| `PlainLetters.tsx:17` | UI | visattr:aria-label | Plain letters, most common in English first |
| `PlainLetters.tsx:18` | UI | jsxtext | English, most common first |
| `PlainLetters.tsx:27` | UI | visattr:aria-label | Plain ${letter} |
| `WorkingText.tsx:16` | UI | visattr:aria-label | The message so far |
| `WorkingText.tsx:28` | UI | visattr:aria-label | Cipher ${cipher}, read as ${plain} |
| `WorkingText.tsx:28` | UI | visattr:aria-label | Cipher ${cipher}, not solved |

### bible-code

Chapter 1, order 6.5. Load 1,170 words.

- `story.mdx`: 1,174 words (`wc -w`), 1,046 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `DEAD`
- Files scanned: `BibleCodeBoard.tsx`, `BibleCodeControls.tsx`, `gridView.ts`, `presets.ts`, `route.tsx`, `useBibleCode.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The so-called Bible code |
| era | 6 | 1997 |
| hook | 9 | Jump through any long text in equal steps and words appear. Do they mean anything? |
| firstStep | 10 | Press ▲ next to "Hit" to see each hidden word. |
| source | 11 | The Code Book, Appendix C: The So-Called Bible Code |

Component strings (24 UI, 8 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `BibleCodeBoard.tsx:11` | UI | return | A skip of 1 is ordinary reading. |
| `BibleCodeBoard.tsx:11` | UI | return | A skip of 1, read backwards. |
| `BibleCodeBoard.tsx:12` | UI? (review) | var:way | down |
| `BibleCodeBoard.tsx:13` | UI | return | Each row holds ${state.skip} letters, so a jump of ${state.skip} lands in the same column. Read ${way} it. |
| `BibleCodeBoard.tsx:20` | UI | var:across | , columns ${view.firstColumn + 1} to ${view.firstColumn + columns} |
| `BibleCodeBoard.tsx:21` | UI | return | Showing rows ${view.firstRow + 1} to ${lastRow} of ${view.rows}${across}. |
| `BibleCodeBoard.tsx:34` | UI | visattr:label | ${TEXTS[state.text].title}, in rows of ${view.width} letters |
| `BibleCodeBoard.tsx:41` | UI | jsxtext | The lit letters spell |
| `BibleCodeBoard.tsx:41` | UI | jsxtext | Tap a letter to start from it. |
| `BibleCodeControls.tsx:15` | UI | return | Type a word of two letters or more. |
| `BibleCodeControls.tsx:17` | UI? (review) | var:times | once |
| `BibleCodeControls.tsx:17` | UI | var:times | ${withCommas(found)} times |
| `BibleCodeControls.tsx:18` | UI | return | No ${word} in ${tried} sequences. |
| `BibleCodeControls.tsx:18` | UI | return | ${word} hides ${times} in ${tried} sequences. |
| `BibleCodeControls.tsx:30` | UI | visattr:label | Start at letter |
| `BibleCodeControls.tsx:32` | UI | visprop:what | start |
| `BibleCodeControls.tsx:34` | UI | visattr:label | Skip |
| `BibleCodeControls.tsx:34` | UI | visprop:what | skip |
| `BibleCodeControls.tsx:35` | UI | visattr:label | The letters read |
| `BibleCodeControls.tsx:35` | UI | visattr:label | The letters read, going backwards |
| `BibleCodeControls.tsx:41` | UI | visattr:label | Search in |
| `BibleCodeControls.tsx:47` | UI | visattr:label | Word to find |
| `BibleCodeControls.tsx:56` | UI | visattr:label | Hit |
| `BibleCodeControls.tsx:61` | UI | visattr:label | The search found |
| `presets.ts:8` | DATA | dataprop:text | moby |
| `presets.ts:8` | DATA | dataprop:word | RAIN |
| `presets.ts:11` | DATA | dataprop:text | moby |
| `presets.ts:14` | DATA | dataprop:text | moby |
| `presets.ts:14` | DATA | dataprop:word | SHOT |
| `presets.ts:17` | DATA | dataprop:text | dull |
| `presets.ts:17` | DATA | dataprop:word | FIRE |
| `presets.ts:20` | DATA | dataprop:text | dull |

### mary-queen-of-scots

Chapter 1, order 7. Load 1,560 words.

- `story.mdx`: 1,518 words (`wc -w`), 1,330 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `HIDE THE LETTER IN THE BARREL`
- Files scanned: `MaryBoard.tsx`, `MaryControls.tsx`, `SignKey.tsx`, `SignStrip.tsx`, `presets.ts`, `route.tsx`, `useMary.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The cipher of Mary Queen of Scots |
| era | 6 | 1586 |
| hook | 9 | A captive queen hid a murder plot behind strange symbols. One codebreaker counted them. |
| firstStep | 10 | Tap a sign in the message to find it in the key. |
| source | 11 | The Code Book, chapter 1: The Cipher of Mary Queen of Scots |

Component strings (37 UI, 2 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `MaryBoard.tsx:16` | UI | return | is the sign for the letter ${plain} |
| `MaryBoard.tsx:17` | UI | return | stands for the whole word ${plain} |
| `MaryBoard.tsx:18` | UI | return | is a null. It means nothing, so the reader skips it |
| `MaryBoard.tsx:19` | UI | return | says that the next sign is a double letter |
| `MaryBoard.tsx:20` | UI | return | is not in the key |
| `MaryBoard.tsx:36` | UI | jsxtext | . It appears |
| `MaryBoard.tsx:37` | UI | jsxtext | times here. |
| `MaryBoard.tsx:40` | UI | jsxchild | Only the signs are showing. Tap a sign to look it up in the key. |
| `MaryBoard.tsx:42` | UI | jsxchild | Each sign sits under what it stands for. Tap a sign to find it in the key. |
| `MaryBoard.tsx:47` | UI | visattr:label | How often each sign appears, most common first, over the letters of normal English |
| `MaryBoard.tsx:56` | UI | jsxtext | Solid bars count the signs. Outlines show normal English, where E is the tallest. Tap the tallest bar to see what it hides. |
| `MaryControls.tsx:12` | UI | return | ${symbol} = nothing (a null) |
| `MaryControls.tsx:13` | UI | return | ${symbol} = double the next sign |
| `MaryControls.tsx:26` | UI | visattr:label | Ciphertext, in stand-in signs |
| `MaryControls.tsx:28` | UI | visattr:label | The sign you tapped |
| `MaryControls.tsx:31` | UI | visattr:label | I want to |
| `MaryControls.tsx:35` | UI | visprop:label | Write a letter |
| `MaryControls.tsx:36` | UI | visprop:label | Read one |
| `MaryControls.tsx:42` | UI | visattr:label | Your message |
| `MaryControls.tsx:42` | UI | visattr:label | The ciphertext |
| `MaryControls.tsx:51` | UI | visattr:label | Nulls |
| `MaryControls.tsx:55` | UI | visprop:label | None |
| `MaryControls.tsx:56` | UI | visprop:label | A few |
| `MaryControls.tsx:57` | UI | visprop:label | Many |
| `MaryControls.tsx:61` | UI | visattr:label | Word signs |
| `MaryControls.tsx:65` | UI | visprop:label | On |
| `MaryControls.tsx:66` | UI | visprop:label | Off |
| `MaryControls.tsx:69` | UI | visattr:label | Null pattern |
| `MaryControls.tsx:73` | UI | jsxtext | Decipher the whole message for me |
| `SignKey.tsx:15` | UI | visprop:title | A sign for each letter |
| `SignKey.tsx:16` | UI | visprop:title | Nulls: they mean nothing |
| `SignKey.tsx:16` | UI | visprop:meaning | null |
| `SignKey.tsx:17` | UI | visprop:title | Doubles the next sign |
| `SignKey.tsx:17` | UI | visprop:meaning | double |
| `SignKey.tsx:18` | UI | visprop:title | Signs for whole words |
| `SignKey.tsx:25` | UI | jsxtext | The key. These signs are our stand-ins, not Mary's own. |
| `SignStrip.tsx:18` | UI | visattr:aria-label | The message in signs |
| `presets.ts:6` | DATA | var:POSTSCRIPT | I WOULD BE GLAD TO KNOW THE NAMES AND QUALITIES OF THE SIX GENTLEMEN WHICH ARE TO ACCOMPL… |
| `presets.ts:29` | DATA | call:signsFor | HIDE THE LETTER IN THE BARREL |

### vigenere

Chapter 2, order 1. Load 1,274 words.

- `story.mdx`: 1,384 words (`wc -w`), 1,166 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `HOLD THE RIDGE UNTIL DARK`
- Files scanned: `VigenereBoard.tsx`, `VigenereControls.tsx`, `presets.ts`, `route.tsx`, `useVigenere.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Vigenère cipher |
| era | 6 | 1586 |
| hook | 9 | One keyword, twenty-six alphabets, and a cipher so strong that people called it unbreakable. |
| firstStep | 10 | Press ▲ next to “Letter” to encipher one letter at a time. |
| source | 11 | The Code Book, chapter 2: The Anonymous Codebreaker |

Component strings (22 UI, 11 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `VigenereBoard.tsx:22` | UI? (review) | return | cipher |
| `VigenereBoard.tsx:23` | UI? (review) | return | dim |
| `VigenereBoard.tsx:32` | UI | visprop:label | Key |
| `VigenereBoard.tsx:33` | UI | visprop:label | Plain |
| `VigenereBoard.tsx:34` | UI | visprop:label | Cipher |
| `VigenereBoard.tsx:41` | UI | jsxchild | Type a message below to see it pass through the square. |
| `VigenereBoard.tsx:44` | UI | visattr:label | Vigenère square: one row for each key letter, one column for each plain letter |
| `VigenereBoard.tsx:62` | UI | jsxtext | Key letter |
| `VigenereBoard.tsx:62` | UI | jsxtext | picks the row. Plain |
| `VigenereBoard.tsx:62` | UI | jsxtext | picks the column. They meet at cipher |
| `VigenereBoard.tsx:69` | UI | jsxtext | Key letter |
| `VigenereBoard.tsx:69` | UI | jsxtext | picks the row. Find cipher |
| `VigenereBoard.tsx:69` | UI | jsxtext | in that row. The top of its column is plain |
| `VigenereControls.tsx:15` | UI | visattr:label | Keyword |
| `VigenereControls.tsx:21` | UI | visattr:label | Letter |
| `VigenereControls.tsx:25` | UI | visattr:label | Ciphertext |
| `VigenereControls.tsx:25` | UI | visattr:label | Plaintext |
| `VigenereControls.tsx:29` | UI | visattr:label | Your message |
| `VigenereControls.tsx:29` | UI | visattr:label | The ciphertext |
| `VigenereControls.tsx:34` | UI | visattr:label | I want to |
| `VigenereControls.tsx:38` | UI | visprop:label | Encipher |
| `VigenereControls.tsx:39` | UI | visprop:label | Decipher |
| `presets.ts:6` | DATA | dataprop:keyword | WHITE |
| `presets.ts:6` | DATA | dataprop:text | DIVERT TROOPS TO EAST RIDGE |
| `presets.ts:9` | DATA | dataprop:keyword | W |
| `presets.ts:9` | DATA | dataprop:text | DIVERT TROOPS TO EAST RIDGE |
| `presets.ts:12` | DATA | dataprop:keyword | WHITE |
| `presets.ts:12` | DATA | dataprop:text | DIVERT TROOPS TO EAST RIDGE |
| `presets.ts:15` | DATA | dataprop:keyword | WHITE |
| `presets.ts:15` | DATA | dataprop:text | ZPDXVP AZHSLZ BH IWZB KMZNM |
| `presets.ts:18` | DATA | dataprop:keyword | KING |
| `presets.ts:18` | DATA | dataprop:text | THE SUN AND THE MAN IN THE MOON |
| `presets.ts:21` | DATA | dataprop:text | DVTW XDL ZBHCL CGXES LTVG |

### homophonic

Chapter 2, order 2, full edition only. Load 1,335 words.

- `story.mdx`: 1,405 words (`wc -w`), 1,199 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `NO BAR STANDS TALL`
- Files scanned: `HomophonicBoard.tsx`, `HomophonicControls.tsx`, `NumberBars.tsx`, `NumberStrip.tsx`, `presets.ts`, `route.tsx`, `useHomophonic.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The homophonic cipher |
| era | 6 | 1400s to 1700s |
| hook | 9 | Give the busy letters more disguises, and the tall bars of the frequency chart melt away. |
| firstStep | 10 | Tap the tall E bar in the top chart. |
| source | 11 | The Code Book (full edition), chapter 2 |

Component strings (26 UI, 6 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `HomophonicBoard.tsx:29` | UI | visattr:label | The key: the numbers that may stand for each letter |
| `HomophonicBoard.tsx:37` | UI | visattr:label | How often each letter appears in the plaintext |
| `HomophonicBoard.tsx:48` | UI | jsxchild | Top: the letters of the message. Bottom: the numbers that replace them, drawn to the same scale. Tap a bar or a number. |
| `HomophonicBoard.tsx:64` | UI | jsxtext | is |
| `HomophonicBoard.tsx:64` | UI | jsxchild | the only number |
| `HomophonicBoard.tsx:64` | UI | jsxchild | one of ${shares} numbers |
| `HomophonicBoard.tsx:64` | UI | jsxtext | for |
| `HomophonicBoard.tsx:65` | UI | jsxtext | . Here |
| `HomophonicBoard.tsx:65` | UI | jsxtext | appears |
| `HomophonicBoard.tsx:65` | UI | jsxtext | times and |
| `HomophonicBoard.tsx:65` | UI | jsxtext | appears |
| `HomophonicBoard.tsx:65` | UI | jsxtext | times. |
| `HomophonicBoard.tsx:69` | UI | jsxchild | After ${picked} come only: ${after.join(", ")}. |
| `HomophonicBoard.tsx:70` | UI | jsxchild | After ${picked} come ${after.length} different numbers. |
| `HomophonicControls.tsx:16` | UI | visattr:label | Table |
| `HomophonicControls.tsx:17` | UI | visattr:label | Ciphertext |
| `HomophonicControls.tsx:17` | UI | visattr:label | Plaintext |
| `HomophonicControls.tsx:23` | UI | visattr:label | Your message |
| `HomophonicControls.tsx:23` | UI | visattr:label | The ciphertext, in two-digit numbers |
| `HomophonicControls.tsx:29` | UI | visattr:label | I want to |
| `HomophonicControls.tsx:33` | UI | visprop:label | Encipher |
| `HomophonicControls.tsx:34` | UI | visprop:label | Decipher |
| `HomophonicControls.tsx:40` | UI | visattr:label | Roll the picks again |
| `NumberBars.tsx:18` | UI | visattr:aria-label | How often each number from 00 to 99 appears in the ciphertext |
| `NumberStrip.tsx:7` | UI | visattr:aria-label | The message, each letter above its number |
| `NumberStrip.tsx:13` | UI | visattr:aria-label | ${step.plain} is ${step.number} |
| `presets.ts:5` | DATA | var:DUKE | THE DUKE HAS A SECRET. HIS CLERKS TURN EVERY LETTER INTO A NUMBER, AND THE COMMON LETTERS… |
| `presets.ts:6` | DATA | var:DUKE | NUMBERS THAN THE RARE ONES. WHEN THE ENEMY COUNTS THE NUMBERS, HE FINDS THAT NONE STANDS … |
| `presets.ts:7` | DATA | var:DUKE | APPEARS ABOUT AS OFTEN AS THE REST. THE TALL BAR THAT GAVE AWAY THE LETTER E IS GONE, CUT… |
| `presets.ts:8` | DATA | var:DUKE | SHORT ONES. THE CODEBREAKER WHO TRUSTED HIS TABLE OF FREQUENCIES IS LOST, AT LEAST FOR A … |
| `presets.ts:12` | DATA | var:QUEEN | THE QUEEN ASKED A QUICK QUESTION. THE QUIET SQUIRE WAS QUITE UNABLE TO REPLY. HE SQUEEZED… |
| `presets.ts:13` | DATA | var:QUEEN | AND REQUESTED A QUARTER OF AN HOUR. THE QUEEN, QUITE ANNOYED, QUIT THE ROOM. |

### pigpen

Chapter 2, order 3. Load 1,080 words.

- `story.mdx`: 1,135 words (`wc -w`), 978 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `THE LODGE MEETS AT MIDNIGHT`
- Files scanned: `PigpenBoard.tsx`, `PigpenControls.tsx`, `PigpenGlyph.tsx`, `PigpenGrids.tsx`, `PigpenMessage.tsx`, `SymbolCounts.tsx`, `layout.ts`, `presets.ts`, `route.tsx`, `usePigpen.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The pigpen cipher |
| era | 6 | 1700s |
| hook | 9 | The Freemasons wrote their secrets in corners, boxes and dots. The key is four small grids. |
| firstStep | 10 | Tap a letter in a grid to see its symbol. |
| source | 11 | The Code Book, Appendix D: The Pigpen Cipher |

Component strings (12 UI, 3 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `PigpenBoard.tsx:19` | UI | jsxtext | lives in grid |
| `PigpenBoard.tsx:19` | UI | jsxtext | . Sketch the lines around it and you get its symbol: |
| `PigpenBoard.tsx:23` | UI | jsxchild | Tap a letter in a grid, or a symbol in the message. The bright lines around the letter are its symbol. |
| `PigpenControls.tsx:19` | UI | visattr:label | The symbol you tapped |
| `PigpenControls.tsx:21` | UI | jsxtext | Show every letter |
| `PigpenControls.tsx:23` | UI | visattr:label | Symbols in the message |
| `PigpenControls.tsx:29` | UI | visattr:label | Your message |
| `PigpenGrids.tsx:26` | UI | visattr:aria-label | Grid ${first.grid + 1}${first.dot ? ", with dots" : ""} |
| `PigpenGrids.tsx:26` | UI | visattr:aria-label | , with dots |
| `PigpenGrids.tsx:46` | UI | visattr:aria-label | ${glyph.letter}, with a dot |
| `PigpenMessage.tsx:16` | UI | visattr:aria-label | The message in pigpen symbols |
| `SymbolCounts.tsx:11` | UI | jsxtext | Count of each symbol, commonest first |
| `presets.ts:6` | DATA | dataprop:text | THE FREEMASONS |
| `presets.ts:12` | DATA | dataprop:text | FREQUENCY ANALYSIS |
| `presets.ts:15` | DATA | dataprop:text | THE LODGE MEETS AT MIDNIGHT |

### babbage

Chapter 2, order 4. Load 1,340 words.

- `story.mdx`: 1,364 words (`wc -w`), 1,197 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `HEART`
- Files scanned: `BabbageBoard.tsx`, `BabbageControls.tsx`, `LetterBlock.tsx`, `RepeatsTable.tsx`, `presets.ts`, `route.tsx`, `useBabbage.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Babbage breaks the Vigenère cipher |
| era | 6 | 1854 |
| hook | 9 | A dentist dared Charles Babbage to crack the unbreakable cipher. So he did, and told nobody. |
| firstStep | 10 | Tap a repeated sequence in the table to find both copies. |
| source | 11 | The Code Book, chapter 2: The Anonymous Codebreaker |

Component strings (26 UI, 0 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `BabbageBoard.tsx:39` | UI | visattr:label | The ciphertext |
| `BabbageBoard.tsx:46` | UI | jsxtext | appears twice, |
| `BabbageBoard.tsx:46` | UI | jsxtext | letters apart. The keyword must fit a whole number of times into |
| `BabbageBoard.tsx:50` | UI | jsxchild | Tap a repeated sequence in the table to find both copies. |
| `BabbageBoard.tsx:57` | UI | jsxtext | A keyword of |
| `BabbageBoard.tsx:57` | UI | jsxtext | letters would explain |
| `BabbageBoard.tsx:57` | UI | jsxtext | of these |
| `BabbageBoard.tsx:57` | UI | jsxtext | repeats. |
| `BabbageBoard.tsx:71` | UI | jsxtext | Key letter |
| `BabbageBoard.tsx:71` | UI | jsxtext | of |
| `BabbageBoard.tsx:71` | UI | jsxtext | enciphered |
| `BabbageBoard.tsx:71` | UI | jsxtext | of the letters. Trying |
| `BabbageBoard.tsx:72` | UI | jsxtext | : solid bars are these letters, outlines are ordinary English. |
| `BabbageBoard.tsx:76` | UI | visattr:label | Letter counts for key letter ${state.position + 1} with a shift of ${shift}, compared with English |
| `BabbageBoard.tsx:83` | UI | visattr:label | The plaintext so far |
| `BabbageControls.tsx:17` | UI | visattr:label | Keyword so far |
| `BabbageControls.tsx:18` | UI | visattr:label | Plaintext so far |
| `BabbageControls.tsx:22` | UI | visattr:label | Step |
| `BabbageControls.tsx:32` | UI | visattr:label | Key length (resets the keyword) |
| `BabbageControls.tsx:39` | UI | visattr:label | Key letter |
| `BabbageControls.tsx:43` | UI | visattr:label | Shift |
| `BabbageControls.tsx:44` | UI | jsxtext | Find this shift for me |
| `RepeatsTable.tsx:20` | UI | visattr:aria-label | Repeated sequences, their spacings and the key lengths that fit |
| `RepeatsTable.tsx:23` | UI | jsxtext | Repeat |
| `RepeatsTable.tsx:24` | UI | jsxtext | Spacing |
| `RepeatsTable.tsx:52` | UI | jsxtext | Repeats that fit |

### pinprick

Chapter 2, order 5. Load 1,218 words.

- `story.mdx`: 1,218 words (`wc -w`), 1,095 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `COME HOME SOON`
- Files scanned: `PinprickBoard.tsx`, `PinprickControls.tsx`, `presets.ts`, `route.tsx`, `usePinprick.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Pinprick messages |
| era | 6 | Ancient Greece to the 1800s |
| hook | 9 | Victorians sent secret letters for nothing, hidden as tiny holes in yesterday's newspaper. |
| firstStep | 10 | Type a secret below. Then hold the page up to the light. |
| source | 11 | The Code Book, chapter 2: The Anonymous Codebreaker |

Component strings (17 UI, 4 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `PinprickBoard.tsx:18` | UI | jsxtext | The Harbour Gazette |
| `PinprickBoard.tsx:46` | UI | visattr:aria-label | ${props.char}, pricked |
| `PinprickBoard.tsx:56` | UI | return | Tap a letter to prick a hole under it. Tap it again to mend the hole. |
| `PinprickBoard.tsx:61` | UI | jsxtext | The page ran out. There is no |
| `PinprickBoard.tsx:61` | UI | jsxtext | after the last hole, so |
| `PinprickBoard.tsx:62` | UI | jsxtext | cannot be hidden. |
| `PinprickBoard.tsx:66` | UI | return | ${positions.length} holes, one under a letter for each letter of your secret, in order. |
| `PinprickControls.tsx:15` | UI | visattr:label | The page is |
| `PinprickControls.tsx:19` | UI | visprop:label | On the table |
| `PinprickControls.tsx:20` | UI | visprop:label | Held up to the light |
| `PinprickControls.tsx:23` | UI | visattr:label | The holes spell |
| `PinprickControls.tsx:27` | UI | visattr:label | Who pricks the holes |
| `PinprickControls.tsx:31` | UI | visprop:label | Prick them for me |
| `PinprickControls.tsx:32` | UI | visprop:label | I prick by hand |
| `PinprickControls.tsx:37` | UI | visattr:label | Your secret |
| `PinprickControls.tsx:37` | UI | visattr:label | Your secret (no room for ${left}) |
| `PinprickControls.tsx:42` | UI | jsxtext | Mend every hole |
| `presets.ts:9` | DATA | dataprop:secret | MEET ME AT SIX |
| `presets.ts:15` | DATA | dataprop:secret | PUZZLE |
| `presets.ts:21` | DATA | dataprop:secret | MEET ME AT SIX |
| `presets.ts:24` | DATA | call:hide | COME HOME SOON |

### dancing-men

Chapter 2, order 5.5. Load 1,461 words.

- `story.mdx`: 1,309 words (`wc -w`), 1,131 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `COME TO THE GARDEN WALL AT SEVEN`
- Files scanned: `DancedMessage.tsx`, `DancingFigure.tsx`, `DancingMenBoard.tsx`, `DancingMenControls.tsx`, `FigureTiles.tsx`, `LetterPicker.tsx`, `VerneSteps.tsx`, `layout.ts`, `presets.ts`, `route.tsx`, `useDancingMen.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Dancing Men and other ciphers in stories |
| era | 6 | 1843 to 1903 |
| hook | 9 | Sherlock Holmes read a row of dancing stick men by counting which one danced most. |
| firstStep | 10 | Tap a dancing man to see his letter. Type your own message below. |
| source | 11 | The Code Book, chapter 2: The Anonymous Codebreaker |

Component strings (48 UI, 4 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `DancedMessage.tsx:7` | UI | var:flag | , holding a flag |
| `DancedMessage.tsx:22` | UI | visattr:aria-label | The message in dancing men |
| `DancingMenBoard.tsx:52` | UI | visattr:title | The key: our own 26 poses, in the spirit of the story. They are not Conan Doyle's drawings. |
| `DancingMenBoard.tsx:63` | UI | return | Type a message in the controls and watch it dance. |
| `DancingMenBoard.tsx:64` | UI | return | Tap a dancing man. A flag in his hand means a word ends there. |
| `DancingMenBoard.tsx:65` | UI | return | The same figure is bright in the key below. Read his letter there. |
| `DancingMenBoard.tsx:69` | UI | jsxtext | always dances the same way: |
| `DancingMenBoard.tsx:69` | UI | jsxtext | . He appears |
| `DancingMenBoard.tsx:70` | UI | jsxchild | time |
| `DancingMenBoard.tsx:70` | UI | jsxchild | times |
| `DancingMenBoard.tsx:70` | UI | jsxtext | here. A flag only marks the end of a word. |
| `DancingMenBoard.tsx:86` | UI | visattr:title | How often each figure dances, commonest first |
| `DancingMenBoard.tsx:101` | UI | return | Every figure has its right letter. You have read it the way Holmes did. |
| `DancingMenBoard.tsx:102` | UI | return | Tap a figure in the counts or in the message. Then pick the letter you think he hides. |
| `DancingMenBoard.tsx:108` | UI | return | This figure dances ${same.length} times (${percent}% of the message) and ends ${ends} |
| `DancingMenBoard.tsx:109` | UI | return | ${ends === 1 ? "word" : "words"} with a flag. |
| `DancingMenBoard.tsx:109` | UI | intemplate | word |
| `DancingMenBoard.tsx:109` | UI | intemplate | words |
| `DancingMenBoard.tsx:110` | UI | return | You read him as ${guess}. |
| `DancingMenBoard.tsx:110` | UI | return | Pick his letter above. |
| `DancingMenControls.tsx:26` | UI | visattr:label | Tool (choosing one starts it afresh) |
| `DancingMenControls.tsx:30` | UI | visprop:label | Dance a message |
| `DancingMenControls.tsx:31` | UI | visprop:label | Holmes's desk |
| `DancingMenControls.tsx:32` | UI | visprop:label | Verne's parchment |
| `DancingMenControls.tsx:38` | UI | visattr:label | Your message |
| `DancingMenControls.tsx:45` | UI | visattr:label | Your message (typing goes back to step 0) |
| `DancingMenControls.tsx:59` | UI | visattr:label | Read back from the poses and flags |
| `DancingMenControls.tsx:62` | UI | visattr:label | The message you found |
| `DancingMenControls.tsx:62` | UI | jsxchild | ${figures.length} figures, ${flags} flags |
| `DancingMenControls.tsx:63` | UI | jsxtext | Show every letter |
| `DancingMenControls.tsx:74` | UI | visattr:label | Your reading so far: ${named} of ${tally(figures).length} figures named |
| `DancingMenControls.tsx:78` | UI | jsxtext | Give me a letter |
| `DancingMenControls.tsx:90` | UI | jsxtext | Rub out the bright figure |
| `DancingMenControls.tsx:93` | UI | jsxtext | Rub out every guess |
| `DancingMenControls.tsx:104` | UI | visattr:label | Step |
| `LetterPicker.tsx:18` | UI | visattr:aria-label | Letters, most common in English first |
| `LetterPicker.tsx:20` | UI | jsxchild | Tap a figure first. Then pick its letter here |
| `LetterPicker.tsx:20` | UI | jsxchild | Pick a letter for the bright figure |
| `LetterPicker.tsx:21` | UI | jsxchild | (most common in English first) |
| `LetterPicker.tsx:31` | UI | visattr:aria-label | Letter ${letter} |
| `VerneSteps.tsx:9` | UI | var:VERNE_LABELS | The message |
| `VerneSteps.tsx:10` | UI | var:VERNE_LABELS | Hide, step 1: swap each letter |
| `VerneSteps.tsx:11` | UI | var:VERNE_LABELS | Hide, step 2: write it backwards. This is the parchment |
| `VerneSteps.tsx:12` | UI | var:VERNE_LABELS | Undo, step 1: read it backwards |
| `VerneSteps.tsx:13` | UI | var:VERNE_LABELS | Undo, step 2: swap each letter back |
| `VerneSteps.tsx:23` | UI | visprop:label | Plain |
| `VerneSteps.tsx:24` | UI | visprop:label | Ours |
| `VerneSteps.tsx:38` | UI | jsxtext | The swapping alphabet is our own. In the novel the parchment is in runes, and each rune stands for a letter. Press ▲ next to "Step" to go on. |
| `presets.ts:4` | DATA | var:VERNE_TEXT | DESCEND THE CRATER |
| `presets.ts:19` | DATA | dataprop:text | AM HERE ABE SLANEY |
| `presets.ts:25` | DATA | dataprop:text | COME HERE AT ONCE |
| `presets.ts:40` | DATA | dataprop:text | COME TO THE GARDEN WALL AT SEVEN |

### playfair

Chapter 2, order 6, full edition only. Load 1,279 words.

- `story.mdx`: 1,384 words (`wc -w`), 1,152 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `ANY BOY CAN LEARN THIS`
- Files scanned: `PlayfairBoard.tsx`, `PlayfairControls.tsx`, `presets.ts`, `route.tsx`, `usePlayfair.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Playfair cipher |
| era | 6 | 1854 |
| hook | 9 | Charles Wheatstone hid letters two at a time in a square that schoolboys could learn. |
| firstStep | 10 | Press ▲ next to “Pair” to encipher two letters at a time. |
| source | 11 | The Code Book (full edition), Appendix E |

Component strings (23 UI, 10 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `PlayfairBoard.tsx:11` | DATA | other:ArrowFunction | I/J |
| `PlayfairBoard.tsx:19` | UI | return | share a row, so each becomes the letter on its ${enciphering ? "right" : "left"}, going round at the edge |
| `PlayfairBoard.tsx:19` | UI | intemplate | right |
| `PlayfairBoard.tsx:19` | UI | intemplate | left |
| `PlayfairBoard.tsx:21` | UI | return | share a column, so each becomes the letter ${enciphering ? "below" : "above"} it, going round at the edge |
| `PlayfairBoard.tsx:21` | UI | intemplate | below |
| `PlayfairBoard.tsx:21` | UI | intemplate | above |
| `PlayfairBoard.tsx:23` | UI | return | are corners of a rectangle, so each becomes the corner in its own row |
| `PlayfairBoard.tsx:29` | UI | return | The ${step.plain[1]} was added to split a double ${step.plain[0]}. |
| `PlayfairBoard.tsx:30` | UI | return | The ${step.plain[1]} was added to complete the last pair. |
| `PlayfairBoard.tsx:46` | UI? (review) | return | cipher |
| `PlayfairBoard.tsx:55` | UI | visprop:label | Plain |
| `PlayfairBoard.tsx:56` | UI | visprop:label | Cipher |
| `PlayfairBoard.tsx:63` | UI | visattr:label | Playfair square |
| `PlayfairBoard.tsx:71` | UI | jsxchild | Type a message below to see it pass through the square. |
| `PlayfairControls.tsx:15` | UI | visattr:label | Keyword |
| `PlayfairControls.tsx:21` | UI | visattr:label | Pair |
| `PlayfairControls.tsx:25` | UI | visattr:label | Ciphertext |
| `PlayfairControls.tsx:25` | UI | visattr:label | Plaintext |
| `PlayfairControls.tsx:29` | UI | visattr:label | Your message |
| `PlayfairControls.tsx:29` | UI | visattr:label | The ciphertext |
| `PlayfairControls.tsx:34` | UI | visattr:label | I want to |
| `PlayfairControls.tsx:38` | UI | visprop:label | Encipher |
| `PlayfairControls.tsx:39` | UI | visprop:label | Decipher |
| `presets.ts:3` | DATA | var:MESSAGE | MEET ME AT HAMMERSMITH BRIDGE TONIGHT |
| `presets.ts:8` | DATA | dataprop:keyword | CHARLES |
| `presets.ts:11` | DATA | dataprop:keyword | CHARLES |
| `presets.ts:14` | DATA | dataprop:keyword | CHARLES |
| `presets.ts:17` | DATA | dataprop:keyword | CHARLES |
| `presets.ts:17` | DATA | dataprop:text | MY TURN |
| `presets.ts:21` | DATA | dataprop:keyword | CHARLES |
| `presets.ts:23` | DATA | dataprop:text | GD DO GD RQ AR KY GD HD NK PR DA MS OG UP GK IC QY |
| `presets.ts:28` | DATA | dataprop:text | PQ AC SL BY OP HP IO QM CN |

### beale

Chapter 2, order 7. Load 1,366 words.

- `story.mdx`: 1,468 words (`wc -w`), 1,259 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `THE GOLD IS IN IRON POTS`
- Files scanned: `BealeBoard.tsx`, `BealeControls.tsx`, `presets.ts`, `route.tsx`, `useBeale.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Beale ciphers |
| era | 6 | 1822 to 1885 |
| hook | 9 | Three sheets of numbers point to a buried fortune. Only one of them has ever been read. |
| firstStep | 10 | Tap a number to find its word in the key text. |
| source | 11 | The Code Book, chapter 2: The Anonymous Codebreaker |

Component strings (23 UI, 2 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `BealeBoard.tsx:17` | UI | visattr:aria-label | The message, one number for each letter |
| `BealeBoard.tsx:41` | UI | return | Tap a number, or a word, to see which letter it stands for. |
| `BealeBoard.tsx:43` | UI | return | This key text has only ${words.length} words here, so ${picked} points at nothing. |
| `BealeBoard.tsx:46` | UI | jsxtext | Word |
| `BealeBoard.tsx:46` | UI | jsxtext | is " |
| `BealeBoard.tsx:46` | UI | jsxtext | ". It starts with |
| `BealeBoard.tsx:46` | UI | jsxtext | , so |
| `BealeBoard.tsx:46` | UI | jsxtext | stands for |
| `BealeBoard.tsx:71` | UI | visattr:aria-label | Key text: ${props.title} |
| `BealeBoard.tsx:72` | UI | jsxtext | Key text: |
| `BealeControls.tsx:9` | UI | prop:declaration | Declaration |
| `BealeControls.tsx:10` | UI | prop:gettysburg | Gettysburg |
| `BealeControls.tsx:11` | UI | prop:constitution | Constitution |
| `BealeControls.tsx:17` | UI | return | Your message |
| `BealeControls.tsx:17` | UI | return | Your message (no word starts with ${lost.join(" or ")}) |
| `BealeControls.tsx:28` | UI | visattr:label | Key text |
| `BealeControls.tsx:33` | UI | visattr:label | Ciphertext |
| `BealeControls.tsx:33` | UI | visattr:label | Plaintext |
| `BealeControls.tsx:37` | UI | visattr:label | The numbers |
| `BealeControls.tsx:42` | UI | visattr:label | I want to |
| `BealeControls.tsx:46` | UI | visprop:label | Encipher |
| `BealeControls.tsx:47` | UI | visprop:label | Decipher |
| `BealeControls.tsx:53` | UI | jsxtext | Pick different numbers |
| `presets.ts:15` | DATA | call:encipher | THE GOLD IS IN IRON POTS |
| `presets.ts:23` | DATA | dataprop:text | BEALE |

### morse

Chapter 3, order 1, full edition only. Load 1,246 words.

- `story.mdx`: 1,270 words (`wc -w`), 1,110 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `COME AT ONCE`
- Files scanned: `Marks.tsx`, `MorseBoard.tsx`, `MorseChart.tsx`, `MorseControls.tsx`, `presets.ts`, `route.tsx`, `useMorse.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Morse code |
| era | 6 | 1844 onwards |
| hook | 9 | Two signals, short and long, carried the world's news down a wire. They kept no secrets at all. |
| firstStep | 10 | Press Send and watch the lamp. |
| source | 11 | The Code Book (full edition), chapter 2 |

Component strings (25 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `MorseBoard.tsx:38` | UI | visattr:aria-label | Signal lamp |
| `MorseBoard.tsx:39` | UI | visattr:label | Signals from the wire |
| `MorseBoard.tsx:41` | UI | visattr:label | Your message in Morse |
| `MorseBoard.tsx:41` | UI | visattr:label | What you have keyed |
| `MorseBoard.tsx:55` | UI? (review) | return | now |
| `MorseBoard.tsx:56` | UI? (review) | return | sent |
| `MorseBoard.tsx:60` | UI | return | A dash lasts as long as three dots. The gaps between letters and words are part of the code. |
| `MorseBoard.tsx:62` | UI | return | Press Dot or Dash to start a letter. The table shows every letter it could become. |
| `MorseBoard.tsx:64` | UI | return | No letter starts like this. Rub out and try again. |
| `MorseBoard.tsx:65` | UI | return | ${left.length} of the 36 signs start like this. Press "Next letter" when yours is complete. |
| `MorseBoard.tsx:80` | UI | visattr:aria-label | gap between words |
| `MorseChart.tsx:9` | UI | visattr:aria-label | The Morse table |
| `MorseControls.tsx:14` | UI | visattr:label | I want to |
| `MorseControls.tsx:18` | UI | visprop:label | Send |
| `MorseControls.tsx:19` | UI | visprop:label | Key by hand |
| `MorseControls.tsx:22` | UI | visattr:label | In Morse |
| `MorseControls.tsx:22` | UI | visattr:label | It reads |
| `MorseControls.tsx:26` | UI | visattr:label | Your message |
| `MorseControls.tsx:28` | UI | jsxchild | Stop |
| `MorseControls.tsx:28` | UI | jsxchild | Send |
| `MorseControls.tsx:34` | UI | jsxtext | Dot |
| `MorseControls.tsx:37` | UI | jsxtext | Dash |
| `MorseControls.tsx:39` | UI | jsxtext | Next letter |
| `MorseControls.tsx:40` | UI | jsxtext | Next word |
| `MorseControls.tsx:42` | UI | jsxtext | Rub out |
| `presets.ts:10` | DATA | call:sendMessage | SOS |
| `presets.ts:16` | DATA | call:sendMessage | EAT JQY |
| `presets.ts:19` | DATA | call:sendMessage | WHAT HATH GOD WROUGHT |
| `presets.ts:22` | DATA | call:sendMessage | LXFOPV EF RNHR |
| `presets.ts:28` | DATA | call:toMorse | COME AT ONCE |

### zimmermann

Chapter 3, order 2. Load 1,400 words.

- `story.mdx`: 1,433 words (`wc -w`), 1,261 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `WE MAKE ALLIANCE WITH MEXICO AND JAPAN`
- Files scanned: `BreakerDesk.tsx`, `ClerkDesk.tsx`, `ZimmermannBoard.tsx`, `ZimmermannControls.tsx`, `presets.ts`, `route.tsx`, `useZimmermann.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Zimmermann telegram |
| era | 6 | 1917 |
| hook | 9 | One telegram in a secret code, read by the wrong people, pulled America into the First World War. |
| firstStep | 10 | Tap words in the codebook to build a telegram. |
| source | 11 | The Code Book, chapter 3: The Mechanization of Secrecy |

Component strings (19 UI, 11 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `BreakerDesk.tsx:18` | UI | visattr:aria-label | Intercepted telegram ${row + 1} |
| `BreakerDesk.tsx:32` | UI | visattr:aria-label | Words it might be |
| `ClerkDesk.tsx:8` | UI | visattr:aria-label | Your telegram |
| `ClerkDesk.tsx:9` | UI | jsxtext | The telegram form is empty. |
| `ClerkDesk.tsx:17` | UI | visattr:aria-label | Codebook |
| `ClerkDesk.tsx:22` | UI | jsxchild | made up * |
| `ZimmermannBoard.tsx:28` | UI | return | Each word leaves the desk as one group of figures. Groups marked * are made up. |
| `ZimmermannBoard.tsx:30` | UI | return | Every group is right. You have rebuilt the codebook, and all four telegrams read clearly. |
| `ZimmermannBoard.tsx:31` | UI | return | Tap a group marked ? and then the word you think it stands for. |
| `ZimmermannBoard.tsx:32` | UI | return | ${right} of your ${made} guesses fit the real codebook. There are ${toFind} groups to find. |
| `ZimmermannControls.tsx:16` | UI | visattr:label | I am |
| `ZimmermannControls.tsx:20` | UI | visprop:label | The clerk |
| `ZimmermannControls.tsx:21` | UI | visprop:label | The codebreaker |
| `ZimmermannControls.tsx:24` | UI | visattr:label | The telegram as sent |
| `ZimmermannControls.tsx:24` | UI | visattr:label | The telegrams so far |
| `ZimmermannControls.tsx:29` | UI | jsxtext | Rub out the last word |
| `ZimmermannControls.tsx:32` | UI | jsxtext | Clear the telegram |
| `ZimmermannControls.tsx:38` | UI | jsxtext | Rub out this guess |
| `ZimmermannControls.tsx:40` | UI | jsxtext | Rub out every guess |
| `presets.ts:6` | DATA | prop:words | MOST SECRET |
| `presets.ts:6` | DATA | prop:words | MAKE |
| `presets.ts:6` | DATA | prop:words | WAR |
| `presets.ts:6` | DATA | prop:words | TOGETHER |
| `presets.ts:6` | DATA | prop:words | STOP |
| `presets.ts:6` | DATA | prop:words | ZIMMERMANN |
| `presets.ts:12` | DATA | prop:words | WAR |
| `presets.ts:12` | DATA | prop:words | AND |
| `presets.ts:12` | DATA | prop:words | WAR |
| `presets.ts:12` | DATA | prop:words | AND |
| `presets.ts:12` | DATA | prop:words | WAR |

### adfgvx

Chapter 3, order 3, full edition only. Load 1,295 words.

- `story.mdx`: 1,386 words (`wc -w`), 1,151 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `RUSH MUNITIONS`
- Files scanned: `AdfgvxBoard.tsx`, `AdfgvxControls.tsx`, `presets.ts`, `route.tsx`, `useAdfgvx.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The ADFGVX cipher |
| era | 6 | 1918 |
| hook | 9 | Six letters, a grid and a keyword hid the German army's orders in 1918, until one Frenchman saw through them. |
| firstStep | 10 | Tap a square in the grid. Follow its pair. |
| source | 11 | The Code Book (full edition), chapter 3 and Appendix F |

Component strings (22 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `AdfgvxBoard.tsx:18` | UI | visattr:label | The ADFGVX grid |
| `AdfgvxBoard.tsx:29` | UI | jsxtext | sits in row |
| `AdfgvxBoard.tsx:29` | UI | jsxtext | , column |
| `AdfgvxBoard.tsx:30` | UI | jsxtext | , so its pair is |
| `AdfgvxBoard.tsx:34` | UI | jsxchild | Tap a square in the grid to follow it. |
| `AdfgvxBoard.tsx:37` | UI | jsxchild | The ciphertext is the sorted table, read down each column in turn. |
| `AdfgvxBoard.tsx:38` | UI | jsxchild | The ciphertext fills the sorted columns. Put the columns back in keyword order and read across. |
| `AdfgvxBoard.tsx:53` | UI | visattr:title | Stage 1: each symbol becomes a pair |
| `AdfgvxBoard.tsx:55` | UI | visattr:label | The message and its pairs |
| `AdfgvxBoard.tsx:61` | UI | visattr:title | Stage 2: written under the keyword |
| `AdfgvxBoard.tsx:63` | UI | visattr:label | The pairs written in rows under the keyword |
| `AdfgvxBoard.tsx:70` | UI | visattr:title | Columns sorted by keyword letter |
| `AdfgvxBoard.tsx:72` | UI | visattr:label | The same table with its columns in alphabetical order |
| `AdfgvxControls.tsx:18` | UI | visattr:label | Keyword |
| `AdfgvxControls.tsx:23` | UI | visattr:label | Ciphertext |
| `AdfgvxControls.tsx:23` | UI | visattr:label | Plaintext |
| `AdfgvxControls.tsx:27` | UI | visattr:label | Your message (letters and digits) |
| `AdfgvxControls.tsx:27` | UI | visattr:label | The ciphertext |
| `AdfgvxControls.tsx:32` | UI | visattr:label | I want to |
| `AdfgvxControls.tsx:36` | UI | visprop:label | Encipher |
| `AdfgvxControls.tsx:37` | UI | visprop:label | Decipher |
| `AdfgvxControls.tsx:42` | UI | jsxtext | Shuffle the grid |
| `presets.ts:7` | DATA | dataprop:keyword | MARK |
| `presets.ts:7` | DATA | dataprop:text | ATTACK AT 10 PM |
| `presets.ts:10` | DATA | dataprop:keyword | MARK |
| `presets.ts:13` | DATA | dataprop:keyword | PARIS |
| `presets.ts:13` | DATA | dataprop:text | VDDDGDGXVXVDGGDDGXADAVXVGV |

### one-time-pad

Chapter 3, order 4, full edition only. Load 1,405 words.

- `story.mdx`: 1,424 words (`wc -w`), 1,214 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `BURN THIS SHEET NOW`
- Files scanned: `PadBoard.tsx`, `PadControls.tsx`, `presets.ts`, `route.tsx`, `usePad.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The one-time pad |
| era | 6 | 1917 onwards |
| hook | 9 | A sheet of random letters, used once and burned, makes the only cipher that can never be broken. |
| firstStep | 10 | Tear off a new sheet. Watch the ciphertext change. |
| source | 11 | The Code Book (full edition), chapter 3 |

Component strings (36 UI, 9 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `PadBoard.tsx:15` | UI | visprop:label | Message |
| `PadBoard.tsx:16` | UI | visprop:label | Ciphertext |
| `PadBoard.tsx:24` | UI | visprop:label | Pad |
| `PadBoard.tsx:25` | UI | visprop:label | Pad |
| `PadBoard.tsx:43` | UI | visattr:aria-label | The top sheet of the pad |
| `PadBoard.tsx:60` | UI | jsxtext | Tap under a letter to see its sum. Each letter has its own pad letter. |
| `PadBoard.tsx:64` | UI | jsxtext | Count A as 0. |
| `PadBoard.tsx:64` | UI | jsxtext | ) plus pad |
| `PadBoard.tsx:64` | UI | jsxtext | ) is |
| `PadBoard.tsx:66` | UI | other:BinaryExpression | . That is past Z, so take away 26: ${sum.sum - 26} |
| `PadBoard.tsx:66` | UI | jsxtext | . The cipher letter is |
| `PadBoard.tsx:76` | UI | visattr:title | The same ciphertext, a different story |
| `PadBoard.tsx:79` | UI | visprop:label | Ciphertext |
| `PadBoard.tsx:80` | UI | visprop:label | Could be |
| `PadBoard.tsx:81` | UI | visprop:label | With pad |
| `PadBoard.tsx:85` | UI | jsxtext | This pad is just as likely as the real one. Nothing in the ciphertext says which message is true. |
| `PadBoard.tsx:97` | UI | visattr:title | A second message on the same sheet |
| `PadBoard.tsx:100` | UI | visprop:label | Message 2 |
| `PadBoard.tsx:101` | UI | visprop:label | Same pad |
| `PadBoard.tsx:102` | UI | visprop:label | Ciphertext 2 |
| `PadBoard.tsx:108` | UI | visprop:label | Ciphertext 2 |
| `PadBoard.tsx:109` | UI | visprop:label | Guessed pad |
| `PadBoard.tsx:110` | UI | visprop:label | Reads as |
| `PadBoard.tsx:116` | UI | jsxchild | Type a guess at message 1 in "Another message it could be". |
| `PadBoard.tsx:117` | UI | jsxchild | The guessed pad is tried on ciphertext 2. Real words mean the guess was right. A pad used twice lets a codebreaker check. |
| `PadControls.tsx:21` | UI | visattr:label | Pad (this sheet) |
| `PadControls.tsx:22` | UI | visattr:label | Ciphertext |
| `PadControls.tsx:22` | UI | visattr:label | Plaintext |
| `PadControls.tsx:26` | UI | visattr:label | Your message (up to ${SHEET_LENGTH} letters) |
| `PadControls.tsx:26` | UI | visattr:label | The ciphertext |
| `PadControls.tsx:31` | UI | visattr:label | I want to |
| `PadControls.tsx:35` | UI | visprop:label | Encipher |
| `PadControls.tsx:36` | UI | visprop:label | Decipher |
| `PadControls.tsx:40` | UI | jsxtext | Tear off the sheet |
| `PadControls.tsx:45` | UI | visattr:label | Another message it could be |
| `PadControls.tsx:50` | UI | visattr:label | A second message on the same sheet |
| `presets.ts:4` | DATA | var:BOOK_SHEET | PLMOEZQKJZLRTEAVCRCBY |
| `presets.ts:4` | DATA | var:BOOK_SHEET | WQXHNDUGKFSIOPBMJLT |
| `presets.ts:7` | DATA | dataprop:text | ATTACK THE VALLEY AT DAWN |
| `presets.ts:18` | DATA | prop:claim | DEFEND THE HILL AT SUNSET |
| `presets.ts:21` | DATA | prop:second | RETREAT TO THE RIVER NOW |
| `presets.ts:24` | DATA | prop:second | RETREAT TO THE RIVER NOW |
| `presets.ts:24` | DATA | prop:claim | ATTACK THE VALLEY |
| `presets.ts:29` | DATA | dataprop:text | RRAGFGSOHSLVOORJ |
| `presets.ts:30` | DATA | dataprop:pad | QXJTMZKWPLHRVBDNGYCFASEUIOKHWDPZLMTCRQBX |

### cipher-disc

Chapter 3, order 5. Load 1,133 words.

- `story.mdx`: 1,213 words (`wc -w`), 1,038 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `HOLD THE BRIDGE`
- Files scanned: `DiscBoard.tsx`, `DiscControls.tsx`, `layout.ts`, `presets.ts`, `route.tsx`, `useDisc.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The cipher disc |
| era | 6 | 1460s to 1860s |
| hook | 9 | Two copper rings on a pin: the first cipher machine, and the seed of every one that followed. |
| firstStep | 10 | Tap a letter on the inner ring to turn it. |
| source | 11 | The Code Book, chapter 3: The Mechanization of Secrecy |

Component strings (21 UI, 10 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `DiscBoard.tsx:29` | UI | jsxtext | The inner |
| `DiscBoard.tsx:29` | UI | jsxtext | is beside the outer |
| `DiscBoard.tsx:29` | DATA | jsxtext | A |
| `DiscBoard.tsx:33` | UI | jsxtext | For the last letter, outer |
| `DiscBoard.tsx:33` | UI | jsxtext | meets inner |
| `DiscBoard.tsx:40` | UI | visprop:label | Plain (outer) |
| `DiscBoard.tsx:41` | UI | visprop:label | Inner letter at A |
| `DiscBoard.tsx:42` | UI | visprop:label | Cipher (inner) |
| `DiscControls.tsx:16` | UI | visattr:label | Keyword |
| `DiscControls.tsx:23` | UI | visattr:label | Inner letter beside A |
| `DiscControls.tsx:23` | UI | visattr:label | Inner letter beside A at the start |
| `DiscControls.tsx:28` | UI | visattr:label | Ciphertext |
| `DiscControls.tsx:28` | UI | visattr:label | Plaintext |
| `DiscControls.tsx:32` | UI | visattr:label | Your message |
| `DiscControls.tsx:32` | UI | visattr:label | The ciphertext |
| `DiscControls.tsx:37` | UI | visattr:label | I want to |
| `DiscControls.tsx:41` | UI | visprop:label | Encipher |
| `DiscControls.tsx:42` | UI | visprop:label | Decipher |
| `DiscControls.tsx:48` | UI | visattr:label | While you type, the disc |
| `DiscControls.tsx:52` | UI | visprop:label | Stays still |
| `DiscControls.tsx:53` | UI | visprop:label | Steps |
| `DiscControls.tsx:54` | UI | visprop:label | Keyword |
| `presets.ts:6` | DATA | dataprop:keyword | LEON |
| `presets.ts:6` | DATA | dataprop:text | ALBERTI |
| `presets.ts:9` | DATA | dataprop:keyword | LEON |
| `presets.ts:12` | DATA | dataprop:keyword | LEON |
| `presets.ts:12` | DATA | dataprop:text | GOODBYE |
| `presets.ts:15` | DATA | dataprop:keyword | LEON |
| `presets.ts:15` | DATA | dataprop:text | BNWM VXAN LXYYNA |
| `presets.ts:18` | DATA | dataprop:keyword | LEON |
| `presets.ts:18` | DATA | dataprop:text | SAYR IXV TKCYCB |

### enigma

Chapter 3, order 6. Load 1,630 words.

- `story.mdx`: 1,643 words (`wc -w`), 1,416 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `NOTHING TO REPORT`
- Files scanned: `EnigmaControls.tsx`, `ToyScrambler.tsx`, `presets.ts`, `route.tsx`, `scene/EnigmaScene.tsx`, `scene/Keyboard.tsx`, `scene/Lampboard.tsx`, `scene/Plugboard.tsx`, `scene/Rotors.tsx`, `scene/layout.ts`, `useEnigma.ts`, `usePlugPicker.ts`, `useToyScrambler.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Enigma machine |
| era | 6 | 1918 to 1945 |
| hook | 9 | A typewriter that changes its cipher after every letter, and the people who broke it anyway. |
| firstStep | 10 | Press a key. Watch the lamps. |
| source | 11 | The Code Book, chapter 3: The Mechanization of Secrecy |

Component strings (50 UI, 13 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `EnigmaControls.tsx:9` | UI | var:SLOT_NAMES | Left |
| `EnigmaControls.tsx:9` | UI | var:SLOT_NAMES | Middle |
| `EnigmaControls.tsx:9` | UI | var:SLOT_NAMES | Right |
| `EnigmaControls.tsx:10` | UI? (review) | var:STAGES | key |
| `EnigmaControls.tsx:10` | UI? (review) | var:STAGES | plugboard |
| `EnigmaControls.tsx:10` | UI | var:STAGES | right rotor |
| `EnigmaControls.tsx:10` | UI | var:STAGES | middle rotor |
| `EnigmaControls.tsx:10` | UI | var:STAGES | left rotor |
| `EnigmaControls.tsx:10` | UI? (review) | var:STAGES | reflector |
| `EnigmaControls.tsx:10` | UI | var:STAGES | left rotor |
| `EnigmaControls.tsx:10` | UI | var:STAGES | middle rotor |
| `EnigmaControls.tsx:10` | UI | var:STAGES | right rotor |
| `EnigmaControls.tsx:10` | UI? (review) | var:STAGES | plugboard |
| `EnigmaControls.tsx:46` | UI | jsxtext | Rotor positions |
| `EnigmaControls.tsx:50` | UI | visattr:label | ${SLOT_NAMES[slot]} rotor |
| `EnigmaControls.tsx:58` | UI | jsxtext | You typed |
| `EnigmaControls.tsx:60` | UI | jsxtext | Lamps lit |
| `EnigmaControls.tsx:67` | UI | jsxtext | Type a message |
| `EnigmaControls.tsx:70` | UI | visattr:placeholder | Type here, or tap the keys |
| `EnigmaControls.tsx:79` | UI | jsxtext | Back to start |
| `EnigmaControls.tsx:84` | UI | jsxtext | Path of the current: |
| `EnigmaControls.tsx:91` | UI | jsxchild | press a key to see it |
| `EnigmaControls.tsx:95` | UI | jsxtext | Set up the machine |
| `EnigmaControls.tsx:97` | UI | jsxtext | Rotor order |
| `EnigmaControls.tsx:109` | UI | jsxtext | Ring setting of each rotor |
| `EnigmaControls.tsx:111` | UI | jsxtext | Turns a rotor's letters around its wiring. Changing it starts a new message. |
| `EnigmaControls.tsx:125` | UI | jsxtext | Plugboard: |
| `EnigmaControls.tsx:125` | UI | jsxtext | of |
| `EnigmaControls.tsx:125` | UI | jsxtext | cables |
| `EnigmaControls.tsx:127` | UI | jsxtext | Pick two letters to join them. Pick a joined letter to pull its cable out. |
| `EnigmaControls.tsx:138` | UI | visattr:aria-label | Socket ${letter} |
| `EnigmaControls.tsx:138` | UI | visattr:aria-label | Socket ${letter}, joined to ${partner} |
| `EnigmaControls.tsx:158` | UI | jsxtext | The book's six-letter model |
| `EnigmaControls.tsx:168` | UI | visattr:aria-label | ${label}: next letter |
| `EnigmaControls.tsx:171` | UI | visattr:aria-label | ${label} shows |
| `EnigmaControls.tsx:172` | UI | visattr:aria-label | ${label}: previous letter |
| `EnigmaControls.tsx:197` | UI | visattr:aria-label | Ring, ${props.label.toLowerCase()} rotor |
| `ToyScrambler.tsx:30` | UI | jsxtext | The book explains Enigma with six letters and one scrambler. Each key has a wire through the scrambler to one lamp. |
| `ToyScrambler.tsx:48` | UI | visattr:aria-label | Keys of the six-letter model |
| `ToyScrambler.tsx:50` | UI | visattr:aria-label | Press ${key} |
| `ToyScrambler.tsx:57` | UI | jsxtext | You typed |
| `ToyScrambler.tsx:59` | UI | jsxtext | Lamps lit |
| `ToyScrambler.tsx:69` | UI | jsxtext | The scrambler turns after each letter (starts again) |
| `ToyScrambler.tsx:73` | UI | jsxtext | Start again |
| `ToyScrambler.tsx:81` | UI | return | Press a key to follow its wire. |
| `ToyScrambler.tsx:82` | UI | var:lit | ${last.key} lit ${last.output}. |
| `ToyScrambler.tsx:83` | UI | return | ${lit} The scrambler stays still, so ${last.key} always lights ${last.output}. |
| `ToyScrambler.tsx:84` | UI | return | ${lit} Then the scrambler turned one place, so every wire sits one row lower for the next letter. |
| `ToyScrambler.tsx:90` | UI | other:ArrowFunction | ${key} to ${alphabet[row]} |
| `ToyScrambler.tsx:93` | UI | visattr:aria-label | Wiring: ${label} |
| `presets.ts:11` | DATA | dataprop:rotors | II |
| `presets.ts:11` | DATA | dataprop:rotors | III |
| `presets.ts:11` | DATA | dataprop:rotors | I |
| `presets.ts:13` | DATA | dataprop:reflector | B |
| `presets.ts:14` | DATA | prop:cables | AL |
| `presets.ts:14` | DATA | prop:cables | PR |
| `presets.ts:14` | DATA | prop:cables | TD |
| `presets.ts:14` | DATA | prop:cables | BW |
| `presets.ts:14` | DATA | prop:cables | KF |
| `presets.ts:14` | DATA | prop:cables | OY |
| `scene/layout.ts:7` | DATA | var:ROWS | QWERTZUIO |
| `scene/layout.ts:7` | DATA | var:ROWS | ASDFGHJK |
| `scene/layout.ts:7` | DATA | var:ROWS | PYXCVBNML |

### cracking-enigma

Chapter 3, order 7. Load 1,926 words.

- `story.mdx`: 1,897 words (`wc -w`), 1,622 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `JMP`
- Files scanned: `ChainsBoard.tsx`, `CrackBoard.tsx`, `CrackControls.tsx`, `CribBoard.tsx`, `presets.ts`, `route.tsx`, `useCrack.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Cracking Enigma |
| era | 6 | 1931 to 1945 |
| hook | 9 | Ten thousand trillion keys, a new one every midnight, and two tricks that made the number not matter. |
| firstStep | 10 | Pull out a plugboard cable. Watch the chain lengths. |
| source | 11 | The Code Book, chapter 3: The Mechanization of Secrecy |

Component strings (50 UI, 13 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `ChainsBoard.tsx:9` | UI? (review) | var:PLACES | 1st |
| `ChainsBoard.tsx:9` | UI? (review) | var:PLACES | 2nd |
| `ChainsBoard.tsx:9` | UI? (review) | var:PLACES | 3rd |
| `ChainsBoard.tsx:9` | UI? (review) | var:PLACES | 4th |
| `ChainsBoard.tsx:9` | UI? (review) | var:PLACES | 5th |
| `ChainsBoard.tsx:9` | UI? (review) | var:PLACES | 6th |
| `ChainsBoard.tsx:20` | UI | visattr:aria-label | The first six letters of today's messages |
| `ChainsBoard.tsx:30` | UI | visprop:label | ${PLACES[pair]} letter |
| `ChainsBoard.tsx:31` | UI | visprop:label | ${PLACES[pair + 3]} letter |
| `ChainsBoard.tsx:36` | UI | visattr:aria-label | Chains |
| `ChainsBoard.tsx:40` | UI | jsxchild | ${chain.length} links |
| `ChainsBoard.tsx:46` | UI | jsxchild | This is the finished table printed in the book. The book does not give the day key behind it. Turn a |
| `ChainsBoard.tsx:47` | UI | jsxchild | rotor or pull a cable to go back to today's messages. |
| `ChainsBoard.tsx:48` | UI | jsxchild | Each chain goes from a top letter to the one below it, then on from there, until it comes home. Pull a |
| `ChainsBoard.tsx:49` | UI | jsxchild | cable and the letters change but the lengths stay. Turn a rotor and the lengths change. |
| `CrackControls.tsx:14` | UI | var:ROTOR_LABELS | Left rotor |
| `CrackControls.tsx:14` | UI | var:ROTOR_LABELS | Middle rotor |
| `CrackControls.tsx:14` | UI | var:ROTOR_LABELS | Right rotor |
| `CrackControls.tsx:23` | UI | visattr:label | Attack |
| `CrackControls.tsx:27` | UI | visprop:label | Rejewski's chains |
| `CrackControls.tsx:28` | UI | visprop:label | Turing's crib |
| `CrackControls.tsx:32` | UI | visattr:label | Chain lengths in the book's table |
| `CrackControls.tsx:32` | UI | visattr:label | Chain lengths today |
| `CrackControls.tsx:36` | UI | visattr:label | Message |
| `CrackControls.tsx:46` | UI | return | The book's example: nothing to search |
| `CrackControls.tsx:47` | UI | return | Not tested yet |
| `CrackControls.tsx:48` | UI | return | No rotor setting fits here |
| `CrackControls.tsx:66` | UI | visattr:aria-label | Plugboard cables |
| `CrackControls.tsx:67` | UI | jsxtext | Plugboard cables (press to pull out or put back) |
| `CrackControls.tsx:82` | UI | visattr:label | Compare letters |
| `CrackControls.tsx:101` | UI | visattr:label | Crib starts at letter |
| `CrackControls.tsx:103` | UI | visattr:label | Crib (your guess) |
| `CrackControls.tsx:109` | UI | jsxtext | Test |
| `CrackControls.tsx:109` | UI | jsxtext | rotor settings |
| `CribBoard.tsx:21` | UI | visattr:label | The crib under the ciphertext |
| `CribBoard.tsx:23` | UI | attr:rowHeads | Ciphertext |
| `CribBoard.tsx:23` | UI | attr:rowHeads | Crib |
| `CribBoard.tsx:23` | UI | attr:rowHeads | Message |
| `CribBoard.tsx:23` | UI | attr:rowHeads | Ciphertext |
| `CribBoard.tsx:23` | UI | attr:rowHeads | Crib |
| `CribBoard.tsx:27` | UI? (review) | return | cipher |
| `CribBoard.tsx:33` | UI | jsxtext | sits under |
| `CribBoard.tsx:33` | UI | jsxtext | . Enigma never turns a letter into itself, so the crib cannot be here. Slide it along. |
| `CribBoard.tsx:38` | UI | jsxtext | No letter sits under itself, so the crib could be here. The book stops at this point. Its ciphertext is a made-up example, not real Enigma output, so there is no rotor setting to find. |
| `CribBoard.tsx:42` | UI | jsxtext | No letter sits under itself. The crib could be here. Test the rotor settings to find out. |
| `CribBoard.tsx:45` | UI | jsxtext | rotor settings tested. With |
| `CribBoard.tsx:45` | UI | jsxtext | in the windows, the machine turns these letters into |
| `CribBoard.tsx:46` | UI | jsxtext | . Read the whole message in the bottom row. |
| `CribBoard.tsx:51` | UI | jsxtext | rotor settings tested. Not one turns these letters into |
| `CribBoard.tsx:51` | UI | jsxtext | . The crib is in the wrong place. Slide it along. |
| `presets.ts:10` | DATA | dataprop:ciphertext | XSTVTDTKVPHHBEEQBTUXXWXUDWATOBJTD |
| `presets.ts:11` | DATA | dataprop:crib | WETTER |
| `presets.ts:33` | DATA | dataprop:ciphertext | DMTTITMTWYQADJCXFRNLZDFXDWEP |
| `useCrack.ts:17` | DATA | var:DAY_CABLES | AL |
| `useCrack.ts:17` | DATA | var:DAY_CABLES | PR |
| `useCrack.ts:17` | DATA | var:DAY_CABLES | TD |
| `useCrack.ts:17` | DATA | var:DAY_CABLES | BW |
| `useCrack.ts:17` | DATA | var:DAY_CABLES | KF |
| `useCrack.ts:17` | DATA | var:DAY_CABLES | OY |
| `useCrack.ts:20` | DATA | dataprop:rotors | II |
| `useCrack.ts:20` | DATA | dataprop:rotors | III |
| `useCrack.ts:20` | DATA | dataprop:rotors | I |
| `useCrack.ts:20` | DATA | dataprop:reflector | B |

### purple

Chapter 4, order 0. Load 1,503 words.

- `story.mdx`: 1,585 words (`wc -w`), 1,306 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `MAGIC`
- Files scanned: `Counts.tsx`, `Path.tsx`, `Plugboard.tsx`, `PurpleBoard.tsx`, `PurpleControls.tsx`, `Strip.tsx`, `Switches.tsx`, `layout.ts`, `presets.ts`, `route.tsx`, `usePurple.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Purple, the machine with no rotors |
| era | 6 | 1939 to 1945 |
| hook | 9 | Japan's best cipher machine was rebuilt by Americans who never saw it, from telephone switches. |
| firstStep | 10 | Tap a letter of the message to follow it through the switches. |
| source | 11 | The Code Book, chapter 4: The Language Barrier |

Component strings (49 UI, 7 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `Counts.tsx:7` | DATA | var:ALPHABET | ABCDEFGHIJKLMNOPQRSTUVWXYZ |
| `Counts.tsx:22` | UI | visattr:label | Letter counts in the ciphertext |
| `Counts.tsx:27` | UI | jsxtext | The sixes |
| `Counts.tsx:27` | UI | jsxtext | appear |
| `Counts.tsx:27` | UI | jsxtext | times each on average. The twenties appear |
| `Counts.tsx:28` | UI | jsxtext | times each. |
| `Counts.tsx:31` | UI | jsxchild | How often each letter appears in the ciphertext. Which six stand apart? Pick “Sixes first” to check. |
| `Path.tsx:8` | UI | other:ArrowFunction | ${hop.switch === 0 ? "The sixes switch" : `Switch ${SWITCH_NAMES[hop.switch]}`} at ${hop.position + 1} joins contact ${hop.from} to contact ${hop.to} |
| `Path.tsx:8` | UI | intemplate | The sixes switch |
| `Path.tsx:8` | UI | intemplate | Switch ${SWITCH_NAMES[hop.switch]} |
| `Path.tsx:13` | UI | jsxtext | This letter was lost on the radio. The switches step past it and keep their place. |
| `Path.tsx:20` | UI | visprop:label | In |
| `Path.tsx:21` | UI | visprop:label | Out |
| `Path.tsx:26` | UI | jsxtext | is one of the |
| `Path.tsx:26` | UI | jsxtext | . Out comes |
| `Path.tsx:27` | UI | jsxtext | . The table shows this moment's shuffle of all the |
| `Plugboard.tsx:23` | UI | visattr:aria-label | Plugboard |
| `PurpleBoard.tsx:34` | UI | jsxtext | Type a message below to send it through the switches. |
| `PurpleControls.tsx:12` | UI | visprop:label | Vowels as sixes |
| `PurpleControls.tsx:26` | UI | visattr:label | Switches start at (sixes, I, II, III) |
| `PurpleControls.tsx:27` | UI | visattr:label | Ciphertext |
| `PurpleControls.tsx:27` | UI | visattr:label | Plaintext |
| `PurpleControls.tsx:29` | UI | other:BinaryExpression | … ${result.length} letters |
| `PurpleControls.tsx:34` | UI | visattr:label | Your message |
| `PurpleControls.tsx:34` | UI | visattr:label | The ciphertext |
| `PurpleControls.tsx:39` | UI | visattr:label | I want to |
| `PurpleControls.tsx:43` | UI | visprop:label | Encipher |
| `PurpleControls.tsx:44` | UI | visprop:label | Decipher |
| `PurpleControls.tsx:50` | UI | visattr:label | Letter shown |
| `PurpleControls.tsx:57` | UI | visattr:label | Sixes switch |
| `PurpleControls.tsx:57` | UI | visattr:label | Switch ${SWITCH_NAMES[index]} (${speedOf(index, state.motion)}) |
| `PurpleControls.tsx:65` | UI | visattr:label | Fast, medium, slow |
| `PurpleControls.tsx:70` | UI | visattr:label | Plugboard |
| `PurpleControls.tsx:78` | UI | jsxtext | Feed the output back in |
| `PurpleControls.tsx:83` | UI | visattr:label | Show |
| `PurpleControls.tsx:87` | UI | visprop:label | The machine |
| `PurpleControls.tsx:88` | UI | visprop:label | Letter counts |
| `PurpleControls.tsx:93` | UI | visattr:label | Order of the bars |
| `PurpleControls.tsx:97` | UI | visprop:label | A to Z |
| `PurpleControls.tsx:98` | UI | visprop:label | Sixes first |
| `PurpleControls.tsx:105` | UI | jsxtext | Read the whole output |
| `Strip.tsx:12` | UI | jsxtext | Letters |
| `Strip.tsx:12` | UI | jsxtext | to |
| `Strip.tsx:12` | UI | jsxtext | of |
| `Strip.tsx:12` | UI | jsxtext | : in above, out below |
| `Strip.tsx:21` | UI | visattr:aria-label | Letter ${first + offset + 1}: ${step.input} becomes ${step.output}, ${step.group} |
| `Switches.tsx:16` | UI | jsxchild | steps next |
| `Switches.tsx:16` | UI | jsxchild | stays |
| `Switches.tsx:24` | UI | visattr:aria-label | Stepping switches |
| `layout.ts:5` | UI | var:SWITCH_NAMES | Sixes |
| `layout.ts:5` | DATA | var:SWITCH_NAMES | II |
| `layout.ts:5` | DATA | var:SWITCH_NAMES | III |
| `presets.ts:11` | DATA | dataprop:text | THE GOVERNMENT OF JAPAN |
| `presets.ts:27` | DATA | dataprop:text | AEIOUY AEIOUY AEIOUY |
| `presets.ts:33` | DATA | dataprop:text | PEACE |
| `presets.ts:45` | DATA | dataprop:text | LUDOT |

### navajo

Chapter 4, order 1. Load 1,381 words.

- `story.mdx`: 1,445 words (`wc -w`), 1,258 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `BATTLESHIP AT DAWN`
- Files scanned: `NavajoBoard.tsx`, `NavajoControls.tsx`, `presets.ts`, `route.tsx`, `useNavajo.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Navajo code talkers |
| era | 6 | 1942 to 1945 |
| hook | 9 | Navajo marines turned their own language into a code that was fast, spoken aloud and never broken. |
| firstStep | 10 | Tap a Navajo word to see what it stands for. |
| source | 11 | The Code Book, chapter 4: The Language Barrier |

Component strings (18 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `NavajoBoard.tsx:11` | UI | var:why | The lexicon gives this picture to a military term. |
| `NavajoBoard.tsx:13` | UI | var:why | The alphabet uses a cross for the letter X. |
| `NavajoBoard.tsx:14` | UI | var:why | "${word.meaning}" starts with ${word.stands}, so it spells that letter. |
| `NavajoBoard.tsx:19` | UI | jsxtext | Spoken |
| `NavajoBoard.tsx:23` | UI | jsxtext | Means |
| `NavajoBoard.tsx:27` | UI | jsxtext | Stands for |
| `NavajoBoard.tsx:45` | UI | visattr:aria-label | The message in code |
| `NavajoBoard.tsx:76` | UI | jsxchild | Type a message below to hear it in code. |
| `NavajoBoard.tsx:77` | UI | jsxchild | Each box is one spoken word. Tap one to follow it from Navajo to English. |
| `NavajoControls.tsx:16` | UI | visattr:label | I want to |
| `NavajoControls.tsx:20` | UI | visprop:label | Send |
| `NavajoControls.tsx:21` | UI | visprop:label | Listen |
| `NavajoControls.tsx:24` | UI | visattr:label | Spoken in code |
| `NavajoControls.tsx:24` | UI | visattr:label | Decoded so far |
| `NavajoControls.tsx:28` | UI | visattr:label | Your message |
| `NavajoControls.tsx:32` | UI | jsxtext | Open every word |
| `NavajoControls.tsx:33` | UI | jsxtext | Hide them again |
| `NavajoControls.tsx:37` | UI | jsxtext | Terms this page has a code word for |
| `presets.ts:6` | DATA | dataprop:text | SUBMARINE NEAR SAIPAN |
| `presets.ts:9` | DATA | dataprop:text | FIGHTER PLANE, BOMBER, BATTLESHIP, DESTROYER |
| `presets.ts:12` | DATA | dataprop:text | PACIFIC |
| `presets.ts:15` | DATA | dataprop:text | PACIFIC |
| `presets.ts:21` | DATA | dataprop:text | BATTLESHIP AT DAWN |

### hieroglyphs

Chapter 4, order 2. Load 1,494 words.

- `story.mdx`: 1,573 words (`wc -w`), 1,367 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `ALEXANDER`
- Files scanned: `Glyph.tsx`, `HieroglyphsBoard.tsx`, `HieroglyphsControls.tsx`, `presets.ts`, `route.tsx`, `useHieroglyphs.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Reading the hieroglyphs |
| era | 6 | 1799 to 1824 |
| hook | 9 | Nobody had read a hieroglyph for fourteen centuries, until two scholars treated royal names as a code. |
| firstStep | 10 | Tap a sign in a ring, then pick its sound below. |
| source | 11 | The Code Book, chapter 4: The Language Barrier |

Component strings (20 UI, 0 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `HieroglyphsBoard.tsx:18` | UI | return | The Greek text says: ${cartouche.name} |
| `HieroglyphsBoard.tsx:19` | UI | return | You read it: ${cartouche.name} |
| `HieroglyphsBoard.tsx:19` | UI | return | No translation. Whose name is it? |
| `HieroglyphsBoard.tsx:31` | UI | visattr:aria-label | Cartouche: ${heading(cartouche, false)} |
| `HieroglyphsBoard.tsx:41` | UI | visattr:aria-label | no sound yet |
| `HieroglyphsBoard.tsx:71` | UI | jsxtext | The |
| `HieroglyphsBoard.tsx:71` | UI | jsxtext | is lit wherever it appears. |
| `HieroglyphsBoard.tsx:74` | UI | jsxtext | You say it sounds like |
| `HieroglyphsBoard.tsx:77` | UI | jsxchild | Pick a sound for it below. |
| `HieroglyphsBoard.tsx:81` | UI | jsxchild | Top row of each ring: the name in Greek letters. Bottom row: your sounds. Tap a sign to start. |
| `HieroglyphsControls.tsx:18` | UI | visattr:label | Mystery name |
| `HieroglyphsControls.tsx:22` | UI | visprop:label | Abu Simbel |
| `HieroglyphsControls.tsx:23` | UI | visprop:label | Another |
| `HieroglyphsControls.tsx:26` | UI | visattr:label | The mystery name reads |
| `HieroglyphsControls.tsx:28` | UI | visattr:aria-label | Sound of the chosen sign |
| `HieroglyphsControls.tsx:30` | UI | jsxchild | Sound of the ${SIGNS[sign].name} |
| `HieroglyphsControls.tsx:30` | UI | jsxchild | Tap a sign above, then pick its sound |
| `HieroglyphsControls.tsx:45` | UI | jsxtext | Clear |
| `HieroglyphsControls.tsx:50` | UI | jsxtext | Read Ptolemy and Cleopatra for me |
| `HieroglyphsControls.tsx:51` | UI | jsxtext | Forget every sound |

### linear-b

Chapter 4, order 3, full edition only. Load 1,610 words.

- `story.mdx`: 1,488 words (`wc -w`), 1,304 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `TRIPOD`
- Files scanned: `Glyph.tsx`, `LinearBBoard.tsx`, `LinearBControls.tsx`, `SignGrid.tsx`, `labels.ts`, `presets.ts`, `route.tsx`, `useLinearB.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The riddle of Linear B |
| era | 6 | 1900 to 1953 |
| hook | 9 | An unknown script in an unknown language, with no translation: an architect read it anyway. |
| firstStep | 10 | Tap each sign that all three words share. |
| source | 11 | The Code Book (full edition) |

Component strings (35 UI, 2 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `LinearBBoard.tsx:54` | UI | return | Your guess: ${NAMES[guess].label}. It does not fit. |
| `LinearBBoard.tsx:55` | UI | return | You read it: ${WORDS[id].meaning} |
| `LinearBBoard.tsx:56` | UI | return | From a tablet found at Pylos |
| `LinearBBoard.tsx:56` | UI | return | No translation. Which place is it? |
| `LinearBBoard.tsx:72` | UI | visattr:aria-label | Word that reads ${readWord(word, values)} |
| `LinearBBoard.tsx:84` | UI | visattr:label | picture of a pot on three legs |
| `LinearBBoard.tsx:98` | UI | return | Right. All three words start with these two signs, then split. The two signs that follow are ringed. Kober reasoned that they share a consonant, so the grid puts them in one row. |
| `LinearBBoard.tsx:101` | UI | return | One sign you marked is missing from a word. Tap it again to unmark it. |
| `LinearBBoard.tsx:102` | UI | return | Three words from the Knossos tablets. Tap each sign that appears in all three. |
| `LinearBBoard.tsx:105` | UI | return | ${clashText(clash)} Pick another name. |
| `LinearBBoard.tsx:107` | UI | return | The first word of the tripod tablet, read with the sounds from your place names. The drawing and the number 2 are the scribe's own. |
| `LinearBBoard.tsx:108` | UI | return | Tap a word, then pick a place below. A right guess fills a whole row and column of the grid. |
| `LinearBBoard.tsx:136` | UI | jsxtext | The grid: signs in one row share a consonant, signs in one column share a vowel. Which consonant and which vowel, nobody knew. The signs are simplified drawings. |
| `LinearBControls.tsx:10` | UI | return | Tap signs on the board to mark the ones all three words share |
| `LinearBControls.tsx:11` | UI | return | What does the chosen word say? |
| `LinearBControls.tsx:11` | UI | return | Tap a word above, then pick what it says |
| `LinearBControls.tsx:23` | UI | visattr:label | On the board |
| `LinearBControls.tsx:27` | UI | visprop:label | Kober's words |
| `LinearBControls.tsx:28` | UI | visprop:label | Place names |
| `LinearBControls.tsx:29` | UI | visprop:label | Tripod tablet |
| `LinearBControls.tsx:32` | UI | visattr:label | The words read |
| `LinearBControls.tsx:34` | UI | visattr:aria-label | Name for the chosen word |
| `LinearBControls.tsx:51` | UI | jsxtext | Clear |
| `LinearBControls.tsx:57` | UI | jsxtext | Name the three places for me |
| `LinearBControls.tsx:58` | UI | jsxtext | Forget every guess and mark |
| `SignGrid.tsx:40` | UI | visattr:aria-label | Grid of signs: rows share a consonant, columns share a vowel |
| `labels.ts:6` | UI | return | sign ${reading} |
| `labels.ts:6` | UI | return | sign ${SIGNS[sign].number}, sound ${reading} |
| `labels.ts:11` | DATA | intemplate | C |
| `labels.ts:11` | DATA | intemplate | V |
| `labels.ts:29` | UI | return | That name has ${clash.syllables} syllables, but the word has ${clash.signs} signs. |
| `labels.ts:32` | UI? (review) | var:part | consonant |
| `labels.ts:32` | UI? (review) | var:part | vowel |
| `labels.ts:35` | UI | return | Signs in one ${line} share a ${part}. This name gives ${line} ${lineName(line, clash.index)} two: ${sounds}. |
| `labels.ts:38` | UI | var:names | ${lineName(line, first)} and ${lineName(line, second)} |
| `labels.ts:39` | UI | return | This name gives ${line}s ${names} the same ${part}, ${clash.sound \|\| "none"}. Two ${line}s cannot share one. |
| `labels.ts:39` | UI | intemplate | none |

### lorenz

Chapter 5, order 1. Load 1,308 words.

- `story.mdx`: 1,392 words (`wc -w`), 1,189 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `COLOSSUS`
- Files scanned: `Adding.tsx`, `LorenzBoard.tsx`, `LorenzControls.tsx`, `Tape.tsx`, `presets.ts`, `route.tsx`, `useLorenz.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Colossus and the Lorenz cipher |
| era | 6 | 1941 to 1945 |
| hook | 9 | Hitler's own cipher machine was beaten by a machine built in secret: the first programmable computer. |
| firstStep | 10 | Tap a letter on the tape to see its holes added to the key. |
| source | 11 | The Code Book, chapter 5: Alice and Bob Go Public |

Component strings (20 UI, 3 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `Adding.tsx:25` | UI | jsxtext | Adding the key to |
| `Adding.tsx:25` | UI | jsxtext | . Alike gives 0, different gives 1. |
| `Adding.tsx:29` | UI | jsxtext | Wheel, pin in use |
| `Adding.tsx:30` | UI | jsxtext | Tape |
| `Adding.tsx:31` | UI | jsxtext | + Key |
| `Adding.tsx:32` | UI | jsxtext | = Out |
| `Adding.tsx:39` | UI | jsxtext | of |
| `Adding.tsx:47` | UI | jsxtext | As a character |
| `LorenzBoard.tsx:15` | UI | visattr:label | Input tape |
| `LorenzBoard.tsx:17` | UI | visattr:label | Output tape |
| `LorenzBoard.tsx:20` | UI | jsxchild | A simplified model: five wheels that all step once per character, with invented pins. The real machine had twelve wheels. |
| `LorenzBoard.tsx:21` | UI | jsxchild | Type a message below to punch a tape. |
| `LorenzControls.tsx:14` | UI | visattr:label | Wheels start at |
| `LorenzControls.tsx:15` | UI | visattr:label | Output tape (9 is a space) |
| `LorenzControls.tsx:18` | UI | visattr:label | Input tape |
| `LorenzControls.tsx:20` | UI | visattr:label | Letter shown |
| `LorenzControls.tsx:29` | UI | visattr:label | Wheel ${wheel + 1} |
| `LorenzControls.tsx:37` | UI | jsxtext | Feed the output back in |
| `LorenzControls.tsx:39` | UI | jsxtext | All wheels to 1 |
| `Tape.tsx:23` | UI | visattr:aria-label | ${props.label}, character ${at + 1}: ${symbol}, holes ${ITA2[symbol]} |
| `presets.ts:6` | DATA | dataprop:text | ATTACK AT DAWN |
| `presets.ts:9` | DATA | dataprop:text | A |
| `presets.ts:15` | DATA | dataprop:text | HWOOI8W3 |

### binary

Chapter 5, order 2. Load 1,017 words.

- `story.mdx`: 1,044 words (`wc -w`), 904 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `ALICE`
- Files scanned: `BinaryBoard.tsx`, `BinaryControls.tsx`, `presets.ts`, `route.tsx`, `useBinary.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Ciphers for computers |
| era | 6 | 1950s to 1970s |
| hook | 9 | A computer cannot scramble letters. It turns them into ones and zeros, and scrambles those. |
| firstStep | 10 | Tap a digit of the key to flip it. |
| source | 11 | The Code Book, chapter 5: Alice and Bob Go Public |

Component strings (15 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `BinaryBoard.tsx:26` | UI | visattr:aria-label | Key digit ${bit}. Flip it |
| `BinaryBoard.tsx:57` | UI | visattr:aria-label | The sum, one block per character |
| `BinaryBoard.tsx:70` | UI | jsxchild | Type below to fill the board. |
| `BinaryBoard.tsx:71` | UI | jsxchild | Each block is one character. Top row: the ${enciphering ? "message" : "ciphertext"}. Middle row: the key. Bottom row: their sum, where a digit is 1 only if the two above it differ. A dot is a number with no printable character. |
| `BinaryBoard.tsx:71` | UI | jsxchild | message |
| `BinaryBoard.tsx:71` | UI | jsxchild | ciphertext |
| `BinaryControls.tsx:14` | UI | visattr:label | I want to |
| `BinaryControls.tsx:18` | UI | visprop:label | Encipher |
| `BinaryControls.tsx:19` | UI | visprop:label | Decipher |
| `BinaryControls.tsx:22` | UI | visattr:label | Ciphertext |
| `BinaryControls.tsx:22` | UI | visattr:label | Plaintext |
| `BinaryControls.tsx:26` | UI | visattr:label | Your message |
| `BinaryControls.tsx:26` | UI | visattr:label | The ciphertext, in ones and zeros |
| `BinaryControls.tsx:31` | UI | visattr:label | Key |
| `BinaryControls.tsx:39` | UI | jsxtext | Undo my flipped digits |
| `presets.ts:6` | DATA | dataprop:text | HELLO |
| `presets.ts:6` | DATA | dataprop:key | DAVID |
| `presets.ts:9` | DATA | dataprop:text | A |
| `presets.ts:12` | DATA | dataprop:key | DAVID |
| `presets.ts:15` | DATA | dataprop:key | HELLO |

### lucifer

Chapter 5, order 3, full edition only. Load 1,493 words.

- `story.mdx`: 1,483 words (`wc -w`), 1,273 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `OK`
- Files scanned: `LuciferBoard.tsx`, `LuciferControls.tsx`, `presets.ts`, `route.tsx`, `useLucifer.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Lucifer and DES |
| era | 6 | 1970s |
| hook | 9 | IBM's Lucifer kneaded messages like dough, sixteen times over, and became America's standard cipher. |
| firstStep | 10 | Tap a bit in the top row to flip it. |
| source | 11 | The Code Book (full edition), chapter 6: Alice and Bob Go Public |

Component strings (39 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `LuciferBoard.tsx:38` | UI | visattr:aria-label | The two halves after every round |
| `LuciferBoard.tsx:41` | UI | jsxtext | Round |
| `LuciferBoard.tsx:42` | UI | jsxtext | Round key |
| `LuciferBoard.tsx:44` | UI | jsxtext | Left half |
| `LuciferBoard.tsx:47` | UI | jsxtext | Right half |
| `LuciferBoard.tsx:49` | UI | jsxtext | Changed |
| `LuciferBoard.tsx:55` | UI | jsxchild | Start |
| `LuciferBoard.tsx:62` | UI | visattr:aria-label | Flip bit ${at + 1} |
| `LuciferBoard.tsx:81` | UI | jsxchild | Bit ${state.flipped! + 1} of the top row is flipped. Bright bits differ from the run without the flip. Tap the bit again to put it back. |
| `LuciferBoard.tsx:82` | UI | jsxchild | Tap a bit in the top row to flip it, and see how far the change spreads. |
| `LuciferBoard.tsx:83` | UI | jsxtext | This is a toy with 16-bit blocks and an 8-bit key. Real DES uses 64-bit blocks and a 56-bit key. |
| `LuciferBoard.tsx:99` | UI | jsxtext | Step |
| `LuciferBoard.tsx:99` | UI | jsxtext | , undoing a round: scramble the left half |
| `LuciferBoard.tsx:99` | UI | jsxtext | with round key |
| `LuciferBoard.tsx:100` | UI | jsxtext | to get |
| `LuciferBoard.tsx:100` | UI | jsxtext | . Add that to the right half |
| `LuciferBoard.tsx:100` | UI | jsxtext | and the older left half comes back: |
| `LuciferBoard.tsx:101` | UI | jsxtext | . The left half moves back to the right. |
| `LuciferBoard.tsx:107` | UI | jsxtext | Round |
| `LuciferBoard.tsx:107` | UI | jsxtext | : scramble the right half |
| `LuciferBoard.tsx:107` | UI | jsxtext | with round key |
| `LuciferBoard.tsx:107` | UI | jsxtext | to get |
| `LuciferBoard.tsx:108` | UI | jsxtext | . Add that to the left half |
| `LuciferBoard.tsx:108` | UI | jsxtext | to make the new right half |
| `LuciferBoard.tsx:109` | UI | jsxtext | . The old right half moves across to the left. |
| `LuciferControls.tsx:24` | UI | visattr:label | Rounds |
| `LuciferControls.tsx:25` | UI | visattr:label | Ciphertext, in hex |
| `LuciferControls.tsx:25` | UI | visattr:label | Plaintext |
| `LuciferControls.tsx:27` | UI | visattr:label | Bits changed by the flip |
| `LuciferControls.tsx:28` | UI | jsxtext | of |
| `LuciferControls.tsx:34` | UI | visattr:label | Two letters |
| `LuciferControls.tsx:34` | UI | visattr:label | Ciphertext: four hex digits |
| `LuciferControls.tsx:40` | UI | visattr:label | Key letter |
| `LuciferControls.tsx:46` | UI | visattr:label | I want to |
| `LuciferControls.tsx:50` | UI | visprop:label | Encipher |
| `LuciferControls.tsx:51` | UI | visprop:label | Decipher |
| `LuciferControls.tsx:56` | UI | visattr:label | Explain round |
| `LuciferControls.tsx:58` | UI | jsxtext | Put the flipped bit back |
| `LuciferControls.tsx:63` | UI | jsxtext | Try every key letter, A to Z |
| `presets.ts:6` | DATA | dataprop:text | HI |
| `presets.ts:9` | DATA | dataprop:text | HI |
| `presets.ts:12` | DATA | dataprop:text | HI |
| `presets.ts:15` | DATA | dataprop:text | 0A68 |
| `presets.ts:18` | DATA | dataprop:text | 4FD3 |

### key-exchange

Chapter 5, order 4. Load 1,379 words.

- `story.mdx`: 1,450 words (`wc -w`), 1,177 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `DAWN`
- Files scanned: `KeyExchangeBoard.tsx`, `KeyExchangeControls.tsx`, `presets.ts`, `route.tsx`, `useKeyExchange.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The key exchange |
| era | 6 | 1976 |
| hook | 9 | Two strangers agree on a secret key while an eavesdropper hears every word they say. |
| firstStep | 10 | Press “Next step” and follow the numbers across. |
| source | 11 | The Code Book, chapter 5: Alice and Bob Go Public |

Component strings (35 UI, 5 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `KeyExchangeBoard.tsx:27` | UI | jsxtext | Alice |
| `KeyExchangeBoard.tsx:28` | UI | jsxtext | In public: Eve sees this |
| `KeyExchangeBoard.tsx:29` | UI | jsxtext | Bob |
| `KeyExchangeBoard.tsx:34` | UI | jsxtext | 1. Agree |
| `KeyExchangeBoard.tsx:37` | DATA | jsxtext | Y = |
| `KeyExchangeBoard.tsx:37` | DATA | jsxtext | , P = |
| `KeyExchangeBoard.tsx:39` | UI | jsxtext | The function is |
| `KeyExchangeBoard.tsx:40` | UI | jsxtext | (mod |
| `KeyExchangeBoard.tsx:40` | DATA | jsxtext | x |
| `KeyExchangeBoard.tsx:46` | UI | jsxtext | 2. Choose a secret |
| `KeyExchangeBoard.tsx:52` | DATA | jsxtext | A = |
| `KeyExchangeBoard.tsx:56` | UI | jsxtext | Nothing is sent |
| `KeyExchangeBoard.tsx:62` | DATA | jsxtext | B = |
| `KeyExchangeBoard.tsx:70` | UI | jsxtext | 3. Swap numbers |
| `KeyExchangeBoard.tsx:73` | UI | jsxtext | Alice sends |
| `KeyExchangeBoard.tsx:75` | UI | jsxtext | Bob sends |
| `KeyExchangeBoard.tsx:82` | UI | jsxtext | 4. Work out the key |
| `KeyExchangeBoard.tsx:84` | UI | jsxtext | Nothing is sent |
| `KeyExchangeBoard.tsx:90` | UI | jsxtext | Eve tries |
| `KeyExchangeBoard.tsx:114` | UI | jsxtext | (mod |
| `KeyExchangeBoard.tsx:120` | UI | visattr:aria-label | hidden |
| `KeyExchangeBoard.tsx:137` | UI | jsxtext | Guess |
| `KeyExchangeBoard.tsx:137` | UI | jsxtext | gives |
| `KeyExchangeBoard.tsx:137` | UI | jsxtext | , so the key is |
| `KeyExchangeBoard.tsx:148` | UI | return | Eve needed ${search.guesses.length} of ${state.modulus - 1} possible guesses. Real exchanges use a P hundreds of digits long. Trying every secret would then take longer than the age of the universe. |
| `KeyExchangeBoard.tsx:152` | UI | return | Alice and Bob agree on two numbers. They do not mind who hears them. |
| `KeyExchangeBoard.tsx:154` | UI | return | Each of them picks a secret number and tells nobody, not even the other. |
| `KeyExchangeBoard.tsx:156` | UI | return | Each puts their secret into the one-way function and sends the result. Eve sees both results. |
| `KeyExchangeBoard.tsx:158` | UI | return | Each raises the number they received to the power of their own secret. They reach the same key, and it was never sent. |
| `KeyExchangeControls.tsx:13` | UI | visattr:label | Public Y |
| `KeyExchangeControls.tsx:14` | UI | visattr:label | Public prime P |
| `KeyExchangeControls.tsx:15` | UI | visattr:label | The key, if Eve can find it |
| `KeyExchangeControls.tsx:15` | UI | visattr:label | Shared key |
| `KeyExchangeControls.tsx:20` | UI | visattr:label | Alice's secret |
| `KeyExchangeControls.tsx:21` | UI | visattr:label | Bob's secret |
| `KeyExchangeControls.tsx:25` | UI | jsxtext | Next step |
| `KeyExchangeControls.tsx:28` | UI | jsxtext | Start again |
| `KeyExchangeControls.tsx:31` | UI | jsxchild | Hide Eve's guesses |
| `KeyExchangeControls.tsx:31` | UI | jsxchild | Let Eve try every secret |
| `useKeyExchange.ts:92` | UI | return | Not yet |

### rsa

Chapter 5, order 5. Load 1,517 words.

- `story.mdx`: 1,510 words (`wc -w`), 1,286 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `SPY`
- Files scanned: `RsaBoard.tsx`, `RsaControls.tsx`, `presets.ts`, `route.tsx`, `useRsa.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | RSA |
| era | 6 | 1977 |
| hook | 9 | Publish a padlock that anyone can snap shut, and keep the only key that opens it. |
| firstStep | 10 | Change p or q and watch every other number follow. |
| source | 11 | The Code Book, chapter 5: Alice and Bob Go Public, and Appendix E |

Component strings (43 UI, 6 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `RsaBoard.tsx:28` | UI | jsxchild | Dividing works here because N is tiny. The book says a bank's N is at least 10 to the power 308. A hundred million computers would need more than a thousand years to factor it. |
| `RsaBoard.tsx:29` | UI | jsxchild | Anyone may know N and e. Only the owner knows p and q, and so only the owner can work out d. |
| `RsaBoard.tsx:59` | UI | visattr:title | Alice makes her keys |
| `RsaBoard.tsx:63` | UI | jsxtext | and |
| `RsaBoard.tsx:76` | UI | jsxtext | , because |
| `RsaBoard.tsx:76` | UI | jsxtext | = 1 (mod |
| `RsaBoard.tsx:86` | UI | var:title | Alice deciphers with d |
| `RsaBoard.tsx:86` | UI | var:title | Bob enciphers with N and e |
| `RsaBoard.tsx:90` | UI | jsxchild | Nothing to work out yet: you need a number smaller than N, and d. |
| `RsaBoard.tsx:90` | UI | jsxchild | Type a letter or a number smaller than N. |
| `RsaBoard.tsx:100` | DATA | jsxchild | M = C |
| `RsaBoard.tsx:100` | DATA | jsxchild | C = M |
| `RsaBoard.tsx:101` | UI | jsxchild | d |
| `RsaBoard.tsx:101` | UI | jsxchild | e |
| `RsaBoard.tsx:101` | UI | jsxtext | (mod N) = |
| `RsaBoard.tsx:102` | UI | jsxtext | (mod |
| `RsaBoard.tsx:102` | UI | jsxtext | ), and |
| `RsaBoard.tsx:114` | UI | jsxchild | used |
| `RsaBoard.tsx:114` | UI | jsxchild | skipped |
| `RsaBoard.tsx:122` | UI | jsxtext | (mod |
| `RsaBoard.tsx:132` | UI | visattr:title | Eve attacks N |
| `RsaBoard.tsx:134` | UI | jsxtext | Eve divides |
| `RsaBoard.tsx:134` | UI | jsxtext | by 2, then by 3, then by every odd number after that, until one goes in exactly. |
| `RsaBoard.tsx:137` | UI | jsxtext | Try |
| `RsaBoard.tsx:137` | UI | jsxtext | exactly. So the primes are |
| `RsaBoard.tsx:138` | UI | jsxtext | and |
| `RsaBoard.tsx:142` | UI | jsxtext | Now she does what Alice did: (p − 1) × (q − 1) = |
| `RsaBoard.tsx:142` | UI | jsxtext | , so d = |
| `RsaBoard.tsx:142` | UI | jsxtext | . She can read every message. |
| `RsaControls.tsx:14` | UI | visattr:label | Public key |
| `RsaControls.tsx:15` | UI | jsxtext | , e = |
| `RsaControls.tsx:15` | DATA | jsxtext | N = |
| `RsaControls.tsx:17` | UI | visattr:label | Ciphertext C |
| `RsaControls.tsx:17` | UI | visattr:label | Message M |
| `RsaControls.tsx:21` | UI | visattr:label | Message: a letter or a number |
| `RsaControls.tsx:21` | UI | visattr:label | Ciphertext: a number |
| `RsaControls.tsx:27` | UI | visattr:label | I want to |
| `RsaControls.tsx:31` | UI | visprop:label | Encipher |
| `RsaControls.tsx:32` | UI | visprop:label | Decipher |
| `RsaControls.tsx:36` | UI | jsxchild | Call Eve off |
| `RsaControls.tsx:36` | UI | jsxchild | Let Eve factor N |
| `RsaControls.tsx:41` | UI | visattr:label | Prime p |
| `RsaControls.tsx:42` | UI | visattr:label | Prime q |
| `RsaControls.tsx:43` | UI | visattr:label | Public e |
| `presets.ts:6` | DATA | dataprop:text | X |
| `presets.ts:12` | DATA | dataprop:text | X |
| `presets.ts:15` | DATA | dataprop:text | X |
| `useRsa.ts:101` | UI | return | Too big: it must be less than N |
| `useRsa.ts:103` | UI | return | You need d first |

### pgp

Chapter 6, order 1. Load 1,628 words.

- `story.mdx`: 1,371 words (`wc -w`), 1,214 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `IT IS OUT ON THE NET`
- Files scanned: `AliceDesk.tsx`, `BobDesk.tsx`, `Desk.tsx`, `EnvelopeDesk.tsx`, `EveDesk.tsx`, `PgpBoard.tsx`, `PgpControls.tsx`, `presets.ts`, `route.tsx`, `usePgp.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Pretty Good Privacy |
| era | 6 | 1991 |
| hook | 9 | Phil Zimmermann put two ciphers in one envelope and gave strong secrecy to everybody for free. |
| firstStep | 10 | Press “Next step” to watch Bob open the envelope. |
| source | 11 | The Code Book, chapter 6: Pretty Good Privacy |

Component strings (81 UI, 6 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `AliceDesk.tsx:11` | UI | visattr:title | Alice |
| `AliceDesk.tsx:11` | UI | visattr:note | writes and locks |
| `AliceDesk.tsx:12` | UI | visattr:label | Message |
| `AliceDesk.tsx:12` | UI | jsxtext | covered: you were not in the room |
| `AliceDesk.tsx:18` | UI | visattr:title | Alice |
| `AliceDesk.tsx:18` | UI | visattr:note | writes and locks |
| `AliceDesk.tsx:19` | UI | visattr:label | Message |
| `AliceDesk.tsx:19` | UI | jsxchild | nothing yet |
| `AliceDesk.tsx:21` | UI | visattr:label | Session key, picked at random for this message |
| `AliceDesk.tsx:27` | UI | visattr:label | Locking the message with the session key |
| `AliceDesk.tsx:29` | UI | visprop:label | Message |
| `AliceDesk.tsx:30` | UI | visprop:label | Session key |
| `AliceDesk.tsx:31` | UI | visprop:label | Shifted |
| `AliceDesk.tsx:37` | UI | visattr:label | Locking the session key with Bob's public key |
| `AliceDesk.tsx:39` | UI | visprop:label | Session key |
| `AliceDesk.tsx:40` | UI | visprop:label | As a number |
| `AliceDesk.tsx:41` | UI | visprop:label | To the power ${BOB.e}, mod ${BOB.n} |
| `BobDesk.tsx:11` | UI | visattr:title | Bob |
| `BobDesk.tsx:11` | UI | visattr:note | unlocks |
| `BobDesk.tsx:12` | UI | visattr:label | Public key, which he gives to everyone |
| `BobDesk.tsx:13` | UI | jsxtext | , e = |
| `BobDesk.tsx:13` | DATA | jsxtext | N = |
| `BobDesk.tsx:15` | UI | visattr:label | Private key, which never leaves this desk |
| `BobDesk.tsx:16` | UI | jsxtext | d = |
| `BobDesk.tsx:20` | UI | visattr:label | Unlocking the session key with Bob's private key |
| `BobDesk.tsx:22` | UI | visprop:label | Part 2 |
| `BobDesk.tsx:23` | UI | visprop:label | To the power ${BOB.d}, mod ${BOB.n} |
| `BobDesk.tsx:24` | UI | visprop:label | Session key |
| `BobDesk.tsx:31` | UI | visattr:label | Unlocking the message with the session key |
| `BobDesk.tsx:33` | UI | visprop:label | Part 1 |
| `BobDesk.tsx:34` | UI | visprop:label | Session key |
| `BobDesk.tsx:35` | UI | visprop:label | Shifted back |
| `BobDesk.tsx:38` | UI | visattr:label | Bob reads |
| `EnvelopeDesk.tsx:9` | UI | visattr:title | The envelope |
| `EnvelopeDesk.tsx:9` | UI | visattr:note | sent: anyone on the way can copy it |
| `EnvelopeDesk.tsx:9` | UI | visattr:note | not sent yet |
| `EnvelopeDesk.tsx:10` | UI | visattr:label | Part 1, the locked message |
| `EnvelopeDesk.tsx:11` | UI | jsxchild | empty |
| `EnvelopeDesk.tsx:13` | UI | visattr:label | Part 2, the locked session key |
| `EnvelopeDesk.tsx:14` | UI | jsxchild | empty |
| `EveDesk.tsx:10` | UI | visattr:title | Eve |
| `EveDesk.tsx:10` | UI | visattr:note | sees only what travels |
| `EveDesk.tsx:11` | UI | visattr:label | Bob's public key |
| `EveDesk.tsx:12` | UI | jsxtext | , e = |
| `EveDesk.tsx:12` | DATA | jsxtext | N = |
| `EveDesk.tsx:14` | UI | visattr:label | Part 1, the locked message |
| `EveDesk.tsx:15` | UI | jsxchild | not sent yet |
| `EveDesk.tsx:17` | UI | visattr:label | Part 2, the locked session key |
| `EveDesk.tsx:18` | UI | jsxchild | not sent yet |
| `EveDesk.tsx:22` | UI | visattr:label | Dividing N by 2, 3, 4… worked on try ${loot.key.tries} |
| `EveDesk.tsx:25` | UI | visattr:label | So Bob's private key is |
| `EveDesk.tsx:25` | UI | jsxtext | d = |
| `EveDesk.tsx:26` | UI | visattr:label | Session key |
| `EveDesk.tsx:27` | UI | visattr:label | Eve reads |
| `PgpBoard.tsx:11` | UI | var:CAPTIONS | Alice has written a message for Bob. Nothing is locked yet. |
| `PgpBoard.tsx:12` | UI | var:CAPTIONS | Alice's computer picks a session key at random. It will be used for this message only. |
| `PgpBoard.tsx:13` | UI | var:CAPTIONS | The fast lock: each letter of the message is shifted by a letter of the session key. |
| `PgpBoard.tsx:14` | UI | var:CAPTIONS | The slow lock: each letter of the session key becomes a number, locked with Bob's public key. |
| `PgpBoard.tsx:15` | UI | var:CAPTIONS | Both locked parts travel together. Bob's private key stays at home. |
| `PgpBoard.tsx:16` | UI | var:CAPTIONS | Bob's private key turns part 2 back into the session key. |
| `PgpBoard.tsx:17` | UI | var:CAPTIONS | The session key turns part 1 back into the message. Only Bob could do both steps. |
| `PgpBoard.tsx:20` | UI | var:EVE_CAPTION | Eve can copy everything that travels. Without d she cannot unlock part 2, so she cannot unlock part 1. |
| `PgpBoard.tsx:21` | UI | var:CRACKED_CAPTION | A toy N is easy to split. A real one is hundreds of digits long, and nobody knows a quick way. |
| `PgpBoard.tsx:39` | UI | jsxtext | These are toy locks: real PGP used a cipher called IDEA and far bigger numbers. |
| `PgpControls.tsx:20` | UI | visattr:label | Step |
| `PgpControls.tsx:24` | UI | visattr:label | What travels |
| `PgpControls.tsx:28` | UI | jsxchild | Next step: ${next} |
| `PgpControls.tsx:28` | UI | jsxchild | Bob has read the message |
| `PgpControls.tsx:30` | UI | jsxtext | Back to step 0 |
| `PgpControls.tsx:34` | UI | visattr:label | Alice's message (changing it starts again) |
| `PgpControls.tsx:39` | UI | visattr:label | Look through the eyes of |
| `PgpControls.tsx:43` | UI | visprop:label | Alice and Bob |
| `PgpControls.tsx:44` | UI | visprop:label | Eve |
| `PgpControls.tsx:49` | UI | jsxtext | New session key |
| `PgpControls.tsx:51` | UI | jsxtext | Eve: split N into its primes |
| `presets.ts:3` | DATA | visprop:message | MEET ME AT NOON |
| `presets.ts:3` | DATA | prop:sessionKey | QXJM |
| `presets.ts:24` | DATA | visprop:message | IT IS OUT ON THE NET |
| `presets.ts:25` | DATA | prop:sessionKey | ZMRK |
| `usePgp.ts:9` | UI | var:STEPS | Make a session key |
| `usePgp.ts:10` | UI | var:STEPS | Lock the message |
| `usePgp.ts:11` | UI | var:STEPS | Lock the session key |
| `usePgp.ts:12` | UI | var:STEPS | Send the envelope |
| `usePgp.ts:13` | UI | var:STEPS | Bob unlocks the session key |
| `usePgp.ts:14` | UI | var:STEPS | Bob unlocks the message |
| `usePgp.ts:76` | UI | return | Nothing yet |
| `usePgp.ts:78` | UI | return | ${ciphertext} + key ${lockedKey.join(" ")} |

### key-escrow

Chapter 6, order 1.5. Load 1,584 words.

- `story.mdx`: 1,425 words (`wc -w`), 1,179 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `THE MONEY IS UNDER THE BRIDGE`
- Files scanned: `Desk.tsx`, `EscrowBoard.tsx`, `EscrowControls.tsx`, `ReaderDesk.tsx`, `Scanner.tsx`, `numbered.ts`, `presets.ts`, `route.tsx`, `useEscrow.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Key escrow |
| era | 6 | 1994 |
| hook | 9 | A spare copy of every key, cut in two, for the police to borrow. |
| firstStep | 10 | Turn the warrant on. Then ask each agency for its half. |
| source | 11 | The Code Book, chapter 6: Pretty Good Privacy |

Component strings (86 UI, 16 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `EscrowBoard.tsx:20` | UI | visattr:title | Alice |
| `EscrowBoard.tsx:20` | UI | visattr:note | has lodged a key |
| `EscrowBoard.tsx:21` | UI | visattr:label | Her desk |
| `EscrowBoard.tsx:21` | UI | jsxtext | covered: you are the police now |
| `EscrowBoard.tsx:27` | UI | visattr:title | Alice |
| `EscrowBoard.tsx:27` | UI | visattr:note | lodges her key, then writes to Bob |
| `EscrowBoard.tsx:29` | UI | visattr:label | Splitting the key in two |
| `EscrowBoard.tsx:31` | UI | visprop:label | Her key |
| `EscrowBoard.tsx:32` | UI | visprop:label | Half one: letters picked by chance |
| `EscrowBoard.tsx:33` | UI | visprop:label | Half two: key minus half one |
| `EscrowBoard.tsx:36` | UI | visattr:label | How to count |
| `EscrowBoard.tsx:36` | UI | jsxtext | A is 0 and Z is 25. Below 0, add 26. |
| `EscrowBoard.tsx:38` | UI | visattr:label | Her own key, which she never lodged |
| `EscrowBoard.tsx:42` | UI | visattr:label | Message to Bob |
| `EscrowBoard.tsx:42` | UI | jsxchild | nothing yet |
| `EscrowBoard.tsx:50` | UI | return | released to the police, and a thief has a copy |
| `EscrowBoard.tsx:51` | UI | return | released to the police under the warrant |
| `EscrowBoard.tsx:52` | UI | return | a thief has a copy |
| `EscrowBoard.tsx:53` | UI | return | locked away, waiting to be asked |
| `EscrowBoard.tsx:53` | UI | return | locked away: no warrant, no release |
| `EscrowBoard.tsx:60` | UI | visattr:title | Agency one |
| `EscrowBoard.tsx:60` | UI | visattr:title | Agency two |
| `EscrowBoard.tsx:60` | UI | visattr:note | stores half the key |
| `EscrowBoard.tsx:61` | UI | visattr:label | Half ${agency} in its database |
| `EscrowBoard.tsx:62` | UI | jsxchild | hidden |
| `EscrowBoard.tsx:64` | UI | visattr:label | Where it is |
| `EscrowBoard.tsx:77` | UI | visattr:title | On the wire |
| `EscrowBoard.tsx:77` | UI | visattr:note | anyone can copy it |
| `EscrowBoard.tsx:78` | UI | visattr:label | Ciphertext, made with the lodged key |
| `EscrowBoard.tsx:78` | UI | visattr:label | Ciphertext, made with a key nobody lodged |
| `EscrowBoard.tsx:82` | UI | visattr:title | The police |
| `EscrowBoard.tsx:82` | UI | visattr:note | want to read it |
| `EscrowBoard.tsx:83` | UI | visattr:label | Warrant from a judge |
| `EscrowBoard.tsx:83` | UI | jsxchild | yes |
| `EscrowBoard.tsx:83` | UI | jsxchild | no |
| `EscrowBoard.tsx:85` | UI | visattr:title | A thief |
| `EscrowBoard.tsx:85` | UI | visattr:note | has no warrant and needs none |
| `EscrowBoard.tsx:87` | UI | jsxtext | Everything here is a toy. A real escrowed key was a long binary number sealed inside a chip, not four letters. |
| `EscrowControls.tsx:16` | UI | var:name | Agency one |
| `EscrowControls.tsx:16` | UI | var:name | Agency two |
| `EscrowControls.tsx:20` | UI | jsxtext | : no warrant, no half |
| `EscrowControls.tsx:26` | UI | jsxchild | ${name}: half released |
| `EscrowControls.tsx:26` | UI | jsxchild | ${name}: release your half |
| `EscrowControls.tsx:36` | UI | visattr:label | Who can read the message right now |
| `EscrowControls.tsx:37` | UI | visattr:label | What the police see |
| `EscrowControls.tsx:41` | UI | visattr:label | Warrant from a judge |
| `EscrowControls.tsx:45` | UI | visprop:label | No |
| `EscrowControls.tsx:46` | UI | visprop:label | Yes |
| `EscrowControls.tsx:53` | UI | jsxtext | An insider at agency one leaks a half |
| `EscrowControls.tsx:54` | UI | jsxtext | Both databases are stolen |
| `EscrowControls.tsx:55` | UI | jsxtext | Put everything back |
| `EscrowControls.tsx:59` | UI | visattr:label | The sender uses |
| `EscrowControls.tsx:63` | UI | visprop:label | The escrowed cipher |
| `EscrowControls.tsx:64` | UI | visprop:label | A cipher that is not escrowed |
| `EscrowControls.tsx:71` | UI | visattr:label | Alice's key, 4 letters (a new key starts again) |
| `EscrowControls.tsx:76` | UI | visattr:label | Alice's message |
| `EscrowControls.tsx:77` | UI | jsxtext | Lodge the key again with new halves |
| `ReaderDesk.tsx:11` | UI | visattr:label | Adding the two halves |
| `ReaderDesk.tsx:13` | UI | visprop:label | Half one |
| `ReaderDesk.tsx:14` | UI | visprop:label | Plus half two |
| `ReaderDesk.tsx:15` | UI | visprop:label | Gives the key |
| `ReaderDesk.tsx:27` | UI | visattr:label | Keys that fit this half |
| `ReaderDesk.tsx:29` | UI | visprop:label | If the key were |
| `ReaderDesk.tsx:30` | UI | visprop:label | the missing half is |
| `ReaderDesk.tsx:33` | UI | visattr:label | Keys this half rules out |
| `ReaderDesk.tsx:33` | UI | jsxtext | none of the |
| `ReaderDesk.tsx:45` | UI | visattr:label | Half one |
| `ReaderDesk.tsx:45` | UI | jsxchild | not in their hands |
| `ReaderDesk.tsx:46` | UI | visattr:label | Half two |
| `ReaderDesk.tsx:46` | UI | jsxchild | not in their hands |
| `ReaderDesk.tsx:52` | UI | visattr:label | Why |
| `ReaderDesk.tsx:52` | UI | jsxtext | the sender used a different key, one that was never lodged |
| `ReaderDesk.tsx:59` | UI | return | The message, read with the rebuilt key |
| `ReaderDesk.tsx:60` | UI | return | The rebuilt key gives only nonsense |
| `ReaderDesk.tsx:61` | UI | return | Trying the one half as a key gives nonsense |
| `ReaderDesk.tsx:62` | UI | return | All they have is the ciphertext |
| `Scanner.tsx:10` | UI | jsxtext | A toy keyword scanner |
| `Scanner.tsx:11` | UI | jsxtext | Watch list: |
| `Scanner.tsx:11` | UI | jsxtext | . The last message is the fourth one, enciphered. |
| `Scanner.tsx:16` | UI | jsxchild | Set aside: ${found[row]!.join(", ")} |
| `Scanner.tsx:16` | UI | jsxchild | Let through |
| `presets.ts:8` | DATA | dataprop:key | LOCK |
| `presets.ts:9` | DATA | prop:random | QXJM |
| `presets.ts:10` | DATA | visprop:message | THE PARTY IS ON FRIDAY |
| `presets.ts:12` | DATA | prop:ownKey | MINE |
| `presets.ts:34` | DATA | dataprop:key | CHIP |
| `presets.ts:34` | DATA | prop:random | WTGB |
| `presets.ts:34` | DATA | visprop:message | THE MONEY IS UNDER THE BRIDGE |
| `presets.ts:38` | DATA | var:SUSPECT_KEYS | SAFE |
| `presets.ts:38` | DATA | var:SUSPECT_KEYS | DOOR |
| `presets.ts:38` | DATA | var:SUSPECT_KEYS | WIRE |
| `presets.ts:38` | DATA | var:SUSPECT_KEYS | ZZZZ |
| `presets.ts:40` | DATA | var:PLOT | THE ASSASSIN ARRIVES AT NOON |
| `presets.ts:44` | DATA | var:SCANNED_MESSAGES | SEE YOU AT FOOTBALL ON SATURDAY |
| `presets.ts:45` | DATA | var:SCANNED_MESSAGES | OUR SCHOOL TRIP VISITS THE PENTAGON |
| `presets.ts:46` | DATA | var:SCANNED_MESSAGES | HAPPY BIRTHDAY GRANDMA |
| `presets.ts:48` | DATA | call:encipher | LOCK |
| `useEscrow.ts:71` | UI | other:ArrowFunction | ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]} |
| `useEscrow.ts:76` | UI | return | Only ${inWords(names)} |
| `useEscrow.ts:83` | UI | return | ${view.text} (nonsense: the sender used a key that was never lodged) |
| `useEscrow.ts:84` | UI | intemplate | nonsense: one half is not a key |
| `useEscrow.ts:84` | UI | intemplate | still enciphered |

### digital-signatures

Chapter 6, order 2, full edition only. Load 1,437 words.

- `story.mdx`: 1,450 words (`wc -w`), 1,252 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `NOON`
- Files scanned: `Desk.tsx`, `SignaturesBoard.tsx`, `SignaturesControls.tsx`, `presets.ts`, `route.tsx`, `useSignatures.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Digital signatures |
| era | 6 | 1976 onwards |
| hook | 9 | Turn a public-key cipher back to front, and it proves who wrote a message. |
| firstStep | 10 | Change one letter of the message that arrives. Watch Bob's check. |
| source | 11 | The Code Book (full edition): Pretty Good Privacy |

Component strings (38 UI, 7 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `SignaturesBoard.tsx:11` | UI | visattr:title | Alice |
| `SignaturesBoard.tsx:11` | UI | visattr:note | signs |
| `SignaturesBoard.tsx:12` | UI | visattr:label | Private key, which only Alice knows |
| `SignaturesBoard.tsx:13` | UI | jsxtext | d = |
| `SignaturesBoard.tsx:16` | UI | visattr:label | Turning the message into numbers |
| `SignaturesBoard.tsx:18` | UI | visprop:label | Message |
| `SignaturesBoard.tsx:19` | UI | visprop:label | As numbers |
| `SignaturesBoard.tsx:22` | UI | visattr:label | Toy digest: add them up, keep the remainder after dividing by ${ALICE.n} |
| `SignaturesBoard.tsx:23` | UI | visattr:label | Signature: digest to the power ${ALICE.d}, mod ${ALICE.n} |
| `SignaturesBoard.tsx:33` | UI | visattr:title | On the way |
| `SignaturesBoard.tsx:33` | UI | visattr:note | anyone can read it, or change it |
| `SignaturesBoard.tsx:34` | UI | visattr:label | Message |
| `SignaturesBoard.tsx:34` | UI | jsxchild | nothing sent yet |
| `SignaturesBoard.tsx:35` | UI | visattr:label | Signature |
| `SignaturesBoard.tsx:36` | UI | jsxchild | none |
| `SignaturesBoard.tsx:38` | UI | visattr:label | A forger found this signature by trying |
| `SignaturesBoard.tsx:38` | UI | jsxtext | numbers |
| `SignaturesBoard.tsx:47` | UI | visattr:title | Bob |
| `SignaturesBoard.tsx:47` | UI | visattr:note | checks |
| `SignaturesBoard.tsx:48` | UI | visattr:label | Alice's public key, which everyone has |
| `SignaturesBoard.tsx:49` | UI | jsxtext | , e = |
| `SignaturesBoard.tsx:49` | DATA | jsxtext | N = |
| `SignaturesBoard.tsx:51` | UI | visattr:label | Toy digest of the message that arrived |
| `SignaturesBoard.tsx:52` | UI | visattr:label | Signature to the power ${ALICE.e}, mod ${ALICE.n} |
| `SignaturesBoard.tsx:52` | UI | jsxchild | no signature |
| `SignaturesBoard.tsx:53` | UI | visattr:label | Verdict |
| `SignaturesBoard.tsx:68` | UI | jsxtext | Everything here is a toy. A real digest comes from a hash function, and real keys are hundreds of digits long. |
| `SignaturesControls.tsx:22` | UI | visattr:label | Signature that arrives |
| `SignaturesControls.tsx:22` | UI | jsxchild | none |
| `SignaturesControls.tsx:23` | UI | visattr:label | Bob's check |
| `SignaturesControls.tsx:27` | UI | visattr:label | Message that arrives (change it to tamper) |
| `SignaturesControls.tsx:32` | UI | visattr:label | Signature that arrives |
| `SignaturesControls.tsx:39` | UI | visattr:label | Alice's message |
| `SignaturesControls.tsx:41` | UI | jsxtext | Sign and send |
| `SignaturesControls.tsx:46` | UI | jsxtext | Forger: guess a signature |
| `SignaturesControls.tsx:48` | UI | jsxtext | Forger: try every number |
| `presets.ts:3` | DATA | var:IOU | I OWE BOB 19 POUNDS |
| `presets.ts:19` | DATA | prop:arrived | I OWE BOB 99 POUNDS |
| `presets.ts:22` | DATA | prop:arrived | I OWE EVE 500 POUNDS |
| `presets.ts:25` | DATA | call:note | MEET AT DAWN |
| `presets.ts:26` | DATA | call:note | MEET AT NOON |
| `presets.ts:27` | DATA | call:note | MEET AT DUSK |
| `useSignatures.ts:53` | UI | return | No signature: this could be from anyone |
| `useSignatures.ts:54` | UI | return | ✓ Genuine: the numbers match |
| `useSignatures.ts:54` | UI | return | ✗ Do not trust: the numbers differ |

### quantum

Chapter 6, order 3. Load 1,589 words.

- `story.mdx`: 1,505 words (`wc -w`), 1,318 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `SOUTH`
- Files scanned: `Arrow.tsx`, `PhotonTable.tsx`, `QuantumBoard.tsx`, `QuantumControls.tsx`, `presets.ts`, `route.tsx`, `useQuantum.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | Quantum cryptography |
| era | 6 | 1984 onwards |
| hook | 9 | Send a key one particle of light at a time, and nobody can listen without leaving a mark. |
| firstStep | 10 | Press “Next step” to see which bits Alice and Bob keep. |
| source | 11 | The Code Book, chapter 6: Pretty Good Privacy |

Component strings (45 UI, 19 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `Arrow.tsx:3` | UI | prop | leaning right |
| `Arrow.tsx:3` | UI | prop | leaning left |
| `Arrow.tsx:8` | UI | visattr:aria-label | ${angle} degrees |
| `PhotonTable.tsx:15` | DATA | other:ArrowFunction | + |
| `PhotonTable.tsx:18` | UI | visprop:label | Alice's bit |
| `PhotonTable.tsx:19` | UI | visprop:label | Alice's scheme |
| `PhotonTable.tsx:20` | UI | visprop:label | Photon she sends |
| `PhotonTable.tsx:24` | UI | visprop:label | Eve's detector |
| `PhotonTable.tsx:25` | UI | visprop:label | Eve reads |
| `PhotonTable.tsx:26` | UI | visprop:label | Photon she sends on |
| `PhotonTable.tsx:30` | UI | visprop:label | Bob's detector |
| `PhotonTable.tsx:31` | UI | visprop:label | Bob's bit |
| `PhotonTable.tsx:34` | UI | visprop:label | Same scheme? |
| `PhotonTable.tsx:40` | UI | visprop:label | Read out to compare |
| `PhotonTable.tsx:43` | UI | visprop:label | Secret key |
| `PhotonTable.tsx:83` | UI | jsxtext | Photon number |
| `QuantumBoard.tsx:10` | UI | var:CAPTIONS | Alice picks a bit and a scheme at random for each photon. The arrow shows how the photon is polarised. |
| `QuantumBoard.tsx:11` | UI | var:CAPTIONS | Bob picks a detector at random. The right one reads Alice's bit. The wrong one reads 0 or 1 by chance. |
| `QuantumBoard.tsx:12` | UI | var:CAPTIONS | Alice and Bob tell each other their schemes, never their bits. They keep the photons where the two match. |
| `QuantumBoard.tsx:13` | UI | var:CAPTIONS | They read half the kept bits aloud. If all agree, nobody measured the photons, and the rest is their key. |
| `QuantumBoard.tsx:16` | DATA | other:ArrowFunction | + |
| `QuantumBoard.tsx:23` | UI | return | Eve used ${name(photon.eve.scheme)}, the right detector, and passed it on unchanged. |
| `QuantumBoard.tsx:24` | UI | return | Eve used ${name(photon.eve.scheme)}, the wrong detector. She read ${photon.eve.bit} by chance and sent on a new photon in her scheme. |
| `QuantumBoard.tsx:29` | UI | return | Bob used ${name(photon.bobScheme)}, a different scheme, so this photon is thrown away. |
| `QuantumBoard.tsx:30` | UI | var:verdict | but his bit is wrong: somebody disturbed the photon |
| `QuantumBoard.tsx:30` | UI | var:verdict | and his bit is right |
| `QuantumBoard.tsx:31` | UI | return | Bob used ${name(photon.bobScheme)}, the same scheme, ${verdict}. |
| `QuantumBoard.tsx:36` | UI | var:start | Photon ${number}: Alice sent ${photon.aliceBit} in the ${name(photon.aliceScheme)} scheme. |
| `QuantumBoard.tsx:57` | UI | jsxchild | ${CAPTIONS[state.stage]} Tap a number to follow one photon. |
| `QuantumControls.tsx:10` | DATA | other:ArrowFunction | + |
| `QuantumControls.tsx:10` | DATA | other:ArrowFunction | x |
| `QuantumControls.tsx:35` | UI | visattr:label | Step |
| `QuantumControls.tsx:39` | UI | visattr:label | Secret key |
| `QuantumControls.tsx:43` | UI | jsxchild | Next step: ${next} |
| `QuantumControls.tsx:43` | UI | jsxchild | All steps done |
| `QuantumControls.tsx:46` | UI | visattr:label | Eve is listening (unknown) |
| `QuantumControls.tsx:46` | UI | visattr:label | Eve is listening |
| `QuantumControls.tsx:50` | UI | visprop:label | No |
| `QuantumControls.tsx:51` | UI | visprop:label | Yes |
| `QuantumControls.tsx:57` | UI | visattr:label | Send new photons |
| `QuantumControls.tsx:62` | UI | jsxtext | Send |
| `QuantumControls.tsx:62` | UI | jsxtext | again |
| `presets.ts:7` | DATA | call:runFrom | xxxx+x+x++x+x+++ |
| `presets.ts:8` | DATA | call:runFrom | xxxxx+x+x+x++x+x |
| `presets.ts:9` | DATA | call:runFrom | +xx+++x++xx++x++ |
| `presets.ts:17` | DATA | call:runFrom | +++x++xx+xxxx+++ |
| `presets.ts:18` | DATA | call:runFrom | ++xxx+xx++++xxxx |
| `presets.ts:19` | DATA | call:runFrom | +xxxx+x++xxx+x+x |
| `presets.ts:27` | DATA | call:runFrom | +++x++x+xx+++x++ |
| `presets.ts:28` | DATA | call:runFrom | x+x++++++x++x++x |
| `presets.ts:29` | DATA | call:runFrom | xxx+xxxx++++++x+ |
| `presets.ts:35` | DATA | call:runFrom | +x+xx+xxxxxxxxx+ |
| `presets.ts:36` | DATA | call:runFrom | +xx+xx+++xxxx+xx |
| `presets.ts:37` | DATA | call:runFrom | +++xx++xxx+++x+x |
| `presets.ts:43` | DATA | call:runFrom | x+xx+++x+++++++x |
| `presets.ts:44` | DATA | call:runFrom | x++xxxxx+x++xx++ |
| `presets.ts:45` | DATA | call:runFrom | ++x+xxx+xxxx+++x |
| `useQuantum.ts:5` | UI | var:STEPS | Alice sends photons |
| `useQuantum.ts:5` | UI | var:STEPS | Bob measures them |
| `useQuantum.ts:5` | UI | var:STEPS | They keep the matches |
| `useQuantum.ts:5` | UI | var:STEPS | They compare a sample |
| `useQuantum.ts:55` | UI | return | Not agreed yet |
| `useQuantum.ts:57` | UI | return | Thrown away: ${result.errors} of ${result.sample.length} compared bits differ |
| `useQuantum.ts:58` | UI | return | ${result.aliceKey.join("")} (all ${result.sample.length} compared bits agree) |

### codebreakers-challenge

Chapter 7, order 1. Load 1,512 words.

- `story.mdx`: 1,481 words (`wc -w`), 1,221 prose words. `story.vi.mdx`: English placeholder (UNTRANSLATED marker).
- Challenge answers in the story (DATA, keep): `NEVER STOP COUNTING`
- Files scanned: `CaesarBench.tsx`, `CodebreakersChallengeBoard.tsx`, `CodebreakersChallengeControls.tsx`, `ShiftList.tsx`, `SubstitutionBench.tsx`, `VigenereBench.tsx`, `presets.ts`, `route.tsx`, `useCodebreakersChallenge.ts`

`meta.ts`:

| Field | Line | Text |
|---|---:|---|
| title | 5 | The Codebreaker's Challenge |
| era | 6 | Your turn |
| hook | 9 | The book ends with a dare: four cryptograms and no answers. Here are four of ours. |
| firstStep | 10 | Press ▲ next to “Shift” until the message turns into English. |
| source | 11 | The Code Book, The Codebreaker's Challenge |

Component strings (56 UI, 0 DATA):

| Where | Kind | Slot | Text |
|---|---|---|---|
| `CaesarBench.tsx:19` | UI | visattr:aria-label | The ciphertext |
| `CaesarBench.tsx:24` | UI | visprop:label | Cipher |
| `CaesarBench.tsx:25` | UI | visprop:label | Plain |
| `CaesarBench.tsx:29` | UI | jsxtext | Undoing a shift of |
| `CaesarBench.tsx:29` | UI | jsxtext | reads the message like this |
| `CaesarBench.tsx:30` | UI | jsxchild | . The word spaces were removed, so look for words inside the groups: |
| `CaesarBench.tsx:32` | UI | visattr:aria-label | The reading with this shift |
| `CodebreakersChallengeBoard.tsx:20` | UI | prop:caesar | Caesar shift |
| `CodebreakersChallengeBoard.tsx:21` | UI | prop:substitution | monoalphabetic substitution |
| `CodebreakersChallengeBoard.tsx:22` | UI | prop:vigenere | Vigenère cipher |
| `CodebreakersChallengeBoard.tsx:31` | UI | var:name | Your own cryptogram |
| `CodebreakersChallengeBoard.tsx:31` | UI | var:name | Cryptogram ${state.current + 1} |
| `CodebreakersChallengeBoard.tsx:38` | UI | jsxtext | Nothing is on the bench yet. Paste a cryptogram into the box in the controls, then pick the kind of cipher you think it is. |
| `CodebreakersChallengeBoard.tsx:49` | UI | other:BinaryExpression | . Solved ✓ |
| `CodebreakersChallengeControls.tsx:28` | UI | visprop:label | Caesar shift |
| `CodebreakersChallengeControls.tsx:29` | UI | visprop:label | Substitution |
| `CodebreakersChallengeControls.tsx:30` | UI | visprop:label | Vigenère |
| `CodebreakersChallengeControls.tsx:44` | UI | return | Your own cryptogram: the reading so far |
| `CodebreakersChallengeControls.tsx:45` | UI | return | Cryptogram ${state.current + 1}: ${currentIsSolved(state) ? "solved" : "not solved yet"} |
| `CodebreakersChallengeControls.tsx:45` | UI | intemplate | solved |
| `CodebreakersChallengeControls.tsx:45` | UI | intemplate | not solved yet |
| `CodebreakersChallengeControls.tsx:56` | UI | visattr:label | Cryptogram (✓ is solved) |
| `CodebreakersChallengeControls.tsx:64` | UI | visprop:label | Your own |
| `CodebreakersChallengeControls.tsx:82` | UI | visattr:label | Paste a cryptogram (a change starts again) |
| `CodebreakersChallengeControls.tsx:88` | UI | visattr:label | Kind of cipher (a change starts again) |
| `CodebreakersChallengeControls.tsx:101` | UI | visattr:label | Shift |
| `CodebreakersChallengeControls.tsx:114` | UI | visattr:label | Key so far: ${guessed} cipher letters |
| `CodebreakersChallengeControls.tsx:118` | UI | jsxtext | Rub out |
| `CodebreakersChallengeControls.tsx:118` | UI | jsxchild | this letter |
| `CodebreakersChallengeControls.tsx:121` | UI | jsxtext | Rub out every guess |
| `CodebreakersChallengeControls.tsx:123` | UI | jsxtext | Guess every letter by rank |
| `CodebreakersChallengeControls.tsx:135` | UI | visattr:label | Keyword so far |
| `CodebreakersChallengeControls.tsx:136` | UI | visattr:label | Key length (resets the keyword) |
| `CodebreakersChallengeControls.tsx:138` | UI | visattr:label | Key letter |
| `CodebreakersChallengeControls.tsx:142` | UI | visattr:label | Shift |
| `ShiftList.tsx:11` | UI | jsxtext | Try every shift at once |
| `ShiftList.tsx:18` | UI | visattr:aria-label | Shift ${shift}: ${reading} |
| `SubstitutionBench.tsx:27` | UI | visattr:label | Letter counts in the ciphertext, most common first, over the letters of normal English |
| `SubstitutionBench.tsx:39` | UI | jsxtext | Cipher |
| `SubstitutionBench.tsx:39` | UI | jsxtext | appears |
| `SubstitutionBench.tsx:39` | UI | jsxtext | times. |
| `SubstitutionBench.tsx:40` | UI | jsxchild | You read it as ${plain.toLowerCase()}. |
| `SubstitutionBench.tsx:40` | UI | jsxchild | Pick the plain letter you think it hides. |
| `SubstitutionBench.tsx:43` | UI | jsxchild | Solid bars count the cipher letters. Outlines show normal English. Tap a bar or a letter of the message to work on it. |
| `VigenereBench.tsx:39` | UI | visattr:label | The ciphertext |
| `VigenereBench.tsx:49` | UI | jsxtext | appears twice, |
| `VigenereBench.tsx:49` | UI | jsxtext | letters apart. |
| `VigenereBench.tsx:53` | UI | jsxchild | No run of four letters appears twice in this text, so there is no gap to measure. |
| `VigenereBench.tsx:54` | UI | jsxchild | A keyword of ${keyLength} letters would explain ${fits} of these ${repeats.length} repeats. |
| `VigenereBench.tsx:57` | UI | jsxtext | Key letter |
| `VigenereBench.tsx:57` | UI | jsxtext | of |
| `VigenereBench.tsx:57` | UI | jsxtext | enciphered |
| `VigenereBench.tsx:57` | UI | jsxtext | of the letters. Trying |
| `VigenereBench.tsx:58` | UI | jsxtext | : solid bars are these letters, outlines are ordinary English. |
| `VigenereBench.tsx:62` | UI | visattr:label | Letter counts for key letter ${position + 1} with a shift of ${shift}, compared with English |
| `VigenereBench.tsx:69` | UI | visattr:label | The plaintext so far |

## 2. Shared files

Scanned: `components/CipherPage.tsx`, `components/ClientOnly.tsx`, `components/LanguageToggle.tsx`,
`components/story/Story.tsx`, `components/sim/*.tsx`, `routes/home.tsx`, `root.tsx`, `ciphers/chapters.ts`,
`ciphers/index.ts`, `three/canvasTexture.ts`, `three/useLetterTexture.ts`.

`CipherPage.tsx`, `Story.tsx`, `sim/Fields.tsx`, `routes/home.tsx` and `root.tsx` no longer hold English
literals in the working tree: their text now comes from the `UI` table in `app/i18n.ts`, which already
has Vietnamese for all 30 entries (listed below for review). `three/*` draws only letters handed
to it (DATA). `sim/Board.tsx`, `Caption.tsx`, `Controls.tsx`, `LetterGrid.tsx`, `FrequencyBars.tsx` take
all their text through props, so it is counted under the page that passes it.

Still hard-coded in English:

| Where | Kind | Slot | Text |
|---|---|---|---|
| `ciphers/chapters.ts:7` | UI | visprop:title | The Cipher of Mary Queen of Scots |
| `ciphers/chapters.ts:8` | UI | visprop:summary | Hiding letters, swapping letters, and the invention of codebreaking. |
| `ciphers/chapters.ts:12` | UI | visprop:title | The Anonymous Codebreaker |
| `ciphers/chapters.ts:13` | UI | visprop:summary | The cipher they called unbreakable, the man who broke it, and a buried treasure. |
| `ciphers/chapters.ts:17` | UI | visprop:title | The Mechanization of Secrecy |
| `ciphers/chapters.ts:18` | UI | visprop:summary | Telegrams, two world wars, and machines that do the enciphering. |
| `ciphers/chapters.ts:22` | UI | visprop:title | The Language Barrier |
| `ciphers/chapters.ts:23` | UI | visprop:summary | When the secret is a language: the Navajo code talkers and a lost script. |
| `ciphers/chapters.ts:27` | UI | visprop:title | Alice and Bob Go Public |
| `ciphers/chapters.ts:28` | UI | visprop:summary | Computers, and how two strangers can agree on a secret while everyone listens. |
| `ciphers/chapters.ts:32` | UI | visprop:title | Pretty Good Privacy |
| `ciphers/chapters.ts:33` | UI | visprop:summary | Strong encryption for everyone, and a cipher guarded by the laws of physics. |
| `ciphers/chapters.ts:37` | UI | visprop:title | The Codebreaker's Challenge |
| `ciphers/chapters.ts:38` | UI | visprop:summary | The book ends with cryptograms to crack. Here are four of our own, and the tools to break them. |
| `components/LanguageToggle.tsx:6` | KEEP (language name) | prop:short | EN |
| `components/LanguageToggle.tsx:6` | KEEP (language name) | prop:long | English |
| `components/LanguageToggle.tsx:7` | KEEP (language name) | prop:short | VI |
| `components/LanguageToggle.tsx:7` | KEEP (language name) | prop:long | Tiếng Việt |
| `components/sim/AlphabetRows.tsx:40` | UI | jsxtext | Highlight |
| `components/sim/AlphabetRows.tsx:46` | UI | visattr:aria-label | Highlight ${letter} |

Already bilingual in `app/i18n.ts` (English side shown; Vietnamese exists, review only):

| Where | Text |
|---|---|
| `i18n.ts:46` | The Code Book, interactive |
| `i18n.ts:48` | Try every cipher from Simon Singh's The Code Book, chapter by chapter. |
| `i18n.ts:52` | Every cipher in Simon Singh's book, chapter by chapter. Pick one, read its story and try it yourself. |
| `i18n.ts:55` | Chapters |
| `i18n.ts:56` | Chapter |
| `i18n.ts:57` | After the last chapter |
| `i18n.ts:58` | Full edition |
| `i18n.ts:60` | Pages marked “Full edition” cover ciphers from the full edition of the book that the abridged edition leaves out. |
| `i18n.ts:63` | Back to the menu |
| `i18n.ts:64` | Hide story |
| `i18n.ts:65` | Read the story |
| `i18n.ts:66` | The story |
| `i18n.ts:67` | Other ciphers |
| `i18n.ts:68` | Previous |
| `i18n.ts:69` | Next |
| `i18n.ts:71` | Based on ${source}, by Simon Singh. Retold in our own words. |
| `i18n.ts:74` | Loading the model… |
| `i18n.ts:75` | Language |
| `i18n.ts:77` | Try it |
| `i18n.ts:78` | Challenge |
| `i18n.ts:79` | Your answer |
| `i18n.ts:80` | Check |
| `i18n.ts:81` | Correct. Well done. |
| `i18n.ts:82` | Not yet. Check your setup and try again. |
| `i18n.ts:84` | ${label}: one back |
| `i18n.ts:85` | ${label}: one forward |
| `i18n.ts:87` | Page not found |
| `i18n.ts:88` | That page does not exist. |
| `i18n.ts:89` | Something went wrong |
| `i18n.ts:90` | Reload the page to try again. |

## 3. Engine package (`packages/cipher-engine/src`)

Scanned every non-test `.ts` file the same way. Most engine strings are cipher material. The ones below reach
the screen through a page and need translating. Note that the engine is shared, locale-free code: these
probably want a `{ en, vi }` map in the web app (keyed by the engine's ids) rather than edits in the engine.

### Reaches the screen, translate (63 strings, 141 words)

| Where | Text | Shown by | Note |
|---|---|---|---|
| `hieroglyphs/index.ts:41` | stool | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:42` | loaf of bread | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:43` | lasso | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:44` | lion | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:45` | plinth | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:46` | pair of reeds | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:47` | folded cloth | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:48` | hill slope | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:49` | reed | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:50` | vulture | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:51` | hand | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:52` | mouth | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:53` | basket with a handle | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:54` | ripple of water | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:55` | door bolt | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:56` | sun | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `hieroglyphs/index.ts:57` | three fox skins | hieroglyphs: Glyph aria-label, HieroglyphsBoard/Controls sentences | sign names, put inside English sentences |
| `linear-b/index.ts:86` | of Knossos, said of men | linear-b: "You read it: ${meaning}" | word meanings |
| `linear-b/index.ts:87` | of Knossos, said of women | linear-b: "You read it: ${meaning}" | word meanings |
| `linear-b/index.ts:88` | Knossos, the palace | linear-b: "You read it: ${meaning}" | word meanings |
| `linear-b/index.ts:89` | Amnisos, the harbour of Knossos | linear-b: "You read it: ${meaning}" | word meanings |
| `linear-b/index.ts:90` | Tulissos, another town on Crete | linear-b: "You read it: ${meaning}" | word meanings |
| `linear-b/index.ts:91` | two tripods (Greek tripode) | linear-b: "You read it: ${meaning}" | word meanings |
| `linear-b/index.ts:127` | Amnisos | linear-b: place-name choices | Tripods is a common noun; the three towns are names |
| `linear-b/index.ts:128` | Knossos | linear-b: place-name choices | Tripods is a common noun; the three towns are names |
| `linear-b/index.ts:129` | Tulissos | linear-b: place-name choices | Tripods is a common noun; the three towns are names |
| `linear-b/index.ts:130` | Tripods | linear-b: place-name choices | Tripods is a common noun; the three towns are names |
| `beale/keytexts.ts:77` | The book's example sentence | beale: key-text heading and choice labels | BealeControls has its own SHORT_TITLES for the choice; the board heading uses these |
| `beale/keytexts.ts:88` | Declaration of Independence | beale: key-text heading and choice labels | BealeControls has its own SHORT_TITLES for the choice; the board heading uses these |
| `beale/keytexts.ts:89` | Gettysburg Address | beale: key-text heading and choice labels | BealeControls has its own SHORT_TITLES for the choice; the board heading uses these |
| `beale/keytexts.ts:90` | Constitution, preamble | beale: key-text heading and choice labels | BealeControls has its own SHORT_TITLES for the choice; the board heading uses these |
| `bible-code/texts.ts:38` | Moby-Dick | bible-code: text choice and grid label |  |
| `bible-code/texts.ts:39` | A car park notice | bible-code: text choice and grid label |  |
| `key-escrow/index.ts:136` | Alice | key-escrow: "Who can read the message right now" (joined by useEscrow.inWords) | names Alice/Bob may stay |
| `key-escrow/index.ts:136` | Bob | key-escrow: "Who can read the message right now" (joined by useEscrow.inWords) | names Alice/Bob may stay |
| `key-escrow/index.ts:137` | the police | key-escrow: "Who can read the message right now" (joined by useEscrow.inWords) | names Alice/Bob may stay |
| `key-escrow/index.ts:138` | a thief | key-escrow: "Who can read the message right now" (joined by useEscrow.inWords) | names Alice/Bob may stay |
| `dancing-men/index.ts:65` | on the hip | dancing-men: describe() for figure aria-labels and the board text | ARM_WORDS also maps up→"up", out→"out", down→"down" (line 65, filtered as identifiers but shown) |
| `dancing-men/index.ts:66` | out to the side | dancing-men: describe() for figure aria-labels and the board text | ARM_WORDS also maps up→"up", out→"out", down→"down" (line 65, filtered as identifiers but shown) |
| `dancing-men/index.ts:72` | both arms ${ARM_WORDS[pose.leftArm]} | dancing-men: describe() for figure aria-labels and the board text | ARM_WORDS also maps up→"up", out→"out", down→"down" (line 65, filtered as identifiers but shown) |
| `dancing-men/index.ts:73` | left arm ${ARM_WORDS[pose.leftArm]}, right arm ${ARM_WORDS[pose.rightArm]} | dancing-men: describe() for figure aria-labels and the board text | ARM_WORDS also maps up→"up", out→"out", down→"down" (line 65, filtered as identifiers but shown) |
| `dancing-men/index.ts:76` | both legs ${LEG_WORDS[pose.leftLeg]} | dancing-men: describe() for figure aria-labels and the board text | ARM_WORDS also maps up→"up", out→"out", down→"down" (line 65, filtered as identifiers but shown) |
| `dancing-men/index.ts:77` | left leg ${LEG_WORDS[pose.leftLeg]}, right leg ${LEG_WORDS[pose.rightLeg]} | dancing-men: describe() for figure aria-labels and the board text | ARM_WORDS also maps up→"up", out→"out", down→"down" (line 65, filtered as identifiers but shown) |
| `pigpen/index.ts:89` | , with a dot | pigpen: describe() for symbol aria-labels and counts | interpolates the Side tokens left/right/top/bottom and joins with " and ": needs a word map |
| `pigpen/index.ts:90` | a V shape that opens to the ${glyph.opens}${dot} | pigpen: describe() for symbol aria-labels and counts | interpolates the Side tokens left/right/top/bottom and joins with " and ": needs a word map |
| `pigpen/index.ts:91` | a closed box${dot} | pigpen: describe() for symbol aria-labels and counts | interpolates the Side tokens left/right/top/bottom and joins with " and ": needs a word map |
| `pigpen/index.ts:92` | lines on the ${glyph.walls.join(", ").replace(/, ([a-z]+)$/, " and $1")}${dot} | pigpen: describe() for symbol aria-labels and counts | interpolates the Side tokens left/right/top/bottom and joins with " and ": needs a word map |
| `zimmermann/index.ts:51` | STOP | zimmermann: German column of the codebook | the only English in the German column |
| `zimmermann/index.ts:51` | (full stop) | zimmermann: German column of the codebook | the only English in the German column |
| `navajo/index.ts:79` | hummingbird | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:80` | buzzard | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:81` | chicken hawk | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:82` | swallow | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:83` | whale | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:84` | small whale | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:85` | shark | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:86` | iron fish | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:87` | frog | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:88` | tortoise | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:89` | potatoes | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:90` | eggs | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:91` | cliff dwelling | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |
| `navajo/index.ts:92` | our mother | navajo: NavajoBoard/NavajoControls show term.meaning | lexicon gloss of the Navajo word; translate |

### Reaches the screen, keep as DATA

| Where | What | Why it stays |
|---|---|---|
| `navajo/index.ts:29-54` | Alphabet glosses `ant, bear, cat, deer, elk, fox, goat, horse, ice, jackass, kid, lamb, mouse, nut, owl, pig, quiver, rabbit, sheep, turkey, Ute, victor, weasel, cross, yucca, zinc` and the Navajo words | The code spells a letter by the English word's first letter (NavajoBoard.tsx:14 says so). A Vietnamese gloss can be added beside them, not instead. |
| `navajo/index.ts:79-92` | Military terms `FIGHTER PLANE … AMERICA` and Navajo words | Plaintext vocabulary the reader types; Navajo words are the code. |
| `zimmermann/index.ts:30-52` | English `word` and German `german` columns (e.g. `MOST SECRET` / `ganz geheim`) | Codebook entries; the English word is what the reader enciphers. |
| `beale/keytexts.ts:12-67, 78-80` | Declaration of Independence, Gettysburg Address, Constitution preamble, the book's example sentence | Key texts: the cipher numbers their words by first letter. |
| `bible-code/texts.ts:9-31` | Moby-Dick opening, car park notice | The letter sequences searched for hidden words. |
| `pinprick/index.ts:11-12` | Newspaper paragraph ("Fine weather brought a big crowd…") | Cover text the pins mark letters in. |
| `hieroglyphs/index.ts:83, 89, 104, 108` | Ptolemy, Cleopatra, Alexander, Rameses | Proper names whose sounds the glyphs spell; Vietnamese uses the same spellings. |
| `babbage/intercepts.ts`, `codebreakers-challenge/*.ts`, `frequency-analysis/sample.ts`, `kama-sutra`, `purple/message.ts`, `enigma/*`, `mary-queen-of-scots/nomenclator.ts`, `adfgvx`, `vigenere`, `quantum`, `text/index.ts` | Ciphertexts, plaintexts, alphabets, wirings, nomenclator symbols | Cipher data. |

### Does not reach the screen

| Where | Text | Why |
|---|---|---|
| `enigma/toy.ts:44` | The six-letter machine has no key "${key}" | Thrown `Error`; nothing in `apps/web/app` catches it, the pages only pass valid input, and the root error boundary shows its own (already bilingual) message. Leave in English. |
| `digital-signatures/index.ts:40` | e shares a factor with p - 1 or q - 1 | Thrown `Error`; nothing in `apps/web/app` catches it, the pages only pass valid input, and the root error boundary shows its own (already bilingual) message. Leave in English. |
| `pgp/index.ts:47` | e shares a factor with (p - 1)(q - 1) | Thrown `Error`; nothing in `apps/web/app` catches it, the pages only pass valid input, and the root error boundary shows its own (already bilingual) message. Leave in English. |
| `hieroglyphs/index.ts:41-57` `gardiner` | Gardiner numbers (`Q3`, `M17 twice`…) | Not referenced by the web app. |
| `cipher-disc`, `codebreakers-challenge`, `hidden-writing`, `enigma/machine.ts` | Mode and kind ids (`fixed`, `stepping`, `caesar`, `substitution`, `wax`, `ink`, `thorough`, `in`, `out`) | Ids; the web app maps them to its own labels, which are listed under each page. |

### Interpolated tokens to watch

Some English sentences in the web app splice in an id or a word chosen by code. A translator must translate
the whole sentence and supply a word map for the spliced part:

- `ciphers/hidden-writing/useHiddenWriting.ts:75-78`: `thing` is "tablet"/"sheet".
- `ciphers/linear-b/labels.ts:29-39`: `line` is the id "row"/"column" used as an English word, plus plural `${line}s`; `part` is "consonant"/"vowel".
- `ciphers/playfair/PlayfairBoard.tsx:19-30`: "right"/"left", "below"/"above".
- `ciphers/dancing-men/DancingMenBoard.tsx:108-109`: "word"/"words" plural choice.
- `ciphers/bible-code/BibleCodeBoard.tsx:12`, `BibleCodeControls.tsx:17`: "down", "once", "${n} times".
- `ciphers/morse/MorseBoard.tsx:55-56`: "now"/"sent".
- `ciphers/enigma/EnigmaControls.tsx:10,197`: stage names and `${props.label.toLowerCase()} rotor`.
- `ciphers/key-escrow/useEscrow.ts:71-76`: English list joining (`A, B and C`).
- `ciphers/cracking-enigma/ChainsBoard.tsx:9`: English ordinals `1st … 6th`.
- Engine `pigpen/index.ts:92` (Side ids joined with " and ") and `dancing-men/index.ts:65-77` (ARM/LEG words).

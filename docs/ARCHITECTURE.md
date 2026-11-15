# Architecture

How the site is put together, and why. For the rules a cipher page must follow, see [STANDARDS.md](STANDARDS.md). For how a page looks and behaves, see [DESIGN.md](DESIGN.md).

## What it is

A static website. There is no server, no database and no sign-in. The build turns every page into an HTML file, and any static host can serve the result. All cipher logic runs in the reader's browser.

This follows from three goals:

- **Free to run.** Static files cost nothing to host.
- **Works on phones now, becomes a phone app later.** The same build can be wrapped in a native shell.
- **One person can maintain it.** Adding a cipher means adding two folders and nothing else.

## The stack

| Part | Choice | Why |
|---|---|---|
| Language | TypeScript, strict | Catches mistakes in cipher code at compile time |
| Site framework | React 19 with React Router 8 in framework mode (`ssr: false`, `prerender: true`) | One static HTML file per page, deep links to every cipher, no server |
| Build tool | Vite 8 | Fast builds; splits code per route |
| Story text | MDX | Prose with a few interactive blocks in it |
| 3D | three.js through React Three Fiber and drei | The 3D models are React components like everything else |
| Styles | CSS Modules and design tokens in `app.css` | No runtime, no UI library to keep up with |
| Tests | Vitest | Runs the engine tests in under a second |
| Packages | npm workspaces | Already installed; no extra tooling |

The research behind these choices is in [reports/Cipher simulator tech stack.md](../reports/Cipher%20simulator%20tech%20stack.md).

## Layout of the repository

```
packages/cipher-engine/      The cipher logic. Pure TypeScript.
  src/<slug>/index.ts          One folder per cipher
  src/text/index.ts            Shared letter helpers
  test/<slug>.test.ts          One test file per cipher

apps/web/                    The website
  app/routes.ts                Finds every cipher page
  app/routes/home.tsx          The menu
  app/app.css                  Design tokens and element defaults
  app/ciphers/
    types.ts, chapters.ts      What a cipher and a chapter are
    index.ts                   Collects every cipher into the menu
    <slug>/                    One folder per cipher page
  app/components/
    CipherPage.tsx             The page frame every cipher uses
    sim/                       The kit for 2D simulators and controls
    story/                     The blocks a story can use
  app/three/                   Helpers for 3D lettering

docs/                        Standards, coverage, design, architecture
scripts/check-coverage.mjs   Checks docs/COVERAGE.md against the pages
reports/                     The research behind the stack and the template
```

## The three layers

Every cipher is split into three layers. Each layer knows only about the one below it.

```
View      <Cipher>Board.tsx, <Cipher>Controls.tsx, scene/     draws state, sends actions
  |
State     use<Cipher>.ts                                      a reducer: (state, action) -> state
  |
Engine    @codebook/cipher-engine/<slug>                      pure functions, no DOM
```

### Engine

Plain functions: text and a key go in, text comes out. The engine imports nothing from React, three.js or the browser, and it never makes its own random numbers. A caller that needs randomness passes the values in. This keeps every function testable and repeatable.

The site imports one cipher at a time, as `@codebook/cipher-engine/<slug>`. The package's `exports` map sends `./*` to `./src/*/index.ts`, so a new engine folder needs no registration.

Because the engine has no web code in it, a future native app can reuse it unchanged.

### State

Each page has one reducer in `use<Cipher>.ts`. It holds what the reader has set and typed, and nothing that can be worked out from that. The output is computed from the state by calling the engine, never stored.

One action, `load`, replaces the whole state with a preset. That is how the story drives the simulator.

### View

The board and the controls receive the state and a `dispatch` function. They hold no cipher logic. A 3D scene is just another view of the same state, so every action on a model also exists as an HTML control.

## One cipher page

A page is a folder in `apps/web/app/ciphers/`:

| File | Job |
|---|---|
| `meta.ts` | Title, era, chapter, order, hook, source. Puts the page in the menu. |
| `use<Cipher>.ts` | The reducer |
| `presets.ts` | Named states the story's buttons load |
| `<Cipher>Board.tsx` or `scene/` | The simulator |
| `<Cipher>Controls.tsx` | The HTML controls |
| `story.mdx` | The story, in the eight parts of the template |
| `route.tsx` | Joins the parts inside `<CipherPage>` |

`route.tsx` is the only place where the parts meet:

```tsx
const [state, dispatch] = useCaesar(PRESETS.caesar!);

<CipherPage
  meta={caesar}
  stage={<CaesarBoard state={state} onPick={...} />}
  controls={<CaesarControls state={state} dispatch={dispatch} />}
  story={
    <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
      <StoryText components={STORY_BLOCKS} />
    </Story>
  }
/>
```

### How the story drives the simulator

1. The story contains `<Try action="dayKey" button="Set the day key for me">`.
2. The reader presses the button. `Try` calls the `onAction` it gets from `<Story>`, with the name `dayKey`.
3. The route looks up `PRESETS.dayKey` and dispatches `load`.
4. The reducer returns the preset as the new state. The board and controls redraw.

The story never reaches into the simulator, and the simulator knows nothing about the story. They share only preset names.

## How pages register themselves

No file lists the ciphers. Two lookups find them:

- **The menu.** `ciphers/index.ts` uses `import.meta.glob("./*/meta.ts")` to collect every `meta.ts`, sorts by chapter and order, and groups them under the chapters in `chapters.ts`. It also gives each page its previous and next links.
- **The routes.** `routes.ts` reads the `ciphers/` folder at build time. Every folder with a `route.tsx` becomes `/ciphers/<slug>`.

So adding a cipher never means editing a shared file. A new route folder does need a restart of the dev server.

## Two languages

The site is in English and Vietnamese. English pages live at `/…` and Vietnamese pages at `/vi/…`.

- **One route, two addresses.** Every route is declared with an optional segment, `vi?/ciphers/<slug>`, so both addresses use the same route. Switching language changes the address but keeps the page mounted, and the simulator keeps its state.
- **The address decides the language.** `useLocale()` in `app/i18n.ts` reads it from the path. There is no language state to keep in step.
- **The toggle** (`components/LanguageToggle.tsx`) sits at the top right of every page. It links to the same page in the other language and remembers the choice in the browser. On the first page of a later visit, a reader who chose Vietnamese is sent to the Vietnamese address.
- **What gets translated, and where:**

| Text | Where the Vietnamese lives |
|---|---|
| Page frame, menu, story blocks, shared fields | `UI` in `app/i18n.ts` |
| A cipher's title, era, hook, first step, source | The `vi` field of its `meta.ts` |
| Chapter titles and summaries | The `vi` field in `chapters.ts`; titles follow the Vietnamese edition of the book |
| The story | `story.vi.mdx` beside `story.mdx`. Same parts, same button actions, same challenge answers. Retold from the Vietnamese edition, not translated from our English (see below). |
| Labels and captions in a cipher's board and controls | Inline, as `t({ en: "…", vi: "…" })` with `const t = useT()` |

- **Cipher data is not translated.** Example messages, keys and challenge answers stay as the book gives them, in A to Z. The Vietnamese text explains what they mean.
- **Links in a story stay in its language.** `<Story>` turns `/ciphers/…` links into `/vi/ciphers/…` on Vietnamese pages.

- **The Vietnamese follows the Vietnamese edition.** Each Vietnamese story is retold from *Mật mã: Từ cổ điển đến lượng tử* (NXB Trẻ), the way the English stories are retold from the English book: its terms, its spelling of names, its examples and details, in our own sentences. Each `meta.ts` cites the edition's chapter or appendix. Where the edition's facts differ from our English, the page keeps our English fact; the differences are listed in [i18n/vi-edition-differences.md](i18n/vi-edition-differences.md).
- **No copied sentences.** The edition is copyrighted and this repository is public. `npm run check:vi-copy` compares the Vietnamese text with the edition's text and fails on any run of 10 or more words in common. The edition's text is kept out of the repository: extract it to `resource/vi-book/full.txt` (git-ignored) to run the check; without it the check is skipped.

`npm run check:i18n` checks that every page has a Vietnamese story with the same shape as the English one. The wording rules, taken from the edition, are in [i18n/vi-glossary.md](i18n/vi-glossary.md); the brief the writers worked from is [i18n/WRITER-BRIEF.md](i18n/WRITER-BRIEF.md).

## The build

`npm run build` does this:

1. Reads the routes and renders each one, in both languages, to `build/client/<path>/index.html` and `build/client/vi/<path>/index.html`. The story text is in the HTML, so pages can be read and indexed before any script runs.
2. Splits the JavaScript per route. A reader of the Caesar page never downloads three.js.
3. Writes a fallback page for addresses that were not prerendered.

3D scenes cannot be drawn at build time. They sit inside `<ClientOnly>`, which shows a placeholder in the HTML and loads the scene in the browser.

## How we know it is right

| Check | Command | What it proves |
|---|---|---|
| Engine tests | `npm test` | Each cipher matches a published example, and each page's challenge has the stated answer |
| Types | `npm run typecheck` | Engine and site agree on every call |
| Translation | `npm run check:i18n` | Every page has a Vietnamese story with the same parts, buttons, answers and links as the English one |
| Own words | `npm run check:vi-copy` | No run of 10 or more words is copied from the Vietnamese edition (needs the edition's text in `resource/vi-book/`) |
| Coverage | `npm run check:coverage` | Every item in [COVERAGE.md](COVERAGE.md) names a page that exists and contains the quoted words |
| Build | `npm run build` | Every page renders to HTML |

Published examples come from the book where it has a worked one, and from named outside sources otherwise. The source is written in a comment next to the test.

## Not built yet

| Item | Plan |
|---|---|
| Saved progress | Kept in the browser; export and import as a file |
| Offline use | A service worker, with `vite-plugin-pwa` |
| Phone app | A Capacitor wrapper around the same build |
| Lost WebGL context on iOS | Detect it and rebuild the canvas. State already lives outside the scene, so nothing is lost. |

The full list is in section 8 of [STANDARDS.md](STANDARDS.md).

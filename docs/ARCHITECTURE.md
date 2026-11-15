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

## The build

`npm run build` does this:

1. Reads the routes and renders each one to `build/client/<path>/index.html`. The story text is in the HTML, so pages can be read and indexed before any script runs.
2. Splits the JavaScript per route. A reader of the Caesar page never downloads three.js.
3. Writes a fallback page for addresses that were not prerendered.

3D scenes cannot be drawn at build time. They sit inside `<ClientOnly>`, which shows a placeholder in the HTML and loads the scene in the browser.

## How we know it is right

| Check | Command | What it proves |
|---|---|---|
| Engine tests | `npm test` | Each cipher matches a published example, and each page's challenge has the stated answer |
| Types | `npm run typecheck` | Engine and site agree on every call |
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

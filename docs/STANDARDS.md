# Standards for The Code Book, interactive

Every cipher page follows this document. Two pages are the references. When a rule is unclear, look at how they do it:

- `apps/web/app/ciphers/caesar/` for a page with a 2D simulator. Most pages are like this.
- `apps/web/app/ciphers/enigma/` for a page with a 3D model.

The reasons behind the content and UI rules are in `reports/Cipher page content template.md`. The reasons behind the tech choices are in `reports/Cipher simulator tech stack.md`.

Contents:

1. [Project layout](#1-project-layout)
2. [Coding standard](#2-coding-standard)
3. [Content standard: the page template](#3-content-standard-the-page-template)
4. [UI and UX standard](#4-ui-and-ux-standard)
5. [3D standard](#5-3d-standard)
6. [How to add a cipher](#6-how-to-add-a-cipher)
7. [Checklist before a cipher is done](#7-checklist-before-a-cipher-is-done)
8. [Not built yet](#8-not-built-yet)

## 1. Project layout

```
packages/cipher-engine/        Pure TypeScript. All cipher logic and its tests. No DOM, no React.
  src/text/                    Letter helpers shared by every cipher.
  src/<slug>/index.ts          One folder per cipher, named like its page.
  test/<slug>.test.ts
apps/web/                      The website (React Router, prerendered to static HTML).
  app/app.css                  Design tokens and element defaults. Nothing else is global.
  app/routes.ts                Finds the pages by itself. Do not edit it to add a cipher.
  app/routes/home.tsx          The menu: the chapters of the book and their ciphers.
  app/components/              Parts shared by every cipher page.
    CipherPage.tsx             The page layout: simulator, controls, story panel.
    story/Story.tsx            The blocks a story may use (Try, Check, Challenge, ...).
    sim/                       The kit for 2D simulators and controls (see section 4).
  app/three/                   Helpers shared by 3D scenes.
  app/ciphers/chapters.ts      The chapters of the book.
  app/ciphers/index.ts         Collects every cipher's meta.ts into the menu.
  app/ciphers/<slug>/          Everything that belongs to one cipher.
    meta.ts                    Title, era, chapter, order, hook, first step, source.
    route.tsx                  Wires state, simulator, controls and story into CipherPage.
    story.mdx                  The article.
    use<Cipher>.ts             The page's state: a reducer over the engine.
    presets.ts                 Named setups that story buttons can load.
    <Cipher>Board.tsx          The 2D simulator, or
    scene/                     the 3D model.
    <Cipher>Controls.tsx       The HTML controls.
docs/STANDARDS.md              This file.
```

Commands, all run from the repository root:

| Command | What it does |
|---|---|
| `npm install` | Installs everything |
| `npm run dev` | Starts the site at http://localhost:5173 |
| `npm test` | Runs the engine tests |
| `npm run typecheck` | Type-checks both packages |
| `npm run build` | Builds the static site into `apps/web/build/client` |

## 2. Coding standard

### The three layers

Code lives in one of three layers. A layer may only import from the layers above it in this table.

| Layer | Where | Knows about | Must not |
|---|---|---|---|
| Engine | `packages/cipher-engine` | Letters, keys, maths | Import React, three.js or anything from the browser |
| State | `use<Cipher>.ts` | The engine | Draw anything |
| View | Controls, scenes, story | State, passed in as props | Contain cipher logic or keep cipher state |

The engine's `tsconfig.json` has no `"DOM"` library, so the compiler rejects browser code there. This is what lets a future phone app reuse the engine unchanged.

### Engine rules

- **Pure functions only.** Settings and state go in, new state comes out. Nothing is mutated and nothing is stored.
- **Plain data.** State is made of strings, numbers and arrays, so it can be saved as JSON later.
- **Return the working, not only the answer.** `pressKey` returns a `trace` of every stage the current passes through. Each cipher should expose the steps a page might want to show.
- **Test against history.** Every cipher has at least one test taken from a published source: a known test vector or a real message. Name the source in the test.
- **Cite data.** Wiring tables, alphabets and the like carry a comment saying where they came from.
- **No randomness inside.** A cipher that needs chance (a one-time pad, photons) takes the random values as an argument or a seed. The view makes them and keeps them in state.
- **One folder, one import.** The site imports a cipher as `@codebook/cipher-engine/<slug>` and the shared helpers as `@codebook/cipher-engine/text`.

### State rules

- One reducer per cipher, in `use<Cipher>.ts`. It is the only place that calls the engine to change state.
- Actions are named after what the user did: `press`, `turn`, `plug`. Not `setPositions`.
- A change of setup starts a new message. Follow the `newMessage` helper in `useEnigma.ts`.
- The state must survive the 3D canvas being destroyed and rebuilt. So nothing about the cipher lives inside a scene.

### View rules

- A view receives state and callbacks as props. It shows the first and calls the second.
- The only state a view may keep is about itself: a key being held down, a panel being open.
- Load every 3D scene with `lazy()` and wrap it in `<ClientOnly>`. three.js is large and cannot run while pages are built.

### TypeScript and style

- Strict mode is on, with `noUncheckedIndexedAccess`. Do not use `any`. Use `!` only where the line above makes it obvious why the value exists.
- No default exports, except where a tool needs one: route modules, lazily loaded scenes and config files.
- One component per file, unless a helper is small and used only in that file (see `Stepper` in `EnigmaControls.tsx`).
- Keep functions short enough to read without scrolling. If a function needs a comment for each block, split it.
- No magic numbers in components. Sizes and positions of a model go in its `scene/layout.ts`. Colours and spacing in the UI come from the tokens.
- Prefer no dependency. Add one only when it removes more code than it adds risk, and say why in the commit.

### Naming

| Thing | Style | Example |
|---|---|---|
| Component file | PascalCase | `EnigmaControls.tsx` |
| Hook file | camelCase starting with `use` | `usePlugPicker.ts` |
| Other file | camelCase | `layout.ts` |
| Style file | Same name as its component | `EnigmaControls.module.css` |
| Cipher folder and URL | lowercase, hyphens | `one-time-pad` |
| Constant | UPPER_SNAKE | `MAX_CABLES` |

Use the words the book uses, in the user's view of the machine: rotor, reflector, plugboard, lamp, key. In code, "key" as a setting is `settings`; "key" as a button is `key`.

### Comments

- Every exported function, type and component has a one-line `/** ... */` saying what it is for.
- Inside a function, comment only the "why": a historical quirk, a trick of geometry, a browser limit.
- Write comments for a reader who knows TypeScript but has never seen the cipher.

### Styles

- Component styles go in a CSS module beside the component. `app.css` holds tokens and element defaults only.
- Use the tokens (`var(--space-4)`, `var(--color-accent)`). Do not write raw colours or pixel sizes in a module. The one exception is a colour used once for a state, such as the green of a right answer.
- Write phone styles first. Add wide-screen changes inside `@media (min-width: 60rem)`.
- No CSS framework and no CSS-in-JS.

## 3. Content standard: the page template

### The parts, in order

Every `story.mdx` has these eight parts in this order. Each starts with a `<Label>` carrying the fixed name, then a `##` heading written for that page.

| # | Label | Words | What goes in it |
|---|---|---|---|
| 0 | (Standfirst) | 16 or fewer | One sentence that makes the reader want the rest. Same text as `meta.hook`. |
| 1 | The hook | 80 to 120 | One moment with people in it. End on a question about how the cipher works. |
| 2 | Try it | 40 to 60 | Ask for a guess. Then one tiny task on the simulator, in a `<Try>`. Then a `<Check>` with what happened. |
| 3 | How it works | 100 to 150 per segment, 2 to 5 segments | One `###` per part of the mechanism. Each segment has something to do on the simulator. This is the only part that grows with the cipher. |
| 4 | The story | 130 to 180 | Who made it and who used it. Keep only history that explains the mechanism or its weakness. Put the rest in a `<DigDeeper>`. |
| 5 | How it was broken | 150 to 250 | The weakness and the people who found it. Let the reader do one step of the attack. |
| 6 | Challenge | short | One `<Challenge>` set inside the story. Optional for the reader. One recall `<Check>` after it. |
| 7 | What came next | 80 to 120 | The lesson, and the weakness that led to the next cipher. Link to that cipher's page. |
| 8 | Further reading | 2 to 4 items | Start with the chapter of The Code Book. |

Aim for 900 to 1,200 words in total. A simple cipher such as Caesar needs about 700. Enigma, the most complex, has about 1,500 including its collapsed extras.

### Why this order

- **Story first, then hands on within about 100 words.** A human moment starts interest; a question keeps it; a quick prediction and a tiny task turn the reader into a participant.
- **Try before the explanation.** People learn more when they attempt something first and are told why afterwards.
- **Short, labelled segments.** Readers scan. Clear headings let them, and short segments are easier to learn from than one long block.
- **History that carries the idea stays; colour is collapsed.** Interesting but unrelated facts lower learning, most of all for newcomers.
- **Nothing important behind a click.** Most readers do not click. Core text is always visible in the panel. Only extras are collapsed.

### The story blocks

Use plain Markdown plus these. Do not add a new block without adding it here.

| Block | Use it for | Rules |
|---|---|---|
| `<Standfirst>` | The opening sentence | Once, at the top |
| `<Label>` | The fixed part name | Before every `##` |
| `<Try>` | Something to do on the simulator | Say exactly what to press and what to watch. Add `action` and `button` to load a preset from `presets.ts`. |
| `<Check question>` | A question the reader answers in their head | The answer explains why, not just what. At most four per page. |
| `<DigDeeper title>` | Extra history or detail | The page must make sense with every one of these closed |
| `<Challenge answer>` | The one puzzle | Generate the ciphertext with the engine, never by hand |

### Writing rules

- Write for a curious 13-year-old. Short sentences: 25 words at most, one idea each.
- Speak to the reader as "you". Use active verbs.
- Explain a term the first time it appears, and put it in **bold** that once.
- Put letters, keys and cipher text in `code` style: `WETTER`.
- Headings say what the section tells you ("Repetition is the enemy"), not what kind of section it is.
- No fun facts for their own sake. Every anecdote must explain the mechanism, the weakness or the stakes.
- Never say only "click": some readers tap. Say "press", "pick" or "tap".

### Sources and copyright

- The facts come from The Code Book. **The words must be ours.** Do not copy sentences from the book. Quote at most one short phrase per page, in quotation marks.
- The PDF in `resource/` is the abridged edition. For ciphers that appear only in the full edition, set `fullEditionOnly` in `meta.ts`, check each fact against a second source and list it in Further reading.
- Dates, names and numbers must match the book or a named source. Leave out what you cannot check.
- Each page ends with the credit line that `CipherPage` adds from `meta.source`.

## 4. UI and UX standard

### Layout

Every cipher page is a `<CipherPage>`. Do not build a page layout by hand.

- **The page fills the screen and does not scroll.** Only the story panel and the controls scroll, inside themselves. This keeps the simulator in view while reading, and means a drag on the model never fights a page scroll.
- **Phone (under 60rem wide):** header, simulator, controls, then the story as a sheet over the bottom half. While the story is open the controls shrink to their first row.
- **Wide screens:** simulator and controls on the left, story in a panel on the right, 30rem wide.
- **The story is open when the page loads.** The header button folds it away and brings it back.
- The first row of the controls must hold what the reader needs while reading: the state of the machine and its output.

### Design tokens

All values come from `app/app.css`.

| Group | Tokens | Use |
|---|---|---|
| Workshop colours | `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-border`, `--color-text`, `--color-text-muted` | The dark area around a simulator |
| Brass | `--color-accent`, `--color-accent-ink` | Links, the main button, anything the reader can act on |
| Lamp | `--color-lamp` | Cipher output only |
| Paper | `--color-paper`, `--color-paper-edge`, `--color-ink`, `--color-ink-muted`, `--color-ink-accent` | The story panel |
| Fonts | `--font-ui`, `--font-story`, `--font-cipher` | Controls; story text; any letters that are cipher input or output |
| Sizes | `--text-sm` to `--text-2xl` | Nothing smaller than `--text-sm`, except a badge |
| Space | `--space-1` to `--space-8` | Multiples of 4px |
| Touch | `--tap` (44px) | Smallest size of anything tappable |

UI and cipher fonts are the device's own. The story font, Literata, ships with the site (`@fontsource-variable/literata`) because device serifs draw Vietnamese stacked marks badly. Never load fonts from a CDN: the site must work offline.

### Interaction

- **Every action on a model also exists as an HTML control.** The 3D model is for delight; the HTML controls are for everyone. Enigma's rotors can be turned on the model or with the ▲▼ buttons.
- **No action needs a drag.** Dragging turns the camera, nothing else. Everything the cipher needs is a tap.
- **The simulator starts in a useful state.** A reader who never touches it should still see something that makes sense.
- **Show the result as text.** What the cipher produced appears in the controls as real text, not only as a lamp or a picture.
- **The story drives the simulator through buttons.** A `<Try>` button loads a preset. Scrolling never changes the simulator.
- **A change of setup resets the message.** Say so in the control's label if it could surprise.
- No points, streaks, badges or leaderboards. No sign-in.

### Accessibility

Target: WCAG 2.2 level AA.

- Everything works with a keyboard. Focus is always visible (the global `:focus-visible` style).
- Tappable things are at least 44px in the controls and the story.
- Text contrast is at least 4.5 to 1. The token pairs above meet this; new pairs must be checked.
- Give every control a name: visible text, or `aria-label` when it is only a symbol.
- The 3D canvas is hidden from screen readers (`aria-hidden`). The HTML controls carry the meaning.
- Output that changes uses `aria-live="polite"`.
- Use real elements: `<button>`, `<details>`, `<label>`, `<output>`. Do not rebuild them from `<div>`.
- Respect `prefers-reduced-motion`. The global rule switches off transitions; scenes must not add motion that ignores it.
- The page must work at 320px wide and at 200% zoom.

### The simulator kit

2D simulators and all controls are built from `app/components/sim/`. Use these before writing your own. If a page needs something else, build it inside the cipher's folder; move it into the kit when a second page needs it.

| Part | Use it for |
|---|---|
| `Board` | The stage of a 2D simulator. Centres its content and scrolls when it is too big. |
| `Controls`, `Row`, `Button` | The frame of the HTML controls. The first `Row` holds the state and the output. |
| `TextField`, `Output` | Typing a message or key; showing what the cipher produced. |
| `Stepper`, `Choice` | A number or letter to step through; a choice such as Encipher or Decipher. |
| `AlphabetRows` | A plain alphabet above one or more cipher alphabets. |
| `LetterGrid` | Any grid of letters: a Vigenère square, a Playfair square, a transposition table. |
| `FrequencyBars` | Letter counts, with normal English behind them to compare. |
| `Caption`, `Letters` | A line of explanation on the board; cipher letters inside text. |

### Words in the interface

- Sentence case everywhere: "Back to start", not "Back To Start".
- Buttons say what they do: "Set the day key for me".
- Plain words. "Set up the machine", not "Configuration".

## 5. 3D standard

- **Build models from code where possible.** Boxes, cylinders and tubes cover most historical devices. Use a Blender model only when shape is the point.
- **Letter with `canvasTexture`** (`app/three/`). No font files, no image downloads.
- **Positions and sizes live in `scene/layout.ts`.** A component reads them; it does not invent numbers.
- **One component per physical part**: `Keyboard`, `Lampboard`, `Rotors`, `Plugboard`. The scene file only arranges them.
- **Render on demand.** `<Canvas frameloop="demand">`. If you change a texture by hand, call `invalidate()`.
- **Budget per scene:** under 100 draw calls and under 200,000 triangles. Use an `instancedMesh` for many copies of one shape (the 26 plugboard sockets). No shadows and no post-processing.
- **Cap pixel ratio at 2**: `dpr={[1, 2]}`.
- **Camera:** fit the model to the canvas whatever its shape (`FitCamera`). Limit the orbit so the model cannot be lost. No panning.
- **Pointer events:** call `event.stopPropagation()` so one tap hits one part.

The budget numbers are estimates. Measure on a real phone before relying on them.

## 6. How to add a cipher

1. **Engine.** Add `packages/cipher-engine/src/<slug>/index.ts`. Write the tests first, with at least one from a published source.
2. **Folder.** Create `apps/web/app/ciphers/<slug>/` with `meta.ts`. Give it the chapter it belongs to and its place in that chapter. That is all the menu needs.
3. **State.** Write `use<Cipher>.ts`: the state type, the actions and the reducer.
4. **Controls.** Write `<Cipher>Controls.tsx`. Make the whole cipher usable from here before any 3D exists.
5. **Simulator.** Write `<Cipher>Board.tsx` from the kit, or add `scene/` for a 3D device.
6. **Story.** Write `story.mdx` to the template in section 3. Add the presets its buttons need.
7. **Route.** Write `route.tsx` (copy Caesar's). The page appears at `/ciphers/<slug>` once the file exists; restart the dev server to see a new one.
8. **Check.** Go through the list below.

## 7. Checklist before a cipher is done

- [ ] `npm test`, `npm run typecheck` and `npm run build` pass.
- [ ] The engine folder imports nothing from React, three.js or the browser.
- [ ] One test uses a historical or published example, with its source named.
- [ ] The story has all eight parts in order, and is within the word counts.
- [ ] No sentence is copied from the book. Every date, name and number has been checked.
- [ ] The challenge was generated by the engine, a test proves its answer, and it was solved once by hand on the page.
- [ ] Every action works from the HTML controls alone, using only the keyboard.
- [ ] The page works at 375px wide with the story open and closed.
- [ ] The built `index.html` for the page contains the story text.
- [ ] The browser console shows no errors.

## 8. Not built yet

These were chosen in the tech stack report but are not built yet.

| Item | Plan |
|---|---|
| Saved progress | Zustand with a storage adapter, plus export and import of a progress file |
| Offline use | `vite-plugin-pwa` |
| `packages/sims` | Move simulators out of the app only if a second app needs them |
| Phone sheet with three heights | Today the story is open or closed. Test peek, half and full heights on real phones. |
| Captions on the simulator | One short caption per step, for readers who never open the story |
| Lost WebGL context on iOS | Detect it and rebuild the canvas. State already lives outside the scene. |
| Phone app | Capacitor wrapper around a single-page build |

Two things differ from the tech stack report on purpose, to keep the prototype simple:

- **npm workspaces, not pnpm.** npm was already installed. The layout is the same, so switching later is small.
- **`meta.ts`, not frontmatter checked by Zod.** A typed object gives the same safety at compile time with no extra packages.

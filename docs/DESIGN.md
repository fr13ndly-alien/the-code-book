# Design

What the site is for, how a page is laid out, and why it looks the way it does. For how the code is organised, see [ARCHITECTURE.md](ARCHITECTURE.md). For the exact rules, see [STANDARDS.md](STANDARDS.md).

## The idea

Simon Singh's *The Code Book* tells the history of secret writing as a contest between people who make ciphers and people who break them. This site lets a reader operate each cipher while reading its story.

Three principles shape everything:

1. **Show the mechanism.** A simulator is not a box that turns text into text. The reader sees the alphabet slide, the grid fill, the rotor turn, and so understands why the output is what it is.
2. **Do first, then explain.** Each page asks for a guess and a small task before it explains anything.
3. **The book's order is the site's order.** The menu follows the chapters, and every page ends by leading to the next cipher in the story.

The reader we write for is a curious 13-year-old on a phone.

## The menu

The home page is the contents page of the book: six chapters, then the Codebreaker's Challenge that follows the last one. Under each chapter are its ciphers in the order the book tells them. Each entry shows the title, the era and one sentence to draw the reader in.

A "Full edition" badge marks ciphers that appear in the full edition of the book but not in the abridged one.

Every cipher page links to the one before and the one after, so the site can be read from start to finish like the book.

## A cipher page

Every page has the same three parts.

| Part | What it is |
|---|---|
| **Simulator** | The cipher as a thing to operate: a 2D board, or a 3D model for Enigma and the scytale |
| **Controls** | Ordinary buttons and text boxes. The first row always shows the key and the output as text. |
| **Story** | The text, in eight fixed parts, with buttons that set up the simulator |

### On a phone

```
+----------------------+
| header        [Story]|
+----------------------+
|                      |
|      simulator       |
|                      |
+----------------------+
| key and output       |
+----------------------+
|                      |
|   story (a sheet,    |
|   scrolls inside)    |
+----------------------+
```

### On a wide screen

```
+---------------------------+--------------+
| header                                   |
+---------------------------+--------------+
|                           |              |
|        simulator          |    story     |
|                           |   (scrolls   |
+---------------------------+    inside)   |
| controls                  |              |
+---------------------------+--------------+
```

**The page itself never scrolls.** Only the story and the controls scroll, each inside itself. This keeps the simulator in view while the reader reads, and stops a drag on a 3D model from fighting a page scroll.

The story is open when the page loads. A button in the header folds it away. While it is open on a phone, the controls shrink to their first row, which is why that row must hold the key and the output.

## The story

Every story has the same eight parts in the same order:

| Part | What it does |
|---|---|
| The hook | One moment with people in it, ending on a question |
| Try it | A guess, then one small task on the simulator |
| How it works | The mechanism, one piece at a time, each with something to do |
| The story | Who made it and who used it |
| How it was broken | The weakness, and one step of the attack to try |
| Challenge | One puzzle, set inside the history |
| What came next | The lesson, and a link to the next cipher |
| Further reading | The book's chapter first, then other sources |

A story can use six blocks beyond plain text:

- **Standfirst**: the opening sentence.
- **Label**: the name of the part.
- **Try**: something to do, often with a button that sets up the simulator.
- **Check**: a question to answer in your head, with the answer behind a tap.
- **Dig deeper**: extra history, folded away. The page makes sense with all of these closed.
- **Challenge**: the puzzle, with a box that checks the answer.

Simple ciphers take about 700 words. Enigma, the longest, takes about 1,500. The reasons for the order and the lengths are in [reports/Cipher page content template.md](../reports/Cipher%20page%20content%20template.md).

### Facts and words

The facts come from the book. The words are ours: no sentence is copied. Dates, names and numbers match the book or a named second source. [COVERAGE.md](COVERAGE.md) lists everything the book presents, page by page, and where the site covers it.

## How it looks

Two materials: **a dark workshop** for the machines and **cream paper** for the reading.

| Role | Colour | Used for |
|---|---|---|
| Workshop | Near-black browns | The area around a simulator |
| Brass | `#e0b04a` | Anything the reader can act on: links, main buttons |
| Lamp | `#ffd76a` | Cipher output, and nothing else |
| Paper and ink | Cream with dark brown | The story |

Three type families, all already on the reader's device:

- A system sans-serif for controls.
- A book serif for the story.
- A monospace for every letter that is cipher input or output, so columns line up.

No web fonts and no images are downloaded. The page loads fast and will work offline later.

All colours, sizes and spacing are tokens in `apps/web/app/app.css`. A component never uses a raw value.

## How it behaves

- **Every action is a tap.** Dragging only turns the camera on a 3D model. Nothing the cipher needs requires a drag.
- **Every action on a model also exists as a control.** Enigma's rotors turn on the model or with ▲▼ buttons. The model is for delight; the controls are for everyone.
- **The simulator starts in a useful state.** It loads with an example in place, usually the book's own.
- **The result is always text.** What the cipher produced appears in the controls, not only as a lamp or a picture.
- **Story buttons drive the simulator. Scrolling never does.** The reader always chooses when the simulator changes.
- **No points, streaks, badges or sign-in.** The reward is understanding the cipher.

## 2D and 3D

Most ciphers are ideas on paper, so most simulators are flat: alphabets, grids, charts and tables, built from a shared kit so they look and behave alike.

Two devices are 3D because their shape is the point: **Enigma** (keyboard, rotors, lampboard, plugboard) and the **scytale** (a strip wound round a rod). Both are built from simple shapes in code, lettered with textures drawn at run time, and redrawn only when something changes, which keeps them light on a phone.

## Two languages

The site is in English and Vietnamese. A small EN | VI switch sits at the top right of every page; on narrow phones it shows only the language you can switch to. Switching keeps your place: the same page, the same simulator settings, the same story open.

The Vietnamese is our own translation of our English, not text from the Vietnamese edition of the book. It does use that edition's chapter titles and terms (*Mật mã: Từ cổ điển đến lượng tử*, NXB Trẻ), so readers of the Vietnamese book recognise them. Cipher letters and example messages stay in A to Z, as the book gives them, with their meaning explained in Vietnamese. The words we use are listed in [i18n/vi-glossary.md](i18n/vi-glossary.md).

## Phones

The site is designed for a phone first.

- Pages fit a screen 375px wide. Wide tables scroll inside the simulator, never the whole page.
- Anything tappable is at least 44px.
- Typing a message uses a normal text box, so the phone's own keyboard works.

All 38 pages were checked at phone size in a browser, and the site was checked by hand on a real phone.

Known gap: at 320px wide, the pigpen and hieroglyphs boards are about 10px too wide.

## Accessibility

The target is WCAG 2.2 level AA.

- Everything works with a keyboard, and focus is always visible.
- Controls are real HTML elements with names.
- The 3D canvas is hidden from screen readers; the controls carry the meaning.
- Changing output is announced politely.
- Text contrast is at least 4.5 to 1.
- Motion is switched off for readers who ask for less of it.

## Not designed yet

- Saved progress across visits.
- A story sheet with three heights on phones, not just open and closed.
- A short caption on the simulator at each step, for readers who never open the story.

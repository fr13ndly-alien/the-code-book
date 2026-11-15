# the-code-book

An interactive website for the ciphers in Simon Singh's *The Code Book*. The menu follows the chapters of the book. Each cipher gets a page with a simulator you can operate and the story behind it, in English and Vietnamese.

## Run it

You need Node 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm test` | Runs the cipher engine tests |
| `npm run typecheck` | Type-checks everything |
| `npm run check:coverage` | Checks `docs/COVERAGE.md` against the pages |
| `npm run check:i18n` | Checks every page has a matching Vietnamese story |
| `npm run check:vi-copy` | Checks the Vietnamese pages copy no sentences from the Vietnamese edition (needs its text in `resource/vi-book/`) |
| `npm run build` | Builds the static site into `apps/web/build/client` |
| `npm run preview` | Serves the built site |

## Where things are

- `packages/cipher-engine/`: the cipher logic, in pure TypeScript.
- `apps/web/`: the website.
- `reports/`: the research behind the tech stack and the page template.

## Documents

- [Design](docs/DESIGN.md): what the site is for, how a page is laid out, and why it looks the way it does.
- [Architecture](docs/ARCHITECTURE.md): how the code is organised, how pages register themselves, and how the site is built and checked.
- [Standards](docs/STANDARDS.md): the coding, content and UI rules every cipher page follows. Read this before adding a cipher.
- [Vietnamese glossary](docs/i18n/vi-glossary.md): the Vietnamese terms and style the translation follows.
- [Coverage](docs/COVERAGE.md): everything the book presents, page by page, and where the site covers it.

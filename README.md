# the-code-book

An interactive website for the ciphers in Simon Singh's *The Code Book*, from the oldest to the newest. Each cipher gets a page with a simulator you can operate and the story behind it.

This is a prototype with one cipher: the Enigma machine.

## Run it

You need Node 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173/ciphers/enigma.

| Command | What it does |
|---|---|
| `npm test` | Runs the cipher engine tests |
| `npm run typecheck` | Type-checks everything |
| `npm run build` | Builds the static site into `apps/web/build/client` |
| `npm run preview` | Serves the built site |

## Where things are

- `packages/cipher-engine/`: the cipher logic, in pure TypeScript.
- `apps/web/`: the website.
- `docs/STANDARDS.md`: the coding, content and UI rules every cipher page follows. Read this before adding a cipher.
- `reports/`: the research behind the tech stack and the page template.

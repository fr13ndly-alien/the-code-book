import { CHAPTERS } from "./chapters";
import type { Chapter, CipherMeta } from "./types";

// Every folder with a meta.ts is a published cipher. Nothing else needs to list it.
const found = import.meta.glob<CipherMeta>("./*/meta.ts", { eager: true, import: "meta" });

/** Every published cipher, in the order of the book. */
export const CIPHERS: CipherMeta[] = Object.values(found).sort(
  (a, b) => a.chapter - b.chapter || a.order - b.order,
);

/** The menu: each chapter with its ciphers. */
export const MENU: { chapter: Chapter; ciphers: CipherMeta[] }[] = CHAPTERS.map((chapter) => ({
  chapter,
  ciphers: CIPHERS.filter((cipher) => cipher.chapter === chapter.number),
}));

/** The ciphers before and after one in the book, for "previous" and "next" links. */
export function neighbours(slug: string): { previous?: CipherMeta; next?: CipherMeta } {
  const at = CIPHERS.findIndex((cipher) => cipher.slug === slug);
  return { previous: CIPHERS[at - 1], next: CIPHERS[at + 1] };
}

/** The page title and description tags for a cipher's route. */
export const pageMeta = (cipher: CipherMeta) => () => [
  { title: `${cipher.title} | The Code Book, interactive` },
  { name: "description", content: cipher.hook },
];

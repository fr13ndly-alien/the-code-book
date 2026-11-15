import type { MetaArgs } from "react-router";
import { UI, localeOf, type Locale } from "~/i18n";
import { CHAPTERS } from "./chapters";
import type { Chapter, CipherMeta } from "./types";

// Every folder with a meta.ts is a published cipher. Nothing else needs to list it.
const found = import.meta.glob<CipherMeta>("./*/meta.ts", { eager: true, import: "meta" });

/** Every published cipher, in the order of the book. */
export const CIPHERS: CipherMeta[] = Object.values(found).sort(
  (a, b) => a.chapter - b.chapter || a.order - b.order,
);

/** A cipher's meta with its reader-facing text in the given language. */
export const localize = (cipher: CipherMeta, locale: Locale): CipherMeta =>
  locale === "vi" ? { ...cipher, ...cipher.vi } : cipher;

/** A chapter with its title and summary in the given language. */
export const localizeChapter = (chapter: Chapter, locale: Locale): Chapter =>
  locale === "vi" ? { ...chapter, ...chapter.vi } : chapter;

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

/** The page title and description tags for a cipher's route, in the page's language. */
export const pageMeta =
  (cipher: CipherMeta) =>
  ({ location }: MetaArgs) => {
    const locale = localeOf(location.pathname);
    const text = localize(cipher, locale);
    return [
      { title: `${text.title} | ${UI.siteName[locale]}` },
      { name: "description", content: text.hook },
    ];
  };

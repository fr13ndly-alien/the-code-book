import type { Bilingual } from "~/i18n";

/** The engine's key-text titles, by id, in both languages. */
export const KEY_TEXT_TITLES: Record<string, Bilingual> = {
  book: { en: "The book's example sentence", vi: "Câu ví dụ trong sách" },
  declaration: { en: "Declaration of Independence", vi: "Tuyên ngôn Độc lập" },
  gettysburg: { en: "Gettysburg Address", vi: "Diễn văn Gettysburg" },
  constitution: { en: "Constitution, preamble", vi: "Hiến pháp, lời mở đầu" },
};

/** Short names for the key texts, to fit three buttons on a phone. */
export const SHORT_TITLES: Record<string, Bilingual> = {
  declaration: { en: "Declaration", vi: "Tuyên ngôn" },
  gettysburg: { en: "Gettysburg", vi: "Gettysburg" },
  constitution: { en: "Constitution", vi: "Hiến pháp" },
};

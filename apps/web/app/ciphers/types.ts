/** The facts every cipher page declares in its meta.ts. */
export interface CipherMeta {
  /** URL segment: /ciphers/<slug>. Same as the folder name. */
  slug: string;
  title: string;
  /** Shown on the menu and in the page header, e.g. "1918 to 1945". */
  era: string;
  /** The chapter of The Code Book the cipher belongs to: see chapters.ts. */
  chapter: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Position inside the chapter, in the order the book tells it. */
  order: number;
  /** One sentence that makes a reader want to open the page. */
  hook: string;
  /** The first thing to do on the simulator, shown over it. One short sentence. */
  firstStep: string;
  /** Where the material comes from in The Code Book. */
  source: string;
  /** True for ciphers found only in the full edition of the book, not the abridged one. */
  fullEditionOnly?: boolean;
  /** The same text in Vietnamese, for the /vi/ pages. */
  vi: CipherMetaText;
}

/** The parts of a cipher's meta that a reader sees, and so are translated. */
export type CipherMetaText = Pick<CipherMeta, "title" | "era" | "hook" | "firstStep" | "source">;

/** A chapter of the book: one section of the menu. */
export interface Chapter {
  number: CipherMeta["chapter"];
  /** The chapter's title in the book. */
  title: string;
  /** What the chapter covers, in our words. */
  summary: string;
  /** The title (as in the Vietnamese edition of the book) and summary in Vietnamese. */
  vi: { title: string; summary: string };
}

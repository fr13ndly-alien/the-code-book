import type { CaesarState } from "./useCaesar";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, CaesarState> = {
  /** Caesar's own cipher, with the example from the book. The page starts here. */
  caesar: { shift: 3, mode: "encipher", text: "I CAME, I SAW, I CONQUERED" },

  /** An empty message, ready for the reader's own words. */
  blank: { shift: 3, mode: "encipher", text: "" },

  /** The challenge: a message whose shift the reader must find. */
  intercepted: { shift: 0, mode: "decipher", text: "UXPTKX MAX BWXL HY FTKVA" },
};

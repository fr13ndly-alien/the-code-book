import { BOOK_GRID } from "@codebook/cipher-engine/adfgvx";
import type { AdfgvxState } from "./useAdfgvx";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, AdfgvxState> = {
  /** The example from the book: "attack at 10 pm" with the keyword MARK. The page starts here. */
  book: { grid: BOOK_GRID, keyword: "MARK", mode: "encipher", text: "ATTACK AT 10 PM", picked: "A" },

  /** The same grid and keyword with an empty message, ready for the reader's own words. */
  blank: { grid: BOOK_GRID, keyword: "MARK", mode: "encipher", text: "" },

  /** The challenge: an intercepted message, with the grid and keyword already found. */
  intercepted: { grid: BOOK_GRID, keyword: "PARIS", mode: "decipher", text: "VDDDGDGXVXVDGGDDGXADAVXVGV" },
};

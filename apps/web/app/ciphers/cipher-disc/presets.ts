import type { DiscState } from "./useDisc";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, DiscState> = {
  /** A still disc with the inner F beside the outer A: the book's Caesar shift of five. The page starts here. */
  five: { shift: 5, turning: "fixed", keyword: "LEON", mode: "encipher", text: "ALBERTI" },

  /** A disc that turns one step after every letter, with nothing typed yet. */
  turning: { shift: 0, turning: "stepping", keyword: "LEON", mode: "encipher", text: "" },

  /** The example from the book: "goodbye" with Alberti's first name as the keyword. */
  leon: { shift: 0, turning: "keyword", keyword: "LEON", mode: "encipher", text: "GOODBYE" },

  /** A message from a still disc whose setting the reader must find by trying them all. */
  caught: { shift: 0, turning: "fixed", keyword: "LEON", mode: "decipher", text: "BNWM VXAN LXYYNA" },

  /** The challenge: a message from a turning disc that started with L beside A. */
  intercepted: { shift: 11, turning: "stepping", keyword: "LEON", mode: "decipher", text: "SAYR IXV TKCYCB" },
};

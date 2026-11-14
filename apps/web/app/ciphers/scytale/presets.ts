import type { ScytaleState } from "./useScytale";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, ScytaleState> = {
  /** The message from the book's figure, on a staff that holds four lines. The page starts here. */
  book: { perTurn: 4, mode: "encipher", text: "SEND MORE TROOPS TO SOUTHERN FLANK AND", facing: 0 },

  /** A short message for a first go. */
  short: { perTurn: 3, mode: "encipher", text: "HELP IS COMING", facing: 0 },

  /** The book's strip wound on a staff that is too thin: the reader must find the right one. */
  wrongStaff: { perTurn: 3, mode: "decipher", text: "STSFEROLNOUADOTNMPHKOSEARTRNEOND", facing: 0 },

  /** The challenge: the strip from the messenger's belt, on the thinnest staff. */
  belt: { perTurn: 2, mode: "decipher", text: "PUAHSTAPTRLANACANKBSYATOZOU", facing: 0 },
};

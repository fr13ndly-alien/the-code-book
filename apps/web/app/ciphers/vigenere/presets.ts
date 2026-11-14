import type { VigenereState } from "./useVigenere";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, VigenereState> = {
  /** The book's own example. The page starts here. */
  white: { keyword: "WHITE", mode: "encipher", text: "DIVERT TROOPS TO EAST RIDGE", position: 0 },

  /** A key of one letter: the Vigenère cipher shrinks to a Caesar shift. */
  oneLetter: { keyword: "W", mode: "encipher", text: "DIVERT TROOPS TO EAST RIDGE", position: 0 },

  /** The double O of TROOPS, which comes out as two different letters. */
  troops: { keyword: "WHITE", mode: "encipher", text: "DIVERT TROOPS TO EAST RIDGE", position: 8 },

  /** The same message read back by the person who receives it. */
  receive: { keyword: "WHITE", mode: "decipher", text: "ZPDXVP AZHSLZ BH IWZB KMZNM", position: 0 },

  /** The book's second example: THE becomes BUK twice, the slip that Babbage used. */
  repeats: { keyword: "KING", mode: "encipher", text: "THE SUN AND THE MAN IN THE MOON", position: 9 },

  /** The challenge: a reply to decipher. The reader must type the keyword. */
  reply: { keyword: "", mode: "decipher", text: "DVTW XDL ZBHCL CGXES LTVG", position: 0 },
};

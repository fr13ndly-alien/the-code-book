import { BEALE_TWO_OPENING, encipher, keyText, numberedWords, numbersOf } from "@codebook/cipher-engine/beale";
import type { BealeState } from "./useBeale";

const sheetTwo = (count: number) => BEALE_TWO_OPENING.slice(0, count).join(", ");

/** The challenge ciphertext, made by the engine with the Gettysburg Address as the key text. */
const NOTE = numbersOf(encipher("THE GOLD IS IN IRON POTS", numberedWords(keyText("gettysburg").text), 1));

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, BealeState> = {
  /** The first 25 numbers of the second Beale sheet, with its true key text. The page starts here. */
  beale: { keyId: "declaration", mode: "decipher", text: sheetTwo(25), seed: 1 },

  /** The book's example: the word BEALE turned into numbers. */
  word: { keyId: "declaration", mode: "encipher", text: "BEALE", seed: 1 },

  /** An empty message, ready for the reader's own words. */
  blank: { keyId: "declaration", mode: "encipher", text: "", seed: 1 },

  /** The first 50 numbers of the sheet, far enough to meet its slips. */
  slips: { keyId: "declaration", mode: "decipher", text: sheetTwo(50), seed: 1, picked: 95 },

  /** The sheet with the wrong book on the table, as the pamphlet's author first met it. */
  hunt: { keyId: "gettysburg", mode: "decipher", text: sheetTwo(25), seed: 1 },

  /** The challenge: a note whose key text the reader must find. */
  note: { keyId: "declaration", mode: "decipher", text: NOTE, seed: 1 },
};

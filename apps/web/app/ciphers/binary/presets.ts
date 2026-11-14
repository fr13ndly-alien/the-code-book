import type { BinaryState } from "./useBinary";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, BinaryState> = {
  /** The book's example: HELLO enciphered with the key DAVID. The page starts here. */
  hello: { mode: "encipher", text: "HELLO", key: "DAVID", flips: [] },

  /** One letter and no key, to look at ASCII alone. */
  ascii: { mode: "encipher", text: "A", key: "", flips: [] },

  /** The book's ciphertext, ready to be deciphered with the same key. */
  back: { mode: "decipher", text: "0001100 0000100 0011010 0000101 0001011", key: "DAVID", flips: [] },

  /** The attack: the same ciphertext with the known message in place of the key. */
  known: { mode: "decipher", text: "0001100 0000100 0011010 0000101 0001011", key: "HELLO", flips: [] },

  /** The challenge: a ciphertext whose key the reader must type. */
  intercepted: { mode: "decipher", text: "0001100 0000011 0000111 0000110 0011100", key: "", flips: [] },
};

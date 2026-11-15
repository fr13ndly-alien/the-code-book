import type { LuciferState } from "./useLucifer";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, LuciferState> = {
  /** Two letters, a key letter and the full sixteen rounds. The page starts here. */
  lucifer: { mode: "encipher", text: "HI", keyLetter: "K", rounds: 16 },

  /** A single round, with its arithmetic spelled out. */
  oneRound: { mode: "encipher", text: "HI", keyLetter: "K", rounds: 1, picked: 1 },

  /** One round with the first bit flipped: the start of the avalanche. */
  oneFlip: { mode: "encipher", text: "HI", keyLetter: "K", rounds: 1, flipped: 0 },

  /** The ciphertext of HI, ready to be run backwards. */
  reverse: { mode: "decipher", text: "0A68", keyLetter: "K", rounds: 16 },

  /** The challenge: a ciphertext whose key letter the reader must find. */
  intercepted: { mode: "decipher", text: "4FD3", keyLetter: "A", rounds: 16 },
};

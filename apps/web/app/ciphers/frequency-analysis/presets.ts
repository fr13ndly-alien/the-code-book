import {
  BOOK_CIPHERTEXT,
  BOOK_FIRST_FINDS,
  LIPOGRAM_PLAINTEXT,
  SAMPLE_CIPHER_ALPHABET,
  SAMPLE_PLAINTEXT,
  encipher,
  guessByRank,
} from "@codebook/cipher-engine/frequency-analysis";
import type { FrequencyAnalysisState } from "./useFrequencyAnalysis";

/** The intercepted message, made by the engine from our own passage and the key of the book's example. */
const INTERCEPTED = encipher(SAMPLE_PLAINTEXT, SAMPLE_CIPHER_ALPHABET);

/** A passage of ours with no letter E, enciphered with the same key. */
const LIPOGRAM = encipher(LIPOGRAM_PLAINTEXT, SAMPLE_CIPHER_ALPHABET);

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, FrequencyAnalysisState> = {
  /** The message with nothing solved. The page starts here. */
  intercepted: { ciphertext: INTERCEPTED, guesses: {} },

  /** Al-Kindi's recipe followed blindly: nearly right, but not quite. */
  byRank: { ciphertext: INTERCEPTED, guesses: guessByRank(INTERCEPTED), picked: "B" },

  /** The first three letters found: E, T and H. */
  started: { ciphertext: INTERCEPTED, guesses: { O: "E", L: "T", B: "H" }, picked: "X" },

  /** The very cryptogram the book breaks, with nothing solved. */
  book: { ciphertext: BOOK_CIPHERTEXT, guesses: {} },

  /** The book's cryptogram with the first three letters the book finds: O = e, X = a, Y = i. */
  bookStart: { ciphertext: BOOK_CIPHERTEXT, guesses: BOOK_FIRST_FINDS, picked: "B" },

  /** A message with no E in it, filled in by rank: the tallest bar gets called E and is wrong. */
  lipogram: { ciphertext: LIPOGRAM, guesses: guessByRank(LIPOGRAM), picked: "X" },
};

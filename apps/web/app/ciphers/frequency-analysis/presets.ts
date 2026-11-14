import {
  SAMPLE_CIPHER_ALPHABET,
  SAMPLE_PLAINTEXT,
  encipher,
  guessByRank,
} from "@codebook/cipher-engine/frequency-analysis";
import type { FrequencyAnalysisState } from "./useFrequencyAnalysis";

/** The intercepted message, made by the engine from our own passage and the key of the book's example. */
const INTERCEPTED = encipher(SAMPLE_PLAINTEXT, SAMPLE_CIPHER_ALPHABET);

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, FrequencyAnalysisState> = {
  /** The message with nothing solved. The page starts here. */
  intercepted: { ciphertext: INTERCEPTED, guesses: {} },

  /** Al-Kindi's recipe followed blindly: nearly right, but not quite. */
  byRank: { ciphertext: INTERCEPTED, guesses: guessByRank(INTERCEPTED), picked: "B" },

  /** The first three letters found: E, T and H. */
  started: { ciphertext: INTERCEPTED, guesses: { O: "E", L: "T", B: "H" }, picked: "X" },
};

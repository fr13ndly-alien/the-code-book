import { INTERCEPTS } from "@codebook/cipher-engine/babbage";
import type { BabbageState } from "./useBabbage";

/** A ciphertext as it arrives: nothing known, the longest repeat lit. */
const fresh = (ciphertext: string): BabbageState => ({
  ciphertext,
  stage: "length",
  keyLength: 2,
  shifts: [0, 0],
  position: 0,
  picked: 0,
});

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, BabbageState> = {
  /** A message about Babbage, enciphered with a five-letter keyword. The page starts here. */
  intercept: fresh(INTERCEPTS.babbage),

  /** The same message once the key length is known: ready to find the first key letter. */
  letters: { ...fresh(INTERCEPTS.babbage), stage: "letters", keyLength: 5, shifts: [0, 0, 0, 0, 0] },

  /** The ciphertext the book itself breaks (Figure 12). */
  book: fresh(INTERCEPTS.book),

  /** The challenge: a lovers' message from a newspaper, with a different keyword. */
  agony: fresh(INTERCEPTS.agony),
};

import {
  BOOK_CAESAR,
  BOOK_DEDICATION,
  BOOK_SUBSTITUTION,
  BOOK_VIGENERE,
} from "@codebook/cipher-engine/codebreakers-challenge";
import { FRESH, type ChallengeState } from "./useCodebreakersChallenge";

/** The page as it opens: cryptogram 1 on the bench, nothing solved and nothing pasted. */
export const START: ChallengeState = {
  current: 0,
  work: [FRESH, FRESH, FRESH, FRESH, FRESH],
  own: { text: "", kind: "caesar" },
  solved: [false, false, false, false],
};

/**
 * Setups that buttons in story.mdx can load, by name. The first four only put
 * a cryptogram on the bench: the reader's work and solved cryptograms are kept.
 * The last five put a text from the book on the "Your own" bench as a new cryptogram.
 */
export const PRESETS: Record<string, Partial<ChallengeState>> = {
  /** Cryptogram 1: a Caesar shift with its word spaces. */
  first: { current: 0 },

  /** Cryptogram 2: a short Caesar shift in groups of five. */
  second: { current: 1 },

  /** Cryptogram 3: a monoalphabetic substitution. */
  third: { current: 2 },

  /** Cryptogram 4: a Vigenère cipher. Its last three words answer the story's challenge. */
  fourth: { current: 3 },

  /** The book's Cryptogram 1, a Caesar shift. We give no answer. */
  bookFirst: { own: { text: BOOK_CAESAR[0], kind: "caesar" } },

  /** The book's Cryptogram 2, a harder Caesar shift. We give no answer. */
  bookSecond: { own: { text: BOOK_CAESAR[1], kind: "caesar" } },

  /** The book's Cryptogram 3, a monoalphabetic substitution. We give no answer. */
  bookThird: { own: { text: BOOK_SUBSTITUTION, kind: "substitution" } },

  /** The book's Cryptogram 4, a Vigenère cipher. We give no answer. */
  bookFourth: { own: { text: BOOK_VIGENERE, kind: "vigenere" } },

  /** The book's enciphered dedication. Nobody prints its key: a substitution is our guess. */
  dedication: { own: { text: BOOK_DEDICATION, kind: "substitution" } },
};

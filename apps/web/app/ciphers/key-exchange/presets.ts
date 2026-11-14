import type { KeyExchangeState } from "./useKeyExchange";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, KeyExchangeState> = {
  /** The exchange worked in the full edition of the book, before anything has been sent. The page starts here. */
  book: { base: 7, modulus: 11, aliceSecret: 3, bobSecret: 6, step: 1, eveSearching: false },

  /** The full edition's exchange, finished: both sides hold the key 9. */
  agreed: { base: 7, modulus: 11, aliceSecret: 3, bobSecret: 6, step: 4, eveSearching: false },

  /** The book's table of 3^x (mod 7) (abridged edition, Table 14), which appears as Eve's list of guesses. */
  clock: { base: 3, modulus: 7, aliceSecret: 6, bobSecret: 4, step: 3, eveSearching: true },

  /** The full edition's exchange with Eve at work: three guesses are enough. */
  eve: { base: 7, modulus: 11, aliceSecret: 3, bobSecret: 6, step: 4, eveSearching: true },

  /** The largest prime on the page: Eve needs 73 guesses. */
  bigger: { base: 2, modulus: 101, aliceSecret: 73, bobSecret: 40, step: 4, eveSearching: true },

  /** The challenge: the reader is Eve and sees only the public numbers. */
  intercepted: { base: 5, modulus: 23, aliceSecret: 13, bobSecret: 21, step: 4, eveSearching: false, youAreEve: true },
};

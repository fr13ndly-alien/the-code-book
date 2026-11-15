import type { RsaState } from "./useRsa";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, RsaState> = {
  /** Appendix E of the book: p = 17, q = 11, e = 7, and the message X. The page starts here. */
  book: { p: 17, q: 11, e: 7, mode: "encipher", text: "X", attacked: false },

  /** The book's ciphertext, 11, ready for Alice to open with d = 23. */
  open: { p: 17, q: 11, e: 7, mode: "decipher", text: "11", attacked: false },

  /** The book's key with Eve at work on N = 187. */
  attack: { p: 17, q: 11, e: 7, mode: "encipher", text: "X", attacked: true },

  /** The number the book dares its readers to factor: 1,709,023. */
  dare: { p: 1201, q: 1423, e: 7, mode: "encipher", text: "X", attacked: true },

  /** The challenge: the reader is Eve and sees only the public key N = 247, e = 5. */
  intercepted: { p: 13, q: 19, e: 5, mode: "decipher", text: "239", attacked: false, youAreEve: true },
};

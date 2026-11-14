import type { PadState } from "./usePad";

/** The key from the book's example, then more letters to fill the 40-letter sheet. */
const BOOK_SHEET = "PLMOEZQKJZLRTEAVCRCBY" + "WQXHNDUGKFSIOPBMJLT";

/** The book's message and sheet, with the extras switched off. */
const BOOK: PadState = { mode: "encipher", text: "ATTACK THE VALLEY AT DAWN", pad: BOOK_SHEET, claim: "", second: "" };

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, PadState> = {
  /** The example from the book: "attack the valley at dawn". The page starts here. */
  book: BOOK,

  /** An empty message, ready for the reader's own words. */
  blank: { ...BOOK, text: "" },

  /** The same ciphertext read as the opposite order: the book's second key. */
  other: { ...BOOK, claim: "DEFEND THE HILL AT SUNSET" },

  /** The mistake: a second message sent with the same sheet. */
  reuse: { ...BOOK, second: "RETREAT TO THE RIVER NOW" },

  /** The mistake, with a codebreaker's correct guess at the first message. */
  guess: { ...BOOK, second: "RETREAT TO THE RIVER NOW", claim: "ATTACK THE VALLEY" },

  /** The challenge: a ciphertext and the sheet that goes with it. */
  intercepted: {
    mode: "decipher",
    text: "RRAGFGSOHSLVOORJ",
    pad: "QXJTMZKWPLHRVBDNGYCFASEUIOKHWDPZLMTCRQBX",
    claim: "",
    second: "",
  },
};

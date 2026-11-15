import type { RailFenceState } from "./useRailFence";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, RailFenceState> = {
  /** A short message on two rails. The page starts here. */
  wax: { rails: 2, mode: "encipher", text: "SCRAPE OFF THE WAX" },

  /** The example from the book, on two rails. */
  book: {
    rails: 2,
    mode: "encipher",
    text: "THY SECRET IS THY PRISONER; IF THOU LET IT GO, THOU ART A PRISONER TO IT",
  },

  /** The short message again, on three rails, to show the zig-zag. */
  zigzag: { rails: 3, mode: "encipher", text: "SCRAPE OFF THE WAX" },

  /** A two-rail ciphertext to put back on the fence. */
  caught: { rails: 2, mode: "decipher", text: "SRPOFHWXCAEFTEA" },

  /** The challenge: a message whose number of rails the reader must find. */
  intercepted: { rails: 2, mode: "decipher", text: "XSOCESAFREEREISGEXLR" },
};

import type { KamaSutraState } from "./useKamaSutra";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, KamaSutraState> = {
  /** The book's pairs and its example message. The page starts here. */
  book: { seed: 0, text: "MEET AT MIDNIGHT" },

  /** The book's ciphertext, to show that the same swap reads it back. */
  reply: { seed: 0, text: "CUUZ VZ CGXSGIBZ" },

  /** The book's ciphertext with one letter picked out, for hunting patterns. */
  pattern: { seed: 0, text: "CUUZ VZ CGXSGIBZ", picked: "U" },

  /** The challenge: a ciphertext, but with the wrong pairs on the board. */
  note: { seed: 1, text: "CUUZ CU HP ZBU LGAUL VZ XVFS" },
};

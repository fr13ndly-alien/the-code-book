import type { ZimmermannState } from "./useZimmermann";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, ZimmermannState> = {
  /** The heart of Zimmermann's offer, built from real groups of the telegram. The page starts here. */
  offer: { mode: "encode", words: ["MOST SECRET", "MAKE", "WAR", "TOGETHER", "STOP", "ZIMMERMANN"], guesses: {} },

  /** An empty telegram form, ready for the reader's own message. */
  blank: { mode: "encode", words: [], guesses: {} },

  /** The same word three times, to show that a code repeats itself. */
  repeat: { mode: "encode", words: ["WAR", "AND", "WAR", "AND", "WAR"], guesses: {} },

  /** The codebreaker's desk: four intercepted telegrams and a half-empty codebook. Also the challenge. */
  room40: { mode: "break", words: [], guesses: {} },
};

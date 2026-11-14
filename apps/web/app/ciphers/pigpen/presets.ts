import type { PigpenState } from "./usePigpen";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, PigpenState> = {
  /** A short message with its letters showing, and A picked as in the book. The page starts here. */
  masons: { text: "THE FREEMASONS", hidden: false, picked: "A" },

  /** An empty message, ready for the reader's own words. */
  blank: { text: "", hidden: false },

  /** The riddle that ends the book's appendix, shown as the book prints it: symbols only. */
  riddle: { text: "FREQUENCY ANALYSIS", hidden: true },

  /** The challenge: a note with its letters hidden. */
  lodge: { text: "THE LODGE MEETS AT MIDNIGHT", hidden: true },
};

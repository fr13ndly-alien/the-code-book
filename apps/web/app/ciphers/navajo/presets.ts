import type { NavajoState } from "./useNavajo";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, NavajoState> = {
  /** One term from the lexicon and one spelled word. The page starts here. */
  start: { text: "SUBMARINE NEAR SAIPAN", mode: "send", opened: [] },

  /** Birds for planes and fish for ships: terms from the lexicon only. */
  lexicon: { text: "FIGHTER PLANE, BOMBER, BATTLESHIP, DESTROYER", mode: "send", opened: [] },

  /** The book's example of the spelling alphabet. */
  pacific: { text: "PACIFIC", mode: "send", opened: [] },

  /** The same word as a listener hears it, with nothing explained yet. */
  overheard: { text: "PACIFIC", mode: "listen", opened: [] },

  /** An empty message, ready for the reader's own words. */
  blank: { text: "", mode: "send", opened: [] },

  /** The challenge: a message to decode by opening its words. */
  heard: { text: "BATTLESHIP AT DAWN", mode: "listen", opened: [] },
};

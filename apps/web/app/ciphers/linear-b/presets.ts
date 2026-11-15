import { PLACES_GUESSED, type LinearBState } from "./useLinearB";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, LinearBState> = {
  /** Kober's three words, nothing marked and no sound known. The page starts here. */
  start: { view: "triplet", marked: [], guesses: {} },

  /** Kober's step done: the shared signs are marked, so the grid shows the row of the two endings. */
  grid: { view: "triplet", marked: ["ko", "no"], guesses: {} },

  /** The three place names with the first one chosen, waiting for a name. */
  places: { view: "places", marked: [], guesses: {}, picked: "amnisos" },

  /** Amnisos read, so half-read signs point at the second name. */
  knossos: { view: "places", marked: [], guesses: { amnisos: "amnisos" }, picked: "knossos" },

  /** Two names read and the third chosen: the place to try a wrong guess. */
  tulissos: {
    view: "places",
    marked: [],
    guesses: { amnisos: "amnisos", knossos: "knossos" },
    picked: "tulissos",
  },

  /** The challenge: all three names read, and the first word of the tripod tablet. */
  tripod: { view: "tripod", marked: [], guesses: PLACES_GUESSED, picked: "tripods" },
};

import { cover, write, type Method } from "@codebook/cipher-engine/hidden-writing";
import type { HiddenWritingState } from "./useHiddenWriting";

const WARNING = "XERXES IS COMING. ARM SPARTA AND BUILD SHIPS.";
const NOTE = "MEET ME AT THE HARBOUR AT NOON";

/** A message just written, still in plain view. */
const written = (message: string, method: Method): HiddenWritingState => ({
  message,
  page: write(message, method),
  guard: "casual",
});

/** The same message after it has been hidden. */
const hidden = (message: string, method: Method): HiddenWritingState => ({
  ...written(message, method),
  page: cover(write(message, method)),
});

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, HiddenWritingState> = {
  /** A warning cut into the wood of a tablet, not yet covered. The page starts here. */
  tablet: written(WARNING, "wax"),

  /** The tablet as it arrives: under fresh wax, ready to scrape. */
  waxed: hidden(WARNING, "wax"),

  /** A note in invisible ink, still wet enough to see. */
  letter: written(NOTE, "ink"),

  /** The waxed tablet again, about to meet a guard who checks everything. */
  searched: { ...hidden(WARNING, "wax"), guard: "thorough" },

  /** A bare tablet for the reader's own words. */
  blank: written("", "wax"),

  /** The challenge: a sheet that looks empty until it is warmed. */
  sheet: { ...hidden("THE GUARD IS ASLEEP", "ink"), message: "" },
};

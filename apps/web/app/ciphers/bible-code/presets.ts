import { READ, showHit, type BibleCodeState } from "./useBibleCode";

const byHand = { direction: 1, length: READ, word: "" } as const;

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, BibleCodeState> = {
  /** A word found in the opening of Moby-Dick. The page starts here. */
  rain: showHit({ ...byHand, text: "moby", start: 0, skip: 1, word: "RAIN" }, 0),

  /** The appendix's own recipe: start at a letter and take every fifth one. */
  fifth: { ...byHand, text: "moby", start: 0, skip: 5 },

  /** A violent word in Moby-Dick, in the spirit of Brendan McKay's search. */
  shot: showHit({ ...byHand, text: "moby", start: 0, skip: 1, word: "SHOT" }, 0),

  /** The same kind of search in a text nobody could call mysterious. */
  notice: showHit({ ...byHand, text: "dull", start: 0, skip: 1, word: "FIRE" }, 0),

  /** The challenge: a start letter in the car park notice, two presses short of the right skip. */
  warning: { ...byHand, text: "dull", start: 433, skip: 50, length: 4 },
};

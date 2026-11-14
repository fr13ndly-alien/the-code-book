import { DESK_MESSAGE } from "@codebook/cipher-engine/dancing-men";
import type { DancingMenState } from "./useDancingMen";

const VERNE_TEXT = "DESCEND THE CRATER";

/** What every preset shares, so each one below only says what is different. */
const BASE: DancingMenState = {
  mode: "dance",
  text: "",
  hidden: false,
  guesses: {},
  verneText: VERNE_TEXT,
  verneStep: 0,
};

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, DancingMenState> = {
  /** The first message Holmes read in the story, in our poses, with E picked. The page starts here. */
  slaney: { ...BASE, text: "AM HERE ABE SLANEY", picked: "E" },

  /** An empty message, ready for the reader's own words. */
  blank: { ...BASE },

  /** The message Holmes wrote himself to trap the villain. */
  trap: { ...BASE, text: "COME HERE AT ONCE" },

  /** Holmes's desk: a long message of our own with every letter hidden, to break by counting. */
  desk: { ...BASE, mode: "desk", text: DESK_MESSAGE },

  /** The desk with the first step done: the commonest figure is named E. */
  deskE: { ...BASE, mode: "desk", text: DESK_MESSAGE, guesses: { E: "E" }, picked: "E" },

  /** Verne's parchment, with three words of the novel's hidden message. */
  verne: { ...BASE, mode: "verne" },

  /** The parchment as the hero finds it: hidden, and waiting to be undone. */
  parchment: { ...BASE, mode: "verne", verneStep: 2 },

  /** The challenge: a short danced message with its letters hidden. */
  garden: { ...BASE, text: "COME TO THE GARDEN WALL AT SEVEN", hidden: true },
};

import { GAZETTE, hide } from "@codebook/cipher-engine/pinprick";
import type { PinprickState } from "./usePinprick";

const page = { cover: GAZETTE, light: false };

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, PinprickState> = {
  /** A meeting hidden in the newspaper. The page starts here. */
  meeting: { ...page, pricked: [], mode: "auto", secret: "MEET ME AT SIX" },

  /** The same page with no secret yet, ready for the reader's own words. */
  blank: { ...page, pricked: [], mode: "auto", secret: "" },

  /** A secret the newspaper cannot carry: it has only one Z. */
  stuck: { ...page, pricked: [], mode: "auto", secret: "PUZZLE" },

  /** A clean page for pricking by hand. */
  hand: { ...page, pricked: [], mode: "hand", secret: "" },

  /** The meeting again, already held up to the light. */
  caught: { ...page, pricked: [], mode: "auto", secret: "MEET ME AT SIX", light: true },

  /** The challenge: a page someone else has pricked. The engine made the holes. */
  posted: { ...page, mode: "hand", secret: "", pricked: hide(GAZETTE, "COME HOME SOON").positions },
};

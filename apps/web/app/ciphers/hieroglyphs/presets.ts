import { CARTOUCHES, valuesFrom } from "@codebook/cipher-engine/hieroglyphs";
import { BILINGUAL_VALUES, type HieroglyphsState } from "./useHieroglyphs";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, HieroglyphsState> = {
  /** Young's first step: the first sign of Ptolemy's name, waiting for its sound. The page starts here. */
  start: { assignment: {}, mystery: "rameses", picked: { cartouche: "ptolemy", at: 0 } },

  /** Ptolemy read in full, so its sounds spill into Cleopatra's ring. */
  ptolemy: {
    assignment: valuesFrom([CARTOUCHES.ptolemy]),
    mystery: "rameses",
    picked: { cartouche: "cleopatra", at: 0 },
  },

  /** Both translated names read: ready for the cartouche from Abu Simbel. */
  rameses: { assignment: BILINGUAL_VALUES, mystery: "rameses", picked: { cartouche: "rameses", at: 0 } },

  /** The challenge: both translated names read, and a name with three unknown signs. */
  alexander: { assignment: BILINGUAL_VALUES, mystery: "alexander" },
};

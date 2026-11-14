import type { LorenzState } from "./useLorenz";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, LorenzState> = {
  /** A short order on the tape, with every wheel at its first pin. The page starts here. */
  start: { text: "ATTACK AT DAWN", start: [0, 0, 0, 0, 0], picked: 0 },

  /** A single letter, to study the five holes. */
  letter: { text: "A", start: [0, 0, 0, 0, 0], picked: 0 },

  /** Blank tape: with nothing to hide, the output is the key itself. */
  blankTape: { text: "////////////", start: [0, 0, 0, 0, 0], picked: 0 },

  /** The challenge: an intercepted tape. The reader must set the wheels. */
  intercepted: { text: "HWOOI8W3", start: [0, 0, 0, 0, 0], picked: 0 },
};

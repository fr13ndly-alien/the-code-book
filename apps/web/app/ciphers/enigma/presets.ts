import { DEFAULT_SETTINGS, type EnigmaSettings, type Positions } from "@codebook/cipher-engine";

/** Machine setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, { settings: EnigmaSettings; start: Positions }> = {
  /** A fresh machine: rotors I, II, III showing AAA, no cables. */
  fresh: { settings: DEFAULT_SETTINGS, start: [0, 0, 0] },

  /** The example day key from the book: rotors 2-3-1, showing Q-C-W, six cables. */
  dayKey: {
    settings: {
      rotors: ["II", "III", "I"],
      rings: [0, 0, 0],
      reflector: "B",
      cables: ["AL", "PR", "TD", "BW", "KF", "OY"],
    },
    start: [16, 2, 22],
  },
};

/** Setups of the book's six-letter model that story buttons can load, by name. */
export const TOY_PRESETS: Record<string, { rotating: boolean }> = {
  /** Figure 26: a fixed scrambler, ready for the reader to type "cafe". */
  toyCafe: { rotating: false },

  /** Figure 27: the scrambler turns one place after each letter. */
  toyTurning: { rotating: true },
};

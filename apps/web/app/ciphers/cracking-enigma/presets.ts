import { DAY_CABLES, type CrackState } from "./useCrack";

/** The book's example day key (rotors at Q-C-W, six cables) and a weather report waiting for a crib. */
const START: CrackState = {
  tool: "chains",
  start: [16, 2, 22],
  cables: DAY_CABLES,
  pair: 0,
  ciphertext: "XSTVTDTKVPHHBEEQBTUXXWXUDWATOBJTD",
  crib: "WETTER",
  offset: 0,
};

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, CrackState> = {
  /** Rejewski's chains for the book's day key. The page starts here. */
  chains: START,

  /** The same day, following the letter A through its chain. */
  follow: { ...START, picked: 0 },

  /** Turing's crib: the morning weather report, with WETTER at the first position. */
  weather: { ...START, tool: "crib" },

  /** The challenge: a night report whose rotor setting the reader must find. */
  night: { ...START, tool: "crib", ciphertext: "DMTTITMTWYQADJCXFRNLZDFXDWEP" },
};

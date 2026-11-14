import type { ChallengeState } from "./useCodebreakersChallenge";

/** The page as it opens: cryptogram 1 on the bench and nothing solved. */
export const START: ChallengeState = {
  current: 0,
  shifts: [0, 0, 0, 0],
  guesses: {},
  keyLength: 2,
  keyShifts: [0, 0],
  position: 0,
  repeat: 0,
  solved: [false, false, false, false],
};

/**
 * Setups that buttons in story.mdx can load, by name. Each one only puts a
 * cryptogram on the bench: the reader's work and solved cryptograms are kept.
 */
export const PRESETS: Record<string, Partial<ChallengeState>> = {
  /** Cryptogram 1: a Caesar shift with its word spaces. */
  first: { current: 0 },

  /** Cryptogram 2: a short Caesar shift in groups of five. */
  second: { current: 1 },

  /** Cryptogram 3: a monoalphabetic substitution. */
  third: { current: 2 },

  /** Cryptogram 4: a Vigenère cipher. Its last three words answer the story's challenge. */
  fourth: { current: 3 },
};

/** Sizes of the drawn disc, in the units of its SVG view box. The centre is at 0, 0. */
export const DISC = {
  /** Half the width of the view box. */
  half: 100,
  /** Outer edge of the big, fixed disc. */
  outerEdge: 98,
  /** Where the plain letters sit. */
  outerLetters: 86,
  /** Outer edge of the small, turning disc. */
  innerEdge: 74,
  /** Where the cipher letters sit. */
  innerLetters: 62,
  /** The blank middle of the small disc. */
  hub: 48,
  /** The pin that holds the two discs together. */
  pin: 4,
  /** Height of the letters. */
  letterSize: 13,
  /** Radius of the invisible tap target around each inner letter. */
  tapRadius: 8,
  /** Degrees between one letter and the next. */
  step: 360 / 26,
} as const;

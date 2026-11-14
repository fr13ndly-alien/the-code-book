/**
 * The plugboard swaps pairs of letters before and after the rotors.
 * A cable is stored as a two-letter string such as "AB".
 */

/** The later army machines were issued with ten cables. */
export const MAX_CABLES = 10;

/** The letter that `letter` is swapped with, or the letter itself if no cable touches it. */
export function plugSwap(cables: readonly string[], letter: string): string {
  for (const [a, b] of cables) {
    if (letter === a) return b!;
    if (letter === b) return a!;
  }
  return letter;
}

/** Returns the cables with any cable touching `letter` removed. */
export function removeCable(cables: readonly string[], letter: string): string[] {
  return cables.filter((cable) => !cable.includes(letter));
}

/**
 * Returns the cables with a new one joining `a` and `b`.
 * Sockets already in use are freed first. Nothing changes if the board is full.
 */
export function addCable(cables: readonly string[], a: string, b: string): string[] {
  if (a === b) return [...cables];
  const freed = removeCable(removeCable(cables, a), b);
  if (freed.length >= MAX_CABLES) return [...cables];
  return [...freed, a + b];
}

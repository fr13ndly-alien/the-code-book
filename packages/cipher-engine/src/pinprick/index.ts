import { indexOfLetter } from "../text/index.ts";

/**
 * Pinprick messages: a secret is hidden in an innocent text by pricking a tiny
 * hole under chosen letters. Read in order, the pricked letters spell the secret.
 * This is steganography: the message is hidden, not scrambled.
 */

/** A made-up newspaper paragraph to hide messages in. It is ours, not a real paper. */
export const GAZETTE =
  "Fine weather brought a big crowd to the quay on Monday, when the mayor opened the new fish market. " +
  "The band played with zest until dusk. Mr J. Baxter of Vine Lane won a prize for the largest cod.";

/** The result of trying to hide a secret in a cover text. */
export interface Hiding {
  /** Where the pricks go: positions in the cover text, counting characters from 0. */
  positions: number[];
  /** The letters of the secret that could not be placed. Empty when all of it fits. */
  left: string;
}

const letterOf = (char: string | undefined) => (char ?? "").toUpperCase();
const isLetter = (char: string | undefined) => indexOfLetter(letterOf(char)) >= 0;

/**
 * Pricks one letter of the cover text for each letter of the secret, working
 * forwards and taking the first match each time. Stops when a letter cannot be found.
 */
export function hide(cover: string, secret: string): Hiding {
  const wanted = [...secret].filter(isLetter).map(letterOf);
  const positions: number[] = [];
  let from = 0;
  for (const letter of wanted) {
    const at = [...cover].findIndex((char, index) => index >= from && letterOf(char) === letter);
    if (at < 0) break;
    positions.push(at);
    from = at + 1;
  }
  return { positions, left: wanted.slice(positions.length).join("") };
}

/** Reads a pricked page: the letters above the holes, from the top of the page down. */
export function reveal(cover: string, positions: number[]): string {
  const chars = [...cover];
  return [...positions]
    .sort((a, b) => a - b)
    .filter((position) => isLetter(chars[position]))
    .map((position) => letterOf(chars[position]))
    .join("");
}

/** Pricks a position, or mends the hole if it is already pricked. Keeps the list in order. */
export const togglePrick = (positions: number[], position: number) =>
  positions.includes(position)
    ? positions.filter((other) => other !== position)
    : [...positions, position].sort((a, b) => a - b);

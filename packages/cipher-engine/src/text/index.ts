/** Helpers for working with letters, shared by every cipher. */

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Remainder that is never negative: mod(-1, 26) is 25. */
export const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Position of a capital letter in the alphabet: A is 0, Z is 25. Anything else is -1. */
export const indexOfLetter = (letter: string) => ALPHABET.indexOf(letter);

/** The capital letter at a position, wrapping round: letterAt(26) is A. */
export const letterAt = (index: number) => ALPHABET[mod(index, 26)]!;

/** The text in capitals with everything except A to Z removed. */
export const lettersOnly = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "");

/**
 * Replaces each letter using `change` and leaves spaces and punctuation alone.
 * `count` is the number of letters seen so far, for ciphers that change as they go.
 */
export function mapLetters(text: string, change: (letter: string, count: number) => string): string {
  let count = 0;
  return [...text.toUpperCase()].map((char) => (indexOfLetter(char) < 0 ? char : change(char, count++))).join("");
}

/** Splits text into blocks, the way cipher clerks wrote messages: "ATTAC KATDA WN". */
export function inGroups(text: string, size = 5): string {
  return text.match(new RegExp(`.{1,${size}}`, "g"))?.join(" ") ?? "";
}

/** How many times each letter appears: 26 numbers, A first. */
export function countLetters(text: string): number[] {
  const counts = new Array<number>(26).fill(0);
  for (const letter of lettersOnly(text)) counts[indexOfLetter(letter)]!++;
  return counts;
}

/**
 * How often each letter appears in ordinary English, in percent, A first.
 * Source: The Code Book, Table 1 (after Beker and Piper, "Cipher Systems").
 */
export const ENGLISH_FREQUENCY = [
  8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.2, 0.8, 4.0, 2.4, 6.7, 7.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4,
  0.2, 2.0, 0.1,
];

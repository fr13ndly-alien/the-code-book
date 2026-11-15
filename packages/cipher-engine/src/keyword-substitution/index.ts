import { ALPHABET, countLetters, indexOfLetter, letterAt, lettersOnly, mapLetters } from "../text/index.ts";

/**
 * The general monoalphabetic substitution cipher: the cipher alphabet is any
 * rearrangement of the 26 letters. A keyword or keyphrase is an easy way to
 * build and remember one.
 */

/**
 * How many cipher alphabets there are: 26 x 25 x 24 x ... x 1. The Code Book
 * rounds this to 400,000,000,000,000,000,000,000,000.
 */
export const KEY_COUNT = "403,291,461,126,605,635,584,000,000";

/** A keyphrase with spaces and repeated letters removed: "JULIUS CAESAR" gives "JULISCAER". */
export const squeeze = (keyphrase: string) => [...new Set(lettersOnly(keyphrase))].join("");

/**
 * The cipher alphabet for a keyphrase, built the way The Code Book does it:
 * the squeezed keyphrase first, then the unused letters in their usual order,
 * starting from the letter after the one the keyphrase ends on.
 * With no keyphrase it is the plain alphabet.
 */
export function cipherAlphabet(keyphrase: string): string {
  const start = squeeze(keyphrase);
  const from = start === "" ? 0 : indexOfLetter(start.at(-1)!) + 1;
  const rest = [...ALPHABET].map((_, i) => letterAt(from + i)).filter((letter) => !start.includes(letter));
  return start + rest.join("");
}

/** Enciphers text with a 26-letter cipher alphabet. Spaces and punctuation pass through unchanged. */
export const encipher = (text: string, alphabet: string) =>
  mapLetters(text, (letter) => alphabet[indexOfLetter(letter)] ?? letter);

/** Deciphers text that was enciphered with the same cipher alphabet. */
export const decipher = (text: string, alphabet: string) =>
  mapLetters(text, (letter) => ALPHABET[alphabet.indexOf(letter)] ?? letter);

/** The letter that appears most often in a text, or "" if it has no letters. Ties go to the earlier letter. */
export function commonestLetter(text: string): string {
  const counts = countLetters(text);
  const most = Math.max(...counts);
  return most === 0 ? "" : letterAt(counts.indexOf(most));
}

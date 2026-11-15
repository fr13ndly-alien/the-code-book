import { ALPHABET, indexOfLetter, letterAt, mapLetters } from "../text/index.ts";

/**
 * The Caesar shift: every letter is replaced by the one a fixed number of
 * places further along the alphabet.
 */

/** The cipher alphabet for a shift: shift 3 gives "DEFG...ABC". */
export const shiftedAlphabet = (shift: number) => [...ALPHABET].map((_, i) => letterAt(i + shift)).join("");

/** Enciphers text. Spaces and punctuation pass through unchanged. */
export const encipher = (text: string, shift: number) =>
  mapLetters(text, (letter) => letterAt(indexOfLetter(letter) + shift));

/** Deciphers text that was enciphered with the same shift. */
export const decipher = (text: string, shift: number) => encipher(text, -shift);

/** Every possible reading of a ciphertext: the brute-force attack. Entry n used shift n. */
export const tryAllShifts = (ciphertext: string) => ALPHABET.split("").map((_, shift) => decipher(ciphertext, shift));

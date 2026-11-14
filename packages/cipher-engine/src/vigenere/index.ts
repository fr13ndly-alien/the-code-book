import { ALPHABET, indexOfLetter, letterAt, lettersOnly, mapLetters } from "../text/index.ts";

/**
 * The Vigenère cipher: a keyword picks a different Caesar shift for each
 * letter of the message, so one plain letter can become many cipher letters.
 */

/** Which way the cipher is being run. */
export type Direction = "encipher" | "decipher";

/** One letter's journey through the square. */
export interface VigenereStep {
  /** The keyword letter that sits above this letter of the message. */
  key: string;
  plain: string;
  cipher: string;
}

/**
 * The Vigenère square: 26 cipher alphabets, one per key letter. Row "A" is the
 * ordinary alphabet and each row below is shifted one place more.
 * The book (Table 3) numbers the same rows 1 to 26, starting from the row that begins with B.
 */
export const SQUARE: string[] = [...ALPHABET].map((_, row) => [...ALPHABET].map((_, column) => letterAt(row + column)).join(""));

/** The letters of a keyword that the cipher can use. No letters at all means "A", which changes nothing. */
export const keyLetters = (keyword: string) => lettersOnly(keyword) || "A";

/** The keyword letter used for the nth letter of a message, counting from 0. */
export const keyLetterAt = (keyword: string, count: number) => {
  const letters = keyLetters(keyword);
  return letters[count % letters.length]!;
};

const shiftBy = (letter: string, key: string, sign: 1 | -1) => letterAt(indexOfLetter(letter) + sign * indexOfLetter(key));

/** Enciphers text. Spaces and punctuation pass through and do not use up key letters. */
export const encipher = (text: string, keyword: string) =>
  mapLetters(text, (letter, count) => shiftBy(letter, keyLetterAt(keyword, count), 1));

/** Deciphers text that was enciphered with the same keyword. */
export const decipher = (text: string, keyword: string) =>
  mapLetters(text, (letter, count) => shiftBy(letter, keyLetterAt(keyword, count), -1));

/** The working for every letter of a message: its key letter, plain letter and cipher letter. */
export function trace(text: string, keyword: string, direction: Direction = "encipher"): VigenereStep[] {
  return [...lettersOnly(text)].map((letter, count) => {
    const key = keyLetterAt(keyword, count);
    return direction === "encipher"
      ? { key, plain: letter, cipher: shiftBy(letter, key, 1) }
      : { key, plain: shiftBy(letter, key, -1), cipher: letter };
  });
}

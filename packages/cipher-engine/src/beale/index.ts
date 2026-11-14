import { indexOfLetter, lettersOnly } from "../text/index.ts";
import { BOOK_EXAMPLE_NUMBERS, BOOK_SENTENCE, KEY_TEXTS, type KeyText } from "./keytexts.ts";

/**
 * The book cipher behind the Beale papers. Every word of a key text is numbered.
 * A number stands for the first letter of its word, so one letter has many numbers.
 */

export { BOOK_EXAMPLE_NUMBERS, BOOK_SENTENCE, KEY_TEXTS, type KeyText };

/** One number of a message with the letter it stands for. "?" means no letter. */
export interface Step {
  /** The word number, or 0 when the key text has no word for the letter. */
  number: number;
  letter: string;
}

/** The key text with this id: one of the choices, or the book's example sentence. Falls back to the first choice. */
export const keyText = (id: string) => [...KEY_TEXTS, BOOK_SENTENCE].find((text) => text.id === id) ?? KEY_TEXTS[0]!;

/**
 * The words of a text, in order. Word 1 is words[0]. A hyphen splits a word in
 * two, which is how the Beale pamphlet counted "self-evident".
 */
export const numberedWords = (text: string) =>
  text
    .split(/[\s-]+/)
    .map((word) => word.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, ""))
    .filter((word) => word !== "");

/** The letter a word number stands for: the first letter of that word, or "?" if there is no such word. */
export const letterFor = (number: number, words: string[]) => words[number - 1]?.[0]?.toUpperCase() ?? "?";

/** Every number that can stand for a letter, smallest first. */
export const numbersFor = (letter: string, words: string[]) =>
  words.flatMap((word, index) => (word[0]!.toUpperCase() === letter ? [index + 1] : []));

/** The whole numbers written in a text, in order: "115, 73 24" gives [115, 73, 24]. */
export const parseNumbers = (text: string) => (text.match(/\d+/g) ?? []).map(Number);

/** Deciphers a list of numbers, keeping the working for each one. */
export const decipher = (numbers: number[], words: string[]): Step[] =>
  numbers.map((number) => ({ number, letter: letterFor(number, words) }));

/** The next value of a small random-number recipe (a linear congruential generator). */
const nextRandom = (value: number) => (Math.imul(value, 1664525) + 1013904223) >>> 0;

/**
 * Enciphers the letters of a message. Each letter gets one of its numbers,
 * chosen by a recipe that starts from `seed`: the same seed always gives the
 * same numbers. A letter that starts no word in the key text gets number 0.
 */
export function encipher(message: string, words: string[], seed = 1): Step[] {
  let random = nextRandom(seed);
  return [...lettersOnly(message)].map((letter) => {
    const choices = numbersFor(letter, words);
    random = nextRandom(random);
    // The high bits of this recipe are the well-mixed ones, so scale rather than take a remainder.
    const number = choices[Math.floor((random / 2 ** 32) * choices.length)] ?? 0;
    return { number, letter };
  });
}

/** The letters of the alphabet that start no word of the key text, so cannot be enciphered. */
export const missingLetters = (words: string[]) =>
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].filter((letter) => numbersFor(letter, words).length === 0).join("");

/** The letters of some steps as one string. */
export const lettersOf = (steps: Step[]) => steps.map((step) => step.letter).join("");

/** The numbers of some steps, written the way the Beale papers are: "115, 73, 24". */
export const numbersOf = (steps: Step[]) => steps.map((step) => (step.number === 0 ? "?" : step.number)).join(", ");

/**
 * The first 50 numbers of the second Beale cipher.
 * Source: The Code Book, chapter 2, figure 20.
 */
export const BEALE_TWO_OPENING = [
  115, 73, 24, 807, 37, 52, 49, 17, 31, 62, 647, 22, 7, 15, 140, 47, 29, 107, 79, 84, 56, 239, 10, 26, 811, 5, 196,
  308, 85, 52, 160, 136, 59, 211, 36, 9, 46, 316, 554, 122, 106, 95, 53, 58, 2, 42, 7, 35, 122, 53,
];

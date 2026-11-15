import { lettersOnly } from "../text/index.ts";

/**
 * Equidistant letter sequences, the idea behind the so-called Bible code:
 * pick a starting letter in a text, then keep jumping the same number of
 * letters and note where you land. Positions count letters only, from 0.
 */

/** One place where a word appears as an equidistant letter sequence. */
export interface Hit {
  /** The position of the word's first letter. */
  start: number;
  /** How many letters each jump covers. Always 1 or more. */
  skip: number;
  /** 1 when the jumps go forwards through the text, -1 when they go backwards. */
  direction: 1 | -1;
}

/** The positions a sequence lands on. A negative skip jumps backwards. Stops at either end of the text. */
export function positions(textLength: number, start: number, skip: number, length: number): number[] {
  const landed: number[] = [];
  for (let at = start; landed.length < length && at >= 0 && at < textLength; at += skip) {
    landed.push(at);
    if (skip === 0) break;
  }
  return landed;
}

/** The same as `sequence`, for text that is already capitals with nothing but letters. */
const read = (letters: string, start: number, skip: number, length: number) =>
  positions(letters.length, start, skip, length)
    .map((at) => letters[at])
    .join("");

/** The letters read by starting at `start` and jumping `skip` letters each time, `length` letters at most. */
export const sequence = (text: string, start: number, skip: number, length: number) =>
  read(lettersOnly(text), start, skip, length);

/** The largest skip at which a word of this length still fits inside the text. */
export const longestSkip = (textLength: number, wordLength: number) =>
  wordLength < 2 ? 0 : Math.floor((textLength - 1) / (wordLength - 1));

/** How many sequences of this length a search looks at: every start, every skip up to `maxSkip`, both directions. */
export function sequencesSearched(textLength: number, wordLength: number, maxSkip: number): number {
  let count = 0;
  const top = Math.min(maxSkip, longestSkip(textLength, wordLength));
  for (let skip = 1; skip <= top; skip++) count += 2 * (textLength - (wordLength - 1) * skip);
  return count;
}

const reversed = (word: string) => [...word].reverse().join("");

/**
 * Every place a word appears as an equidistant letter sequence, with skips from 1 to `maxSkip`,
 * read forwards or backwards. Sorted by skip, then by start. Words of one letter find nothing.
 * A word that reads the same both ways is reported once, forwards.
 */
export function findWord(text: string, word: string, maxSkip: number): Hit[] {
  const letters = lettersOnly(text);
  const target = lettersOnly(word);
  const directions: (1 | -1)[] = target === reversed(target) ? [1] : [1, -1];
  const hits: Hit[] = [];
  const top = Math.min(maxSkip, longestSkip(letters.length, target.length));
  for (let skip = 1; skip <= top; skip++) {
    for (let start = 0; start < letters.length; start++) {
      if (letters[start] !== target[0]) continue;
      for (const direction of directions) {
        if (read(letters, start, skip * direction, target.length) === target) hits.push({ start, skip, direction });
      }
    }
  }
  return hits;
}

export * from "./texts.ts";

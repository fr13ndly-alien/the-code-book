import { ENGLISH_FREQUENCY, countLetters, letterAt, lettersOnly } from "../text/index.ts";
import { decipher } from "../vigenere/index.ts";

/**
 * Breaking the Vigenère cipher the way Charles Babbage and Friedrich Kasiski
 * did: repeated sequences give the length of the keyword, and then each key
 * letter falls to frequency analysis, because it is only a Caesar shift.
 */

/** A run of letters that appears twice in a ciphertext. */
export interface Repeat {
  sequence: string;
  /** Where the two copies start, counting letters from 0. */
  first: number;
  second: number;
  /** How many letters lie between the two starts. */
  spacing: number;
}

/** The longest keyword the attack considers, as in the book's table. */
export const MAX_KEY_LENGTH = 20;

/** How far two positions of the text go on matching, stopping before the copies overlap. */
function matchLength(letters: string, first: number, second: number): number {
  let length = 0;
  while (first + length < second && second + length < letters.length && letters[first + length] === letters[second + length]) {
    length++;
  }
  return length;
}

/**
 * Every repeated sequence of at least `minLength` letters, longest first.
 * The book uses four letters or more, so that few repeats are accidents.
 */
export function findRepeats(ciphertext: string, minLength = 4): Repeat[] {
  const letters = lettersOnly(ciphertext);
  const repeats: Repeat[] = [];
  for (let first = 0; first < letters.length; first++) {
    for (let second = first + 1; second < letters.length; second++) {
      // A match that also matched one letter earlier is part of a longer repeat already listed.
      if (first > 0 && letters[first - 1] === letters[second - 1]) continue;
      const length = matchLength(letters, first, second);
      if (length < minLength) continue;
      repeats.push({ sequence: letters.slice(first, first + length), first, second, spacing: second - first });
    }
  }
  return repeats.sort((a, b) => b.sequence.length - a.sequence.length || a.first - b.first);
}

/** The key lengths a spacing allows: the numbers from 2 to `max` that divide it exactly. */
export function factors(spacing: number, max = MAX_KEY_LENGTH): number[] {
  const found: number[] = [];
  for (let length = 2; length <= max; length++) if (spacing % length === 0) found.push(length);
  return found;
}

/** For each key length from 2 to `max`, how many of the repeats it would explain. */
export function tallyFactors(repeats: Repeat[], max = MAX_KEY_LENGTH): { length: number; count: number }[] {
  const tally: { length: number; count: number }[] = [];
  for (let length = 2; length <= max; length++) {
    tally.push({ length, count: repeats.filter((repeat) => repeat.spacing % length === 0).length });
  }
  return tally;
}

/** The key length that explains the most repeats. Of equal candidates the longest wins. */
export function likelyKeyLength(repeats: Repeat[]): number {
  return tallyFactors(repeats).reduce((best, each) => (each.count >= best.count ? each : best)).length;
}

/** Splits a ciphertext into one string per key letter: slice 0 holds letters 1, 1 + n, 1 + 2n... */
export function slices(ciphertext: string, keyLength: number): string[] {
  const parts = new Array<string>(Math.max(1, keyLength)).fill("");
  [...lettersOnly(ciphertext)].forEach((letter, count) => (parts[count % parts.length] += letter));
  return parts;
}

/** Letter counts of a slice after undoing a Caesar shift: 26 numbers, plain A first. */
export function countsAfterShift(slice: string, shift: number): number[] {
  const counts = countLetters(slice);
  return counts.map((_, letter) => counts[(letter + shift) % 26]!);
}

/** How badly a set of letter counts fits ordinary English (chi-squared): smaller is closer. */
export function mismatch(counts: number[]): number {
  const total = counts.reduce((sum, count) => sum + count, 0);
  return counts.reduce((sum, count, letter) => {
    const expected = (total * ENGLISH_FREQUENCY[letter]!) / 100;
    return sum + (count - expected) ** 2 / expected;
  }, 0);
}

/** The shift, 0 to 25, that makes a slice look most like English. */
export function bestShift(slice: string): number {
  let best = 0;
  for (let shift = 1; shift < 26; shift++) {
    if (mismatch(countsAfterShift(slice, shift)) < mismatch(countsAfterShift(slice, best))) best = shift;
  }
  return best;
}

/** The keyword that a list of shifts spells: 0 is A, 4 is E. */
export const keywordFromShifts = (shifts: number[]) => shifts.map(letterAt).join("");

/** Deciphers a ciphertext with one shift per key position. */
export const applyKey = (ciphertext: string, shifts: number[]) => decipher(ciphertext, keywordFromShifts(shifts));

/** The whole attack at once, for checking: guess the length, then the best shift for each slice. */
export function crack(ciphertext: string): string {
  const length = likelyKeyLength(findRepeats(ciphertext));
  return keywordFromShifts(slices(ciphertext, length).map(bestShift));
}

export { INTERCEPTS } from "./intercepts.ts";

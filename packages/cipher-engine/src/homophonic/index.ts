import { ALPHABET, indexOfLetter, lettersOnly } from "../text/index.ts";

/**
 * The homophonic substitution cipher: every letter has several two-digit
 * numbers, as many as its share of normal English. The sender picks any one
 * of them each time, so no number is common and no number is rare.
 */

/**
 * How many numbers each letter gets, A first: its percentage in English, rounded
 * so that the total is exactly 100. Source: The Code Book (full edition), chapter 2,
 * from the frequencies of its Table 1 (Beker and Piper).
 */
export const ALLOTMENT = [8, 2, 3, 4, 12, 2, 2, 6, 6, 1, 1, 4, 2, 6, 7, 2, 1, 6, 6, 9, 3, 1, 2, 1, 2, 1];

/** The key: for each letter, A first, the numbers that may stand for it. */
export type Table = string[][];

/** One letter of a message with the number that stands for it. */
export interface Step {
  plain: string;
  number: string;
}

/** A small repeatable random number generator (mulberry32). Returns numbers from 0 up to 1. */
function randomFrom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The hundred numbers a table shares out: "00" to "99". */
export const NUMBERS = Array.from({ length: 100 }, (_, n) => String(n).padStart(2, "0"));

/** Makes a key: shuffles the hundred numbers and deals them out by the allotment. The seed picks the shuffle. */
export function makeTable(seed: number): Table {
  const random = randomFrom(seed);
  const pack = [...NUMBERS];
  for (let i = pack.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pack[i], pack[j]] = [pack[j]!, pack[i]!];
  }
  let dealt = 0;
  return ALLOTMENT.map((share) => pack.slice(dealt, (dealt += share)).sort());
}

/** The letter a number stands for, or undefined if the text is not one of the hundred numbers. */
export function letterOf(number: string, table: Table): string | undefined {
  const index = table.findIndex((numbers) => numbers.includes(number));
  return index < 0 ? undefined : ALPHABET[index];
}

/**
 * Enciphers the letters of a message. For each letter the sender picks one of
 * its numbers at random; the seed makes the same picks every time.
 */
export function encipher(text: string, table: Table, seed: number): Step[] {
  const random = randomFrom(seed);
  return [...lettersOnly(text)].map((plain) => {
    const numbers = table[indexOfLetter(plain)]!;
    return { plain, number: numbers[Math.floor(random() * numbers.length)]! };
  });
}

/** Reads a ciphertext of two-digit numbers back into letters. Anything that is not a number is skipped. */
export function decipher(ciphertext: string, table: Table): Step[] {
  const numbers = ciphertext.replace(/\D/g, "").match(/\d\d/g) ?? [];
  return numbers.map((number) => ({ plain: letterOf(number, table)!, number }));
}

/** The ciphertext of a message: its numbers with spaces between. */
export const numbersOf = (steps: Step[]) => steps.map((step) => step.number).join(" ");

/** The plaintext of a message, as one run of letters. */
export const plainOf = (steps: Step[]) => steps.map((step) => step.plain).join("");

/** How many times each of the hundred numbers appears: 100 counts, "00" first. */
export function countNumbers(steps: Step[]): number[] {
  const counts = new Array<number>(100).fill(0);
  for (const { number } of steps) counts[Number(number)]!++;
  return counts;
}

/**
 * The different numbers that come straight after one number in a message, in order.
 * This is the codebreaker's way in: the number for Q is followed only by the numbers for U.
 */
export function followers(steps: Step[], number: string): string[] {
  const found = new Set<string>();
  steps.forEach((step, i) => {
    const next = steps[i + 1];
    if (step.number === number && next) found.add(next.number);
  });
  return [...found].sort();
}

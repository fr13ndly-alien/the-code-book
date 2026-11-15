import { ALPHABET, mapLetters } from "../text/index.ts";

/**
 * The Kama Sutra cipher (mlecchita-vikalpa): the 26 letters are paired off at
 * random, and each letter of the message is swapped with its partner. Doing
 * the same swap again brings the message back.
 */

/** Thirteen pairs of letters, each written as two letters: "AV" pairs A with V. */
export type Pairs = string[];

/** The pairing printed in The Code Book, chapter 1, for its "meet at midnight" example. */
export const BOOK_PAIRS: Pairs = ["AV", "DX", "HB", "IG", "KJ", "MC", "OQ", "RL", "SN", "UE", "WF", "YP", "ZT"];

/**
 * How many different ways 26 letters can be split into 13 pairs:
 * 25 x 23 x 21 x ... x 3 x 1.
 */
export const PAIRINGS_COUNT = 7_905_853_580_625;

/** A small repeatable random number generator (mulberry32): the same seed always gives the same numbers. */
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

/** The alphabet in a shuffled order that depends only on the seed. */
function shuffledAlphabet(seed: number): string[] {
  const letters = [...ALPHABET];
  const random = randomFrom(seed);
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [letters[i], letters[j]] = [letters[j]!, letters[i]!];
  }
  return letters;
}

/**
 * The pairing for a seed. Seed 0 is the book's pairing; every other seed gives
 * a shuffled one, always the same for the same seed.
 */
export function pairsFor(seed: number): Pairs {
  if (seed === 0) return BOOK_PAIRS;
  const letters = shuffledAlphabet(seed);
  return Array.from({ length: 13 }, (_, i) => letters[2 * i]! + letters[2 * i + 1]!);
}

/** The partner of a capital letter, or the letter itself if no pair holds it. */
export function partnerOf(letter: string, pairs: Pairs): string {
  const pair = pairs.find((candidate) => candidate.includes(letter));
  if (!pair || letter.length !== 1) return letter;
  return pair[0] === letter ? pair[1]! : pair[0]!;
}

/** Swaps every letter with its partner. The same call enciphers and deciphers. */
export const swap = (text: string, pairs: Pairs) => mapLetters(text, (letter) => partnerOf(letter, pairs));

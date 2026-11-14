import { ALPHABET, ENGLISH_FREQUENCY, countLetters, indexOfLetter, lettersOnly, mapLetters } from "../text/index.ts";

/**
 * Frequency analysis: al-Kindi's attack on the monoalphabetic substitution
 * cipher. Count the letters of the ciphertext, compare the counts with normal
 * writing, and guess which letter hides behind which.
 */

export {
  BOOK_CIPHERTEXT,
  BOOK_FIRST_FINDS,
  LIPOGRAM_PLAINTEXT,
  SAMPLE_CIPHER_ALPHABET,
  SAMPLE_PLAINTEXT,
} from "./sample.ts";

/** The codebreaker's working key: each cipher letter they have guessed, and the plain letter they gave it. */
export type Guesses = Record<string, string>;

/** One character of the working text: the cipher letter, and the plain letter guessed for it, if any. */
export interface Reading {
  cipher: string;
  /** Undefined while the letter is unsolved. Spaces and punctuation are never solved. */
  plain?: string;
}

/** What surrounds one cipher letter: how often each letter stands just before it and just after it. */
export interface Neighbours {
  /** 26 counts, A first: how often each letter comes straight before this one. */
  before: number[];
  /** 26 counts, A first: how often each letter comes straight after this one. */
  after: number[];
  /** How many different letters ever touch this one. Vowels touch nearly all of them. */
  different: number;
}

/** Enciphers text with a cipher alphabet: its first letter stands for A, its second for B. */
export const encipher = (text: string, cipherAlphabet: string) =>
  mapLetters(text, (letter) => cipherAlphabet[indexOfLetter(letter)]!);

/** Deciphers text when the whole cipher alphabet is known. */
export const decipher = (text: string, cipherAlphabet: string) =>
  mapLetters(text, (letter) => ALPHABET[cipherAlphabet.indexOf(letter)]!);

/** How often each letter appears, in percent of all the letters: 26 numbers, A first. */
export function percentages(text: string): number[] {
  const counts = countLetters(text);
  const total = Math.max(1, lettersOnly(text).length);
  return counts.map((count) => (100 * count) / total);
}

/** The 26 letters, most common first. Letters that tie stay in alphabetical order. */
export const rankLetters = (values: number[]) =>
  [...ALPHABET].sort((a, b) => values[indexOfLetter(b)]! - values[indexOfLetter(a)]!);

/** The letters of normal English, most common first: E, T, A, O and so on. */
export const ENGLISH_RANK = rankLetters(ENGLISH_FREQUENCY);

/**
 * Al-Kindi's recipe, followed blindly: the most common cipher letter is called E,
 * the second T, and so on. Only letters that appear in the text get a guess.
 */
export function guessByRank(ciphertext: string): Guesses {
  const counts = countLetters(ciphertext);
  const ranked = rankLetters(counts).filter((letter) => counts[indexOfLetter(letter)]! > 0);
  return Object.fromEntries(ranked.map((letter, rank) => [letter, ENGLISH_RANK[rank]!]));
}

/** Gives a cipher letter a plain letter. A plain letter can belong to only one cipher letter. */
export function assign(guesses: Guesses, cipher: string, plain: string): Guesses {
  const others = Object.entries(guesses).filter(([c, p]) => c !== cipher && p !== plain);
  return Object.fromEntries([...others, [cipher, plain]]);
}

/** Takes back the guess for one cipher letter. */
export const unassign = (guesses: Guesses, cipher: string): Guesses =>
  Object.fromEntries(Object.entries(guesses).filter(([c]) => c !== cipher));

/** The ciphertext, character by character, with the guess for each letter beside it. */
export const read = (ciphertext: string, guesses: Guesses): Reading[] =>
  [...ciphertext.toUpperCase()].map((cipher) => ({ cipher, plain: guesses[cipher] }));

/**
 * The working text as the book writes it: solved letters in lower case,
 * unsolved cipher letters still in capitals.
 */
export const partialText = (ciphertext: string, guesses: Guesses) =>
  read(ciphertext, guesses)
    .map(({ cipher, plain }) => plain?.toLowerCase() ?? cipher)
    .join("");

/** Counts the letters that stand next to one cipher letter inside the same word. */
export function neighbours(ciphertext: string, letter: string): Neighbours {
  const text = ciphertext.toUpperCase();
  const before = new Array<number>(26).fill(0);
  const after = new Array<number>(26).fill(0);
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== letter) continue;
    // A space or a comma gives index -1, and writing to before[-1] would be a bug.
    const [left, right] = [indexOfLetter(text[i - 1] ?? ""), indexOfLetter(text[i + 1] ?? "")];
    if (left >= 0) before[left]!++;
    if (right >= 0) after[right]!++;
  }
  const different = before.filter((count, i) => count + after[i]! > 0).length;
  return { before, after, different };
}

/** The cipher letters that appear doubled, such as OO, with how many times each pair appears. */
export function doubles(ciphertext: string): Record<string, number> {
  const found: Record<string, number> = {};
  for (const pair of ciphertext.toUpperCase().match(/([A-Z])\1/g) ?? []) {
    found[pair[0]!] = (found[pair[0]!] ?? 0) + 1;
  }
  return found;
}

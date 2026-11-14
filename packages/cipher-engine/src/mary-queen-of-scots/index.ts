import { indexOfLetter } from "../text/index.ts";
import { MISSING_LETTERS, STAND_IN, type Nomenclator } from "./nomenclator.ts";

/**
 * The nomenclator of Mary Queen of Scots: a sign for each letter, a few signs
 * for whole words, a sign that doubles a letter, and nulls that mean nothing.
 */

export { BOOK_SAMPLE_CODE, MISSING_LETTERS, STAND_IN, spareNulls, type Nomenclator } from "./nomenclator.ts";

/** What a sign in a message is doing. "other" is a space or punctuation, passed through. */
export type TokenKind = "letter" | "word" | "null" | "doubler" | "other";

/** One sign of a message, with what it stands for. */
export interface Token {
  symbol: string;
  kind: TokenKind;
  /** The letter, doubled letter or word it stands for. Empty for a null and for the doubler. */
  plain: string;
}

/** The choices the sender makes when enciphering. */
export interface Options {
  /** Chooses where the nulls fall. The same seed always gives the same ciphertext. */
  seed: number;
  /** The chance, 0 to 1, of slipping a null in before each sign. */
  nullShare: number;
  /** Whether to swap listed words for their single sign. */
  useWords: boolean;
}

/** One sign of a count: how many times it appears in a message. */
export interface Tally {
  symbol: string;
  count: number;
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

/** A word in the 23-letter alphabet: JOVE becomes IOUE, and W becomes UU. */
export const spell = (text: string) =>
  [...text.toUpperCase()].map((letter) => MISSING_LETTERS[letter] ?? letter).join("");

/** The signs for one word, letter by letter. A double letter becomes the doubler and one sign. */
function encipherLetters(word: string, key: Nomenclator): Token[] {
  const tokens: Token[] = [];
  const letters = spell(word);
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]!;
    const doubled = letters[i + 1] === letter;
    if (doubled) tokens.push({ symbol: key.doubler, kind: "doubler", plain: "" });
    tokens.push({ symbol: key.letters[letter]!, kind: "letter", plain: doubled ? letter + letter : letter });
    if (doubled) i++;
  }
  return tokens;
}

/** The signs for one word: its own sign if it is on the list, otherwise its letters. */
function encipherWord(word: string, useWords: boolean, key: Nomenclator): Token[] {
  const sign = useWords ? key.words[word] : undefined;
  return sign ? [{ symbol: sign, kind: "word", plain: word }] : encipherLetters(word, key);
}

/** Slips nulls in before some signs. A null never splits the doubler from its letter. */
function sprinkleNulls(tokens: Token[], options: Options, key: Nomenclator): Token[] {
  const random = randomFrom(options.seed);
  return tokens.flatMap((token, i) => {
    const mayFollowNull = token.kind !== "other" && tokens[i - 1]?.kind !== "doubler";
    if (!mayFollowNull || random() >= options.nullShare) return [token];
    const symbol = key.nulls[Math.floor(random() * key.nulls.length)]!;
    return [{ symbol, kind: "null" as const, plain: "" }, token];
  });
}

/** Enciphers a message, returning every sign with what it stands for. */
export function encipher(text: string, options: Options, key: Nomenclator = STAND_IN): Token[] {
  const pieces = text.toUpperCase().match(/[A-Z]+|[^A-Z]/g) ?? [];
  const tokens = pieces.flatMap((piece): Token[] =>
    indexOfLetter(piece[0]!) < 0
      ? [{ symbol: piece, kind: "other", plain: piece }]
      : encipherWord(piece, options.useWords, key),
  );
  return sprinkleNulls(tokens, options, key);
}

/** What kind of sign this is, and what it stands for on its own. */
export function lookUp(symbol: string, key: Nomenclator = STAND_IN): Token {
  const find = (table: Record<string, string>) => Object.keys(table).find((plain) => table[plain] === symbol);
  const letter = find(key.letters);
  const word = find(key.words);
  if (letter) return { symbol, kind: "letter", plain: letter };
  if (word) return { symbol, kind: "word", plain: word };
  if (key.nulls.includes(symbol)) return { symbol, kind: "null", plain: "" };
  if (symbol === key.doubler) return { symbol, kind: "doubler", plain: "" };
  return { symbol, kind: "other", plain: symbol };
}

/** Reads a ciphertext sign by sign: nulls are dropped and the doubler doubles the next letter. */
export function decipher(ciphertext: string, key: Nomenclator = STAND_IN): Token[] {
  let double = false;
  return [...ciphertext].map((symbol) => {
    const token = lookUp(symbol, key);
    if (token.kind === "letter" && double) token.plain += token.plain;
    // A null between the doubler and its letter does not cancel the doubling.
    if (token.kind !== "null") double = token.kind === "doubler";
    return token;
  });
}

/** The ciphertext a list of signs makes. */
export const symbolsOf = (tokens: Token[]) => tokens.map((token) => token.symbol).join("");

/** The plaintext a list of signs stands for, in the 23-letter spelling. */
export const plainOf = (tokens: Token[]) => tokens.map((token) => token.plain).join("");

/** Splits a message at its spaces, so that a page can keep each word on one line. */
export function inWords(tokens: Token[]): Token[][] {
  const words: Token[][] = [[]];
  for (const token of tokens) {
    if (token.kind === "other" && token.symbol.trim() === "") words.push([]);
    else words[words.length - 1]!.push(token);
  }
  return words.filter((word) => word.length > 0);
}

/** Counts every sign in a message, most common first. Spaces and punctuation are left out. */
export function tally(tokens: Token[]): Tally[] {
  const counts = new Map<string, number>();
  for (const { symbol, kind } of tokens) {
    if (kind !== "other") counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  }
  return [...counts].map(([symbol, count]) => ({ symbol, count })).sort((a, b) => b.count - a.count);
}

/**
 * Encodes a message with a pure code: each word on the list becomes its codeword and
 * the codewords are joined with dashes. A word that is not on the list is left out,
 * as the book leaves out "the" in its example (PDF p. 43).
 */
export const encodeWords = (message: string, code: Record<string, string>) =>
  (message.toUpperCase().match(/[A-Z]+/g) ?? []).flatMap((word) => code[word] ?? []).join("-");

import { ALPHABET, lettersOnly, mod } from "../text/index.ts";

/**
 * The Playfair cipher: letters are enciphered two at a time, using a 5 by 5
 * square of letters built from a keyword. I and J share one cell.
 */

/** Which way the cipher is being run. */
export type Direction = "encipher" | "decipher";

/** How a pair is changed: it depends on where its two letters sit in the square. */
export type Rule = "row" | "column" | "rectangle";

/** Why a letter was added to a pair: to split a double letter, or to fill the last pair. */
export type Padding = "double" | "end";

/** Two letters of the message, ready for the square. */
export interface Digraph {
  pair: string;
  padded?: Padding;
}

/** One pair's journey through the square. Cells are counted 0 to 24, row by row. */
export interface PlayfairStep {
  plain: string;
  cipher: string;
  rule: Rule;
  padded?: Padding;
  plainCells: [number, number];
  cipherCells: [number, number];
}

/** The square has five rows of five letters. */
export const SIZE = 5;

/** Letters as the square knows them: capitals only, with J written as I. */
const squareLetters = (text: string) => lettersOnly(text).replace(/J/g, "I");

/**
 * The 25 letters of the square, row by row: the keyword first, without
 * repeated letters, then the rest of the alphabet in order. There is no J.
 */
export function buildSquare(keyword: string): string {
  return [...new Set(squareLetters(keyword + ALPHABET))].join("");
}

/** The letter added to complete a pair: X, or Q when the letter it joins is itself X. */
const filler = (letter: string) => (letter === "X" ? "Q" : "X");

/**
 * Splits a message into pairs for enciphering. The two letters of a pair must
 * differ, so a filler splits any double letter, and another completes a last odd letter.
 */
export function digraphs(message: string): Digraph[] {
  const letters = squareLetters(message);
  const pairs: Digraph[] = [];
  let at = 0;
  while (at < letters.length) {
    const first = letters[at]!;
    const second = letters[at + 1];
    if (second === undefined) pairs.push({ pair: first + filler(first), padded: "end" });
    else if (second === first) pairs.push({ pair: first + filler(first), padded: "double" });
    else pairs.push({ pair: first + second });
    at += second === undefined || second === first ? 1 : 2;
  }
  return pairs;
}

/** Splits a ciphertext into pairs for deciphering. Nothing is added except to complete a last odd letter. */
export function cipherPairs(ciphertext: string): Digraph[] {
  const letters = squareLetters(ciphertext);
  const pairs = letters.match(/../g)?.map((pair): Digraph => ({ pair })) ?? [];
  if (letters.length % 2 === 1) pairs.push({ pair: letters.slice(-1) + filler(letters.slice(-1)), padded: "end" });
  return pairs;
}

/** The rule for two cells: same row, same column, or the corners of a rectangle. */
function ruleFor(first: number, second: number): Rule {
  if (Math.floor(first / SIZE) === Math.floor(second / SIZE)) return "row";
  return first % SIZE === second % SIZE ? "column" : "rectangle";
}

/**
 * Where two cells are sent. In a row each moves one cell right, in a column one
 * cell down, wrapping at the edge; deciphering goes the other way. In a
 * rectangle each takes the corner in its own row, which is the same both ways.
 */
function moveCells(first: number, second: number, direction: Direction): [number, number] {
  const step = direction === "encipher" ? 1 : -1;
  const row = (cell: number) => Math.floor(cell / SIZE);
  const column = (cell: number) => cell % SIZE;
  const at = (r: number, c: number) => mod(r, SIZE) * SIZE + mod(c, SIZE);
  switch (ruleFor(first, second)) {
    case "row":
      return [at(row(first), column(first) + step), at(row(second), column(second) + step)];
    case "column":
      return [at(row(first) + step, column(first)), at(row(second) + step, column(second))];
    case "rectangle":
      return [at(row(first), column(second)), at(row(second), column(first))];
  }
}

/** The working for every pair of a message: the rule used and the cells involved. */
export function trace(text: string, keyword: string, direction: Direction = "encipher"): PlayfairStep[] {
  const square = buildSquare(keyword);
  const pairs = direction === "encipher" ? digraphs(text) : cipherPairs(text);
  return pairs.map(({ pair, padded }) => {
    const from: [number, number] = [square.indexOf(pair[0]!), square.indexOf(pair[1]!)];
    const to = moveCells(from[0], from[1], direction);
    const moved = square[to[0]]! + square[to[1]]!;
    const base = { rule: ruleFor(from[0], from[1]), padded };
    return direction === "encipher"
      ? { ...base, plain: pair, cipher: moved, plainCells: from, cipherCells: to }
      : { ...base, plain: moved, cipher: pair, plainCells: to, cipherCells: from };
  });
}

/** Enciphers a message. The result is written in pairs: "GD DO GD". */
export const encipher = (message: string, keyword: string) =>
  trace(message, keyword, "encipher")
    .map((step) => step.cipher)
    .join(" ");

/** Deciphers a ciphertext into pairs of plain letters. Any filler letters are left for the reader to drop. */
export const decipher = (ciphertext: string, keyword: string) =>
  trace(ciphertext, keyword, "decipher")
    .map((step) => step.plain)
    .join(" ");

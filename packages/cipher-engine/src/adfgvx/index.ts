import { lettersOnly } from "../text/index.ts";

/**
 * The ADFGVX cipher of 1918. Stage one swaps every letter or digit for a pair
 * of the letters A, D, F, G, V, X using a 6 by 6 grid. Stage two writes those
 * letters in rows under a keyword and reads them off column by column, in the
 * alphabetical order of the keyword's letters.
 */

/** The six letters that label the rows and columns of the grid. */
export const HEADS = "ADFGVX";

/** The 36 symbols a grid must hold. */
export const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * A grid, written row by row.
 * Source: the worked example in Simon Singh, The Code Book (full edition), Appendix F.
 */
export const BOOK_GRID = "8P3D1NLT4OAH7KBC5ZJU6WGMXSVIR29EY0FQ";

/** Every stage of one message, so a page can show how the answer was reached. */
export interface Working {
  /** The plaintext as the cipher sees it: capitals and digits only. */
  symbols: string;
  /** One pair per symbol, e.g. ["DV", "DD"]. */
  pairs: string[];
  /** The keyword with everything but letters removed. One column per letter. */
  keyword: string;
  /** The letters of all the pairs written in rows under the keyword. The last row may be short. */
  table: string[][];
  /** The columns of the table in the order they are read: order[0] is read first. */
  order: number[];
  /** The columns read downwards, in that order. */
  ciphertext: string;
}

/** The text in capitals with everything except letters and digits removed. */
export const symbolsOnly = (text: string) => text.toUpperCase().replace(/[^A-Z0-9]/g, "");

/** The grid as six rows of six symbols. */
export const gridRows = (grid: string) => HEADS.split("").map((_, row) => [...grid.slice(row * 6, row * 6 + 6)]);

/** The pair that stands for a symbol: its row letter, then its column letter. */
export function pairFor(grid: string, symbol: string): string {
  const at = grid.indexOf(symbol);
  return HEADS[Math.floor(at / 6)]! + HEADS[at % 6]!;
}

/** The symbol that a pair stands for. */
export const symbolFor = (grid: string, pair: string) =>
  grid[HEADS.indexOf(pair[0]!) * 6 + HEADS.indexOf(pair[1]!)]!;

/** A keyword as the cipher uses it. An empty keyword becomes "A": one column, so nothing moves. */
export const cleanKeyword = (keyword: string) => lettersOnly(keyword) || "A";

/**
 * The order in which the columns under a keyword are read: alphabetical by
 * keyword letter. When a letter repeats, the column further left goes first.
 */
export function columnOrder(keyword: string): number[] {
  const letters = [...cleanKeyword(keyword)];
  return letters.map((_, column) => column).sort((a, b) => letters[a]!.localeCompare(letters[b]!) || a - b);
}

/** Writes text in rows of `width` letters. */
function inRows(text: string, width: number): string[][] {
  const rows: string[][] = [];
  for (let at = 0; at < text.length; at += width) rows.push([...text.slice(at, at + width)]);
  return rows;
}

/** Stage two: reads the table column by column in keyword order. */
function readColumns(table: string[][], order: number[]): string {
  return order.map((column) => table.map((row) => row[column] ?? "").join("")).join("");
}

/** Undoes stage two: puts the letters of a ciphertext back into rows under the keyword. */
function writeColumns(ciphertext: string, order: number[]): string[][] {
  const width = order.length;
  const height = Math.ceil(ciphertext.length / width);
  // Only the first few columns reach the last row when the message does not fill the table.
  const reach = ciphertext.length % width || width;
  const table = Array.from({ length: height }, () => new Array<string>(0));
  let at = 0;
  for (const column of order) {
    const length = column < reach ? height : height - 1;
    for (let row = 0; row < length; row++) table[row]![column] = ciphertext[at++]!;
  }
  return table;
}

/** Enciphers a message and returns every stage. Anything that is not a letter or digit is dropped. */
export function encipher(grid: string, keyword: string, message: string): Working {
  const symbols = symbolsOnly(message);
  const pairs = [...symbols].map((symbol) => pairFor(grid, symbol));
  const order = columnOrder(keyword);
  const table = inRows(pairs.join(""), order.length);
  return { symbols, pairs, keyword: cleanKeyword(keyword), table, order, ciphertext: readColumns(table, order) };
}

/** Deciphers a message and returns every stage. A stray last letter with no partner is dropped. */
export function decipher(grid: string, keyword: string, text: string): Working {
  const ciphertext = text.toUpperCase().replace(/[^ADFGVX]/g, "");
  const order = columnOrder(keyword);
  const table = writeColumns(ciphertext, order);
  const pairs = table.flat().join("").match(/../g) ?? [];
  const symbols = pairs.map((pair) => symbolFor(grid, pair)).join("");
  return { symbols, pairs, keyword: cleanKeyword(keyword), table, order, ciphertext };
}

/**
 * A new grid from a list of numbers, one per symbol: the symbols are sorted by
 * their number. The caller supplies the randomness, so this stays a pure function.
 */
export function gridFromNumbers(numbers: readonly number[]): string {
  return [...SYMBOLS]
    .map((symbol, at) => ({ symbol, rank: numbers[at] ?? 0 }))
    .sort((a, b) => a.rank - b.rank)
    .map((entry) => entry.symbol)
    .join("");
}

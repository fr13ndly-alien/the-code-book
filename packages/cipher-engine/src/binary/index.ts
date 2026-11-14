/**
 * Computer encryption at its simplest. Every character becomes a 7-digit
 * binary number (ASCII), the key is turned into binary the same way, and the
 * two rows of digits are added. Adding the key again gives the message back.
 */

/** How many binary digits ASCII gives each character. */
export const BITS = 7;

/** Shown in place of an ASCII code that has no printable character. */
export const UNPRINTABLE = "·";

/**
 * The 7-bit ASCII number of each character of a text, e.g. "A" gives ["1000001"].
 * ASCII is the American Standard Code for Information Interchange; the codes
 * are the character codes built into JavaScript. Characters outside ASCII are dropped.
 */
export const toBits = (text: string): string[] =>
  [...text]
    .map((char) => char.charCodeAt(0))
    .filter((code) => code < 2 ** BITS)
    .map((code) => code.toString(2).padStart(BITS, "0"));

/** The character with a 7-bit number, or a dot if it is not one you can print. */
export function charOf(bits: string): string {
  const code = parseInt(bits, 2);
  return code >= 32 && code < 127 ? String.fromCharCode(code) : UNPRINTABLE;
}

/** The characters of a row of 7-bit numbers. */
export const toText = (rows: string[]) => rows.map(charOf).join("");

/** Splits typed ones and zeros into 7-bit numbers. Other characters and a short last group are ignored. */
export const parseBits = (typed: string): string[] => typed.replace(/[^01]/g, "").match(/[01]{7}/g) ?? [];

/**
 * Adds two binary numbers digit by digit, without carrying: two digits that
 * are the same give 0, two that differ give 1. Programmers call this XOR.
 */
export const add = (a: string, b: string) => [...a].map((bit, at) => (bit === b[at] ? "0" : "1")).join("");

/** A binary number with the digit at one position changed from 0 to 1 or from 1 to 0. */
export const flipBit = (bits: string, at: number) =>
  [...bits].map((bit, index) => (index === at ? (bit === "0" ? "1" : "0") : bit)).join("");

/** One character's worth of the sum: the input, the key under it and the result. */
export interface Column {
  input: string;
  key: string;
  output: string;
}

/**
 * Adds a key to an input, one 7-bit number at a time. A key shorter than the
 * input is used again from its beginning. With no key at all, nothing changes.
 * The same call enciphers a message and deciphers a ciphertext.
 */
export function combine(input: string[], key: string[]): Column[] {
  const blank = "0".repeat(BITS);
  return input.map((bits, at) => {
    const keyBits = key.length ? key[at % key.length]! : blank;
    return { input: bits, key: keyBits, output: add(bits, keyBits) };
  });
}

/** The result row of a sum. */
export const outputOf = (columns: Column[]) => columns.map((column) => column.output);

import { lettersOnly } from "../text/index.ts";

/**
 * The rail fence: a transposition cipher. The letters of the message are
 * written in a zig-zag across a number of rails (rows), then read off one
 * rail at a time. No letter changes; only the order does.
 */

/** The rail that letter number `index` sits on: 0, 1, 2, 1, 0, 1, ... for three rails. */
export function railOf(index: number, rails: number): number {
  if (rails < 2) return 0;
  const cycle = 2 * (rails - 1);
  const step = index % cycle;
  return step < rails ? step : cycle - step;
}

/**
 * The message written on the fence: fence[rail][column]. Each column holds one
 * letter, on the rail the zig-zag has reached; every other cell is "".
 */
export function fence(text: string, rails: number): string[][] {
  const letters = [...lettersOnly(text)];
  return Array.from({ length: rails }, (_, rail) =>
    letters.map((letter, index) => (railOf(index, rails) === rail ? letter : "")),
  );
}

/** The letters on each rail, read left to right: one string per rail. */
export const readRails = (text: string, rails: number) => fence(text, rails).map((rail) => rail.join(""));

/** Enciphers text: the rails joined end to end. Spaces and punctuation are dropped. */
export const encipher = (text: string, rails: number) => readRails(text, rails).join("");

/** Deciphers text that was enciphered with the same number of rails. */
export function decipher(ciphertext: string, rails: number): string {
  const letters = lettersOnly(ciphertext);
  // Enciphering the positions 0, 1, 2... shows where each cipher letter came from.
  const order = letters.split("").map((_, index) => index);
  const origins = Array.from({ length: rails }, (_, rail) => order.filter((index) => railOf(index, rails) === rail)).flat();
  const plain = new Array<string>(letters.length);
  origins.forEach((origin, at) => (plain[origin] = letters[at]!));
  return plain.join("");
}

/** Every reading of a ciphertext for 2 up to `most` rails: the brute-force attack. Entry 0 used 2 rails. */
export const tryAllRails = (ciphertext: string, most: number) =>
  Array.from({ length: most - 1 }, (_, i) => decipher(ciphertext, i + 2));

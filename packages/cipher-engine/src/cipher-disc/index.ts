import { ALPHABET, indexOfLetter, letterAt, lettersOnly, mapLetters, mod } from "../text/index.ts";

/**
 * Alberti's cipher disc: a fixed outer ring with the plain alphabet and an
 * inner ring with the cipher alphabet that can be turned. Left still it gives
 * a Caesar shift. Turned during a message it gives a polyalphabetic cipher.
 */

/** How the disc moves while a message is enciphered. */
export type Turning =
  /** It stays where it was set: a Caesar shift. */
  | "fixed"
  /** It turns one step after every letter. */
  | "stepping"
  /** Before each letter it is set so the next letter of a keyword sits beside the outer A. */
  | "keyword";

/** How the disc is set up and used. */
export interface DiscSettings {
  /** The inner letter beside the outer A at the start, as a number: 1 puts B beside A. Any whole number; it wraps. */
  shift: number;
  turning: Turning;
  /** Used only when `turning` is "keyword". */
  keyword: string;
}

/** The inner ring as read clockwise from the letter beside the outer A: setting 5 gives "FGH...E". */
export const innerRing = (setting: number) => [...ALPHABET].map((_, at) => letterAt(at + setting)).join("");

/** The setting of the disc (0 to 25) when letter number `count` of a message is enciphered, counting from 0. */
export function settingAt(settings: DiscSettings, count: number): number {
  if (settings.turning === "fixed") return mod(settings.shift, 26);
  if (settings.turning === "stepping") return mod(settings.shift + count, 26);
  const keyword = lettersOnly(settings.keyword) || "A";
  return indexOfLetter(keyword[count % keyword.length]!);
}

/** The setting used for each letter of a message, in order: the working behind the answer. */
export const settingsUsed = (settings: DiscSettings, text: string) =>
  [...lettersOnly(text)].map((_, count) => settingAt(settings, count));

/** Enciphers text: find each letter on the outer ring and write the inner letter beside it. */
export const encipher = (settings: DiscSettings, text: string) =>
  mapLetters(text, (letter, count) => letterAt(indexOfLetter(letter) + settingAt(settings, count)));

/** Deciphers text: find each letter on the inner ring and write the outer letter beside it. */
export const decipher = (settings: DiscSettings, text: string) =>
  mapLetters(text, (letter, count) => letterAt(indexOfLetter(letter) - settingAt(settings, count)));

import { encipher, type EnigmaSettings, type Positions } from "../enigma/index.ts";
import { ALPHABET, indexOfLetter, letterAt } from "../text/index.ts";

/** The settings every operator shared for one day: the machine's setup and where its rotors start. */
export interface DayKey {
  settings: EnigmaSettings;
  start: Positions;
}

/** Which two of the six opening letters to compare: 0 is the 1st and 4th, 1 the 2nd and 5th, 2 the 3rd and 6th. */
export type Pair = 0 | 1 | 2;

/**
 * The six letters that opened a message: the three-letter message key typed
 * twice, enciphered with the day key. The book's example turns PGHPGH into KIVBJE.
 */
export const encipherMessageKey = (day: DayKey, messageKey: string) =>
  encipher(day.settings, day.start, messageKey + messageKey).output;

/**
 * Twenty-six message keys that use every letter once in each of the three
 * places, so one day's haul is sure to fill the whole table. Real operators
 * chose their own, and the codebreakers waited until they had enough.
 */
export const MESSAGE_KEYS = [...ALPHABET].map((_, n) => letterAt(n * 5 + 15) + letterAt(n * 7 + 6) + letterAt(n * 11 + 7));

/** The opening six letters of a day's messages, one per message key. */
export const interceptedOpenings = (day: DayKey, messageKeys: readonly string[] = MESSAGE_KEYS) =>
  messageKeys.map((messageKey) => encipherMessageKey(day, messageKey));

/**
 * Rejewski's table of relationships. Entry n is the letter found three places
 * after letter n (A first) in the openings, or "?" if no opening shows it.
 */
export function linkTable(openings: readonly string[], pair: Pair): string {
  const table = new Array<string>(26).fill("?");
  for (const opening of openings) table[indexOfLetter(opening[pair]!)] = opening[pair + 3]!;
  return table.join("");
}

/**
 * The chains in a table: start at a letter, look up its partner, then the
 * partner's partner, until you are back at the start. "AFW" means A to F to W to A.
 */
export function chains(table: string): string[] {
  const seen = new Set<string>();
  const found: string[] = [];
  for (const start of ALPHABET) {
    let chain = "";
    for (let letter = start; ALPHABET.includes(letter) && !seen.has(letter); letter = table[indexOfLetter(letter)]!) {
      seen.add(letter);
      chain += letter;
    }
    if (chain !== "") found.push(chain);
  }
  return found;
}

/**
 * The number of links in each chain, longest first. This is the fingerprint
 * Rejewski looked up: it depends on the rotors and not on the plugboard.
 */
export const chainLengths = (table: string) =>
  chains(table)
    .map((chain) => chain.length)
    .sort((a, b) => b - a);

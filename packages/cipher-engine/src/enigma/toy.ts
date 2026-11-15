/**
 * The six-letter machine the book uses to explain Enigma before showing the
 * real one: a keyboard, one scrambler and a lampboard, with no reflector and
 * no plugboard (The Code Book, chapter 3, Figures 26 and 27).
 *
 * As in the book, keys are lower case and lamps are upper case.
 */

/** The six keys, top to bottom. */
export const TOY_KEYS = "abcdef";

/** The six lamps, top to bottom. */
export const TOY_LAMPS = "ABCDEF";

/**
 * The lamp each key lights while the scrambler is in its first position:
 * a→B, b→A, c→D, d→F, e→E, f→C. Read from the table beside Figure 26.
 * The tables beside Figure 27 (ii) and (iii) confirm the direction of turning.
 */
export const TOY_WIRING = "BADFEC";

const SIZE = TOY_KEYS.length;

const mod = (n: number) => ((n % SIZE) + SIZE) % SIZE;

/** One key press on the six-letter machine. */
export interface ToyPress {
  /** The lamp that lights up. */
  output: string;
  /**
   * The current's route: the key, then the scrambler wire that carried it,
   * named by the key and the lamp that wire joins in the first position,
   * then the lamp.
   */
  trace: string[];
}

/**
 * Presses one key (a to f) with the scrambler turned `position` places from
 * its first position. Turning moves every wire, both ends, down one place.
 */
export function toyPress(position: number, key: string): ToyPress {
  const contact = TOY_KEYS.indexOf(key);
  if (contact === -1) throw new Error(`The six-letter machine has no key "${key}"`);
  // The wire now facing this key started out `position` places further up.
  const home = mod(contact - position);
  const homeLamp = TOY_WIRING[home]!;
  const output = TOY_LAMPS[mod(TOY_LAMPS.indexOf(homeLamp) + position)]!;
  return { output, trace: [key, TOY_KEYS[home]!, homeLamp, output] };
}

/** The scrambler's position after it turns one place. Six turns bring it back. */
export function toyTurn(position: number): number {
  return mod(position + 1);
}

/** The lamp for each of the six keys at one position, for example "BADFEC" at position 0. */
export function toyAlphabet(position: number): string {
  return [...TOY_KEYS].map((key) => toyPress(position, key).output).join("");
}

/**
 * Enciphers a whole message from the first position. With `rotating` on, the
 * scrambler turns one place after each letter, as in Figure 27; unlike the
 * real Enigma, the book's model turns after the lamp lights, not before.
 * Anything that is not a letter a to f is dropped.
 */
export function toyEncipher(text: string, options: { rotating: boolean }): string {
  let position = 0;
  let output = "";
  for (const key of text.toLowerCase()) {
    if (!TOY_KEYS.includes(key)) continue;
    output += toyPress(position, key).output;
    if (options.rotating) position = toyTurn(position);
  }
  return output;
}

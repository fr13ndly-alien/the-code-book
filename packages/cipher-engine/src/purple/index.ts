/**
 * Purple: the American name for the cipher machine of the Japanese Foreign
 * Office, in use from 1939. It has no rotors. A plugboard splits the alphabet
 * into six letters (the "sixes") and twenty (the "twenties"). The sixes pass
 * through one telephone stepping switch, the twenties through three in a row.
 * Every switch has 25 positions, and each position is a different shuffle.
 *
 * The wiring and the stepping rule are the real ones: see wiring.ts.
 */
import { ALPHABET, mod } from "../text/index.ts";
import { SIXES_WIRING, TWENTIES_WIRING } from "./wiring.ts";

export { SIXES_WIRING, TWENTIES_WIRING } from "./wiring.ts";
export { PART_1_CIPHERTEXT, PART_1_PLAINTEXT, PART_1_SETTINGS } from "./message.ts";

/** How many positions every stepping switch has. */
export const POSITIONS = 25;

/** How many letters go the short way, through the sixes switch. */
export const SIXES = 6;

/** The plugboard that sends the six vowels (with Y) to the sixes switch, as the first machines did. */
export const VOWEL_PLUGBOARD = "AEIOUYBCDFGHJKLMNPQRSTVWXZ";

/**
 * The six ways to share out the speeds. "231" means twenties switch II is
 * fast, III is medium and I is slow.
 */
export const MOTIONS = ["123", "132", "213", "231", "312", "321"];

/** A mark for a letter that was lost on the radio. The machine steps past it. */
export const GARBLE = "-";

/** How the machine is set up before the first letter. */
export interface Settings {
  /** All 26 letters. The first six are wired to the sixes switch, the other twenty to the twenties. */
  plugboard: string;
  /** Where the four switches start, counting from 0: sixes, then twenties I, II and III. */
  start: number[];
  /** One of MOTIONS: which twenties switch is fast, medium and slow. */
  motion: string;
}

/** The direction of travel through the machine. */
export type Mode = "encipher" | "decipher";

/** One switch on a letter's path: which switch, where it stood, and the contacts in and out (from 1). */
export interface Hop {
  /** 0 for the sixes switch, 1 to 3 for twenties switches I to III. */
  switch: number;
  position: number;
  from: number;
  to: number;
}

/** Everything that happens to one letter on its way through the machine. */
export interface Step {
  input: string;
  output: string;
  /** Which half of the plugboard the letter belongs to. A garble takes no path. */
  group: "sixes" | "twenties" | "garble";
  /** Where the four switches stood for this letter, counting from 0. */
  positions: number[];
  /** The switches the letter passed through, in order. */
  hops: Hop[];
  /** The switch that steps after this letter besides the sixes: 1, 2 or 3. */
  moves: number;
}

/** True if the text is a usable plugboard: each of the 26 letters once. */
export const isPlugboard = (plugboard: string) =>
  plugboard.length === 26 && [...ALPHABET].every((letter) => plugboard.includes(letter));

/** The six letters wired to the sixes switch. */
export const sixesOf = (plugboard: string) => plugboard.slice(0, SIXES);

/** The twenty letters wired to the twenties switches. */
export const twentiesOf = (plugboard: string) => plugboard.slice(SIXES);

/** The message as the machine sees it: capitals and garble marks only. */
export const toKeys = (text: string) => text.toUpperCase().replace(/[^A-Z-]/g, "");

/** The contact a wire leaves by. The tables read in the deciphering direction, so enciphering looks backwards. */
const through = (row: number[], contact: number, mode: Mode) =>
  mode === "decipher" ? row[contact - 1]! : row.indexOf(contact) + 1;

/**
 * Which twenties switch (1, 2 or 3) steps after a letter. Normally the fast
 * one. When the sixes switch is on its last position the medium one steps
 * instead. One letter before that, if the medium switch is on its own last
 * position, the slow one steps. Only one of the three ever moves at a time.
 * Source: Freeman, Sullivan and Weierud, "PURPLE Revealed" (2003).
 */
export function mover(positions: number[], motion: string): number {
  const [fast, medium, slow] = [...motion].map(Number) as [number, number, number];
  if (positions[0] === POSITIONS - 2 && positions[medium] === POSITIONS - 1) return slow;
  return positions[0] === POSITIONS - 1 ? medium : fast;
}

/** The positions of the four switches after one letter: the sixes switch always steps, and so does one other. */
export function stepOn(positions: number[], motion: string): number[] {
  const moves = mover(positions, motion);
  return positions.map((at, index) => (index === 0 || index === moves ? mod(at + 1, POSITIONS) : at));
}

/** The path of a sixes letter: one hop through the sixes switch. */
function sixesHops(contact: number, positions: number[], mode: Mode): Hop[] {
  const position = positions[0]!;
  return [{ switch: 0, position, from: contact, to: through(SIXES_WIRING[position]!, contact, mode) }];
}

/** The path of a twenties letter: three hops. Enciphering runs I, II, III and deciphering runs III, II, I. */
function twentiesHops(contact: number, positions: number[], mode: Mode): Hop[] {
  const order = mode === "encipher" ? [1, 2, 3] : [3, 2, 1];
  let from = contact;
  return order.map((index) => {
    const position = positions[index]!;
    const to = through(TWENTIES_WIRING[index - 1]![position]!, from, mode);
    const hop = { switch: index, position, from, to };
    from = to;
    return hop;
  });
}

/** One letter through the machine with the switches where they stand. */
function press(input: string, positions: number[], settings: Settings, mode: Mode): Step {
  const moves = mover(positions, settings.motion);
  const socket = settings.plugboard.indexOf(input);
  if (socket < 0) return { input, output: GARBLE, group: "garble", positions, hops: [], moves };
  const isSix = socket < SIXES;
  const hops = isSix
    ? sixesHops(socket + 1, positions, mode)
    : twentiesHops(socket - SIXES + 1, positions, mode);
  const letters = isSix ? sixesOf(settings.plugboard) : twentiesOf(settings.plugboard);
  const output = letters[hops[hops.length - 1]!.to - 1]!;
  return { input, output, group: isSix ? "sixes" : "twenties", positions, hops, moves };
}

/**
 * Runs a message through the machine and returns every step. Spaces are
 * dropped. To decipher, run the ciphertext from the same settings in
 * "decipher" mode.
 */
export function run(text: string, settings: Settings, mode: Mode): Step[] {
  let positions = settings.start;
  return [...toKeys(text)].map((input) => {
    const step = press(input, positions, settings, mode);
    positions = stepOn(positions, settings.motion);
    return step;
  });
}

/** The output of a run, as text. */
export const outputOf = (steps: Step[]) => steps.map((step) => step.output).join("");

/**
 * The whole shuffle in force at one moment for one half of the plugboard:
 * for each letter of that half, in plugboard order, the letter it turns into.
 */
export function shuffleAt(step: Step, settings: Settings, mode: Mode): { from: string; to: string } {
  const from = step.group === "sixes" ? sixesOf(settings.plugboard) : twentiesOf(settings.plugboard);
  const to = [...from].map((letter) => press(letter, step.positions, settings, mode).output).join("");
  return { from, to };
}

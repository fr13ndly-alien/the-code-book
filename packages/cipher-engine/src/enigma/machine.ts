/**
 * A pure model of the three-rotor Enigma I.
 *
 * Nothing here holds state. The settings and the rotor positions go in, and a
 * new set of positions comes out, so the caller decides where state lives.
 */

import { plugSwap } from "./plugboard.ts";
import { ALPHABET, REFLECTORS, ROTORS, type ReflectorName, type RotorName } from "./wiring.ts";

/** One value per rotor slot, ordered left, middle, right. */
export type Triple<T> = readonly [T, T, T];

/** Everything the operator sets up before typing. Together with the start positions, this is the key. */
export interface EnigmaSettings {
  rotors: Triple<RotorName>;
  /** Ring settings, 0 to 25 (A to Z). They shift each rotor's wiring relative to its letters. */
  rings: Triple<number>;
  reflector: ReflectorName;
  /** Plugboard cables, for example ["AB", "CD"]. */
  cables: readonly string[];
}

/** The letter showing in each rotor window, 0 to 25 (A to Z). */
export type Positions = Triple<number>;

export interface KeyPress {
  /** The lamp that lights up. */
  output: string;
  /** Rotor positions after the press. The rotors turn before the current flows. */
  positions: Positions;
  /**
   * The letter carrying the current after each stage, in order:
   * key, plugboard, right rotor, middle rotor, left rotor, reflector,
   * left rotor, middle rotor, right rotor, plugboard (the lamp).
   */
  trace: string[];
}

export const DEFAULT_SETTINGS: EnigmaSettings = {
  rotors: ["I", "II", "III"],
  rings: [0, 0, 0],
  reflector: "B",
  cables: [],
};

const SIZE = ALPHABET.length;

const mod = (n: number) => ((n % SIZE) + SIZE) % SIZE;

function isAtNotch(rotor: RotorName, position: number): boolean {
  return ALPHABET[position] === ROTORS[rotor].notch;
}

/**
 * Turns the rotors as one key press does.
 *
 * The right rotor always turns. A rotor sitting at its notch carries the rotor
 * on its left along. The middle rotor also turns itself when it is at its own
 * notch, which is the famous "double step".
 */
export function stepRotors(settings: EnigmaSettings, [left, middle, right]: Positions): Positions {
  const middleAtNotch = isAtNotch(settings.rotors[1], middle);
  const rightAtNotch = isAtNotch(settings.rotors[2], right);
  return [
    mod(left + (middleAtNotch ? 1 : 0)),
    mod(middle + (middleAtNotch || rightAtNotch ? 1 : 0)),
    mod(right + 1),
  ];
}

/** Sends contact `contact` through one rotor, right to left ("in") or left to right ("out"). */
function throughRotor(
  rotor: RotorName,
  position: number,
  ring: number,
  contact: number,
  direction: "in" | "out",
): number {
  const { wiring } = ROTORS[rotor];
  const shift = position - ring;
  const entry = mod(contact + shift);
  const exit =
    direction === "in"
      ? ALPHABET.indexOf(wiring[entry]!)
      : wiring.indexOf(ALPHABET[entry]!);
  return mod(exit - shift);
}

/** Presses one key (an uppercase letter A to Z). */
export function pressKey(settings: EnigmaSettings, positions: Positions, key: string): KeyPress {
  const next = stepRotors(settings, positions);
  const trace = [key];
  const record = (letter: string) => {
    trace.push(letter);
    return letter;
  };

  let contact = ALPHABET.indexOf(record(plugSwap(settings.cables, key)));

  for (const slot of [2, 1, 0] as const) {
    contact = throughRotor(settings.rotors[slot], next[slot], settings.rings[slot], contact, "in");
    record(ALPHABET[contact]!);
  }

  contact = ALPHABET.indexOf(record(REFLECTORS[settings.reflector][contact]!));

  for (const slot of [0, 1, 2] as const) {
    contact = throughRotor(settings.rotors[slot], next[slot], settings.rings[slot], contact, "out");
    record(ALPHABET[contact]!);
  }

  const output = record(plugSwap(settings.cables, ALPHABET[contact]!));
  return { output, positions: next, trace };
}

/**
 * Enciphers a whole message. Letters are upper-cased; anything that is not a
 * letter is dropped, as the machine has no such keys.
 */
export function encipher(
  settings: EnigmaSettings,
  start: Positions,
  text: string,
): { output: string; positions: Positions } {
  let positions = start;
  let output = "";
  for (const key of text.toUpperCase()) {
    if (!ALPHABET.includes(key)) continue;
    const press = pressKey(settings, positions, key);
    positions = press.positions;
    output += press.output;
  }
  return { output, positions };
}

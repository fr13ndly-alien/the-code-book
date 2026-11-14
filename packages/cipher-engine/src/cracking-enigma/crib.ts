import { encipher, pressKey, stepRotors, type EnigmaSettings, type Positions } from "../enigma/index.ts";
import { lettersOnly } from "../text/index.ts";

/** How many ways three rotors can be set: 26 x 26 x 26. */
export const ROTOR_POSITIONS = 26 ** 3;

/** A rotor setting that fits the crib, and the message it gives. */
export interface Stop {
  /** The letters in the rotor windows before the first letter of the message. */
  start: Positions;
  /** The whole ciphertext deciphered from that start. */
  plaintext: string;
}

/**
 * The places in the crib (counting from 0) where its letter is the same as the
 * ciphertext letter above it, when the crib starts `offset` letters into the
 * ciphertext. Enigma never enciphers a letter as itself, so any clash rules the position out.
 */
export function clashes(ciphertext: string, crib: string, offset: number): number[] {
  const cipher = lettersOnly(ciphertext);
  return [...lettersOnly(crib)].flatMap((letter, at) => (cipher[offset + at] === letter ? [at] : []));
}

/** Every position where the crib fits inside the ciphertext without a clash. */
export function possibleOffsets(ciphertext: string, crib: string): number[] {
  const last = lettersOnly(ciphertext).length - lettersOnly(crib).length;
  const offsets: number[] = [];
  for (let offset = 0; offset <= last; offset++) {
    if (clashes(ciphertext, crib, offset).length === 0) offsets.push(offset);
  }
  return offsets;
}

/** Whether a machine started at `start` turns the ciphertext at `offset` into the crib. */
function fits(settings: EnigmaSettings, start: Positions, cipher: string, crib: string, offset: number): boolean {
  let positions = start;
  for (let step = 0; step < offset; step++) positions = stepRotors(settings, positions);
  for (let at = 0; at < crib.length; at++) {
    // Enigma deciphers the same way it enciphers: type the cipher letter, read the plain one.
    const press = pressKey(settings, positions, cipher[offset + at]!);
    if (press.output !== crib[at]) return false;
    positions = press.positions;
  }
  return true;
}

/**
 * The job of a bombe, in miniature: tries all 17,576 rotor settings and keeps
 * those that turn the ciphertext at `offset` into the crib. The rotor order
 * and plugboard in `settings` are taken as known.
 */
export function testRotorSettings(settings: EnigmaSettings, ciphertext: string, crib: string, offset: number): Stop[] {
  const cipher = lettersOnly(ciphertext);
  const guess = lettersOnly(crib);
  if (guess === "" || offset < 0 || offset + guess.length > cipher.length) return [];
  const stops: Stop[] = [];
  for (let n = 0; n < ROTOR_POSITIONS; n++) {
    const start: Positions = [Math.floor(n / 676), Math.floor(n / 26) % 26, n % 26];
    if (fits(settings, start, cipher, guess, offset)) {
      stops.push({ start, plaintext: encipher(settings, start, cipher).output });
    }
  }
  return stops;
}

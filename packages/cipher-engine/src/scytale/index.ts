import { lettersOnly } from "../text/index.ts";

/**
 * The Spartan scytale: a transposition cipher made of a wooden staff and a
 * strip of leather. The strip is wound round the staff and the message is
 * written along the staff, one letter on each turn of the strip. Unwound,
 * the strip carries the letters in a scrambled order.
 *
 * The key is the thickness of the staff, measured here as `perTurn`: how many
 * letters fit round it, which is how many lines of writing the staff holds.
 */

/** How many times the strip goes round the staff to hold the whole message. */
export const turnsNeeded = (letters: number, perTurn: number) => Math.ceil(letters / perTurn);

/**
 * The message as it is written on the staff: one string per line of writing,
 * each line running along the staff. The last line may be shorter.
 */
export function writeOnStaff(message: string, perTurn: number): string[] {
  const letters = lettersOnly(message);
  const turns = turnsNeeded(letters.length, perTurn);
  return Array.from({ length: perTurn }, (_, line) => letters.slice(line * turns, (line + 1) * turns));
}

/** The letters on each turn of the strip, in the order the strip is unwound. */
export function unwind(message: string, perTurn: number): string[] {
  const lines = writeOnStaff(message, perTurn);
  const turns = lines[0]?.length ?? 0;
  return Array.from({ length: turns }, (_, turn) => lines.map((line) => line[turn] ?? "").join(""));
}

/** Enciphers a message: the letters in the order they sit on the unwound strip. */
export const encipher = (message: string, perTurn: number) => unwind(message, perTurn).join("");

/** Deciphers a strip by winding it round a staff that holds `perTurn` letters a turn. */
export function decipher(strip: string, perTurn: number): string {
  const letters = lettersOnly(strip);
  // Enciphering the positions 0, 1, 2... shows where each letter on the strip came from.
  const turns = turnsNeeded(letters.length, perTurn);
  const origins: number[] = [];
  for (let turn = 0; turn < turns; turn++) {
    for (let line = 0; line < perTurn; line++) {
      const origin = line * turns + turn;
      if (origin < letters.length) origins.push(origin);
    }
  }
  const plain = new Array<string>(letters.length);
  origins.forEach((origin, at) => (plain[origin] = letters[at]!));
  return plain.join("");
}

/** Every reading of a strip on staffs holding 2 up to `most` letters a turn. Entry 0 used 2. */
export const tryAllStaffs = (strip: string, most: number) =>
  Array.from({ length: most - 1 }, (_, i) => decipher(strip, i + 2));

/**
 * A simplified Lorenz cipher machine. A teleprinter turns each letter into
 * five holes or blanks on paper tape. The machine makes a stream of key
 * letters with pin wheels and adds it to the message, hole by hole.
 * Adding the same key a second time gives the message back.
 *
 * Simplified: the real Lorenz SZ40/42 had twelve wheels. This model keeps only
 * the five "chi" wheels, which step once for every letter. The real machine
 * added a second key from five "psi" wheels that two motor wheels moved in fits
 * and starts.
 */

/**
 * The teleprinter code: International Telegraph Alphabet No. 2 (ITA2), the
 * Baudot-Murray code. Each entry is the five impulses of a character, first
 * impulse first, "1" for a hole (mark) and "0" for no hole (space).
 * Source: ITU-T Recommendation S.1, as tabulated under "ITA2" in Wikipedia's
 * "Baudot code" (there written fifth impulse first).
 * The six codes that are not letters use the symbols the Bletchley Park
 * codebreakers wrote for them: 9 space, 3 carriage return, 4 line feed,
 * 5 figure shift, 8 letter shift and / for blank tape.
 */
export const ITA2: Record<string, string> = {
  A: "11000",
  B: "10011",
  C: "01110",
  D: "10010",
  E: "10000",
  F: "10110",
  G: "01011",
  H: "00101",
  I: "01100",
  J: "11010",
  K: "11110",
  L: "01001",
  M: "00111",
  N: "00110",
  O: "00011",
  P: "01101",
  Q: "11101",
  R: "01010",
  S: "10100",
  T: "00001",
  U: "11100",
  V: "01111",
  W: "11001",
  X: "10111",
  Y: "10101",
  Z: "10001",
  "9": "00100",
  "3": "00010",
  "4": "01000",
  "5": "11011",
  "8": "11111",
  "/": "00000",
};

/** The symbol that stands for a space on the tape. */
export const SPACE = "9";

/** How many pins each of the five chi wheels of the real machine had. */
export const WHEEL_LENGTHS = [41, 31, 29, 26, 23];

/**
 * The pins of the five wheels, "1" for a raised pin. INVENTED for this page:
 * real pin patterns were changed regularly and these are not historical.
 */
export const WHEEL_PINS = [
  "10010100100101100001100100001111111011101",
  "0001110110011000000111111110001",
  "10000000111001001101001101000",
  "01110010101101110010101001",
  "10000110110000110111010",
];

/** Where each wheel stands before the first letter: five numbers, counting from 0. */
export type Start = number[];

/** Everything that happens to one character on its way through the machine. */
export interface Step {
  /** The character on the input tape, and its five impulses. */
  input: string;
  inputBits: string;
  /** Which pin of each wheel is in use for this character, counting from 0. */
  pins: number[];
  /** The key: the five pins read off the wheels. */
  keyBits: string;
  /** Input and key added together, and the character that makes. */
  outputBits: string;
  output: string;
}

/**
 * Adds two rows of impulses. Two alike give 0 and two different give 1:
 * the rule known as XOR, or addition without carrying.
 */
export const add = (a: string, b: string) => [...a].map((bit, at) => (bit === b[at] ? "0" : "1")).join("");

/** The character with these five impulses. */
export const symbolFor = (bits: string) => Object.keys(ITA2).find((symbol) => ITA2[symbol] === bits)!;

/** Text as it is punched on tape: capitals, 9 for a space, anything without a code left out. */
export const toTape = (text: string) =>
  [...text.toUpperCase().replace(/\s/g, SPACE)].filter((symbol) => symbol in ITA2).join("");

/** A tape as a person reads it, with the 9s turned back into spaces. */
export const fromTape = (tape: string) => tape.replaceAll(SPACE, " ");

/** The pin of each wheel that is in use for character number `count`. Every wheel steps once per character. */
export const pinsAt = (start: Start, count: number) =>
  WHEEL_LENGTHS.map((length, wheel) => ((start[wheel] ?? 0) + count) % length);

/** The five key impulses for character number `count`. */
export const keyAt = (start: Start, count: number) =>
  pinsAt(start, count)
    .map((pin, wheel) => WHEEL_PINS[wheel]![pin])
    .join("");

/**
 * Runs a tape through the machine and returns every step. The same call
 * enciphers and deciphers: run the output through again from the same start.
 */
export function run(tape: string, start: Start): Step[] {
  return [...toTape(tape)].map((input, count) => {
    const inputBits = ITA2[input]!;
    const keyBits = keyAt(start, count);
    const outputBits = add(inputBits, keyBits);
    return { input, inputBits, pins: pinsAt(start, count), keyBits, outputBits, output: symbolFor(outputBits) };
  });
}

/** The output tape of a run, as text. */
export const outputOf = (steps: Step[]) => steps.map((step) => step.output).join("");

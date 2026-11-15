/**
 * Morse code: every letter becomes a pattern of short and long signals.
 * It is a code for sending, not a cipher: the table is public and there is no key.
 */

/**
 * International Morse code for letters and figures. "." is a dot, "-" is a dash.
 * Source: Recommendation ITU-R M.1677-1, "International Morse code", part I, section 1.
 */
export const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..",
  J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
  6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----",
};

/** The characters the table covers, letters first, then figures 1 to 9 and 0. */
export const CHARACTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"];

/** One character of a message with its signals. A gap between words is a sign with char " " and no code. */
export interface Sign {
  char: string;
  code: string;
}

/** One stretch of time on the wire: current on (a dot or dash) or off (a gap). */
export interface Pulse {
  on: boolean;
  /** How long it lasts, counted in dots: a dot is 1, a dash is 3. */
  units: number;
  /** Which sign of the message this pulse belongs to. */
  sign: number;
  /** Which dot or dash of that sign. Gaps carry the mark they follow. */
  mark: number;
}

/** Lengths from the same ITU recommendation, part I, section 2, counted in dots. */
const UNITS = { dot: 1, dash: 3, insideLetter: 1, betweenLetters: 3, betweenWords: 7 };

/** Turns a message into signs. Characters the table does not cover are left out. */
export function encode(text: string): Sign[] {
  const words = text.toUpperCase().split(/\s+/);
  return words
    .map((word) => [...word].filter((char) => char in MORSE).map((char) => ({ char, code: MORSE[char]! })))
    .filter((word) => word.length > 0)
    .flatMap((word, index) => (index === 0 ? word : [{ char: " ", code: "" }, ...word]));
}

/** A message written out in dots and dashes: letters apart by a space, words by " / ". */
export const toMorse = (text: string) =>
  encode(text)
    .map((sign) => (sign.char === " " ? "/" : sign.code))
    .join(" ");

/** The character a pattern of dots and dashes stands for, or "?" if there is none. */
export const charFor = (code: string) => CHARACTERS.find((char) => MORSE[char] === code) ?? "?";

/** Reads dots and dashes back into signs. Letters are apart by spaces, words by "/". */
export function decode(morse: string): Sign[] {
  const tokens = morse.replace(/\//g, " / ").trim().split(/\s+/);
  return tokens
    .filter((token) => token !== "")
    .map((token) => (token === "/" ? { char: " ", code: "" } : { char: charFor(token), code: token }));
}

/** Reads dots and dashes back into text. A pattern that is not in the table becomes "?". */
export const fromMorse = (morse: string) =>
  decode(morse)
    .map((sign) => sign.char)
    .join("");

/** The characters whose pattern begins with these dots and dashes: what a half-keyed letter could become. */
export const candidates = (start: string) => CHARACTERS.filter((char) => MORSE[char]!.startsWith(start));

/** The gap that follows the last mark of sign `index`: longer before a new word, none at the end. */
function gapAfter(signs: Sign[], index: number): number {
  const next = signs[index + 1];
  if (next === undefined) return 0;
  return next.char === " " ? UNITS.betweenWords : UNITS.betweenLetters;
}

/** The message as it travels down the wire: current on and off, with the length of each stretch. */
export function pulses(signs: Sign[]): Pulse[] {
  return signs.flatMap((sign, index) =>
    [...sign.code].flatMap((symbol, mark) => {
      const last = mark === sign.code.length - 1;
      const gap = last ? gapAfter(signs, index) : UNITS.insideLetter;
      const on = { on: true, units: symbol === "." ? UNITS.dot : UNITS.dash, sign: index, mark };
      return gap === 0 ? [on] : [on, { on: false, units: gap, sign: index, mark }];
    }),
  );
}

/** How long a list of pulses takes, counted in dots. */
export const duration = (list: Pulse[]) => list.reduce((sum, pulse) => sum + pulse.units, 0);

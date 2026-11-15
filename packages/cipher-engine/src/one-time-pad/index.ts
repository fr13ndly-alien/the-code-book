import { indexOfLetter, letterAt, lettersOnly } from "../text/index.ts";

/**
 * The one-time pad: a Vigenère cipher whose key is a string of random letters
 * as long as the message, used once and then destroyed.
 */

/** How many random letters one sheet of the pad holds. A message cannot be longer than its sheet. */
export const SHEET_LENGTH = 40;

/** The sum for one letter of a message, so a page can show the arithmetic. */
export interface LetterSum {
  /** The message letter and its number, A = 0. */
  plain: string;
  /** The pad letter above it. */
  pad: string;
  /** The two numbers added together, before wrapping round at 26. */
  sum: number;
  /** The letter that the sum stands for. */
  cipher: string;
}

/** Adds (sign 1) or takes away (sign -1) two strings letter by letter, as far as the shorter one goes. */
function combine(first: string, second: string, sign: 1 | -1): string {
  const a = lettersOnly(first);
  const b = lettersOnly(second);
  const length = Math.min(a.length, b.length);
  return [...a.slice(0, length)].map((letter, at) => letterAt(indexOfLetter(letter) + sign * indexOfLetter(b[at]!))).join("");
}

/** Enciphers a message: each letter is moved along the alphabet by its own pad letter. Letters past the end of the pad are left out. */
export const encipher = (message: string, pad: string) => combine(message, pad, 1);

/** Deciphers a ciphertext with the pad that made it. */
export const decipher = (ciphertext: string, pad: string) => combine(ciphertext, pad, -1);

/**
 * The pad that would turn `plaintext` into `ciphertext`. One exists for every
 * plaintext of the right length, which is why the cipher cannot be broken.
 */
export const padFor = (ciphertext: string, plaintext: string) => combine(ciphertext, plaintext, -1);

/**
 * One ciphertext taken away from another. If both used the same pad, the pad
 * cancels out and this equals the first message minus the second.
 */
export const difference = (first: string, second: string) => combine(first, second, -1);

/** The arithmetic behind each letter of a message. */
export function sums(message: string, pad: string): LetterSum[] {
  const key = lettersOnly(pad);
  return [...lettersOnly(message).slice(0, key.length)].map((plain, at) => {
    const sum = indexOfLetter(plain) + indexOfLetter(key[at]!);
    return { plain, pad: key[at]!, sum, cipher: letterAt(sum) };
  });
}

/**
 * Turns random bytes (0 to 255) into pad letters. The caller supplies the
 * randomness, so this stays a pure function. Bytes of 234 and above are thrown
 * away: 234 is 9 times 26, so every letter is left exactly as likely as any other.
 */
export function padFromBytes(bytes: readonly number[]): string {
  return bytes
    .filter((byte) => byte < 234)
    .map((byte) => letterAt(byte))
    .join("");
}

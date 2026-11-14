import { encipher as caesarShift } from "../caesar/index.ts";
import { encipher as substitute } from "../frequency-analysis/index.ts";
import { inGroups, lettersOnly } from "../text/index.ts";
import { encipher as vigenere } from "../vigenere/index.ts";
import type { Cryptogram, Kind } from "./cryptograms.ts";

/**
 * The Codebreaker's Challenge: four cryptograms of rising difficulty for the
 * reader to break with the tools of the earlier pages. This folder holds the
 * puzzles as data and the few helpers the page needs to check an attempt.
 * It also prepares a cryptogram the reader pastes in, such as one of the book's own.
 */

export { BOOK_CAESAR, BOOK_DEDICATION, BOOK_SUBSTITUTION, BOOK_VIGENERE } from "./book.ts";
export { CRYPTOGRAMS } from "./cryptograms.ts";
export type {
  CaesarCryptogram,
  Cryptogram,
  Kind,
  SubstitutionCryptogram,
  VigenereCryptogram,
} from "./cryptograms.ts";

/** The plaintext as the codemaker prepared it: letters only when the cryptogram is sent in groups. */
const prepared = (cryptogram: Cryptogram) =>
  cryptogram.grouped ? lettersOnly(cryptogram.plaintext) : cryptogram.plaintext;

/** Runs the cipher of a cryptogram over its prepared plaintext, with its own key. */
function enciphered(cryptogram: Cryptogram): string {
  switch (cryptogram.kind) {
    case "caesar":
      return caesarShift(prepared(cryptogram), cryptogram.shift);
    case "substitution":
      return substitute(prepared(cryptogram), cryptogram.cipherAlphabet);
    case "vigenere":
      return vigenere(prepared(cryptogram), cryptogram.keyword);
  }
}

/** Makes the ciphertext of a cryptogram again from its plaintext and key, to prove the stored one. */
export const makeCiphertext = (cryptogram: Cryptogram) =>
  cryptogram.grouped ? inGroups(enciphered(cryptogram)) : enciphered(cryptogram);

/** True when an attempt reads the same as the plaintext. Spaces, punctuation and letter case are ignored. */
export const isSolved = (cryptogram: Cryptogram, attempt: string) =>
  lettersOnly(attempt) === lettersOnly(cryptogram.plaintext);

/** The last few words of a cryptogram's plaintext: the story's challenge asks for three of them. */
export const lastWords = (cryptogram: Cryptogram, count: number) =>
  cryptogram.plaintext.split(" ").slice(-count).join(" ");

/** A cryptogram the reader brought, made ready for a bench. Nobody here knows its answer. */
export interface OwnCryptogram {
  kind: Kind;
  /** The pasted text in capitals, tidied for the bench of its kind. */
  ciphertext: string;
  /** True when the letters were put in groups of five, as the Vigenère bench needs. */
  grouped: boolean;
}

/** The longest run of characters a bench can show on one line of a phone. */
export const MAX_WORD = 15;

/** Capitals, with every run of spaces and line breaks turned into one space. */
const tidy = (text: string) => text.toUpperCase().trim().replace(/\s+/g, " ");

/** Cuts any word longer than MAX_WORD into groups of five, so a text pasted without spaces can still wrap. */
const splitLongWords = (text: string) =>
  text
    .split(" ")
    .map((word) => (word.length > MAX_WORD ? inGroups(word) : word))
    .join(" ");

/**
 * Makes any pasted text ready for the bench of its kind. A Caesar shift or a
 * substitution keeps its spaces and punctuation, which may be clues. A Vigenère
 * cipher is reduced to its letters in groups of five, the way the bench counts them.
 */
export function prepare(text: string, kind: Kind): OwnCryptogram {
  if (kind === "vigenere") return { kind, ciphertext: inGroups(lettersOnly(text)), grouped: true };
  return { kind, ciphertext: splitLongWords(tidy(text)), grouped: false };
}

/** True when a text has at least one letter to work on. */
export const hasLetters = (text: string) => lettersOnly(text).length > 0;

import { encipher as caesarShift } from "../caesar/index.ts";
import { encipher as substitute } from "../frequency-analysis/index.ts";
import { inGroups, lettersOnly } from "../text/index.ts";
import { encipher as vigenere } from "../vigenere/index.ts";
import type { Cryptogram } from "./cryptograms.ts";

/**
 * The Codebreaker's Challenge: four cryptograms of rising difficulty for the
 * reader to break with the tools of the earlier pages. This folder holds the
 * puzzles as data and the few helpers the page needs to check an attempt.
 */

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

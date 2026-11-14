import { describe, expect, it } from "vitest";
import { crack, findRepeats, likelyKeyLength } from "../src/babbage/index.ts";
import { decipher as caesarDecipher, encipher as caesarEncipher, tryAllShifts } from "../src/caesar/index.ts";
import {
  CRYPTOGRAMS,
  isSolved,
  lastWords,
  makeCiphertext,
  type CaesarCryptogram,
  type SubstitutionCryptogram,
  type VigenereCryptogram,
} from "../src/codebreakers-challenge/index.ts";
import { decipher as substitutionDecipher, guessByRank, partialText } from "../src/frequency-analysis/index.ts";
import { cipherAlphabet } from "../src/keyword-substitution/index.ts";
import { ALPHABET, lettersOnly } from "../src/text/index.ts";
import { decipher as vigenereDecipher } from "../src/vigenere/index.ts";

const [first, second, third, fourth] = CRYPTOGRAMS as [
  CaesarCryptogram,
  CaesarCryptogram,
  SubstitutionCryptogram,
  VigenereCryptogram,
];

describe("The Codebreaker's Challenge", () => {
  // Source: The Code Book, "The Codebreaker's Challenge" (abridged edition, pp. 243-244) sets four
  // cryptograms of these kinds, in this order: Caesar (easy), Caesar (harder), monoalphabetic, Vigenère.
  it("has the book's four kinds of cryptogram in the book's order", () => {
    expect(CRYPTOGRAMS.map(({ number, kind }) => `${number} ${kind}`)).toEqual([
      "1 caesar",
      "2 caesar",
      "3 substitution",
      "4 vigenere",
    ]);
  });

  // Source: The Code Book, chapter 1, figure 3. The Caesar engine the cryptograms rely on
  // still gives the book's own example.
  it("uses a Caesar engine that matches the book's worked example", () => {
    expect(caesarEncipher("veni, vidi, vici", 3)).toBe("YHQL, YLGL, YLFL");
  });

  it("stores exactly the ciphertext the engines produce from each plaintext and key", () => {
    for (const cryptogram of CRYPTOGRAMS) expect(makeCiphertext(cryptogram)).toBe(cryptogram.ciphertext);
  });

  it("meets the lengths the page promises", () => {
    expect(lettersOnly(second.plaintext).length).toBeLessThan(40);
    expect(lettersOnly(third.plaintext).length).toBeGreaterThanOrEqual(250);
    expect(third.ciphertext).toContain(" ");
    expect(lettersOnly(fourth.plaintext).length).toBeGreaterThanOrEqual(300);
    expect(fourth.keyword).toHaveLength(5);
    expect(fourth.ciphertext.split(" ").slice(0, -1).every((group) => group.length === 5)).toBe(true);
  });

  it("breaks cryptograms 1 and 2 by brute force: exactly one of the 26 shifts is the answer", () => {
    for (const cryptogram of [first, second]) {
      const readings = tryAllShifts(cryptogram.ciphertext);
      const right = readings.flatMap((reading, shift) => (isSolved(cryptogram, reading) ? [shift] : []));
      expect(right).toEqual([cryptogram.shift]);
      expect(isSolved(cryptogram, caesarDecipher(cryptogram.ciphertext, cryptogram.shift))).toBe(true);
    }
    expect(tryAllShifts(first.ciphertext)[first.shift]).toBe(first.plaintext);
  });

  it("deciphers cryptogram 3 with its key, which no rank-only guess reaches", () => {
    expect(substitutionDecipher(third.ciphertext, third.cipherAlphabet)).toBe(third.plaintext);
    expect(third.cipherAlphabet).toBe(cipherAlphabet("THOMAS PHELIPPES"));
    expect([...third.cipherAlphabet].some((letter, index) => letter === ALPHABET[index])).toBe(false);
    // The reader has real work to do: al-Kindi's recipe alone does not finish it.
    expect(isSolved(third, partialText(third.ciphertext, guessByRank(third.ciphertext)))).toBe(false);
  });

  it("recovers the keyword of cryptogram 4 with Babbage's method", () => {
    expect(likelyKeyLength(findRepeats(fourth.ciphertext))).toBe(5);
    expect(crack(fourth.ciphertext)).toBe(fourth.keyword);
    expect(isSolved(fourth, vigenereDecipher(fourth.ciphertext, crack(fourth.ciphertext)))).toBe(true);
  });

  it("does not call a wrong or unfinished attempt solved", () => {
    expect(isSolved(first, first.ciphertext)).toBe(false);
    expect(isSolved(second, "every codemaker meets a codebreaker")).toBe(true);
    expect(isSolved(second, "EVERY CODEMAKER")).toBe(false);
  });

  // The challenge in story.mdx: the last three words of the solved cryptogram 4.
  it("gives the answer of the story's challenge", () => {
    expect(lastWords(fourth, 3)).toBe("NEVER STOP COUNTING");
    const solved = lettersOnly(vigenereDecipher(fourth.ciphertext, fourth.keyword));
    expect(solved.endsWith("NEVERSTOPCOUNTING")).toBe(true);
  });
});

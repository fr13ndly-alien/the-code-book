import { describe, expect, it } from "vitest";
import { crack, findRepeats, likelyKeyLength } from "../src/babbage/index.ts";
import { decipher as caesarDecipher, encipher as caesarEncipher, tryAllShifts } from "../src/caesar/index.ts";
import {
  BOOK_CAESAR,
  BOOK_DEDICATION,
  BOOK_SUBSTITUTION,
  BOOK_VIGENERE,
  CRYPTOGRAMS,
  MAX_WORD,
  hasLetters,
  isSolved,
  lastWords,
  makeCiphertext,
  prepare,
  type CaesarCryptogram,
  type SubstitutionCryptogram,
  type VigenereCryptogram,
} from "../src/codebreakers-challenge/index.ts";
import { decipher as substitutionDecipher, guessByRank, partialText } from "../src/frequency-analysis/index.ts";
import { cipherAlphabet } from "../src/keyword-substitution/index.ts";
import { ALPHABET, countLetters, lettersOnly } from "../src/text/index.ts";
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

  describe("a cryptogram the reader brings", () => {
    it("tidies a pasted Caesar or substitution text but keeps its words and punctuation", () => {
      expect(prepare("  xicy,  voir\n rfh ", "substitution")).toEqual({
        kind: "substitution",
        ciphertext: "XICY, VOIR RFH",
        grouped: false,
      });
      expect(prepare(first.ciphertext.toLowerCase(), "caesar").ciphertext).toBe(first.ciphertext);
      expect(prepare(third.ciphertext, "substitution").ciphertext).toBe(third.ciphertext);
    });

    it("cuts a text pasted without spaces into groups, so no word is too long for a phone", () => {
      const { ciphertext } = prepare(lettersOnly(third.ciphertext), "substitution");
      expect(ciphertext.split(" ").every((word) => word.length <= MAX_WORD)).toBe(true);
      expect(lettersOnly(ciphertext)).toBe(lettersOnly(third.ciphertext));
    });

    it("puts a pasted Vigenère text into groups of five, however it was spaced", () => {
      const spacedOut = [...lettersOnly(fourth.ciphertext).toLowerCase()].join(" ");
      expect(prepare(spacedOut, "vigenere")).toEqual({ kind: "vigenere", ciphertext: fourth.ciphertext, grouped: true });
    });

    it("lets every bench work on a pasted text as it does on ours", () => {
      const caesar = prepare(second.ciphertext.toLowerCase(), "caesar").ciphertext;
      expect(lettersOnly(tryAllShifts(caesar)[second.shift]!)).toBe(lettersOnly(second.plaintext));
      const substitution = prepare(third.ciphertext.toLowerCase(), "substitution").ciphertext;
      expect(substitutionDecipher(substitution, third.cipherAlphabet)).toBe(third.plaintext);
      const vigenereText = prepare(fourth.ciphertext.replaceAll(" ", "\n"), "vigenere").ciphertext;
      expect(crack(vigenereText)).toBe(fourth.keyword);
    });

    it("copes with a text that has nothing to work on", () => {
      expect(prepare("", "caesar").ciphertext).toBe("");
      expect(prepare(" 12 ", "vigenere").ciphertext).toBe("");
      expect(hasLetters(" 12, ")).toBe(false);
      expect(hasLetters("x")).toBe(true);
      expect(findRepeats(prepare("", "vigenere").ciphertext)).toEqual([]);
    });
  });

  describe("the book's own cipher text", () => {
    /** The shifts whose reading is made only of the words given. */
    const shiftsThatRead = (ciphertext: string, words: string[]) =>
      tryAllShifts(ciphertext).flatMap((reading, shift) =>
        reading.split(" ").every((word) => words.includes(word)) ? [shift] : [],
      );

    // Source: The Code Book, abridged edition, p. 243, Cryptogram 1: Caesar Shift Cipher (easy).
    it("reads the book's cryptogram 1 with exactly one shift", () => {
      const words =
        "I CANNOT FORECAST TO YOU THE ACTION OF RUSSIA IT IS A RIDDLE WRAPPED IN MYSTERY INSIDE AN ENIGMA WINSTON CHURCHILL";
      expect(shiftsThatRead(BOOK_CAESAR[0], words.split(" "))).toEqual([3]);
      expect(caesarDecipher(BOOK_CAESAR[0], 3)).toContain("A RIDDLE WRAPPED IN A MYSTERY INSIDE AN ENIGMA");
      // The common little words of English appear in no other reading.
      const little = tryAllShifts(BOOK_CAESAR[0]).flatMap((reading, shift) =>
        ["THE", "OF", "IT", "IS"].every((word) => reading.split(" ").includes(word)) ? [shift] : [],
      );
      expect(little).toEqual([3]);
    });

    // Source: The Code Book, abridged edition, p. 243, Cryptogram 2: Caesar Shift Cipher (harder).
    // Its five groups are words, but not English ones: the message is Caesar's own.
    it("reads the book's cryptogram 2 with exactly one shift", () => {
      expect(BOOK_CAESAR[1].split(" ")).toHaveLength(5);
      expect(shiftsThatRead(BOOK_CAESAR[1], ["VENI", "VIDI", "VICI", "JULIUS", "CAESAR"])).toEqual([19]);
      expect(caesarDecipher(BOOK_CAESAR[1], 19)).toBe("VENI VIDI VICI JULIUS CAESAR");
    });

    it("passes the book's Caesar cryptograms through the bench unchanged", () => {
      for (const text of BOOK_CAESAR) expect(prepare(text, "caesar").ciphertext).toBe(text);
    });

    // Source: The Code Book, abridged edition, p. 244, Cryptogram 3: Monoalphabetic Substitution Cipher.
    // The cipher alphabet was recovered by breaking the cryptogram. Plain J, Q, X and Z never appear
    // in the message, so their four cipher letters (Q, Y, J, M) are placed by guess.
    it("deciphers the book's cryptogram 3 to English with the alphabet recovered from it", () => {
      const recovered = "EDGARLNPOQSTUVWXYZBCFHIJKM";
      const reading = substitutionDecipher(BOOK_SUBSTITUTION, recovered);
      expect(lettersOnly(BOOK_SUBSTITUTION)).toHaveLength(457);
      expect(reading.split(" ")).toHaveLength(BOOK_SUBSTITUTION.split(" ").length);
      expect(reading.startsWith("AND YET SAID LEGRAND THE SOLUTION IS BY NO MEANS SO DIFFICULT")).toBe(true);
      expect(reading).toContain("THESE CHARACTERS AS ANY ONE MIGHT READILY GUESS FORM A CIPHER");
      expect(reading).toContain("I MADE UP MY MIND AT ONCE THAT THIS WAS OF A SIMPLE SPECIES");
      expect(reading.endsWith("WITHOUT THE KEY FROM THE GOLD BUG BY EDGAR ALLAN POE")).toBe(true);
      expect(prepare(BOOK_SUBSTITUTION, "substitution").ciphertext).toBe(BOOK_SUBSTITUTION);
    });

    // Source: The Code Book, abridged edition, p. 244, Cryptogram 4: Vigenère Cipher.
    // The repeats fit key lengths 2, 3 and 6 equally, and the engine takes the longest: the keyword twice over.
    it("finds the key length and keyword of the book's cryptogram 4 with Babbage's method", () => {
      expect(lettersOnly(BOOK_VIGENERE)).toHaveLength(218);
      expect(findRepeats(BOOK_VIGENERE).map(({ spacing }) => spacing % 3)).toEqual([0, 0, 0]);
      expect(likelyKeyLength(findRepeats(BOOK_VIGENERE))).toBe(6);
      expect(crack(BOOK_VIGENERE)).toBe("ANDAND");
      const reading = lettersOnly(vigenereDecipher(BOOK_VIGENERE, crack(BOOK_VIGENERE)));
      expect(reading).toBe(lettersOnly(vigenereDecipher(BOOK_VIGENERE, "AND")));
      expect(reading.startsWith("CHARLESBABBAGEWASANECCENTRICGENIUS")).toBe(true);
      expect(reading).toContain("HEWASTHESONOFBENJAMINBABBAGEAWEALTHYLONDONBANKER");
      expect(reading.endsWith("THESPEEDOMETERANDTHECOWCATCHER")).toBe(true);
      expect(prepare(BOOK_VIGENERE, "vigenere").ciphertext).toBe(BOOK_VIGENERE);
    });

    // Source: The Code Book, abridged edition, dedication page. No key or solution is printed.
    it("keeps the dedication as printed: too short for counting letters to settle it", () => {
      expect(BOOK_DEDICATION).toBe("XICYIQKMHR, VOIR RFH LKRQT");
      expect(prepare(BOOK_DEDICATION, "substitution").ciphertext).toBe(BOOK_DEDICATION);
      expect(lettersOnly(BOOK_DEDICATION)).toHaveLength(22);
      expect(Math.max(...countLetters(BOOK_DEDICATION))).toBeLessThanOrEqual(5);
    });
  });
});

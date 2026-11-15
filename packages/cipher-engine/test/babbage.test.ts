import { describe, expect, it } from "vitest";
import {
  INTERCEPTS,
  applyKey,
  bestShift,
  countsAfterShift,
  crack,
  factors,
  findRepeats,
  keywordFromShifts,
  likelyKeyLength,
  slices,
  tallyFactors,
} from "../src/babbage/index.ts";
import { lettersOnly } from "../src/text/index.ts";
import { encipher } from "../src/vigenere/index.ts";

/** The passage behind INTERCEPTS.babbage. Our own words; the facts are from The Code Book, chapter 2. */
const BABBAGE_PASSAGE =
  "Charles Babbage loved to find mistakes in the work of other people. He found them in the " +
  "tables that sailors used to steer their ships, and he dreamed of a machine driven by steam " +
  "that would never make a mistake. When a dentist from Bristol said that he had invented a " +
  "new cipher, Babbage told him that the cipher was very old. The dentist dared him to break " +
  "it. Nobody had ever broken the cipher, but Babbage did not give up. He saw that the " +
  "keyword comes round again and again, and that the same word under the same part of the " +
  "keyword gives the same letters. That was all he needed to break the cipher that nobody " +
  "could break.";

/** The passage behind INTERCEPTS.agony, the story's challenge. Invented for this page. */
const AGONY_PASSAGE =
  "My dearest, I read your note in the newspaper every morning before my father comes down to " +
  "breakfast. He still says that I must not see you, and he reads every letter that comes to " +
  "the house. He does not know that the newspaper carries your words to me, and he would " +
  "never think to look there. Meet me by the gate of the park on Sunday when the church bells " +
  "ring. I will wear the green ribbon that you gave me. Until then I will watch the newspaper " +
  "every morning, and I will think of you every evening. Do not write to the house.";

const shiftsOf = (keyword: string) => [...keyword].map((letter) => letter.charCodeAt(0) - 65);

describe("Breaking the Vigenère cipher", () => {
  // Source: The Code Book, chapter 2, Figure 12 and Table 6. The book lists exactly these four repeats.
  it("finds the book's repeated sequences and their spacings", () => {
    const found = findRepeats(INTERCEPTS.book).map(({ sequence, spacing }) => [sequence, spacing]);
    expect(found).toEqual([
      ["PSDLP", 5],
      ["WCXYM", 20],
      ["EFIQ", 95],
      ["ETRL", 120],
    ]);
  });

  // Source: The Code Book, chapter 2: "the numbers 1, 2, 4, 5, 10 and 20 are factors" of 20. A key of 1 is left out.
  it("lists the key lengths a spacing allows", () => {
    expect(factors(20)).toEqual([2, 4, 5, 10, 20]);
    expect(factors(95)).toEqual([5, 19]);
  });

  // Source: The Code Book, chapter 2: every spacing is divisible by 5.
  it("points to the book's key length of five", () => {
    const repeats = findRepeats(INTERCEPTS.book);
    expect(tallyFactors(repeats).find((each) => each.length === 5)!.count).toBe(4);
    expect(likelyKeyLength(repeats)).toBe(5);
  });

  // Source: The Code Book, chapter 2: the keyword is EMILY and the plaintext begins "Sit thee down".
  it("recovers the book's keyword and plaintext by frequency analysis", () => {
    expect(keywordFromShifts(slices(INTERCEPTS.book, 5).map(bestShift))).toBe("EMILY");
    expect(applyKey(INTERCEPTS.book, shiftsOf("EMILY"))).toMatch(/^SITTHEEDOWNANDHAVENOSHAMECHEEKBYJOWL/);
  });

  it("splits a ciphertext into one slice per key letter", () => {
    expect(slices("ABCDEFGH", 3)).toEqual(["ADG", "BEH", "CF"]);
  });

  it("slides the letter counts back by a shift", () => {
    expect(countsAfterShift("EEEF", 4).slice(0, 3)).toEqual([3, 1, 0]);
  });

  it("made the page's main ciphertext from our passage with the keyword STEAM", () => {
    expect(INTERCEPTS.babbage).toBe(lettersOnly(encipher(BABBAGE_PASSAGE, "STEAM")));
    expect(INTERCEPTS.babbage.length).toBeGreaterThan(400);
  });

  it("breaks the page's main ciphertext with the steps the reader takes", () => {
    expect(likelyKeyLength(findRepeats(INTERCEPTS.babbage))).toBe(5);
    expect(crack(INTERCEPTS.babbage)).toBe("STEAM");
    expect(applyKey(INTERCEPTS.babbage, shiftsOf("STEAM"))).toBe(lettersOnly(BABBAGE_PASSAGE));
  });

  // The challenge in story.mdx: the reader is given INTERCEPTS.agony and must find the keyword.
  it("produces the ciphertext of the story's challenge, and it can be broken", () => {
    expect(INTERCEPTS.agony).toBe(lettersOnly(encipher(AGONY_PASSAGE, "HEART")));
    expect(likelyKeyLength(findRepeats(INTERCEPTS.agony))).toBe(5);
    expect(crack(INTERCEPTS.agony)).toBe("HEART");
  });
});

import { describe, expect, it } from "vitest";
import {
  MISSING_LETTERS,
  STAND_IN,
  decipher,
  encipher,
  inWords,
  lookUp,
  plainOf,
  spell,
  symbolsOf,
  tally,
} from "../src/mary-queen-of-scots/index.ts";

// Source: The Code Book, chapter 1, Figure 7 and the text beside it. Mary's nomenclator had
// 23 letter signs (no j, v or w), four nulls, one "dowbleth" sign and 35 signs for these words.
const FIGURE_7_WORDS =
  "AND FOR WITH THAT IF BUT WHERE AS OF THE FROM BY SO NOT WHEN THERE THIS IN WICH IS WHAT SAY ME MY " +
  "WYRT SEND LRE RECEAVE BEARER I PRAY YOU MTE YOUR NAME MYNE";

// Source: The Code Book, chapter 1. The opening of the postscript Thomas Phelippes forged in Mary's cipher.
const POSTSCRIPT =
  "I WOULD BE GLAD TO KNOW THE NAMES AND QUALITIES OF THE SIX GENTLEMEN " +
  "WHICH ARE TO ACCOMPLISH THE DESIGNMENT";

const QUIET = { seed: 1586, nullShare: 0, useWords: false };

describe("the nomenclator of Mary Queen of Scots", () => {
  it("has the shape the book describes", () => {
    expect(Object.keys(STAND_IN.letters).join("")).toBe("ABCDEFGHIKLMNOPQRSTUXYZ");
    expect(STAND_IN.nulls).toHaveLength(4);
    expect(STAND_IN.doubler).toHaveLength(1);
    expect(Object.keys(MISSING_LETTERS).sort()).toEqual(["J", "V", "W"]);
  });

  it("uses only words from Mary's own list", () => {
    const hers = FIGURE_7_WORDS.split(" ");
    for (const word of Object.keys(STAND_IN.words)) expect(hers).toContain(word);
  });

  it("never uses one sign for two things", () => {
    const signs = [
      ...Object.values(STAND_IN.letters),
      ...Object.values(STAND_IN.words),
      ...STAND_IN.nulls,
      STAND_IN.doubler,
    ];
    expect(new Set(signs).size).toBe(signs.length);
    expect(signs.every((sign) => sign.length === 1 && !/[A-Z\s]/.test(sign))).toBe(true);
  });

  it("spells without J, V or W", () => {
    expect(spell("Jove knows")).toBe("IOUE KNOUUS");
  });

  it("enciphers the forged postscript and reads it back", () => {
    const tokens = encipher(POSTSCRIPT, { seed: 1586, nullShare: 0.15, useWords: true });
    expect(plainOf(decipher(symbolsOf(tokens)))).toBe(spell(POSTSCRIPT));
    expect(tokens.filter((token) => token.kind === "word").map((token) => token.plain)).toEqual([
      "THE",
      "AND",
      "OF",
      "THE",
      "THE",
    ]);
    expect(tokens.some((token) => token.kind === "null")).toBe(true);
  });

  it("gives the same ciphertext for the same seed, and another for another", () => {
    const options = { seed: 7, nullShare: 0.4, useWords: true };
    expect(symbolsOf(encipher(POSTSCRIPT, options))).toBe(symbolsOf(encipher(POSTSCRIPT, options)));
    expect(symbolsOf(encipher(POSTSCRIPT, { ...options, seed: 8 }))).not.toBe(symbolsOf(encipher(POSTSCRIPT, options)));
  });

  it("writes a double letter as the doubler and one sign", () => {
    const tokens = encipher("LETTER", QUIET);
    expect(symbolsOf(tokens)).toBe("Δ◊≈×◊±");
    expect(tokens.map((token) => token.plain)).toEqual(["L", "E", "", "TT", "E", "R"]);
    expect(plainOf(decipher("Δ◊≈×◊±"))).toBe("LETTER");
  });

  it("drops nulls, even one that sits after the doubler", () => {
    expect(plainOf(decipher("Δ∴◊≈♪×◊☼±"))).toBe("LETTER");
    expect(lookUp("∴").kind).toBe("null");
    expect(lookUp("2")).toEqual({ symbol: "2", kind: "word", plain: "THE" });
  });

  it("still shows the commonest letter when the signs are counted", () => {
    const tokens = encipher(POSTSCRIPT, { seed: 1586, nullShare: 0.15, useWords: true });
    expect(tally(tokens)[0]).toEqual({ symbol: STAND_IN.letters.E, count: 9 });
  });

  it("keeps the words of a message apart", () => {
    expect(inWords(encipher("SEND THE LETTER", { ...QUIET, useWords: true })).map(symbolsOf)).toEqual([
      "@",
      "2",
      "Δ◊≈×◊±",
    ]);
  });

  // The exact ciphertext of the story's challenge, and the "barrel" preset of the page.
  it("makes the challenge ciphertext, and it deciphers to the answer", () => {
    const tokens = encipher("HIDE THE LETTER IN THE BARREL", { seed: 1586, nullShare: 0.15, useWords: true });
    expect(symbolsOf(tokens)).toBe("∞†≠◊ 2 Δ♪◊≈×◊± †∩ 2 #∴○≈±¿◊Δ");
    expect(plainOf(decipher("∞†≠◊ 2 Δ♪◊≈×◊± †∩ 2 #∴○≈±¿◊Δ"))).toBe("HIDE THE LETTER IN THE BARREL");
  });
});

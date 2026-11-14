import { describe, expect, it } from "vitest";
import {
  ALBERTI_ALPHABETS,
  SQUARE,
  decipher,
  encipher,
  encipherInTurn,
  keyLetters,
  trace,
} from "../src/vigenere/index.ts";

describe("Vigenère cipher", () => {
  // Source: The Code Book, chapter 2. The worked example with the keyword WHITE.
  it("enciphers the book's example with the keyword WHITE", () => {
    expect(encipher("divert troops to east ridge", "WHITE")).toBe("ZPDXVP AZHSLZ BH IWZB KMZNM");
  });

  // Source: The Code Book, chapter 2. The example that shows how repeats give the key length away.
  it("enciphers the book's KING example, where THE twice becomes BUK", () => {
    expect(encipher("the sun and the man in the moon", "KING")).toBe("DPR YEV NTN BUK WIA OX BUK WWBT");
  });

  // Source: The Code Book, chapter 2, PDF pp. 61-62. Alberti's idea with two cipher alphabets used
  // in turn: "hello" becomes AFPAD. The two l's become P and A; the two A's stand for h and l.
  it("enciphers the book's Alberti example, hello, as AFPAD", () => {
    expect(ALBERTI_ALPHABETS).toEqual(["FZBVKIXAYMEPLSDHJORGNQCUTW", "GOXBFWTHQILAPZJDESVYCRKUHN"]);
    expect(encipherInTurn("hello", ALBERTI_ALPHABETS)).toBe("AFPAD");
    expect(encipherInTurn("h", ALBERTI_ALPHABETS)).toBe("A");
    expect(encipherInTurn("le", ALBERTI_ALPHABETS)).toBe("PF");
    // As printed, the second alphabet repeats H and leaves out M. The engine notes the slip.
    expect(new Set(ALBERTI_ALPHABETS[0]).size).toBe(26);
    expect(new Set(ALBERTI_ALPHABETS[1]).size).toBe(25);
    expect(ALBERTI_ALPHABETS[1]).not.toContain("M");
  });

  it("builds the square: the row of a key letter starts with that letter", () => {
    expect(SQUARE).toHaveLength(26);
    expect(SQUARE[0]).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    expect(SQUARE[22]).toBe("WXYZABCDEFGHIJKLMNOPQRSTUV");
  });

  it("deciphers what it enciphers", () => {
    expect(decipher(encipher("ATTACK AT DAWN", "LEMON"), "LEMON")).toBe("ATTACK AT DAWN");
  });

  it("shows the working for each letter, in both directions", () => {
    expect(trace("di", "WHITE")).toEqual([
      { key: "W", plain: "D", cipher: "Z" },
      { key: "H", plain: "I", cipher: "P" },
    ]);
    expect(trace("ZP", "WHITE", "decipher")).toEqual(trace("di", "WHITE"));
  });

  it("treats an empty keyword as no shift at all", () => {
    expect(keyLetters(" 1 ")).toBe("A");
    expect(encipher("HELLO", "")).toBe("HELLO");
  });

  // The challenge in story.mdx: this is the ciphertext the reader is given.
  it("produces the ciphertext of the story's challenge", () => {
    expect(encipher("HOLD THE RIDGE UNTIL DARK", "WHITE")).toBe("DVTW XDL ZBHCL CGXES LTVG");
    expect(decipher("DVTW XDL ZBHCL CGXES LTVG", "WHITE")).toBe("HOLD THE RIDGE UNTIL DARK");
  });
});

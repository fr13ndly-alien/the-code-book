import { describe, expect, it } from "vitest";
import { SQUARE, decipher, encipher, keyLetters, trace } from "../src/vigenere/index.ts";

describe("Vigenère cipher", () => {
  // Source: The Code Book, chapter 2. The worked example with the keyword WHITE.
  it("enciphers the book's example with the keyword WHITE", () => {
    expect(encipher("divert troops to east ridge", "WHITE")).toBe("ZPDXVP AZHSLZ BH IWZB KMZNM");
  });

  // Source: The Code Book, chapter 2. The example that shows how repeats give the key length away.
  it("enciphers the book's KING example, where THE twice becomes BUK", () => {
    expect(encipher("the sun and the man in the moon", "KING")).toBe("DPR YEV NTN BUK WIA OX BUK WWBT");
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

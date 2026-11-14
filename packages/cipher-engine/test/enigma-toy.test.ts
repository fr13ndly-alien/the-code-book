import { describe, expect, it } from "vitest";
import { TOY_KEYS, toyAlphabet, toyEncipher, toyPress, toyTurn } from "../src/index.ts";

// Source: Simon Singh, The Code Book, chapter 3. Pages are given as printed, with the
// page of the PDF in brackets: 106 (115), 107 (116), 108 (117).
describe("the book's six-letter Enigma model", () => {
  it("enciphers cafe as DBCE with a fixed scrambler (p. 106 [115], Figure 26)", () => {
    expect(toyEncipher("cafe", { rotating: false })).toBe("DBCE");
  });

  it("enciphers b six times as ACEBDC when the scrambler turns (p. 108 [117], Figure 27)", () => {
    expect(toyEncipher("bbbbbb", { rotating: true })).toBe("ACEBDC");
  });

  it("matches the three tables printed beside Figure 27 (p. 107 [116])", () => {
    expect([0, 1, 2].map(toyAlphabet)).toEqual(["BADFEC", "DCBEAF", "AEDCFB"]);
  });

  it("returns to its first position after six turns (p. 108 [117])", () => {
    let position = 0;
    for (let i = 0; i < TOY_KEYS.length; i++) position = toyTurn(position);
    expect(position).toBe(0);
  });

  it("traces the current from key to wire to lamp", () => {
    // At position 1 the wire that began at a→B has moved down to join b to C.
    expect(toyPress(1, "b")).toEqual({ output: "C", trace: ["b", "a", "B", "C"] });
  });
});

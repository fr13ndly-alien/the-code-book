import { describe, expect, it } from "vitest";
import { BOOK_PAIRS, PAIRINGS_COUNT, pairsFor, partnerOf, swap } from "../src/kama-sutra/index.ts";

describe("Kama Sutra cipher", () => {
  // Source: The Code Book, chapter 1. The book's pairing and its example message.
  it("enciphers the book's example", () => {
    expect(swap("meet at midnight", BOOK_PAIRS)).toBe("CUUZ VZ CGXSGIBZ");
  });

  it("deciphers with the same swap", () => {
    expect(swap("CUUZ VZ CGXSGIBZ", BOOK_PAIRS)).toBe("MEET AT MIDNIGHT");
  });

  it("finds a partner in either direction", () => {
    expect(partnerOf("A", BOOK_PAIRS)).toBe("V");
    expect(partnerOf("V", BOOK_PAIRS)).toBe("A");
    expect(partnerOf(" ", BOOK_PAIRS)).toBe(" ");
  });

  it("uses the book's pairing for seed 0", () => {
    expect(pairsFor(0)).toEqual(BOOK_PAIRS);
  });

  it("makes a full, repeatable pairing from any other seed", () => {
    for (let seed = 1; seed <= 50; seed++) {
      const pairs = pairsFor(seed);
      expect(pairs).toEqual(pairsFor(seed));
      expect([...pairs.join("")].sort().join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      expect(swap(swap("THE QUICK BROWN FOX", pairs), pairs)).toBe("THE QUICK BROWN FOX");
    }
    expect(pairsFor(1)).not.toEqual(pairsFor(2));
  });

  it("counts the possible pairings: 25 x 23 x ... x 1", () => {
    let count = 1;
    for (let odd = 25; odd >= 1; odd -= 2) count *= odd;
    expect(PAIRINGS_COUNT).toBe(count);
  });

  // The ciphertext used in the story's challenge.
  it("produces the story's challenge", () => {
    expect(swap("MEET ME BY THE RIVER AT DAWN", BOOK_PAIRS)).toBe("CUUZ CU HP ZBU LGAUL VZ XVFS");
    expect(swap("CUUZ CU HP ZBU LGAUL VZ XVFS", BOOK_PAIRS)).toBe("MEET ME BY THE RIVER AT DAWN");
  });
});

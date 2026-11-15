import { describe, expect, it } from "vitest";
import { decipher, encipher, shiftedAlphabet, tryAllShifts } from "../src/caesar/index.ts";

describe("Caesar shift", () => {
  // Source: The Code Book, chapter 1, figure 3. Caesar's own shift of three places.
  it("enciphers the book's example with a shift of three", () => {
    expect(encipher("i came, i saw, i conquered", 3)).toBe("L FDPH, L VDZ, L FRQTXHUHG");
  });

  it("builds the cipher alphabet", () => {
    expect(shiftedAlphabet(3)).toBe("DEFGHIJKLMNOPQRSTUVWXYZABC");
  });

  it("deciphers what it enciphers", () => {
    expect(decipher(encipher("ATTACK AT DAWN", 11), 11)).toBe("ATTACK AT DAWN");
  });

  it("finds the message among all 26 shifts", () => {
    expect(tryAllShifts("YHQL YLGL YLFL")[3]).toBe("VENI VIDI VICI");
  });
});

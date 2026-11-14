import { describe, expect, it } from "vitest";
import { decipher, encipher, fence, railOf, readRails, tryAllRails } from "../src/rail-fence/index.ts";

describe("Rail fence", () => {
  // Source: The Code Book, chapter 1, the rail fence example (two rails).
  const BOOK_PLAIN = "THY SECRET IS THY PRISONER; IF THOU LET IT GO, THOU ART A PRISONER TO IT";
  const BOOK_CIPHER = "TYERTSHPIOEITOLTTOHURARSNROTHSCEITYRSNRFHUEIGTOATPIOETI";

  it("enciphers the book's example on two rails", () => {
    expect(encipher(BOOK_PLAIN, 2)).toBe(BOOK_CIPHER);
  });

  it("deciphers the book's example", () => {
    expect(decipher(BOOK_CIPHER, 2)).toBe(BOOK_PLAIN.replace(/[^A-Z]/g, ""));
  });

  it("zig-zags down and up the rails", () => {
    expect([0, 1, 2, 3, 4, 5, 6].map((index) => railOf(index, 3))).toEqual([0, 1, 2, 1, 0, 1, 2]);
  });

  it("writes the message on the fence", () => {
    expect(fence("HELLO", 3)).toEqual([
      ["H", "", "", "", "O"],
      ["", "E", "", "L", ""],
      ["", "", "L", "", ""],
    ]);
    expect(readRails("HELLO", 3)).toEqual(["HO", "EL", "L"]);
  });

  it("deciphers what it enciphers, for any number of rails", () => {
    for (let rails = 2; rails <= 6; rails++) {
      expect(decipher(encipher("WE ARE DISCOVERED FLEE AT ONCE", rails), rails)).toBe("WEAREDISCOVEREDFLEEATONCE");
    }
  });

  // The ciphertexts used in the story.
  it("produces the story's two-rail example", () => {
    expect(encipher("SCRAPE OFF THE WAX", 2)).toBe("SRPOFHWXCAEFTEA");
  });

  it("produces the story's challenge, and brute force finds it", () => {
    const challenge = encipher("XERXES SAILS FOR GREECE", 4);
    expect(challenge).toBe("XSOCESAFREEREISGEXLR");
    expect(tryAllRails(challenge, 6)[4 - 2]).toBe("XERXESSAILSFORGREECE");
  });
});

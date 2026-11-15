import { describe, expect, it } from "vitest";
import { BOOK_GRID, columnOrder, decipher, encipher, gridFromNumbers, SYMBOLS } from "../src/adfgvx/index.ts";

describe("ADFGVX", () => {
  // Source: Wikipedia, "ADFGVX cipher" (section ADFGVX): the grid built from the
  // codeword "nachtbommenwerper", the message "attack at 1200am" and the key PRIVACY.
  it("enciphers the published example with the key PRIVACY", () => {
    const grid = "NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ";
    const working = encipher(grid, "PRIVACY", "attack at 1200am");
    expect(working.pairs.join(" ")).toBe("AD DD DD AD AG VG AD DD AF DG VF VF AD DX");
    expect(working.table.map((row) => row.join(""))).toEqual(["ADDDDDA", "DAGVGAD", "DDAFDGV", "FVFADDX"]);
    expect(working.ciphertext).toBe("DGDDDAGDDGAFADDFDADVDVFAADVX");
  });

  // Source: Simon Singh, The Code Book (full edition), Appendix F: the message
  // "attack at 10 pm" with the keyword MARK.
  it("enciphers the book's example with the keyword MARK", () => {
    const working = encipher(BOOK_GRID, "MARK", "attack at 10 pm");
    expect(working.pairs.join(" ")).toBe("DV DD DD DV FG FD DV DD AV XG AD GX");
    expect(working.order).toEqual([1, 3, 0, 2]);
    expect(working.ciphertext).toBe("VDGVVDDVDDGXDDFDAADDFDXG");
  });

  it("deciphers what it enciphers, even when the last row is short", () => {
    for (const message of ["ATTACKAT10PM", "RUSHMUNITIONS", "A", "MEETAT0430BYTHEBRIDGE"]) {
      const { ciphertext } = encipher(BOOK_GRID, "PAINVIN", message);
      expect(decipher(BOOK_GRID, "PAINVIN", ciphertext).symbols).toBe(message);
    }
  });

  it("reads columns with the same keyword letter from left to right", () => {
    expect(columnOrder("PAINVIN")).toEqual([1, 2, 5, 3, 6, 0, 4]);
  });

  it("builds a grid holding every symbol once", () => {
    const grid = gridFromNumbers([...SYMBOLS].map((_, at) => (at * 7) % 36));
    expect([...grid].sort().join("")).toBe([...SYMBOLS].sort().join(""));
  });

  // The challenge in story.mdx: the reader deciphers this with the book's grid and the keyword PARIS.
  it("produces the challenge on the page", () => {
    const { ciphertext } = encipher(BOOK_GRID, "PARIS", "RUSH MUNITIONS");
    expect(ciphertext).toBe("VDDDGDGXVXVDGGDDGXADAVXVGV");
    expect(decipher(BOOK_GRID, "PARIS", ciphertext).symbols).toBe("RUSHMUNITIONS");
  });
});

import { describe, expect, it } from "vitest";
import { GAZETTE, hide, reveal, togglePrick } from "../src/pinprick/index.ts";

describe("Pinprick messages", () => {
  // Source: The Code Book, chapter 2, "From agony columns to buried treasure".
  // The book prints dots under eleven letters of its own paragraph about pinpricks.
  // These are the words that carry a dot, in order, with the dotted letter in capitals.
  it("reads the message the book hides in its own paragraph", () => {
    const dotted = ["The", "Historian", "thE", "tactiCian", "cOnveying", "unDer", "lettErs", "proBably", "obliviOus", "tO", "pinpricKs"];
    const cover = dotted.join(" ");
    const positions = [...cover].flatMap((char, index) => (/[A-Z]/.test(char) ? [index] : []));
    expect(reveal(cover, positions)).toBe("THECODEBOOK");
  });

  it("pricks the first matching letter each time, in order", () => {
    expect(hide("A cab backs up", "cab")).toEqual({ positions: [2, 3, 4], left: "" });
    expect(hide("A cab backs up", "back").positions).toEqual([4, 7, 8, 9]);
  });

  it("reads back what it hides in the newspaper", () => {
    const hiding = hide(GAZETTE, "Meet me at six");
    expect(hiding.left).toBe("");
    expect(reveal(GAZETTE, hiding.positions)).toBe("MEETMEATSIX");
  });

  it("reports when the cover text cannot carry the message", () => {
    const hiding = hide(GAZETTE, "PUZZLE");
    expect(reveal(GAZETTE, hiding.positions)).toBe("PUZ");
    expect(hiding.left).toBe("ZLE");
  });

  // The challenge on the page: these pricks are loaded, and the reader reads them.
  it("hides and reveals the challenge message", () => {
    const hiding = hide(GAZETTE, "COME HOME SOON");
    expect(hiding.left).toBe("");
    expect(reveal(GAZETTE, hiding.positions)).toBe("COMEHOMESOON");
  });

  it("pricks and mends by hand", () => {
    expect(togglePrick([3, 9], 5)).toEqual([3, 5, 9]);
    expect(togglePrick([3, 5, 9], 5)).toEqual([3, 9]);
  });
});

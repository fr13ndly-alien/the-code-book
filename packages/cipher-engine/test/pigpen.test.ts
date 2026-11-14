import { describe as group, expect, it } from "vitest";
import {
  ALL_GLYPHS,
  decipher,
  describe,
  encipher,
  glyphOf,
  letterOf,
  signature,
  tally,
  type Drawing,
} from "../src/pigpen/index.ts";

const square = (walls: Drawing["walls"], dot = false): Drawing => ({ shape: "square", walls, dot });
const angle = (opens: NonNullable<Drawing["opens"]>, dot = false): Drawing => ({ shape: "angle", walls: [], opens, dot });

group("pigpen cipher", () => {
  // Source: The Code Book, Appendix D, "The Pigpen Cipher": the three symbols it draws out.
  it("draws a, b and z as the book does", () => {
    expect(glyphOf("A")).toMatchObject(square(["right", "bottom"]));
    expect(glyphOf("B")).toMatchObject(square(["right", "bottom", "left"]));
    expect(glyphOf("Z")).toMatchObject(angle("bottom", true));
  });

  // Source: The Code Book, Appendix D. The appendix ends with a message in pigpen symbols:
  // "If not, then it can be broken by: ...". These are its 17 symbols, read off the page.
  it("reads the book's own pigpen message", () => {
    const BOOK_MESSAGE: Drawing[][] = [
      [
        square(["top", "bottom", "left"]),
        square(["top", "left"], true),
        square(["top", "right", "bottom", "left"]),
        square(["top", "right", "left"], true),
        angle("right"),
        square(["top", "right", "bottom", "left"]),
        square(["top", "right", "bottom", "left"], true),
        square(["bottom", "left"]),
        angle("right", true),
      ],
      [
        square(["right", "bottom"]),
        square(["top", "right", "bottom", "left"], true),
        square(["right", "bottom"]),
        square(["bottom", "left"], true),
        angle("right", true),
        angle("top"),
        square(["top", "left"]),
        angle("top"),
      ],
    ];
    expect(decipher(BOOK_MESSAGE)).toBe("FREQUENCY ANALYSIS");
    expect(encipher("Frequency analysis").map((word) => word.map(signature))).toEqual(
      BOOK_MESSAGE.map((word) => word.map(signature)),
    );
  });

  it("puts the letters where the book's grids put them", () => {
    expect(glyphOf("E")).toMatchObject({ grid: 0, cell: 4, dot: false });
    expect(glyphOf("N")).toMatchObject({ grid: 1, cell: 4, dot: true });
    expect(["S", "T", "U", "V"].map((letter) => glyphOf(letter)!.opens)).toEqual(["top", "left", "right", "bottom"]);
    expect(["W", "X", "Y", "Z"].map((letter) => glyphOf(letter)!.opens)).toEqual(["top", "left", "right", "bottom"]);
    expect(glyphOf("?")).toBeUndefined();
  });

  it("gives all 26 letters different symbols", () => {
    expect(ALL_GLYPHS).toHaveLength(26);
    expect(new Set(ALL_GLYPHS.map(signature)).size).toBe(26);
    for (const glyph of ALL_GLYPHS) expect(letterOf(glyph)).toBe(glyph.letter);
  });

  it("describes a symbol in words", () => {
    expect(describe(glyphOf("A")!)).toBe("lines on the right and bottom");
    expect(describe(glyphOf("N")!)).toBe("a closed box, with a dot");
    expect(describe(glyphOf("S")!)).toBe("a V shape that opens to the top");
  });

  it("counts the symbols, commonest first", () => {
    const [first] = tally("MEET ME HERE");
    expect(first).toMatchObject({ glyph: { letter: "E" }, count: 5 });
  });

  // The page's challenge: the "lodge" preset shows these symbols with the letters hidden.
  it("makes the challenge message, and it deciphers to the answer", () => {
    const symbols = encipher("THE LODGE MEETS AT MIDNIGHT");
    expect(symbols.map((word) => word.length)).toEqual([3, 5, 5, 2, 8]);
    const drawings: Drawing[][] = symbols.map((word) => word.map(({ shape, walls, opens, dot }) => ({ shape, walls, opens, dot })));
    expect(decipher(drawings)).toBe("THE LODGE MEETS AT MIDNIGHT");
  });
});

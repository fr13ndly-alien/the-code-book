import { describe, expect, it } from "vitest";
import {
  DULL_NOTICE,
  findWord,
  longestSkip,
  MOBY_DICK,
  positions,
  sequence,
  sequencesSearched,
} from "../src/bible-code/index.ts";
import { lettersOnly } from "../src/text/index.ts";

describe("Equidistant letter sequences", () => {
  // Source: The Code Book, Appendix C. Singh takes his own paragraph, starts at the M of
  // "Michael" and notes every fifth letter, which gives "mesahirt...".
  it("reproduces the book's example", () => {
    const opening = "In 1997 The Bible Code by Michael Drosnin caused headlines around the world.";
    const start = lettersOnly("In 1997 The Bible Code by ").length;
    expect(lettersOnly(opening)[start]).toBe("M");
    expect(sequence(opening, start, 5, 8)).toBe("MESAHIRT");
  });

  it("lists the positions a sequence lands on, and stops at the end of the text", () => {
    expect(positions(20, 2, 5, 8)).toEqual([2, 7, 12, 17]);
    expect(positions(20, 12, -5, 8)).toEqual([12, 7, 2]);
  });

  it("reads backwards with a negative skip", () => {
    expect(sequence("a b c d e f g", 6, -2, 4)).toBe("GECA");
  });

  it("finds a word at every start, skip and direction", () => {
    // C.A.T. forwards from 0 with skip 2, and again backwards from 8 with skip 1.
    expect(findWord("cXaXtXtac", "cat", 10)).toEqual([
      { start: 8, skip: 1, direction: -1 },
      { start: 0, skip: 2, direction: 1 },
    ]);
  });

  it("reports a word that reads the same both ways only once", () => {
    expect(findWord("xdadx", "dad", 10)).toEqual([{ start: 1, skip: 1, direction: 1 }]);
  });

  it("respects the largest skip asked for, and finds nothing for a single letter", () => {
    expect(findWord("cXaXtXtac", "cat", 1)).toEqual([{ start: 8, skip: 1, direction: -1 }]);
    expect(findWord("cat", "c", 10)).toEqual([]);
  });

  it("counts the sequences a search looks at", () => {
    expect(longestSkip(9, 3)).toBe(4);
    // Skips 1 to 4 leave 7, 5, 3 and 1 starting places, each read both ways.
    expect(sequencesSearched(9, 3, Infinity)).toBe(2 * (7 + 5 + 3 + 1));
  });

  it("finds the words the story points to", () => {
    expect(findWord(MOBY_DICK, "RAIN", Infinity)[0]).toEqual({ start: 414, skip: 8, direction: 1 });
    expect(findWord(MOBY_DICK, "SHOT", Infinity)).toHaveLength(6);
    expect(findWord(DULL_NOTICE, "FIRE", Infinity)).toHaveLength(4);
    expect(findWord(DULL_NOTICE, "DOOM", Infinity)).toEqual([{ start: 433, skip: 86, direction: -1 }]);
  });

  // The challenge in story.mdx: start at letter 434 of the car park notice and jump 52.
  it("produces the answer to the challenge", () => {
    expect(sequence(DULL_NOTICE, 433, 52, 4)).toBe("DEAD");
    expect(findWord(DULL_NOTICE, "DEAD", Infinity)).toEqual([{ start: 433, skip: 52, direction: 1 }]);
  });
});

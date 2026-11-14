import { describe as group, expect, it } from "vitest";
import {
  DESK_MESSAGE,
  DOYLE_MESSAGES,
  POSES,
  VERNE_ALPHABET,
  assign,
  decipher,
  describe,
  encipher,
  inWords,
  isSolved,
  nextHint,
  poseKey,
  readWith,
  tally,
  unassign,
  verneSteps,
  verneSwap,
  verneSwapBack,
} from "../src/dancing-men/index.ts";
import { ALPHABET, lettersOnly } from "../src/text/index.ts";

group("Dancing Men", () => {
  it("gives each of the 26 letters its own pose", () => {
    expect(Object.keys(POSES).sort().join("")).toBe(ALPHABET);
    expect(new Set(Object.values(POSES).map(poseKey)).size).toBe(26);
    expect(new Set(Object.values(POSES).map(describe)).size).toBe(26);
  });

  it("keeps the right arm free to hold the flag", () => {
    expect(Object.values(POSES).every((pose) => pose.rightArm !== "bent")).toBe(true);
  });

  // Source: Arthur Conan Doyle, "The Adventure of the Dancing Men" (The Strand Magazine, December 1903).
  // The story's messages use 18 letters, and a flag marks the last letter of a word.
  it("dances the messages of the story, which use 18 letters", () => {
    const used = new Set(lettersOnly(DOYLE_MESSAGES.join("")));
    expect([...used].sort().join("")).toBe("ABCDEGHILMNOPRSTVY");
    expect(used.size).toBe(18);
    for (const message of DOYLE_MESSAGES) expect(decipher(encipher(message))).toBe(message);
  });

  it("puts a flag on the last letter of every word but the last", () => {
    const figures = encipher("Am here, Abe Slaney");
    expect(figures.map((figure) => (figure.flag ? "F" : ".")).join("")).toBe(".F...F..F......");
    expect(inWords(figures).map((word) => word.length)).toEqual([2, 4, 3, 6]);
  });

  it("uses the same pose for the same letter every time", () => {
    const [first, , , last] = encipher("ELSE");
    expect(poseKey(first!.pose)).toBe(poseKey(last!.pose));
  });

  it("has a desk message long enough to break by counting, with E on top", () => {
    const figures = encipher(DESK_MESSAGE);
    expect(figures.length).toBeGreaterThanOrEqual(150);
    const counts = tally(figures);
    expect(counts[0]!.letter).toBe("E");
    expect(counts[0]!.count).toBeGreaterThan(counts[1]!.count);
    expect(counts.reduce((sum, { count }) => sum + count, 0)).toBe(figures.length);
  });

  it("reads the message through the reader's guesses", () => {
    const figures = encipher("THE END");
    let guesses = assign({}, "E", "E");
    expect(readWith(figures, guesses)).toBe("··E E··");
    guesses = assign(guesses, "T", "E"); // E moves from one figure to the other
    expect(readWith(figures, guesses)).toBe("E·· ···");
    expect(unassign(guesses, "T")).toEqual({});
  });

  it("hints the commonest figure first and knows when the desk is solved", () => {
    const figures = encipher(DESK_MESSAGE);
    let guesses = {};
    expect(nextHint(figures, guesses)).toBe("E");
    for (let hint = nextHint(figures, guesses); hint; hint = nextHint(figures, guesses)) {
      expect(isSolved(figures, guesses)).toBe(false);
      guesses = assign(guesses, hint, hint);
    }
    expect(isSolved(figures, guesses)).toBe(true);
    expect(readWith(figures, guesses)).toBe(decipher(figures));
  });

  // The challenge in story.mdx: 26 figures, read with the pose key or with the key won at Holmes's desk.
  it("proves the challenge", () => {
    const challenge = encipher("COME TO THE GARDEN WALL AT SEVEN");
    expect(challenge.length).toBe(26);
    expect(challenge.filter((figure) => figure.flag).length).toBe(6);
    expect(decipher(challenge)).toBe("COME TO THE GARDEN WALL AT SEVEN");
    // Every figure of the challenge also dances in the desk message.
    const known = new Set(lettersOnly(DESK_MESSAGE));
    expect(challenge.every((figure) => known.has(figure.letter))).toBe(true);
  });
});

group("Verne's parchment", () => {
  it("uses an alphabet that moves every letter", () => {
    expect([...VERNE_ALPHABET].sort().join("")).toBe(ALPHABET);
    expect([...ALPHABET].every((letter, i) => VERNE_ALPHABET[i] !== letter)).toBe(true);
  });

  it("swaps, reverses, and undoes both in two steps", () => {
    expect(verneSteps("Descend the crater")).toEqual([
      "DESCEND THE CRATER",
      "FLJELQF IXL EKSILK",
      "KLISKE LXI FQLEJLF",
      "FLJELQF IXL EKSILK",
      "DESCEND THE CRATER",
    ]);
    expect(verneSwapBack(verneSwap("SNEFFELS"))).toBe("SNEFFELS");
  });
});

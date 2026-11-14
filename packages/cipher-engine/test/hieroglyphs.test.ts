import { describe, expect, it } from "vitest";
import {
  CARTOUCHES,
  SIGNS,
  assign,
  check,
  isRead,
  readingText,
  sharedSigns,
  valuesFrom,
} from "../src/hieroglyphs/index.ts";

const { ptolemy, cleopatra, alexander, rameses } = CARTOUCHES;

describe("hieroglyphs", () => {
  // Source: The Code Book, Table 11. Champollion's values for the two cartouches of the Bankes obelisk.
  it("reads Ptolemy and Cleopatra with the book's sound values", () => {
    const values = valuesFrom([ptolemy, cleopatra]);
    expect(readingText(ptolemy, values)).toBe("p t o l m e s");
    expect(readingText(cleopatra, values)).toBe("k l e o p a t r a");
  });

  // Source: The Code Book, chapter 4. The names share p, o and l as the same sign; t is written two ways.
  it("lets Ptolemy's values be tested on Cleopatra", () => {
    expect(sharedSigns(ptolemy, cleopatra)).toEqual(["stool", "lasso", "lion"]);
    expect(readingText(cleopatra, valuesFrom([ptolemy]))).toBe("? l ? o p ? ? ? ?");
    expect(check(cleopatra, valuesFrom([ptolemy]))).toEqual([
      "unknown",
      "fits",
      "unknown",
      "fits",
      "fits",
      "unknown",
      "unknown",
      "unknown",
      "unknown",
    ]);
    expect(SIGNS.loaf.sound).toBe(SIGNS.hand.sound);
  });

  it("shows a clash when a guess does not fit the Greek name", () => {
    expect(check(ptolemy, { stool: "t" })[0]).toBe("clashes");
  });

  // Source: The Code Book, Table 12. With the first two names read, Alexander's
  // cartouche "seemed to read a-l-?-s-e-?-t-r-?". This is the story's challenge.
  it("reads the challenge cartouche as far as the book says, then in full", () => {
    const known = valuesFrom([ptolemy, cleopatra]);
    expect(readingText(alexander, known)).toBe("a l ? s e ? t r ?");
    expect(isRead(alexander, known)).toBe(false);

    const full = assign(assign(assign(known, "basket", "k"), "water", "n"), "bolt", "s");
    expect(readingText(alexander, full)).toBe("a l k s e n t r s");
    expect(isRead(alexander, full)).toBe(true);
    expect(alexander.name).toBe("Alexander");
  });

  // Source: The Code Book, chapter 4. The Abu Simbel cartouche: ?-?-s-s, then ra-?-s-s, then Rameses.
  it("reads Rameses with the sun as a whole word", () => {
    const known = valuesFrom([ptolemy, cleopatra]);
    expect(readingText(rameses, known)).toBe("? ? s s");
    expect(readingText(rameses, assign(known, "sun", "ra"))).toBe("ra ? s s");
    expect(isRead(rameses, assign(assign(known, "sun", "ra"), "skins", "m"))).toBe(true);
  });

  it("can take a sound away again", () => {
    expect(assign({ stool: "p" }, "stool", undefined)).toEqual({});
  });
});

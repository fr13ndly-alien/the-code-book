import { describe, expect, it } from "vitest";
import {
  ITA2,
  WHEEL_LENGTHS,
  WHEEL_PINS,
  add,
  fromTape,
  keyAt,
  outputOf,
  pinsAt,
  run,
  symbolFor,
  toTape,
} from "../src/lorenz/index.ts";

describe("Lorenz (simplified)", () => {
  // Source: ITU-T Recommendation S.1 (ITA2), as tabulated in Wikipedia, "Baudot code".
  // There A is 00011, B is 11001 and T is 10000, written fifth impulse first.
  it("uses the ITA2 teleprinter code", () => {
    const fifthFirst = (symbol: string) => [...ITA2[symbol]!].reverse().join("");
    expect(fifthFirst("A")).toBe("00011");
    expect(fifthFirst("B")).toBe("11001");
    expect(fifthFirst("T")).toBe("10000");
    expect(fifthFirst("8")).toBe("11111");
    expect(new Set(Object.values(ITA2)).size).toBe(32);
  });

  it("adds impulses without carrying", () => {
    expect(add("11000", "10011")).toBe("01011");
    expect(symbolFor(add(ITA2.A!, ITA2.B!))).toBe("G");
    expect(symbolFor(add(ITA2.G!, ITA2.B!))).toBe("A");
    expect(add(ITA2.Q!, ITA2.Q!)).toBe(ITA2["/"]);
  });

  // Source: the wheel sizes of the real chi wheels, 41, 31, 29, 26 and 23 cams, which
  // give 22,041,682 start positions (Wikipedia, "Lorenz cipher").
  it("has wheels of the real lengths, which only line up again after 22,041,682 letters", () => {
    expect(WHEEL_PINS.map((pins) => pins.length)).toEqual(WHEEL_LENGTHS);
    expect(WHEEL_LENGTHS.reduce((a, b) => a * b)).toBe(22_041_682);
    expect(pinsAt([40, 30, 28, 25, 22], 1)).toEqual([0, 0, 0, 0, 0]);
  });

  it("reads the key off the pins", () => {
    expect(keyAt([0, 0, 0, 0, 0], 0)).toBe("10101");
    expect(keyAt([0, 0, 0, 0, 0], 1)).toBe("00010");
  });

  it("deciphers by running the output through again from the same start", () => {
    const start = [7, 0, 12, 3, 20];
    const cipher = outputOf(run("Attack at dawn", start));
    expect(cipher).not.toBe(toTape("Attack at dawn"));
    expect(fromTape(outputOf(run(cipher, start)))).toBe("ATTACK AT DAWN");
  });

  it("shows every step", () => {
    const [first] = run("A", [0, 0, 0, 0, 0]);
    expect(first).toEqual({
      input: "A",
      inputBits: "11000",
      pins: [0, 0, 0, 0, 0],
      keyBits: "10101",
      outputBits: "01101",
      output: "P",
    });
  });

  it("produces the challenge of the story", () => {
    // The story gives the wheels as 5, 4, 3, 2, 1, counting from 1.
    const start = [4, 3, 2, 1, 0];
    expect(outputOf(run("COLOSSUS", start))).toBe("HWOOI8W3");
    expect(outputOf(run("HWOOI8W3", start))).toBe("COLOSSUS");
  });
});

import { describe, expect, it } from "vitest";
import { candidates, CHARACTERS, duration, encode, fromMorse, MORSE, pulses, toMorse } from "../src/morse/index.ts";

describe("Morse code", () => {
  // Source: Recommendation ITU-R M.1677-1, International Morse code, part I, section 1.
  it("matches the international table", () => {
    expect(toMorse("SOS")).toBe("... --- ...");
    expect(toMorse("E T A N")).toBe(". / - / .- / -.");
    expect(toMorse("QZ 5 0")).toBe("--.- --.. / ..... / -----");
    expect(CHARACTERS).toHaveLength(36);
    expect(new Set(CHARACTERS.map((char) => MORSE[char])).size).toBe(36);
  });

  // Source: the same recommendation, part I, section 2: a dash is three dots, the gap inside
  // a letter one dot, between letters three, between words seven. Operators measure speed
  // with the standard word PARIS, which lasts 50 dots including the gap before the next word.
  it("times the standard word PARIS at 50 dots", () => {
    expect(duration(pulses(encode("PARIS")))).toBe(50 - 7);
    expect(duration(pulses(encode("PARIS PARIS")))).toBe(50 + 43);
  });

  it("puts the right gaps between marks, letters and words", () => {
    const gaps = pulses(encode("AN E"))
      .filter((pulse) => !pulse.on)
      .map((pulse) => pulse.units);
    expect(gaps).toEqual([1, 3, 1, 7]);
  });

  it("reads back what it writes", () => {
    expect(fromMorse(toMorse("What hath God wrought"))).toBe("WHAT HATH GOD WROUGHT");
  });

  it("leaves out what the table does not cover, and marks patterns it does not know", () => {
    expect(toMorse("a-b!")).toBe(".- -...");
    expect(fromMorse("... ...---... ...")).toBe("S?S");
  });

  it("lists what a half-keyed letter could become", () => {
    expect(candidates("...").join("")).toBe("HSV345");
    expect(candidates("")).toHaveLength(36);
  });

  // The challenge on the page: this tape is loaded, and the reader keys it in.
  it("produces the challenge tape and solves it", () => {
    const tape = "-.-. --- -- . / .- - / --- -. -.-. .";
    expect(toMorse("COME AT ONCE")).toBe(tape);
    expect(fromMorse(tape)).toBe("COME AT ONCE");
  });
});

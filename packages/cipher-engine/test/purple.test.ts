import { describe, expect, it } from "vitest";
import {
  MOTIONS,
  PART_1_CIPHERTEXT,
  PART_1_PLAINTEXT,
  PART_1_SETTINGS,
  POSITIONS,
  SIXES_WIRING,
  TWENTIES_WIRING,
  VOWEL_PLUGBOARD,
  isPlugboard,
  mover,
  outputOf,
  run,
  shuffleAt,
  sixesOf,
  stepOn,
  twentiesOf,
  type Settings,
} from "../src/purple/index.ts";
import { countLetters, indexOfLetter } from "../src/text/index.ts";

const vowels: Settings = { plugboard: VOWEL_PLUGBOARD, start: [0, 0, 0, 0], motion: "123" };

/** True if the row holds each of 1 to its length exactly once. */
const isShuffle = (row: number[]) => [...row].sort((a, b) => a - b).every((contact, index) => contact === index + 1);

describe("Purple", () => {
  // Source: the wiring tables of Freeman, Sullivan and Weierud, "PURPLE Revealed",
  // Cryptologia 27(1), 2003: one switch of 6 wires and three of 20, with 25 positions each.
  it("has switches of the real shape, and every position is a true shuffle", () => {
    expect(SIXES_WIRING).toHaveLength(POSITIONS);
    expect(SIXES_WIRING.every((row) => row.length === 6 && isShuffle(row))).toBe(true);
    expect(TWENTIES_WIRING).toHaveLength(3);
    for (const wiring of TWENTIES_WIRING) {
      expect(wiring).toHaveLength(POSITIONS);
      expect(wiring.every((row) => row.length === 20 && isShuffle(row))).toBe(true);
    }
  });

  // Source: part 1 of the fourteen-part message from Tokyo to Washington, 6 and 7 December
  // 1941, with key sheet 9-1,24,6-23 and plugboard NOKTYUXEQLHBRMPDICJASVWGZF. Transcript
  // from Frode Weierud's CryptoCellar (cryptocellar.org/simula/purple), as used in the tests
  // of Brian Neal's simulator "purple" (github.com/gremmie/purple).
  it("deciphers part 1 of the fourteen-part message of 7 December 1941", () => {
    expect(PART_1_CIPHERTEXT).toHaveLength(PART_1_PLAINTEXT.length);
    const plain = outputOf(run(PART_1_CIPHERTEXT, PART_1_SETTINGS, "decipher"));
    expect(plain).toBe(PART_1_PLAINTEXT);
    expect(plain).toContain("THEGOVERNMENTOFTHEUNITEDSTATES");
    expect(plain).toContain("PEACEOFTHEPACIFICAREA");
  });

  it("enciphers the same message back to the intercepted text", () => {
    const cipher = outputOf(run(PART_1_PLAINTEXT, PART_1_SETTINGS, "encipher"));
    const garbled = [...PART_1_CIPHERTEXT].map((letter, at) => (letter === "-" ? "-" : cipher[at])).join("");
    expect(garbled).toBe(PART_1_CIPHERTEXT);
  });

  it("checks a plugboard and splits it into sixes and twenties", () => {
    expect(isPlugboard(VOWEL_PLUGBOARD)).toBe(true);
    expect(isPlugboard("AEIOUY")).toBe(false);
    expect(isPlugboard("AAIOUYBCDFGHJKLMNPQRSTVWXZ")).toBe(false);
    expect(sixesOf(VOWEL_PLUGBOARD)).toBe("AEIOUY");
    expect(twentiesOf(VOWEL_PLUGBOARD)).toBe("BCDFGHJKLMNPQRSTVWXZ");
    expect(sixesOf(PART_1_SETTINGS.plugboard)).toBe("NOKTYU");
  });

  // Source: the stepping rule in "PURPLE Revealed" (2003), as implemented in Neal's simulator.
  it("steps the sixes switch every letter and exactly one twenties switch", () => {
    expect(MOTIONS).toHaveLength(6);
    expect(stepOn([0, 0, 0, 0], "123")).toEqual([1, 1, 0, 0]);
    expect(stepOn([0, 0, 0, 0], "231")).toEqual([1, 0, 1, 0]);
    // Sixes on its last position: the medium switch steps instead of the fast one.
    expect(mover([24, 5, 5, 5], "123")).toBe(2);
    expect(stepOn([24, 5, 5, 5], "123")).toEqual([0, 5, 6, 5]);
    // One letter earlier, with the medium switch on its last position, the slow one steps.
    expect(mover([23, 5, 24, 5], "123")).toBe(3);
    expect(stepOn([23, 5, 24, 5], "123")).toEqual([24, 5, 24, 6]);
    expect(stepOn([24, 5, 24, 6], "123")).toEqual([0, 5, 0, 6]);
  });

  it("only repeats its switch positions after 25 x 25 x 25 letters", () => {
    let positions = [0, 0, 0, 0];
    let letters = 0;
    do {
      positions = stepOn(positions, "123");
      letters++;
    } while (positions.some((at) => at !== 0));
    expect(letters).toBe(15_625);
  });

  it("shows every step of a sixes letter and a twenties letter", () => {
    const [a, b] = run("AB", vowels, "encipher");
    // Position 1 of the sixes switch is 2 1 3 5 4 6: contact 1 (A) meets contact 2 (E).
    expect(a).toMatchObject({ input: "A", output: "E", group: "sixes", positions: [0, 0, 0, 0], moves: 1 });
    expect(a!.hops).toEqual([{ switch: 0, position: 0, from: 1, to: 2 }]);
    expect(b).toMatchObject({ input: "B", group: "twenties", positions: [1, 1, 0, 0] });
    expect(b!.hops.map((hop) => hop.switch)).toEqual([1, 2, 3]);
    expect(b!.hops[1]!.from).toBe(b!.hops[0]!.to);
  });

  it("gives the whole shuffle in force for a letter", () => {
    const [a] = run("A", vowels, "encipher");
    expect(shuffleAt(a!, vowels, "encipher")).toEqual({ from: "AEIOUY", to: "EAIUOY" });
    const [b] = run("B", vowels, "encipher");
    const { from, to } = shuffleAt(b!, vowels, "encipher");
    expect(from).toBe("BCDFGHJKLMNPQRSTVWXZ");
    expect([...to].sort().join("")).toBe(from);
  });

  it("deciphers by running the ciphertext from the same start", () => {
    const settings: Settings = { plugboard: VOWEL_PLUGBOARD, start: [12, 3, 24, 7], motion: "312" };
    const cipher = outputOf(run("The government of Japan", settings, "encipher"));
    expect(cipher).not.toBe("THEGOVERNMENTOFJAPAN");
    expect(outputOf(run(cipher, settings, "decipher"))).toBe("THEGOVERNMENTOFJAPAN");
  });

  it("steps past a garble without losing its place", () => {
    const whole = outputOf(run("PEACE", vowels, "encipher"));
    const holed = outputOf(run(`${whole.slice(0, 2)}-${whole.slice(3)}`, vowels, "decipher"));
    expect(holed).toBe("PE-CE");
  });

  // The weakness: a sixes letter can only ever become another sixes letter.
  it("never lets a letter cross between the sixes and the twenties", () => {
    const cipher = outputOf(run(PART_1_PLAINTEXT.replaceAll("-", "X"), vowels, "encipher"));
    const plain = PART_1_PLAINTEXT.replaceAll("-", "X");
    for (let at = 0; at < plain.length; at++) {
      expect("AEIOUY".includes(cipher[at]!)).toBe("AEIOUY".includes(plain[at]!));
    }
  });

  // The first step of the attack: count the letters and the sixes stand apart.
  it("lets the sixes be spotted by counting letters", () => {
    const perLetter = (text: string, sixes: string) => {
      const counts = countLetters(text);
      const inSixes = [...sixes].map((letter) => counts[indexOfLetter(letter)]!);
      const total = counts.reduce((sum, count) => sum + count, 0);
      const sixesTotal = inSixes.reduce((sum, count) => sum + count, 0);
      return { counts, inSixes, sixes: sixesTotal / 6, twenties: (total - sixesTotal) / 20 };
    };
    // The real intercept: N O K T Y U were the sixes that day, and four of them top the count.
    const real = perLetter(PART_1_CIPHERTEXT, sixesOf(PART_1_SETTINGS.plugboard));
    expect(real.sixes).toBeGreaterThan(60);
    expect(real.twenties).toBeLessThan(45);
    // The same plaintext with the vowels as the sixes: all six are the six commonest letters.
    const made = perLetter(outputOf(run(PART_1_PLAINTEXT, vowels, "encipher")), "AEIOUY");
    const sixthHighest = [...made.counts].sort((x, y) => y - x)[5]!;
    expect(Math.min(...made.inSixes)).toBe(sixthHighest);
    expect(made.sixes).toBeGreaterThan(1.9 * made.twenties);
  });

  it("produces the challenge of the story", () => {
    // The story gives the switches as 9, 1, 24, 6, counting from 1, with the vowels as the sixes.
    const settings: Settings = { plugboard: VOWEL_PLUGBOARD, start: [8, 0, 23, 5], motion: "231" };
    expect(outputOf(run("MAGIC", settings, "encipher"))).toBe("LUDOT");
    expect(outputOf(run("LUDOT", settings, "decipher"))).toBe("MAGIC");
  });
});

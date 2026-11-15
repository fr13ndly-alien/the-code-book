import { describe, expect, it } from "vitest";
import {
  ALLOTMENT,
  NUMBERS,
  countNumbers,
  decipher,
  encipher,
  followers,
  letterOf,
  makeTable,
  numbersOf,
  plainOf,
} from "../src/homophonic/index.ts";
import { ENGLISH_FREQUENCY, countLetters, indexOfLetter } from "../src/text/index.ts";

const TABLE = makeTable(1);

const QUEEN =
  "THE QUEEN ASKED A QUICK QUESTION. THE QUIET SQUIRE WAS QUITE UNABLE TO REPLY. HE SQUEEZED HIS QUILL " +
  "AND REQUESTED A QUARTER OF AN HOUR. THE QUEEN, QUITE ANNOYED, QUIT THE ROOM.";

const DUKE =
  "THE DUKE HAS A SECRET. HIS CLERKS TURN EVERY LETTER INTO A NUMBER, AND THE COMMON LETTERS GET MORE " +
  "NUMBERS THAN THE RARE ONES. WHEN THE ENEMY COUNTS THE NUMBERS, HE FINDS THAT NONE STANDS OUT.";

describe("homophonic substitution", () => {
  // Source: The Code Book, Table 1 (Beker and Piper), and the full edition's chapter 2, which gives each
  // letter as many symbols as its percentage: twelve for e, eight for a, one for q, a hundred in all.
  it("shares out a hundred numbers in step with the book's table of English frequencies", () => {
    expect(ALLOTMENT.reduce((sum, share) => sum + share, 0)).toBe(100);
    expect(ALLOTMENT[indexOfLetter("E")]).toBe(12);
    expect(ALLOTMENT[indexOfLetter("A")]).toBe(8);
    expect(ALLOTMENT[indexOfLetter("Q")]).toBe(1);
    ALLOTMENT.forEach((share, letter) => {
      expect(share).toBeGreaterThanOrEqual(1);
      expect(Math.abs(share - ENGLISH_FREQUENCY[letter]!)).toBeLessThan(1.1);
    });
  });

  it("uses every number exactly once in a table", () => {
    expect(TABLE.map((numbers) => numbers.length)).toEqual(ALLOTMENT);
    expect(TABLE.flat().sort()).toEqual(NUMBERS);
    expect(makeTable(2)).not.toEqual(TABLE);
    expect(makeTable(1)).toEqual(TABLE);
  });

  it("deciphers what it enciphers, whatever numbers were picked", () => {
    for (const seed of [1, 2, 3]) {
      const steps = encipher("Attack at dawn!", TABLE, seed);
      expect(plainOf(decipher(numbersOf(steps), TABLE))).toBe("ATTACKATDAWN");
    }
    expect(numbersOf(encipher(QUEEN, TABLE, 1))).not.toBe(numbersOf(encipher(QUEEN, TABLE, 2)));
    expect(numbersOf(encipher(QUEEN, TABLE, 1))).toBe(numbersOf(encipher(QUEEN, TABLE, 1)));
  });

  it("flattens the count: the commonest number is far rarer than the commonest letter", () => {
    const steps = encipher(DUKE, TABLE, 1);
    const tallestLetter = Math.max(...countLetters(DUKE));
    expect(Math.max(...countNumbers(steps))).toBeLessThan(tallestLetter / 3);
    expect(countNumbers(steps).reduce((sum, count) => sum + count, 0)).toBe(steps.length);
  });

  // Source: The Code Book (full edition), chapter 2: q has one symbol and is followed only by u, which has three.
  it("still gives Q away: its number is followed only by the three numbers for U", () => {
    const steps = encipher(QUEEN, TABLE, 1);
    const [q] = TABLE[indexOfLetter("Q")]!;
    expect(followers(steps, q!)).toEqual(TABLE[indexOfLetter("U")]);
    expect(letterOf(q!, TABLE)).toBe("Q");
  });

  // The exact ciphertext of the story's challenge, made with the table the page starts with.
  it("makes the challenge ciphertext, and it deciphers to the answer", () => {
    const ciphertext = numbersOf(encipher("NO BAR STANDS TALL", TABLE, 1));
    expect(ciphertext).toBe("72 09 97 98 85 15 35 82 58 87 22 32 20 34 11");
    expect(plainOf(decipher(ciphertext, TABLE))).toBe("NOBARSTANDSTALL");
  });
});

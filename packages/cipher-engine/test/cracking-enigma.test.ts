import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, encipher, type EnigmaSettings } from "../src/enigma/index.ts";
import {
  BOOK_CRIB,
  BOOK_TABLE,
  chainLengths,
  chains,
  clashes,
  encipherMessageKey,
  interceptedOpenings,
  linkTable,
  MESSAGE_KEYS,
  possibleOffsets,
  testRotorSettings,
  type DayKey,
} from "../src/cracking-enigma/index.ts";

/** The example day key from The Code Book, chapter 3: rotors 2-3-1 at Q-C-W with six cables. */
const BOOK_SETTINGS: EnigmaSettings = {
  rotors: ["II", "III", "I"],
  rings: [0, 0, 0],
  reflector: "B",
  cables: ["AL", "PR", "TD", "BW", "KF", "OY"],
};
const DAY: DayKey = { settings: BOOK_SETTINGS, start: [16, 2, 22] };

describe("Rejewski's chains", () => {
  // Source: The Code Book, chapter 3, "Cracking the Enigma": the completed table of
  // relationships and the four chains Rejewski draws from it, with 3, 9, 7 and 7 links.
  it("finds the chains in the book's table", () => {
    const table = "FQHPLWOGBMVRXUYCZITNJEASDK";
    expect(chains(table)).toEqual(["AFW", "BQZKVELRI", "CHGOYDP", "JMXSTNU"]);
    expect(chainLengths(table)).toEqual([9, 7, 7, 3]);
  });

  // Source: the same pages. The book's four openings LOKRGM, MVTXZE, JKTMPE and DVYPZX
  // link L to R, M to X, J to M and D to P.
  it("builds the table of relationships from message openings", () => {
    const table = linkTable(["LOKRGM", "MVTXZE", "JKTMPE", "DVYPZX"], 0);
    expect(table).toBe("???P?????M?RX?????????????");
  });

  // Source: The Code Book, PDF p. 138. The table the "bookTable" preset shows on the chains tool,
  // with the chains the book lists under it: A-F-W (3 links), B-Q-Z-K-V-E-L-R-I (9),
  // C-H-G-O-Y-D-P (7) and J-M-X-S-T-N-U (7).
  it("holds the book's table for the page, with chains of 3, 9, 7 and 7 links", () => {
    expect(BOOK_TABLE).toBe("FQHPLWOGBMVRXUYCZITNJEASDK");
    expect([...BOOK_TABLE].sort().join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    expect(chains(BOOK_TABLE).map((chain) => chain.length)).toEqual([3, 9, 7, 7]);
    // PDF pp. 136-137: the four openings the book starts with agree with the finished table.
    const started = linkTable(["LOKRGM", "MVTXZE", "JKTMPE", "DVYPZX"], 0);
    [...started].forEach((letter, at) => letter === "?" || expect(BOOK_TABLE[at]).toBe(letter));
  });

  it("types the message key twice, so the receiver can read it back", () => {
    const opening = encipherMessageKey(DAY, "PGH");
    expect(opening).toHaveLength(6);
    expect(encipher(DAY.settings, DAY.start, opening).output).toBe("PGHPGH");
  });

  it("fills the whole table from one day's openings", () => {
    expect(MESSAGE_KEYS).toHaveLength(26);
    for (const pair of [0, 1, 2] as const) {
      expect(linkTable(interceptedOpenings(DAY), pair)).not.toContain("?");
    }
  });

  it("gives chain lengths that ignore the plugboard but not the rotors", () => {
    const lengths = (day: DayKey) => chainLengths(linkTable(interceptedOpenings(day), 0));
    const unplugged: DayKey = { ...DAY, settings: { ...BOOK_SETTINGS, cables: [] } };
    const turned: DayKey = { ...DAY, start: [16, 2, 23] };
    expect(lengths(DAY)).toEqual([11, 11, 1, 1, 1, 1]);
    expect(lengths(unplugged)).toEqual(lengths(DAY));
    expect(lengths(turned)).toEqual([6, 6, 3, 3, 3, 3, 1, 1]);
  });
});

describe("Turing's crib", () => {
  // Source: The Code Book, chapter 3, "The Geese that Never Cackled": the crib
  // "wetternullsechs" against IPRENLWKMJJSXCPLEJWQ. As printed, the first e meets an E;
  // one place to the left an s meets an S; one place to the right nothing clashes.
  // The PDF does not keep the spacing of the figure: starting the crib under the third
  // cipher letter is the one alignment that matches all three statements.
  it("rules out positions where a letter meets itself, as in the book", () => {
    const ciphertext = "IPRENLWKMJJSXCPLEJWQ";
    const crib = "WETTERNULLSECHS";
    expect(clashes(ciphertext, crib, 2)).toEqual([1]);
    expect(clashes(ciphertext, crib, 1)).toContain(10);
    expect(clashes(ciphertext, crib, 3)).toEqual([]);
  });

  // Source: The Code Book, PDF pp. 155-156. The data the "bookCrib" preset loads into the crib tool.
  // The book says the crib as printed is misaligned (e under E), fails one place to the left
  // (s under S) and has "no illegal encipherments" one place to the right.
  it("holds the book's crib alignment for the page", () => {
    const { ciphertext, crib, offset } = BOOK_CRIB;
    expect(ciphertext).toBe("IPRENLWKMJJSXCPLEJWQ");
    expect(crib).toBe("WETTERNULLSECHS");
    expect(clashes(ciphertext, crib, offset).map((at) => crib[at])).toEqual(["E"]);
    // One place to the left the book names the S of "sechs". The c beside it meets a C as well.
    expect(clashes(ciphertext, crib, offset - 1).map((at) => crib[at])).toEqual(["S", "C"]);
    expect(clashes(ciphertext, crib, offset + 1)).toEqual([]);
    // The ciphertext is the book's illustration, not real Enigma output: the page says so and
    // switches the search off, because no rotor setting of our machine fits it.
    expect(testRotorSettings(DEFAULT_SETTINGS, ciphertext, crib, offset + 1)).toEqual([]);
  });

  // The message the story works through: "today, weather at zero six: rain and fog".
  it("produces the weather report on the page and finds its rotor setting", () => {
    const ciphertext = encipher(DEFAULT_SETTINGS, [5, 8, 23], "HEUTE WETTER NULL SECHS REGEN UND NEBEL").output;
    expect(ciphertext).toBe("XSTVTDTKVPHHBEEQBTUXXWXUDWATOBJTD");
    expect(possibleOffsets(ciphertext, "WETTER")[0]).toBe(5);
    expect(testRotorSettings(DEFAULT_SETTINGS, ciphertext, "WETTER", 5)).toEqual([
      { start: [5, 8, 23], plaintext: "HEUTEWETTERNULLSECHSREGENUNDNEBEL" },
    ]);
    expect(testRotorSettings(DEFAULT_SETTINGS, ciphertext, "WETTER", 6)).toEqual([]);
  });

  // The challenge in story.mdx: the answer is the rotor setting, J M P.
  it("produces the challenge on the page", () => {
    const ciphertext = encipher(DEFAULT_SETTINGS, [9, 12, 15], "NACHTS WETTER STURM AUS NORDWEST").output;
    expect(ciphertext).toBe("DMTTITMTWYQADJCXFRNLZDFXDWEP");
    expect(possibleOffsets(ciphertext, "WETTER").slice(0, 2)).toEqual([6, 7]);
    const stops = testRotorSettings(DEFAULT_SETTINGS, ciphertext, "WETTER", 6);
    expect(stops).toEqual([{ start: [9, 12, 15], plaintext: "NACHTSWETTERSTURMAUSNORDWEST" }]);
  });
});

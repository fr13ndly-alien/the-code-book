import { describe, expect, it } from "vitest";
import {
  NAMES,
  NOTHING_KNOWN,
  PLACES,
  SIGNS,
  SIGN_IDS,
  TRIPLET,
  WORDS,
  applyGuess,
  bridge,
  columnOf,
  isRead,
  readSign,
  readWord,
  rowOf,
  sharedStem,
  signAt,
  solve,
} from "../src/linear-b/index.ts";

const triplet = TRIPLET.map((id) => WORDS[id]);

describe("linear-b", () => {
  // Source: the Unicode Standard, Linear B Syllabary block (U+10000 to U+1007F). Each character
  // name carries Bennett's sign number and the Ventris and Chadwick value, e.g.
  // U+10012 LINEAR B SYLLABLE B070 KO.
  it("uses the published number and value of every sign", () => {
    const published: Record<string, number> = {
      a: 8,
      de: 45,
      ja: 57,
      jo: 36,
      ko: 70,
      mi: 73,
      ni: 30,
      no: 52,
      po: 11,
      ri: 53,
      si: 41,
      so: 12,
      ti: 37,
      tu: 69,
    };
    expect(Object.fromEntries(SIGN_IDS.map((sign) => [sign, SIGNS[sign].number]))).toEqual(published);
    for (const sign of SIGN_IDS) expect(SIGNS[sign].consonant + SIGNS[sign].vowel).toBe(sign);
  });

  it("puts each sign in one cell of the grid", () => {
    for (const sign of SIGN_IDS) expect(signAt(rowOf(sign), columnOf(sign))).toBe(sign);
    expect(rowOf("si")).toBe(rowOf("so"));
    expect(columnOf("ko")).toBe(columnOf("no"));
  });

  // Source: Chadwick, "The Decipherment of Linear B", on Kober's triplets: ko-no-si-jo,
  // ko-no-si-ja and ko-no-so share two signs, and the signs that follow share a consonant.
  it("finds the shared start of Kober's triplet and the signs that bridge to its endings", () => {
    expect(sharedStem(triplet)).toBe(2);
    expect(bridge(triplet)).toEqual(["si", "so"]);
    expect(SIGNS.si.consonant).toBe(SIGNS.so.consonant);
  });

  // Source: Mycenaean Epigraphy Group, University of Cambridge, "The Decipherment Process".
  // Guessing a-mi-ni-so for Amnisos turns the next place name into "?o-no-so": Knossos.
  it("spreads the sounds of Amnisos through the grid, as Ventris found", () => {
    const { values } = solve({ amnisos: "amnisos" });
    expect(readWord(WORDS.amnisos, values)).toBe("a-mi-ni-so");
    expect(readWord(WORDS.knossos, values)).toBe("?o-no-so");
    expect(readWord(WORDS.tulissos, values)).toBe("??-?i-so");
    expect(readSign("si", values)).toBe("si");
  });

  it("reads all three place names once each is guessed", () => {
    const { values, clashes } = solve({ amnisos: "amnisos", knossos: "knossos", tulissos: "tulissos" });
    expect(clashes).toEqual({});
    expect(PLACES.map((id) => readWord(WORDS[id], values))).toEqual(["a-mi-ni-so", "ko-no-so", "tu-ri-so"]);
    expect(PLACES.every((id) => isRead(WORDS[id], values))).toBe(true);
    expect(readWord(WORDS.knossosMen, values)).toBe("ko-no-si-?o");
    expect(readWord(WORDS.knossosWomen, values)).toBe("ko-no-si-?a");
  });

  it("rejects a name with the wrong number of syllables", () => {
    const result = applyGuess(NOTHING_KNOWN, WORDS.knossos, NAMES.amnisos.syllables);
    expect(result.clashes).toEqual([{ kind: "length", signs: 3, syllables: 4 }]);
    expect(result.values).toBe(NOTHING_KNOWN);
  });

  it("rejects a name that gives one column two vowels", () => {
    // ko, no and so stand in one column, but tu-ri-so needs u, i and o there.
    const result = applyGuess(NOTHING_KNOWN, WORDS.knossos, NAMES.tulissos.syllables);
    expect(result.clashes).toContainEqual({ kind: "split", line: "column", index: 3, sounds: ["u", "i"] });
    expect(solve({ knossos: "tulissos" }).values).toEqual(NOTHING_KNOWN);
  });

  it("rejects a name that gives two columns the same vowel", () => {
    // tu, ri and so stand in three columns, but ko-no-so would give all three the vowel o.
    const { clashes } = solve({ tulissos: "knossos" });
    expect(clashes.tulissos).toContainEqual({ kind: "merge", line: "column", indexes: [2, 4], sound: "o" });
  });

  it("keeps the right guesses when another guess is wrong", () => {
    const { values, clashes } = solve({ amnisos: "amnisos", tulissos: "knossos" });
    expect(readWord(WORDS.amnisos, values)).toBe("a-mi-ni-so");
    expect(Object.keys(clashes)).toEqual(["tulissos"]);
  });

  // Source: the tripod tablet from Pylos, PY Ta 641, whose first word is ti-ri-po-de
  // (Cambridge, "The Decipherment Process"). This is the story's challenge: with the three
  // place names guessed, the word reads ti-ri-?o-??, and the answer is TRIPOD.
  it("reads the challenge word as far as the place names allow, then in full", () => {
    const places = { amnisos: "amnisos", knossos: "knossos", tulissos: "tulissos" } as const;
    expect(readWord(WORDS.tripods, solve(places).values)).toBe("ti-ri-?o-??");
    expect(isRead(WORDS.tripods, solve(places).values)).toBe(false);

    const full = solve({ ...places, tripods: "tripods" });
    expect(full.clashes).toEqual({});
    expect(readWord(WORDS.tripods, full.values)).toBe("ti-ri-po-de");
    expect(SIGN_IDS.filter((sign) => readSign(sign, full.values) !== sign)).toEqual(["ja", "jo"]);
  });
});

import { describe, expect, it } from "vitest";
import { LETTER_WORDS, TERM_WORDS, decode, decodeHeard, encode, lookUp, speak, spell } from "../src/navajo/index.ts";

describe("Navajo code", () => {
  // Source: The Code Book, chapter 4. "Pacific" is spelled pig, ant, cat, ice, fox, ice, cat.
  it("spells the book's example, Pacific", () => {
    const words = spell("Pacific");
    expect(words.map((word) => word.meaning)).toEqual(["pig", "ant", "cat", "ice", "fox", "ice", "cat"]);
    expect(words.map((word) => word.navajo.toLowerCase())).toEqual([
      "bi-sodih",
      "wol-la-chee",
      "moasi",
      "tkin",
      "ma-e",
      "tkin",
      "moasi",
    ]);
  });

  it("has one word per letter, and each English meaning starts with its letter", () => {
    expect(LETTER_WORDS).toHaveLength(26);
    // X is the exception in the book's table: its word is "cross".
    for (const word of LETTER_WORDS.filter((entry) => entry.stands !== "X")) {
      expect(word.meaning[0]!.toUpperCase()).toBe(word.stands);
    }
  });

  // Source: The Code Book, chapter 4: an iron fish (Besh-lo) meant a submarine.
  it("uses one code word for a known term and spells the rest", () => {
    const groups = encode("Submarine at Guam");
    expect(groups[0]).toEqual([{ navajo: "Besh-lo", meaning: "iron fish", stands: "SUBMARINE", kind: "term" }]);
    expect(groups.map((group) => group.length)).toEqual([1, 2, 4]);
  });

  // Source: US Navy, Navajo Code Talkers' Dictionary (revised 15 June 1945):
  // "FIGHTER PLANE, DA-HE-TIH-HI, HUMMING BIRD" and "OBS. PLAN[E], NE-AS-JAH, OWL".
  // The Code Book calls the fighter plane an owl. We follow the dictionary.
  it("follows the Navy dictionary where the book differs", () => {
    expect(lookUp("Da-he-tih-hi")).toMatchObject({ meaning: "hummingbird", stands: "FIGHTER PLANE" });
    expect(lookUp("Ne-as-jah")).toMatchObject({ meaning: "owl", stands: "O", kind: "letter" });
    expect(TERM_WORDS).toHaveLength(14);
  });

  it("finds terms of two words, and plurals", () => {
    expect(speak(encode("fighter planes, dive bomber, bomber"))).toBe("Da-he-tih-hi / Gini / Jay-sho");
  });

  it("decodes what it encodes", () => {
    expect(decode(encode("Two tanks near the fortification!"))).toBe("TWO TANK NEAR THE FORTIFICATION");
  });

  it("tells apart words that begin alike", () => {
    expect(lookUp("klizzie")?.stands).toBe("G");
    expect(lookUp("Klizzie-yazzi")?.stands).toBe("K");
    expect(lookUp("Dibeh")?.stands).toBe("S");
    expect(lookUp("Dibeh-yazzi")?.stands).toBe("L");
  });

  it("produces the challenge of the story", () => {
    const heard = "Lo-tso / Wol-la-chee Than-zie / Be Wol-la-chee Gloe-ih Nesh-chee";
    expect(speak(encode("BATTLESHIP AT DAWN"))).toBe(heard);
    expect(decodeHeard(heard)).toBe("BATTLESHIP AT DAWN");
  });
});

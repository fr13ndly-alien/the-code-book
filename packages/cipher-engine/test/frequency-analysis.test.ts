import { describe, expect, it } from "vitest";
import {
  LIPOGRAM_PLAINTEXT,
  SAMPLE_CIPHER_ALPHABET,
  SAMPLE_PLAINTEXT,
  assign,
  decipher,
  doubles,
  encipher,
  guessByRank,
  neighbours,
  partialText,
  percentages,
  rankLetters,
  read,
  unassign,
} from "../src/frequency-analysis/index.ts";
import { countLetters, indexOfLetter, lettersOnly } from "../src/text/index.ts";

// Source: The Code Book, chapter 1, "Cryptanalyzing a ciphertext". The book's own
// worked example, its Table 2 of letter counts, and the cipher alphabet it recovers.
const BOOK_CIPHERTEXT =
  "PCQ VMJYPD LBYK LYSO KBXBJXWXV BXV ZCJPO EYPD KBXBJYUXJ LBJOO KCPK. CP LBO LBCMKXPV XPV IYJKL PYDBL, " +
  "QBOP KBO BXV OPVOV LBO LXRO CI SX'XJMI, KBO JCKO XPV EYKKOV LBO DJCMPV ZOICJO BYS, KXUYPD: " +
  '"DJOXL EYPD, ICJ X LBCMKXPV XPV CPO PYDBLK Y BXNO ZOOP JOACMPLYPD LC UCM LBO IXZROK CI FXKL XDOK ' +
  'XPV LBO RODOPVK CI XPAYOPL EYPDK. SXU Y SXEO KC ZCRV XK LC AJXNO X IXNCMJ CI UCMJ SXGOKLU?" ' +
  "OFYRCDMO, LXROK IJCS LBO LBCMKXPV XPV CPO PYDBLK";
const BOOK_CIPHER_ALPHABET = "XZAVOIDBYGERSPCFHJKLMNQTUW";

const count = (text: string, letter: string) => countLetters(text)[indexOfLetter(letter)];

describe("frequency analysis", () => {
  it("counts the book's ciphertext as its Table 2 does", () => {
    expect(lettersOnly(BOOK_CIPHERTEXT)).toHaveLength(338);
    expect(count(BOOK_CIPHERTEXT, "O")).toBe(38);
    expect(count(BOOK_CIPHERTEXT, "X")).toBe(34);
    expect(count(BOOK_CIPHERTEXT, "P")).toBe(31);
    expect(count(BOOK_CIPHERTEXT, "B")).toBe(25);
    expect(count(BOOK_CIPHERTEXT, "T")).toBe(0);
    expect(percentages(BOOK_CIPHERTEXT)[indexOfLetter("O")]).toBeCloseTo(11.2, 1);
    expect(rankLetters(countLetters(BOOK_CIPHERTEXT)).slice(0, 3)).toEqual(["O", "X", "P"]);
  });

  it("finds the clues the book uses: OO but no XX, and B before O but never after", () => {
    expect(doubles(BOOK_CIPHERTEXT).O).toBe(2);
    expect(doubles(BOOK_CIPHERTEXT).X).toBeUndefined();
    const aroundO = neighbours(BOOK_CIPHERTEXT, "O");
    expect(aroundO.before[indexOfLetter("B")]).toBe(9);
    expect(aroundO.after[indexOfLetter("B")]).toBe(0);
  });

  it("shows that the blind guess turns the book's first word, PCQ, into the gibberish the book reports (\"aov\")", () => {
    expect(partialText(BOOK_CIPHERTEXT, guessByRank(BOOK_CIPHERTEXT)).slice(0, 2)).toBe("ao");
  });

  it("fills in the book's first four letters the way the book prints them", () => {
    const guesses = { O: "E", X: "A", Y: "I", B: "H" };
    expect(partialText("PCQ VMJYPD LBYK LYSO", guesses)).toBe("PCQ VMJiPD LhiK LiSe");
  });

  it("deciphers the book's message with the book's cipher alphabet", () => {
    const plain = decipher(BOOK_CIPHERTEXT, BOOK_CIPHER_ALPHABET);
    expect(plain.startsWith("NOW DURING THIS TIME SHAHRAZAD HAD BORNE KING SHAHRIYAR THREE SONS.")).toBe(true);
    expect(plain.endsWith("TALES FROM THE THOUSAND AND ONE NIGHTS")).toBe(true);
    expect(encipher(plain, BOOK_CIPHER_ALPHABET)).toBe(BOOK_CIPHERTEXT);
  });

  it("keeps one plain letter for one cipher letter", () => {
    const guesses = assign({ O: "E" }, "X", "E");
    expect(guesses).toEqual({ X: "E" });
    expect(unassign(guesses, "X")).toEqual({});
  });

  it("leaves spaces and unsolved letters alone", () => {
    expect(read("O X", { O: "E" })).toEqual([
      { cipher: "O", plain: "E" },
      { cipher: " ", plain: undefined },
      { cipher: "X", plain: undefined },
    ]);
  });

  // The page's own message. This is the ciphertext the presets load and the story's challenge asks about.
  it("makes the sample ciphertext and proves the challenge can be solved", () => {
    const ciphertext = encipher(SAMPLE_PLAINTEXT, SAMPLE_CIPHER_ALPHABET);
    expect(lettersOnly(ciphertext).length).toBeGreaterThan(300);
    expect(ciphertext.startsWith("Y BXNO QXLABOV LBO BXJZCMJ ICJ LBJOO PYDBLK.")).toBe(true);
    expect(ciphertext.endsWith("LBO FXKKQCJV YK RXPLOJP.")).toBe(true);
    expect(decipher("RXPLOJP", SAMPLE_CIPHER_ALPHABET)).toBe("LANTERN");
  });

  it("gets the sample's commonest letters right by rank alone, but not the rest", () => {
    const ciphertext = encipher(SAMPLE_PLAINTEXT, SAMPLE_CIPHER_ALPHABET);
    const guesses = guessByRank(ciphertext);
    expect(guesses.O).toBe("E");
    expect(guesses.L).toBe("T");
    expect(guesses.B).not.toBe("H");
    expect(partialText(ciphertext, guesses).slice(0, 6)).toBe("i aoge");
  });

  // The page's lipogram preset: our own passage with no letter E, after Perec's La Disparition
  // (The Code Book, chapter 1). This is the ciphertext the "lipogram" preset loads.
  it("makes the lipogram ciphertext from a passage with no E, so the tallest bar is not E", () => {
    expect(LIPOGRAM_PLAINTEXT).not.toMatch(/e/i);
    expect(lettersOnly(LIPOGRAM_PLAINTEXT).length).toBeGreaterThan(150);
    const ciphertext = encipher(LIPOGRAM_PLAINTEXT, SAMPLE_CIPHER_ALPHABET);
    expect(ciphertext).toBe(
      "X KLCJS BYL CMJ YKRXPV XL VXQP. JXYP QXK FCMJYPD LBJCMDB X DXF YP CMJ JCCI, XPV QYPV KBCCE XRR CMJ QYPVCQK. " +
        "SU XMPL RYL X RXSF XPV KXL ZU YL, AXRS XK X AXL. Y JXP LC KBML CMJ ZXJP XPV ZJYPD YP KYT DCXLK. ZU PCCP LBXL KLCJS QXK IXJ XQXU, XPV X ZJYDBL KMP QXK VJUYPD CMJ SMVVU UXJV. PCL X LBYPD QXK RCKL.",
    );
    expect(count(ciphertext, "O")).toBe(0);
    expect(decipher(ciphertext, SAMPLE_CIPHER_ALPHABET)).toBe(LIPOGRAM_PLAINTEXT);
    const tallest = rankLetters(countLetters(ciphertext))[0]!;
    expect(decipher(tallest, SAMPLE_CIPHER_ALPHABET)).toBe("A");
    expect(guessByRank(ciphertext)[tallest]).toBe("E");
  });
});

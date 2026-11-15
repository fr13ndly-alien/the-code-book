import { describe, expect, it } from "vitest";
import {
  KEY_COUNT,
  cipherAlphabet,
  commonestLetter,
  decipher,
  encipher,
  squeeze,
} from "../src/keyword-substitution/index.ts";

describe("Keyword substitution", () => {
  // Source: The Code Book, chapter 1. The keyphrase JULIUS CAESAR and the cipher alphabet printed for it.
  it("builds the book's cipher alphabet from JULIUS CAESAR", () => {
    expect(squeeze("JULIUS CAESAR")).toBe("JULISCAER");
    expect(cipherAlphabet("JULIUS CAESAR")).toBe("JULISCAERTVWXYZBDFGHKMNOPQ");
  });

  // Source: The Code Book, chapter 1, figure 5. A cipher alphabet with no keyword behind it.
  const FIGURE_5 = "JLPAWIQBCTRZYDSKEGFXHUONVM";

  it("enciphers the book's figure 5 example", () => {
    expect(encipher("beware the ides of march", FIGURE_5)).toBe("LWOJGW XBW CAWF SI YJGPB");
  });

  it("deciphers the book's figure 5 example", () => {
    expect(decipher("LWOJGW XBW CAWF SI YJGPB", FIGURE_5)).toBe("BEWARE THE IDES OF MARCH");
  });

  it("gives the plain alphabet when there is no keyphrase", () => {
    expect(cipherAlphabet("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    expect(cipherAlphabet(" 12 ")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  });

  it("always uses each letter exactly once", () => {
    for (const keyphrase of ["A", "Z", "ZEBRA", "MARY QUEEN OF SCOTS", "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"]) {
      expect([...cipherAlphabet(keyphrase)].sort().join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
  });

  it("counts the keys: 26 x 25 x ... x 1", () => {
    let count = 1n;
    for (let n = 2n; n <= 26n; n++) count *= n;
    expect(KEY_COUNT.replaceAll(",", "")).toBe(count.toString());
  });

  // The texts used in the story.
  it("produces the story's opening example", () => {
    expect(encipher("BEWARE THE IDES OF MARCH", cipherAlphabet("JULIUS CAESAR"))).toBe("USNJFS HES RISG ZC XJFLE");
  });

  it("produces the story's letter-counting example", () => {
    const plain = "THE ENEMY NEVER NEEDS EVERY KEY WHEN THE LETTERS THEMSELVES TELL THE SECRET";
    const caught = encipher(plain, cipherAlphabet("JULIUS CAESAR"));
    expect(caught).toBe("HES SYSXP YSMSF YSSIG SMSFP VSP NESY HES WSHHSFG HESXGSWMSG HSWW HES GSLFSH");
    expect(commonestLetter(caught)).toBe("S");
  });

  it("produces the story's challenge", () => {
    const alphabet = cipherAlphabet("MARY QUEEN OF SCOTS");
    expect(alphabet).toBe("MARYQUENOFSCTVWXZBDGHIJKLP");
    expect(encipher("NEVER WRITE THE KEY DOWN", alphabet)).toBe("VQIQB JBOGQ GNQ SQL YWJV");
    expect(decipher("VQIQB JBOGQ GNQ SQL YWJV", alphabet)).toBe("NEVER WRITE THE KEY DOWN");
  });
});

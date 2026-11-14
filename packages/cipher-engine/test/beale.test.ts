import { describe, expect, it } from "vitest";
import {
  BEALE_TWO_OPENING,
  decipher,
  encipher,
  keyText,
  lettersOf,
  missingLetters,
  numberedWords,
  numbersFor,
  numbersOf,
  parseNumbers,
} from "../src/beale/index.ts";

const declaration = numberedWords(keyText("declaration").text);
const gettysburg = numberedWords(keyText("gettysburg").text);

describe("Beale book cipher", () => {
  // Source: The Code Book, chapter 2. The book numbers the words of one of its own
  // sentences and enciphers "beale" as 14-2-8-23-18.
  it("deciphers the book's worked example", () => {
    const sentence = numberedWords(
      "For example, if the sender and receiver agreed that this sentence was to be the keytext, then every " +
        "word would be numerically labeled, each number providing the basis for encryption.",
    );
    expect(sentence).toHaveLength(30);
    expect(lettersOf(decipher([14, 2, 8, 23, 18], sentence))).toBe("BEALE");
    expect(numbersFor("E", sentence)).toEqual([2, 18, 24, 30]);
  });

  // Source: The Code Book, chapter 2, figure 22: every tenth word of the Declaration is numbered.
  it("numbers the Declaration the way the book does", () => {
    expect(declaration).toHaveLength(342);
    expect(declaration[10 - 1]).toBe("necessary");
    expect(declaration[73 - 1]).toBe("hold");
    expect(declaration[80 - 1]).toBe("that");
    expect(declaration[115 - 1]).toBe("instituted");
    expect(declaration[340 - 1]).toBe("a");
  });

  // Source: The Code Book, chapter 2, figure 20 (the second Beale cipher) and the
  // decipherment printed after it: "I have deposited in the county of Bedford, about
  // four miles from Buford's".
  //
  // Only numbers up to 342 can be tested, because we hold only the first three
  // paragraphs of the Declaration. Of the first 50 numbers, four are beyond that
  // (807, 647, 811, 554). Three more disagree with the book's own numbering:
  //   95  is "inalienable"; the message needs U (the book says some copies read "unalienable").
  //   308 is "Great";       the message needs B ("Britain" is word 309).
  //   316 is "and";         the message needs U ("usurpations" is word 317).
  // The other 43 numbers are checked here and all agree.
  it("deciphers the opening of the second Beale cipher", () => {
    const wanted = "IHAVEDEPOSITEDINTHECOUNTYOFBEDFORDABOUTFOURMILESFR";
    const steps = decipher(BEALE_TWO_OPENING, declaration);
    const wrong = steps.filter((step, index) => step.letter !== wanted[index]).map((step) => step.number);
    expect(wrong).toEqual([807, 647, 811, 308, 316, 554, 95]);
    expect(lettersOf(steps)).toBe("IHA?EDEPOS?TEDINTHECOUNT?OFGEDFORDABOA?FOIRMILESFR");
  });

  it("deciphers what it enciphers, whatever the seed", () => {
    for (const seed of [1, 2, 3]) {
      const steps = encipher("Gold and silver", declaration, seed);
      // The Declaration's opening has no word that starts with V, so that letter is lost.
      const numbers = steps.map((step) => step.number);
      expect(lettersOf(decipher(numbers, declaration))).toBe("GOLDANDSIL?ER");
    }
  });

  it("gives the same numbers for the same seed, and others for another", () => {
    expect(numbersOf(encipher("BEALE", declaration, 1))).toBe("134, 138, 233, 42, 85");
    expect(numbersOf(encipher("BEALE", declaration, 2))).not.toBe("134, 138, 233, 42, 85");
  });

  it("knows which letters a key text cannot encipher", () => {
    expect(missingLetters(declaration)).toBe("QVXYZ");
    expect(numbersOf(encipher("VAULT", declaration, 1)).startsWith("?, ")).toBe(true);
  });

  // The challenge on the page: these numbers, made with the Gettysburg Address as the key text.
  it("produces the challenge ciphertext and solves it", () => {
    const numbers = "140, 184, 54, 37, 63, 150, 174, 18, 154, 94, 115, 165, 233, 44, 268, 266, 58, 213, 130";
    expect(numbersOf(encipher("THE GOLD IS IN IRON POTS", gettysburg, 1))).toBe(numbers);
    expect(lettersOf(decipher(parseNumbers(numbers), gettysburg))).toBe("THEGOLDISINIRONPOTS");
    expect(lettersOf(decipher(parseNumbers(numbers), declaration))).not.toBe("THEGOLDISINIRONPOTS");
  });
});

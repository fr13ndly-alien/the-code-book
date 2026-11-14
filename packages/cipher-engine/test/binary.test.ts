import { describe, expect, it } from "vitest";
import { add, charOf, combine, flipBit, outputOf, parseBits, toBits, toText } from "../src/binary/index.ts";

describe("binary encryption", () => {
  // Source: The Code Book, Table 13 and the text beside it.
  it("matches the book's ASCII numbers", () => {
    expect(toBits("AZ")).toEqual(["1000001", "1011010"]);
    expect(toBits("a!&")).toEqual(["1100001", "0100001", "0100110"]);
  });

  // Source: The Code Book, chapter 5. The message HELLO enciphered with the key DAVID.
  it("enciphers the book's example, HELLO with the key DAVID", () => {
    const columns = combine(toBits("HELLO"), toBits("DAVID"));
    expect(toBits("HELLO").join("")).toBe("10010001000101100110010011001001111");
    expect(toBits("DAVID").join("")).toBe("10001001000001101011010010011000100");
    expect(outputOf(columns).join("")).toBe("00011000000100001101000001010001011");
  });

  it("deciphers by adding the same key again", () => {
    const cipher = parseBits("00011000000100001101000001010001011");
    expect(toText(outputOf(combine(cipher, toBits("DAVID"))))).toBe("HELLO");
  });

  it("gives up the key to anyone who knows the message", () => {
    const cipher = parseBits("0001100 0000100 0011010 0000101 0001011");
    expect(toText(outputOf(combine(cipher, toBits("HELLO"))))).toBe("DAVID");
  });

  it("adds without carrying, and flips single digits", () => {
    expect(add("1100", "1010")).toBe("0110");
    expect(flipBit("1000100", 6)).toBe("1000101");
    expect(charOf("0001100")).toBe("·");
  });

  it("repeats a short key and ignores a missing one", () => {
    expect(combine(toBits("AAA"), toBits("AB")).map((column) => column.key)).toEqual(toBits("ABA"));
    expect(outputOf(combine(toBits("HI"), []))).toEqual(toBits("HI"));
  });

  it("produces the challenge of the story", () => {
    const cipher = "0001100 0000011 0000111 0000110 0011100";
    expect(outputOf(combine(toBits("ALICE"), toBits("MONEY"))).join(" ")).toBe(cipher);
    expect(toText(outputOf(combine(parseBits(cipher), toBits("MONEY"))))).toBe("ALICE");
  });
});

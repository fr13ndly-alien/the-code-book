import { describe, expect, it } from "vitest";
import { decipher, encipher, innerRing, settingsUsed, type DiscSettings } from "../src/cipher-disc/index.ts";

const fixed = (shift: number): DiscSettings => ({ shift, turning: "fixed", keyword: "" });
const stepping = (shift: number): DiscSettings => ({ shift, turning: "stepping", keyword: "" });

describe("Cipher disc", () => {
  // Source: The Code Book, chapter 3, "The Development of Cipher Machines": for a Caesar
  // shift of one place put the outer A next to the inner B, for five places next to the inner F.
  it("works as a Caesar shift when it is left still", () => {
    expect(innerRing(1)[0]).toBe("B");
    expect(innerRing(5)).toBe("FGHIJKLMNOPQRSTUVWXYZABCDE");
    expect(encipher(fixed(5), "a")).toBe("F");
  });

  // Source: the same section of the book. Alberti enciphers "goodbye" with the keyword LEON:
  // g becomes R and the first o becomes S.
  it("enciphers the book's example with the keyword LEON", () => {
    const leon: DiscSettings = { shift: 0, turning: "keyword", keyword: "LEON" };
    expect(encipher(leon, "goodbye")).toBe("RSCQMCS");
    expect(settingsUsed(leon, "goodbye")).toEqual([11, 4, 14, 13, 11, 4, 14]);
    expect(decipher(leon, "RSCQMCS")).toBe("GOODBYE");
  });

  it("gives a new cipher letter each time when it turns after every letter", () => {
    expect(encipher(stepping(3), "AAAA")).toBe("DEFG");
    expect(decipher(stepping(3), "DEFG")).toBe("AAAA");
  });

  it("keeps spaces and wraps round the ring", () => {
    expect(encipher(stepping(25), "ZZ Z")).toBe("YZ A");
    expect(encipher(fixed(-1), "A")).toBe("Z");
  });

  // The message the story asks the reader to read by trying every setting of a still disc.
  it("produces the caught message on the page", () => {
    expect(encipher(fixed(9), "SEND MORE COPPER")).toBe("BNWM VXAN LXYYNA");
  });

  // The challenge in story.mdx: the disc starts with the inner L beside A and turns after every letter.
  it("produces the challenge on the page", () => {
    expect(encipher(stepping(11), "HOLD THE BRIDGE")).toBe("SAYR IXV TKCYCB");
  });
});

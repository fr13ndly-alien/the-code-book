import { describe, expect, it } from "vitest";
import { buildSquare, cipherPairs, decipher, digraphs, encipher, trace } from "../src/playfair/index.ts";

describe("Playfair cipher", () => {
  // Source: Simon Singh, The Code Book (full edition), Appendix E, and his own
  // site (simonsingh.net, The Black Chamber, "Playfair Cipher"): keyword CHARLES.
  it("builds the book's square from the keyword CHARLES", () => {
    expect(buildSquare("charles")).toBe("CHARL" + "ESBDF" + "GIKMN" + "OPQTU" + "VWXYZ");
  });

  // Same source. The x splits the double m of "hammersmith" and another fills the last pair.
  it("splits the book's message into digraphs", () => {
    const pairs = digraphs("meet me at hammersmith bridge tonight");
    expect(pairs.map((each) => each.pair).join(" ")).toBe("ME ET ME AT HA MX ME RS MI TH BR ID GE TO NI GH TX");
    expect(pairs[5]).toEqual({ pair: "MX", padded: "double" });
    expect(pairs[16]).toEqual({ pair: "TX", padded: "end" });
  });

  // Same source. The Black Chamber page confirms the pairs me to GD, mi to NK, ge to OG and ni to GK.
  it("enciphers the book's message", () => {
    expect(encipher("meet me at hammersmith bridge tonight", "CHARLES")).toBe(
      "GD DO GD RQ AR KY GD HD NK PR DA MS OG UP GK IC QY",
    );
  });

  it("names the rule and the cells for each pair", () => {
    const steps = trace("me ha my", "CHARLES");
    expect(steps.map((step) => step.rule)).toEqual(["rectangle", "row", "column"]);
    expect(steps[0]).toMatchObject({ plain: "ME", cipher: "GD", plainCells: [13, 5], cipherCells: [10, 8] });
    // M and Y share a column, and Y is at the bottom, so it wraps round to the top: R.
    expect(steps[2]).toMatchObject({ plain: "MY", cipher: "TR" });
  });

  it("deciphers what it enciphers, leaving the filler letters in", () => {
    const ciphertext = encipher("meet me at hammersmith bridge tonight", "CHARLES");
    expect(decipher(ciphertext, "CHARLES")).toBe("ME ET ME AT HA MX ME RS MI TH BR ID GE TO NI GH TX");
  });

  it("writes J as I, and never pairs a letter with itself", () => {
    expect(digraphs("jam")).toEqual([{ pair: "IA" }, { pair: "MX", padded: "end" }]);
    expect(digraphs("xx")).toEqual([
      { pair: "XQ", padded: "double" },
      { pair: "XQ", padded: "end" },
    ]);
    expect(cipherPairs("GDD")).toEqual([{ pair: "GD" }, { pair: "DX", padded: "end" }]);
  });

  // The challenge in story.mdx: this is the ciphertext the reader is given.
  it("produces the ciphertext of the story's challenge", () => {
    expect(encipher("ANY BOY CAN LEARN THIS", "PLAYFAIR")).toBe("PQ AC SL BY OP HP IO QM CN");
    expect(decipher("PQ AC SL BY OP HP IO QM CN", "PLAYFAIR")).toBe("AN YB OY CA NL EA RN TH IS");
  });
});

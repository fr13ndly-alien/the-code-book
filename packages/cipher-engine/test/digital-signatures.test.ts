import { describe, expect, it } from "vitest";
import {
  TOY_KEY,
  digest,
  digestWorking,
  forge,
  openSignature,
  sign,
  signNumber,
  verify,
} from "../src/digital-signatures/index.ts";

describe("Digital signatures (toy)", () => {
  // Source: Wikipedia, "RSA cryptosystem", worked example:
  // p = 61, q = 53, n = 3233, e = 17, d = 413, and 65 to the power 17 is 2790 (mod 3233).
  it("matches the published RSA example", () => {
    expect(TOY_KEY).toMatchObject({ n: 3233, e: 17, d: 413 });
    expect(openSignature(65, TOY_KEY)).toBe(2790);
    expect(signNumber(2790, TOY_KEY)).toBe(65);
  });

  it("adds up the symbols of a message", () => {
    expect(digestWorking("A b-1", 3233)).toEqual({ symbols: ["A", "B", "1"], codes: [65, 66, 49], sum: 180, digest: 180 });
  });

  it("accepts a signed message and rejects a changed one", () => {
    const signature = sign("I OWE BOB 19 POUNDS", TOY_KEY);
    expect(verify("I OWE BOB 19 POUNDS", signature, TOY_KEY).valid).toBe(true);
    expect(verify("I OWE BOB 99 POUNDS", signature, TOY_KEY).valid).toBe(false);
    expect(verify("I OWE BOB 19 POUNDS", signature + 1, TOY_KEY).valid).toBe(false);
  });

  it("shows the weakness of the toy digest: swapped symbols add up the same", () => {
    expect(digest("I OWE BOB 91 POUNDS", 3233)).toBe(digest("I OWE BOB 19 POUNDS", 3233));
  });

  it("lets a forger find the signature only by trying every number", () => {
    const found = forge("I OWE EVE 500 POUNDS", TOY_KEY);
    expect(found.signature).toBe(sign("I OWE EVE 500 POUNDS", TOY_KEY));
  });

  // The three notes in the story's Challenge all carry the signature 1519: only one is genuine.
  it("proves the challenge has exactly one genuine note", () => {
    expect(sign("MEET AT NOON", TOY_KEY)).toBe(1519);
    expect(verify("MEET AT DAWN", 1519, TOY_KEY).valid).toBe(false);
    expect(verify("MEET AT NOON", 1519, TOY_KEY).valid).toBe(true);
    expect(verify("MEET AT DUSK", 1519, TOY_KEY).valid).toBe(false);
  });

  // The numbers quoted in the story.
  it("produces the numbers the story quotes", () => {
    expect(digest("I OWE BOB 19 POUNDS", 3233)).toBe(1098);
    expect(digest("I OWE BOB 99 POUNDS", 3233)).toBe(1106);
    expect(sign("I OWE BOB 19 POUNDS", TOY_KEY)).toBe(1403);
    expect(forge("I OWE EVE 500 POUNDS", TOY_KEY)).toEqual({ signature: 896, tries: 897 });
  });
});

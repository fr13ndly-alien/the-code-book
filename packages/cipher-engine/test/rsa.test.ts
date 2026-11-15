import { describe, expect, it } from "vitest";
import { crack, decipher, encipher, factor, gcd, makeKeys, modInverse, modPow, validExponents } from "../src/rsa/index.ts";

describe("RSA", () => {
  // Source: The Code Book, Appendix E, "The Mathematics of RSA".
  // Alice picks p = 17, q = 11 and e = 7. Bob sends X, which is 88 in ASCII.
  const keys = makeKeys(17, 11, 7)!;

  it("builds the book's keys", () => {
    expect(keys).toEqual({ p: 17, q: 11, n: 187, phi: 160, e: 7, d: 23 });
  });

  it("enciphers the book's message 88 to 11, with the book's steps", () => {
    const steps = encipher(88, keys);
    expect(steps.squares).toEqual([
      { power: 1, value: 88, used: true },
      { power: 2, value: 77, used: true },
      { power: 4, value: 132, used: true },
    ]);
    expect(88 * 77 * 132).toBe(894_432);
    expect(steps.result).toBe(11);
  });

  it("deciphers 11 back to 88, with the book's steps", () => {
    const steps = decipher(11, keys);
    // The book multiplies 11^1 x 11^2 x 11^4 x 11^16 = 11 x 121 x 55 x 154.
    expect(steps.squares.filter((square) => square.used).map((square) => square.value)).toEqual([11, 121, 55, 154]);
    expect(steps.result).toBe(88);
    expect(String.fromCharCode(steps.result)).toBe("X");
  });

  it("finds d with Euclid's algorithm", () => {
    expect(modInverse(7, 160)).toBe(23);
    expect(modInverse(4, 160)).toBeUndefined();
    expect(gcd(160, 7)).toBe(1);
    expect(gcd(160, 12)).toBe(4);
  });

  it("offers only values of e that work, the book's 7 among them", () => {
    expect(validExponents(17, 11, 5)).toEqual([3, 7, 9, 11, 13]);
    expect(makeKeys(17, 11, 5)).toBeUndefined();
  });

  it("deciphers whatever it enciphers", () => {
    for (let message = 0; message < keys.n; message++) {
      expect(decipher(encipher(message, keys).result, keys).result).toBe(message);
    }
  });

  it("lets an attacker rebuild the private key by factoring a small N", () => {
    expect(factor(187)).toEqual({ tries: 6, lastTried: 11, factors: [11, 17] });
    expect(crack(187, 7).keys?.d).toBe(23);
    expect(factor(191).factors).toBeUndefined();
  });

  // Source: The Code Book, chapter 5. Two products of primes that the book
  // gives to show how slow factoring is; the second is left as a dare.
  it("factors the book's larger numbers, with far more tries", () => {
    expect(factor(18_206_927).factors).toEqual([1933, 9419]);
    expect(factor(1_709_023)).toEqual({ tries: 601, lastTried: 1201, factors: [1201, 1423] });
    expect(factor(1201).factors ?? factor(1423).factors).toBeUndefined();
    expect(modPow(88, 7, 187)).toBe(11);
  });

  // The challenge in story.mdx: the word SPY, letter by letter, under N = 247, e = 5.
  it("produces the ciphertext of the story's challenge", () => {
    const spy = makeKeys(13, 19, 5)!;
    const ciphertext = [..."SPY"].map((letter) => encipher(letter.charCodeAt(0), spy).result);
    expect(ciphertext).toEqual([239, 188, 33]);
    const stolen = crack(247, 5).keys!;
    expect(stolen.d).toBe(173);
    expect(String.fromCharCode(...ciphertext.map((c) => decipher(c, stolen).result))).toBe("SPY");
  });
});

import { describe, expect, it } from "vitest";
import { decipher, encipher } from "../src/caesar/index.ts";
import { eveSearch, exchange, isPrime, modPow, powerTable, primesUpTo } from "../src/key-exchange/index.ts";

describe("Diffie-Hellman-Merkle key exchange", () => {
  // Source: The Code Book, chapter 5 (abridged edition), Table 14: 3^x (mod 7).
  it("reproduces the book's table of a one-way function", () => {
    expect(powerTable({ base: 3, modulus: 7 })).toEqual([3, 2, 6, 4, 5, 1]);
  });

  // Source: The Code Book, full edition, chapter 6, Table 26, checked against a
  // scan of that edition (the abridged edition leaves the exchange out). Alice and Bob agree on Y = 7 and P = 11. Alice picks 3
  // and sends 2; Bob picks 6 and sends 4. Both arrive at the key 9.
  it("runs the worked exchange from the full edition of the book", () => {
    const { alice, bob } = exchange({ base: 7, modulus: 11 }, 3, 6);
    expect(alice.sends).toBe(2);
    expect(bob.sends).toBe(4);
    expect(alice.key).toBe(9);
    expect(bob.key).toBe(9);
  });

  it("gives both sides the same key whatever they choose", () => {
    for (const modulus of primesUpTo(60).slice(2)) {
      for (let a = 1; a < modulus - 1; a += 3) {
        const { alice, bob } = exchange({ base: 2, modulus }, a, modulus - 2);
        expect(alice.key).toBe(bob.key);
      }
    }
  });

  it("raises big numbers to big powers without losing accuracy", () => {
    // 453^x (mod 21,997) is the book's example of a function too tedious to tabulate.
    expect(modPow(453, 2, 21997)).toBe((453 * 453) % 21997);
    expect(modPow(2, 1_000_000_006, 1_000_000_007)).toBe(1);
  });

  it("knows its primes", () => {
    expect(primesUpTo(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    expect(isPrime(21997)).toBe(true);
    expect(isPrime(187)).toBe(false);
  });

  it("lets Eve find the key by trying every secret when P is small", () => {
    const search = eveSearch({ base: 7, modulus: 11 }, 2, 4);
    expect(search.guesses).toEqual([
      { secret: 1, result: 7 },
      { secret: 2, result: 5 },
      { secret: 3, result: 2 },
    ]);
    expect(search.found).toBe(3);
    expect(search.key).toBe(9);
  });

  // The challenge in story.mdx: Y = 5, P = 23, Alice sends 21, Bob sends 14.
  // The key, 11, is then used as a Caesar shift on the word DAWN.
  it("produces the numbers and the ciphertext of the story's challenge", () => {
    const { alice, bob } = exchange({ base: 5, modulus: 23 }, 13, 21);
    expect([alice.sends, bob.sends, alice.key, bob.key]).toEqual([21, 14, 11, 11]);
    const search = eveSearch({ base: 5, modulus: 23 }, alice.sends, bob.sends);
    expect(search.guesses).toHaveLength(13);
    expect(search.key).toBe(11);
    expect(encipher("DAWN", alice.key)).toBe("OLHY");
    expect(decipher("OLHY", search.key!)).toBe("DAWN");
  });
});

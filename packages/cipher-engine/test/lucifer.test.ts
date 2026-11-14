import { describe, expect, it } from "vitest";
import {
  avalanche,
  blockToText,
  decrypt,
  encrypt,
  flipBit,
  fromHex,
  MAX_ROUNDS,
  roundKeys,
  SBOX,
  scramble,
  textToBlock,
  toBits,
  toHex,
  tryKeyLetters,
} from "../src/lucifer/index.ts";

const KEY = "K".charCodeAt(0);

describe("Toy Feistel network (Lucifer)", () => {
  // Source: FIPS PUB 46-3, Data Encryption Standard, S-box S1, first row.
  it("uses the first row of the first DES S-box, which swaps every 4-bit number for a different one", () => {
    expect(SBOX).toEqual([14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7]);
    expect([...SBOX].sort((a, b) => a - b)).toEqual(Array.from({ length: 16 }, (_, n) => n));
  });

  // Source: The Code Book, Table 13. ASCII for H is 1001000 and for I is 1001001.
  it("turns two letters into sixteen bits", () => {
    expect(toBits(textToBlock("HI"), 16)).toBe("0100100001001001");
    expect(blockToText(textToBlock("HI"))).toBe("HI");
    expect(fromHex(toHex(textToBlock("HI")))).toBe(textToBlock("HI"));
  });

  it("makes one round key per round by turning the key", () => {
    expect(roundKeys(0b01001011, 3).map((key) => toBits(key, 8))).toEqual(["01001011", "10010110", "00101101"]);
  });

  // A fixed vector for this toy, worked by hand for round 1:
  // right half I = 01001001, round key K = 01001011, mixed = 00000010,
  // S-box: 0000 -> 1110 and 0010 -> 1101, turned three places = 01101111.
  // New right = H (01001000) + 01101111 = 00100111, new left = I.
  it("does the first round as worked by hand", () => {
    expect(toBits(scramble(textToBlock("I ") >> 8, KEY), 8)).toBe("01101111");
    const [first] = encrypt(textToBlock("HI"), KEY, 1).rounds;
    expect(first).toEqual({ round: 1, roundKey: 0b01001011, scrambled: 0b01101111, left: 0b01001001, right: 0b00100111 });
  });

  it("enciphers a fixed block the same way every time", () => {
    expect(toHex(encrypt(textToBlock("HI"), KEY, 1).output)).toBe("4927");
    expect(toHex(encrypt(textToBlock("HI"), KEY, 4).output)).toBe("4E7D");
    expect(toHex(encrypt(textToBlock("HI"), KEY, MAX_ROUNDS).output)).toBe("0A68");
  });

  it("deciphers what it enciphers, for every number of rounds", () => {
    for (let rounds = 1; rounds <= MAX_ROUNDS; rounds++) {
      for (let block = 0; block < 65536; block += 257) {
        expect(decrypt(encrypt(block, KEY, rounds).output, KEY, rounds).output).toBe(block);
      }
    }
  });

  it("walks back through the same halves when deciphering", () => {
    const forward = encrypt(textToBlock("HI"), KEY, 5).rounds;
    const back = decrypt(encrypt(textToBlock("HI"), KEY, 5).output, KEY, 5).rounds;
    expect([back[0]!.left, back[0]!.right]).toEqual([forward[3]!.left, forward[3]!.right]);
  });

  it("changes about half the output bits when one input bit is flipped", () => {
    let total = 0;
    let runs = 0;
    for (let block = 0; block < 65536; block += 97) {
      for (let bit = 0; bit < 16; bit++, runs++) total += avalanche(block, KEY, MAX_ROUNDS, bit).at(-1)!;
    }
    expect(total / runs).toBeGreaterThan(7);
    expect(total / runs).toBeLessThan(9);
    expect(avalanche(textToBlock("HI"), KEY, 1, 0)).toEqual([1]);
    expect(flipBit(0, 0)).toBe(0x8000);
  });

  // The challenge in story.mdx: OK enciphered with key letter S and 16 rounds.
  it("produces the ciphertext of the story's challenge", () => {
    const key = "S".charCodeAt(0);
    expect(toHex(encrypt(textToBlock("OK"), key, MAX_ROUNDS).output)).toBe("4FD3");
    expect(blockToText(decrypt(fromHex("4FD3"), key, MAX_ROUNDS).output)).toBe("OK");
    expect(tryKeyLetters(fromHex("4FD3"), MAX_ROUNDS)[18]).toEqual({ letter: "S", reading: "OK" });
  });
});

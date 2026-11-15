import { describe, expect, it } from "vitest";
import { chanceOfCatchingEve, compare, measure, polarise, runFrom, sift, transmit } from "../src/quantum/index.ts";

describe("Quantum key exchange (BB84)", () => {
  // Source: Wikipedia, "Quantum key distribution", the BB84 example table.
  // Alice's bits 01101001 in bases ++x+xxx+, Bob's bases +xxx+x++, shared key 0101.
  // The coins are what Bob's detector read in the four positions where it was the wrong one.
  it("reproduces the published BB84 example", () => {
    const run = runFrom("01101001", "++x+xxx+", "+xxx+x++", "++++++++", "00000000", "00001010");
    const photons = transmit(run, false);
    expect(sift(photons)).toEqual([0, 2, 5, 7]);
    expect(sift(photons).map((i) => photons[i]!.bobBit)).toEqual([0, 1, 0, 1]);
  });

  it("gives Bob Alice's bit whenever his detector matches and nobody listens", () => {
    const run = runFrom("0110", "+x+x", "+x+x", "xxxx", "1111", "1001");
    expect(transmit(run, false).map((photon) => photon.bobBit)).toEqual([0, 1, 1, 0]);
  });

  it("keeps only the positions where the schemes matched", () => {
    const run = runFrom("0110", "++xx", "+x+x", "++++", "0000", "0000");
    expect(sift(transmit(run, false))).toEqual([0, 3]);
  });

  it("reads a coin toss when the detector is the wrong one", () => {
    expect(measure(1, "+", "+", 0)).toBe(1);
    expect(measure(1, "+", "x", 0)).toBe(0);
    expect(polarise(1, "+")).toBe(90);
    expect(polarise(0, "x")).toBe(135);
  });

  it("lets Eve pass unseen when she guesses the scheme, and spoils the bit when she does not", () => {
    // Photon 1: Eve uses Alice's scheme. Photon 2: Eve uses the wrong one, and Bob's coin lands wrong.
    const run = runFrom("11", "++", "++", "+x", "00", "00");
    expect(transmit(run, true).map((photon) => photon.wrong)).toEqual([false, true]);
  });

  it("finds no errors without Eve, however the coins fall", () => {
    const run = runFrom("0111000011100100", "xxxx+x+x++x+x+++", "xxxxx+x+x+x++x+x", "+xx+++x++xx++x++", "1010111001111101", "1001110010010010");
    expect(compare(transmit(run, false))).toMatchObject({ errors: 0, aliceKey: [1, 1, 1, 0], bobKey: [1, 1, 1, 0] });
    expect(compare(transmit(run, true)).errors).toBe(2);
  });

  it("works out the chance of catching Eve", () => {
    expect(chanceOfCatchingEve(1)).toBe(0.25);
    expect(chanceOfCatchingEve(72)).toBeGreaterThan(0.99999999);
  });

  // The three lines in the story's Challenge. Eve listens on north and west; only south is clean.
  it("proves the challenge has one clean line", () => {
    const north = runFrom("1010110100011000", "+++x++x+xx+++x++", "x+x++++++x++x++x", "xxx+xxxx++++++x+", "1111001110011101", "0110100010111010");
    const south = runFrom("0010100011001101", "+x+xx+xxxxxxxxx+", "+xx+xx+++xxxx+xx", "+++xx++xxx+++x+x", "1111101001100101", "1010110010101000");
    const west = runFrom("0011011010110100", "x+xx+++x+++++++x", "x++xxxxx+x++xx++", "++x+xxx+xxxx+++x", "0100001001101111", "1000110100001010");
    expect(compare(transmit(north, true)).errors).toBe(2);
    expect(compare(transmit(south, false)).errors).toBe(0);
    expect(compare(transmit(west, true)).errors).toBe(4);
  });

  // The "lucky" preset: Eve spoils three kept bits, but none of them falls in the sample.
  it("shows Eve slipping past a small sample", () => {
    const run = runFrom("0111111111110011", "+++x++xx+xxxx+++", "++xxx+xx++++xxxx", "+xxxx+x++xxx+x+x", "0111011011101101", "0000010011001010");
    const result = compare(transmit(run, true));
    expect(result.errors).toBe(0);
    expect(result.bobKey).not.toEqual(result.aliceKey);
  });
});

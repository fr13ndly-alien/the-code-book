import { describe, expect, it } from "vitest";
import {
  BOOK_KEY,
  factorKey,
  keyUnder,
  lockMessage,
  modPow,
  open,
  rsaLock,
  rsaUnlock,
  seal,
  sessionKeyFrom,
} from "../src/pgp/index.ts";

describe("PGP (toy)", () => {
  // Source: The Code Book, chapter 5, the worked RSA example:
  // p = 17, q = 11, N = 187, e = 7, d = 23; the letter X (ASCII 88) enciphers to 11.
  it("matches the book's RSA example", () => {
    expect(BOOK_KEY).toMatchObject({ n: 187, e: 7, d: 23 });
    expect(rsaLock(88, BOOK_KEY)).toBe(11);
    expect(rsaUnlock(11, BOOK_KEY)).toBe(88);
  });

  it("raises to a power modulo a number", () => {
    expect(modPow(4, 13, 497)).toBe(445);
  });

  it("locks the message with the session key, letter by letter", () => {
    expect(keyUnder("MEET ME", "QXJM")).toBe("QXJMQX");
    expect(lockMessage("AB CD", "BC")).toBe("BD DF");
    expect(sessionKeyFrom([16, 23, 9, 12])).toBe("QXJM");
  });

  it("lets Bob open what Alice sealed", () => {
    const envelope = seal("MEET ME AT NOON", "QXJM", BOOK_KEY);
    expect(open(envelope, BOOK_KEY)).toEqual({ sessionKey: "QXJM", message: "MEET ME AT NOON" });
  });

  it("lets Eve rebuild a toy private key by factoring N", () => {
    expect(factorKey({ n: 187, e: 7 })).toMatchObject({ p: 11, q: 17, d: 23 });
  });

  // The envelope in the story's Challenge.
  it("produces the challenge envelope", () => {
    const envelope = seal("IT IS OUT ON THE NET", "ZMRK", BOOK_KEY);
    expect(envelope).toEqual({ ciphertext: "HF ZC NGK YM FYO MQK", lockedKey: [95, 121, 91, 114] });
    expect(open(envelope, factorKey({ n: 187, e: 7 })).message).toBe("IT IS OUT ON THE NET");
  });
});

import { indexOfLetter, letterAt, lettersOnly, mapLetters } from "../text/index.ts";

/**
 * Pretty Good Privacy in miniature: a quick symmetric cipher locks the message,
 * and slow RSA locks only that cipher's short key. Every part here is a toy:
 * real PGP used the IDEA cipher and RSA numbers hundreds of digits long.
 */

/** The half of an RSA key that anyone may see. */
export interface PublicKey {
  /** The product of two secret primes. */
  n: number;
  /** The power used to lock a number. */
  e: number;
}

/** A whole RSA key: the public half, the secret primes and the secret power `d`. */
export interface KeyPair extends PublicKey {
  p: number;
  q: number;
  /** The power that undoes `e`. Only the owner knows it. */
  d: number;
}

/** What Alice sends: the locked message and the locked session key. */
export interface Envelope {
  /** The message, enciphered with the session key. */
  ciphertext: string;
  /** The session key, one RSA number per letter. */
  lockedKey: number[];
}

/** base to the power exponent, modulo m, by repeated squaring. Safe while m is below about 90 million. */
export function modPow(base: number, exponent: number, m: number): number {
  let result = 1;
  let square = base % m;
  for (let left = exponent; left > 0; left = Math.floor(left / 2)) {
    if (left % 2 === 1) result = (result * square) % m;
    square = (square * square) % m;
  }
  return result;
}

/** The number d for which (e × d) leaves remainder 1 when divided by phi. Found by trying each in turn. */
function inverse(e: number, phi: number): number {
  for (let d = 1; d < phi; d++) if ((e * d) % phi === 1) return d;
  throw new Error("e shares a factor with (p - 1)(q - 1)");
}

/** Builds an RSA key from two primes and a public power. */
export function makeKeyPair(p: number, q: number, e: number): KeyPair {
  return { p, q, e, n: p * q, d: inverse(e, (p - 1) * (q - 1)) };
}

/**
 * Bob's toy key. Source: The Code Book, chapter 5, the worked RSA example
 * (p = 17, q = 11, N = 187, e = 7, d = 23).
 */
export const BOOK_KEY: KeyPair = makeKeyPair(17, 11, 7);

/** Locks one number with a public key. */
export const rsaLock = (m: number, key: PublicKey) => modPow(m, key.e, key.n);

/** Unlocks one number with the private half of a key. */
export const rsaUnlock = (c: number, key: Pick<KeyPair, "n" | "d">) => modPow(c, key.d, key.n);

/** A session key from numbers chosen at random elsewhere: [16, 23] gives "QX". */
export const sessionKeyFrom = (numbers: number[]) => numbers.map(letterAt).join("");

/** The session key written under the letters of a message, repeated to fit: the toy cipher's working. */
export function keyUnder(text: string, sessionKey: string): string {
  const key = lettersOnly(sessionKey);
  return [...lettersOnly(text)].map((_, i) => key[i % key.length] ?? "A").join("");
}

const shiftBy = (text: string, sessionKey: string, sign: 1 | -1) => {
  const key = lettersOnly(sessionKey) || "A";
  return mapLetters(text, (letter, count) => letterAt(indexOfLetter(letter) + sign * indexOfLetter(key[count % key.length]!)));
};

/** The quick symmetric cipher, a toy: each letter is shifted by the matching letter of the session key. */
export const lockMessage = (text: string, sessionKey: string) => shiftBy(text, sessionKey, 1);

/** Undoes lockMessage with the same session key. */
export const unlockMessage = (ciphertext: string, sessionKey: string) => shiftBy(ciphertext, sessionKey, -1);

/** Each letter of the session key as its ASCII number, the way the book turns X into 88. */
export const keyNumbers = (sessionKey: string) => [...lettersOnly(sessionKey)].map((letter) => letter.charCodeAt(0));

/** Locks the session key with the receiver's public key, one letter at a time. */
export const lockKey = (sessionKey: string, key: PublicKey) => keyNumbers(sessionKey).map((m) => rsaLock(m, key));

/** Unlocks the session key with the receiver's private key. */
export const unlockKey = (lockedKey: number[], key: Pick<KeyPair, "n" | "d">) =>
  lockedKey.map((c) => String.fromCharCode(rsaUnlock(c, key))).join("");

/** Everything Alice does: lock the message with the session key, then the session key with Bob's public key. */
export const seal = (message: string, sessionKey: string, key: PublicKey): Envelope => ({
  ciphertext: lockMessage(message, sessionKey),
  lockedKey: lockKey(sessionKey, key),
});

/** Everything Bob does, in order: unlock the session key, then use it to unlock the message. */
export function open(envelope: Envelope, key: Pick<KeyPair, "n" | "d">) {
  const sessionKey = unlockKey(envelope.lockedKey, key);
  return { sessionKey, message: unlockMessage(envelope.ciphertext, sessionKey) };
}

/**
 * Eve's attack on a toy key: divide N by 2, 3, 4... until something goes in
 * exactly, then rebuild the private key. `tries` counts the divisions.
 */
export function factorKey(key: PublicKey): KeyPair & { tries: number } {
  let p = 2;
  while (key.n % p !== 0) p++;
  return { ...makeKeyPair(p, key.n / p, key.e), tries: p - 1 };
}

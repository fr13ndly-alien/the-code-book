/**
 * The Diffie-Hellman-Merkle key exchange: two people agree on a secret number
 * over a line that anyone can listen to, using the one-way function
 * Y^x (mod P).
 */

/** Remainder of a product, exact even when the product is too big for an ordinary number. */
const multiplyMod = (a: number, b: number, modulus: number) => Number((BigInt(a) * BigInt(b)) % BigInt(modulus));

/** base^exponent (mod modulus), by repeated squaring so that no number ever grows large. */
export function modPow(base: number, exponent: number, modulus: number): number {
  let result = 1 % modulus;
  let square = base % modulus;
  for (let left = exponent; left > 0; left = Math.floor(left / 2)) {
    if (left % 2 === 1) result = multiplyMod(result, square, modulus);
    square = multiplyMod(square, square, modulus);
  }
  return result;
}

/** True if a whole number has no divisors except 1 and itself. */
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let divisor = 2; divisor * divisor <= n; divisor++) if (n % divisor === 0) return false;
  return true;
}

/** Every prime from 2 up to and including a limit. */
export const primesUpTo = (limit: number) => Array.from({ length: limit + 1 }, (_, n) => n).filter(isPrime);

/** The numbers Alice and Bob agree on in the open: the one-way function is base^x (mod modulus). */
export interface PublicNumbers {
  /** The book calls this Y. */
  base: number;
  /** The book calls this P. It should be a prime, and bigger than the base. */
  modulus: number;
}

/** The one-way function Y^x (mod P) for x = 1, 2, 3... up to P - 1, as a table. */
export const powerTable = ({ base, modulus }: PublicNumbers) =>
  Array.from({ length: modulus - 1 }, (_, index) => modPow(base, index + 1, modulus));

/** What one person does in the exchange. */
export interface Party {
  /** The number they choose and tell nobody. */
  secret: number;
  /** Y^secret (mod P): the number they send in the open. */
  sends: number;
  /** (the number they received)^secret (mod P): the key they end up with. */
  key: number;
}

/** A whole exchange, with every number each side works out. */
export interface Exchange {
  alice: Party;
  bob: Party;
}

/** Runs the exchange for two chosen secrets. Both keys always come out the same. */
export function exchange(open: PublicNumbers, aliceSecret: number, bobSecret: number): Exchange {
  const aliceSends = modPow(open.base, aliceSecret, open.modulus);
  const bobSends = modPow(open.base, bobSecret, open.modulus);
  return {
    alice: { secret: aliceSecret, sends: aliceSends, key: modPow(bobSends, aliceSecret, open.modulus) },
    bob: { secret: bobSecret, sends: bobSends, key: modPow(aliceSends, bobSecret, open.modulus) },
  };
}

/** One guess by the eavesdropper: a possible secret and what Y^guess (mod P) comes to. */
export interface Guess {
  secret: number;
  result: number;
}

/** The eavesdropper's search, guess by guess, and the key it leads to if it succeeds. */
export interface Search {
  guesses: Guess[];
  /** A secret that produces the number Alice sent. Missing if no guess worked. */
  found?: number;
  /** The key worked out from that secret and the number Bob sent. */
  key?: number;
}

/**
 * Eve's brute-force attack. She saw Y, P and both numbers that were sent. She
 * tries x = 1, 2, 3... until Y^x (mod P) matches what Alice sent, then uses
 * that x on Bob's number exactly as Alice would.
 */
export function eveSearch(open: PublicNumbers, aliceSent: number, bobSent: number): Search {
  const guesses: Guess[] = [];
  for (let secret = 1; secret < open.modulus; secret++) {
    const result = modPow(open.base, secret, open.modulus);
    guesses.push({ secret, result });
    if (result === aliceSent) return { guesses, found: secret, key: modPow(bobSent, secret, open.modulus) };
  }
  return { guesses };
}

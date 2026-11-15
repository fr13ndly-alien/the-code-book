/**
 * RSA, the first public-key cipher: anyone may encipher with the public
 * numbers N and e, but only someone who knows the primes behind N can work
 * out d and decipher.
 */

/** The greatest number that divides both a and b. */
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * The number d with a x d = 1 (mod modulus), found with Euclid's algorithm as
 * the book's Appendix E suggests. Missing when a and the modulus share a factor.
 */
export function modInverse(a: number, modulus: number): number | undefined {
  let [r, nextR] = [modulus, a % modulus];
  let [t, nextT] = [0, 1];
  while (nextR !== 0) {
    const quotient = Math.floor(r / nextR);
    [r, nextR] = [nextR, r - quotient * nextR];
    [t, nextT] = [nextT, t - quotient * nextT];
  }
  return r === 1 ? ((t % modulus) + modulus) % modulus : undefined;
}

/** Remainder of a product, exact even when the product is too big for an ordinary number. */
const multiplyMod = (a: number, b: number, modulus: number) => Number((BigInt(a) * BigInt(b)) % BigInt(modulus));

/** One line of the squaring trick: base^power (mod N), and whether the exponent needs it. */
export interface Square {
  /** 1, 2, 4, 8... */
  power: number;
  value: number;
  /** True if this power is one of the pieces the exponent is made of, as 7 = 4 + 2 + 1. */
  used: boolean;
}

/** A power worked out the way Appendix E does it, with every step kept. */
export interface PowerSteps {
  base: number;
  exponent: number;
  modulus: number;
  squares: Square[];
  result: number;
}

/**
 * base^exponent (mod modulus) by squaring: work out the base to the powers
 * 1, 2, 4, 8..., then multiply together the ones that add up to the exponent.
 */
export function powerSteps(base: number, exponent: number, modulus: number): PowerSteps {
  const squares: Square[] = [];
  let value = base % modulus;
  let result = 1 % modulus;
  for (let power = 1; power <= exponent; power *= 2) {
    const used = Math.floor(exponent / power) % 2 === 1;
    if (used) result = multiplyMod(result, value, modulus);
    squares.push({ power, value, used });
    value = multiplyMod(value, value, modulus);
  }
  return { base, exponent, modulus, squares, result };
}

/** base^exponent (mod modulus), the answer only. */
export const modPow = (base: number, exponent: number, modulus: number) => powerSteps(base, exponent, modulus).result;

/** A full set of RSA numbers. N and e are public; everything else is private. */
export interface RsaKeys {
  p: number;
  q: number;
  /** N = p x q. */
  n: number;
  /** (p - 1) x (q - 1). */
  phi: number;
  /** The public exponent, used to encipher. */
  e: number;
  /** The private exponent, used to decipher: e x d = 1 (mod phi). */
  d: number;
}

/** The first few values of e that work with these primes: those sharing no factor with (p - 1) x (q - 1). */
export function validExponents(p: number, q: number, howMany = 12): number[] {
  const phi = (p - 1) * (q - 1);
  const found: number[] = [];
  for (let e = 3; e < phi && found.length < howMany; e++) if (gcd(e, phi) === 1) found.push(e);
  return found;
}

/** Builds the keys from two different primes and a chosen e. Missing if e does not work with them. */
export function makeKeys(p: number, q: number, e: number): RsaKeys | undefined {
  const phi = (p - 1) * (q - 1);
  const d = modInverse(e, phi);
  return d === undefined || p === q ? undefined : { p, q, n: p * q, phi, e, d };
}

/** Enciphers a number smaller than N with the public key: C = M^e (mod N). */
export const encipher = (message: number, keys: Pick<RsaKeys, "e" | "n">) => powerSteps(message, keys.e, keys.n);

/** Deciphers a number with the private key: M = C^d (mod N). */
export const decipher = (ciphertext: number, keys: Pick<RsaKeys, "d" | "n">) => powerSteps(ciphertext, keys.d, keys.n);

/** The result of an attack on N by trial division. */
export interface Factoring {
  /** How many divisions were tried. */
  tries: number;
  /** The last number tried. */
  lastTried: number;
  /** The smaller and the larger factor. Missing if N turned out to be prime. */
  factors?: [number, number];
}

/**
 * The attacker's method: divide N by 2, then 3, 5, 7, 9... until something
 * goes in exactly. The work grows with the smaller prime.
 */
export function factor(n: number): Factoring {
  let tries = 0;
  let lastTried = 1;
  for (let divisor = 2; divisor * divisor <= n; divisor += divisor === 2 ? 1 : 2) {
    tries++;
    lastTried = divisor;
    if (n % divisor === 0) return { tries, lastTried, factors: [divisor, n / divisor] };
  }
  return { tries, lastTried };
}

/** The attack carried through: factor N, then rebuild the private key from the public one. */
export function crack(n: number, e: number): { factoring: Factoring; keys?: RsaKeys } {
  const factoring = factor(n);
  const [p, q] = factoring.factors ?? [0, 0];
  return { factoring, keys: factoring.factors ? makeKeys(p, q, e) : undefined };
}

/**
 * Digital signatures in miniature: Alice locks a short digest of her message
 * with her private RSA key, and anyone can check it with her public key.
 * The key and the digest are toys, small enough to follow by eye.
 */

/** The half of an RSA key that anyone may see. */
export interface PublicKey {
  /** The product of two secret primes. */
  n: number;
  /** The power used to check a signature. */
  e: number;
}

/** A whole RSA key: the public half, the secret primes and the secret power `d`. */
export interface KeyPair extends PublicKey {
  p: number;
  q: number;
  /** The power used to sign. Only the owner knows it. */
  d: number;
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

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Builds an RSA key from two primes and a public power. d is the smallest power that undoes e. */
export function makeKeyPair(p: number, q: number, e: number): KeyPair {
  const cycle = ((p - 1) * (q - 1)) / gcd(p - 1, q - 1);
  for (let d = 1; d < cycle; d++) if ((e * d) % cycle === 1) return { p, q, e, n: p * q, d };
  throw new Error("e shares a factor with p - 1 or q - 1");
}

/**
 * Alice's toy key. Source: the worked example in Wikipedia, "RSA cryptosystem"
 * (p = 61, q = 53, n = 3233, e = 17, d = 413).
 */
export const TOY_KEY: KeyPair = makeKeyPair(61, 53, 17);

/** The working of the toy digest, so a page can show every step. */
export interface DigestWorking {
  /** The letters and digits of the message. Spaces and punctuation are left out. */
  symbols: string[];
  /** The ASCII number of each symbol. */
  codes: number[];
  /** All the codes added up. */
  sum: number;
  /** The remainder of the sum after dividing by n: the digest. */
  digest: number;
}

/**
 * A toy stand-in for a real hash function: add up the ASCII numbers of the
 * letters and digits, and keep the remainder after dividing by n.
 */
export function digestWorking(message: string, n: number): DigestWorking {
  const symbols = [...message.toUpperCase().replace(/[^A-Z0-9]/g, "")];
  const codes = symbols.map((symbol) => symbol.charCodeAt(0));
  const sum = codes.reduce((total, code) => total + code, 0);
  return { symbols, codes, sum, digest: sum % n };
}

/** The toy digest of a message: one small number that stands for all of it. */
export const digest = (message: string, n: number) => digestWorking(message, n).digest;

/** Signs a digest: raises it to the private power. */
export const signNumber = (value: number, key: Pick<KeyPair, "n" | "d">) => modPow(value, key.d, key.n);

/** Opens a signature with the public key, giving back the digest that was signed. */
export const openSignature = (signature: number, key: PublicKey) => modPow(signature, key.e, key.n);

/** Alice's signature on a message: the digest, locked with her private key. */
export const sign = (message: string, key: Pick<KeyPair, "n" | "d">) => signNumber(digest(message, key.n), key);

/** Bob's check, with its working: the digest he computes, the one inside the signature, and whether they agree. */
export function verify(message: string, signature: number, key: PublicKey) {
  const computed = digest(message, key.n);
  const opened = openSignature(signature, key);
  return { computed, opened, valid: computed === opened };
}

/**
 * A forger without the private key tries 0, 1, 2... as the signature until one
 * passes the check. Possible only because the toy n is tiny.
 */
export function forge(message: string, key: PublicKey): { signature: number; tries: number } {
  let signature = 0;
  while (!verify(message, signature, key).valid) signature++;
  return { signature, tries: signature + 1 };
}

/**
 * A toy Feistel network, the design Horst Feistel used for Lucifer and DES.
 * It is NOT real DES: the block is 16 bits instead of 64, the key 8 bits
 * instead of 56, and the round function is far simpler. The shape is the same:
 * split the block in half, scramble one half with the key, add it to the
 * other half, swap, and repeat.
 */

/** Width of one half of a block, in bits. */
export const HALF_BITS = 8;

/** Width of a whole block, in bits. */
export const BLOCK_BITS = 16;

/** The most rounds the toy allows: the number DES uses. */
export const MAX_ROUNDS = 16;

/**
 * A 4-bit substitution box: entry n is what the 4-bit number n turns into.
 * Source: FIPS PUB 46-3 (Data Encryption Standard), S-box S1, first row.
 */
export const SBOX = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7];

const HALF_MASK = 0xff;

/** A number as a string of binary digits: toBits(5, 8) is "00000101". */
export const toBits = (value: number, width: number) => value.toString(2).padStart(width, "0");

/** A block as four hexadecimal digits: toHex(72 * 256 + 73) is "4849". */
export const toHex = (block: number) => block.toString(16).toUpperCase().padStart(4, "0");

/** Reads up to four hexadecimal digits as a block. Anything that is not a hex digit is skipped. */
export const fromHex = (text: string) => parseInt(text.replace(/[^0-9a-f]/gi, "").slice(0, 4) || "0", 16);

/** Two characters as a 16-bit block, eight bits each. Short text is filled with spaces. */
export function textToBlock(text: string): number {
  const [first, second] = [...text.padEnd(2, " ")].map((char) => char.charCodeAt(0) & HALF_MASK);
  return (first! << HALF_BITS) | second!;
}

/** A block as two characters. Codes that are not printable ASCII are drawn as a dot. */
export const blockToText = (block: number) =>
  [block >> HALF_BITS, block & HALF_MASK].map((code) => (code >= 32 && code <= 126 ? String.fromCharCode(code) : "·")).join("");

/** Turns an 8-bit number left by some places; bits that fall off the front return at the back. */
const rotateLeft = (half: number, places: number) => {
  const by = places % HALF_BITS;
  return ((half << by) | (half >> (HALF_BITS - by))) & HALF_MASK;
};

/** The key for each round: the main key turned one more place to the left every round. */
export const roundKeys = (key: number, rounds: number) =>
  Array.from({ length: rounds }, (_, round) => rotateLeft(key & HALF_MASK, round));

/**
 * The round function, which the book calls the mangler: mix a half with the
 * round key, swap each group of four bits through the S-box, then turn the
 * result three places so that the two groups spill into each other.
 */
export function scramble(half: number, roundKey: number): number {
  const mixed = (half ^ roundKey) & HALF_MASK;
  const swapped = (SBOX[mixed >> 4]! << 4) | SBOX[mixed & 0xf]!;
  return rotateLeft(swapped, 3);
}

/** What one round did, and the two halves it left behind. */
export interface FeistelRound {
  /** Counts from 1. */
  round: number;
  roundKey: number;
  /** The right half after the round function: what was added to the left half. */
  scrambled: number;
  left: number;
  right: number;
}

/** A whole run of the cipher, with every round written down. */
export interface FeistelTrace {
  input: number;
  output: number;
  rounds: FeistelRound[];
}

/** Runs one round per key: the old right half becomes the new left, and left + scrambled right the new right. */
function runRounds(input: number, keys: number[]): FeistelTrace {
  let left = input >> HALF_BITS;
  let right = input & HALF_MASK;
  const rounds = keys.map((roundKey, index) => {
    const scrambled = scramble(right, roundKey);
    [left, right] = [right, left ^ scrambled];
    return { round: index + 1, roundKey, scrambled, left, right };
  });
  return { input, output: (left << HALF_BITS) | right, rounds };
}

/** Swaps the two halves of a block. */
const swapHalves = (block: number) => ((block & HALF_MASK) << HALF_BITS) | (block >> HALF_BITS);

/** Enciphers a 16-bit block with an 8-bit key, and returns every round. */
export const encrypt = (block: number, key: number, rounds: number): FeistelTrace =>
  runRounds(block, roundKeys(key, rounds));

/**
 * Deciphers a block: the very same rounds, with the round keys in reverse
 * order. The halves are swapped going in and coming out, because the last
 * round of enciphering left them swapped.
 */
export function decrypt(block: number, key: number, rounds: number): FeistelTrace {
  const trace = runRounds(swapHalves(block), roundKeys(key, rounds).reverse());
  const unswapped = trace.rounds.map((step) => ({ ...step, left: step.right, right: step.left }));
  return { input: block, output: swapHalves(trace.output), rounds: unswapped };
}

/** The block with one bit flipped. Bit 0 is the leftmost. */
export const flipBit = (block: number, bit: number) => block ^ (1 << (BLOCK_BITS - 1 - bit));

/** How many bits differ between two blocks. */
export const countDifferentBits = (a: number, b: number) => toBits(a ^ b, BLOCK_BITS).replaceAll("0", "").length;

/**
 * The avalanche test: encipher a block and the same block with one bit
 * flipped, and count the bits that differ after each round.
 */
export function avalanche(block: number, key: number, rounds: number, bit: number): number[] {
  const plain = encrypt(block, key, rounds).rounds;
  const flipped = encrypt(flipBit(block, bit), key, rounds).rounds;
  const join = (step: FeistelRound) => (step.left << HALF_BITS) | step.right;
  return plain.map((step, index) => countDifferentBits(join(step), join(flipped[index]!)));
}

/** The capital letters a key may be on the page, and that a brute-force search runs through. */
const KEY_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** The brute-force attack on the toy: deciphers a block with every key letter from A to Z. */
export const tryKeyLetters = (block: number, rounds: number) =>
  [...KEY_LETTERS].map((letter) => ({ letter, reading: blockToText(decrypt(block, letter.charCodeAt(0), rounds).output) }));

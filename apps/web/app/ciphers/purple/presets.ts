import {
  PART_1_CIPHERTEXT,
  PART_1_PLAINTEXT,
  PART_1_SETTINGS,
  VOWEL_PLUGBOARD,
} from "@codebook/cipher-engine/purple";
import type { PurpleState } from "./usePurple";

/** A machine with the vowels as the sixes and every switch at 1, enciphering. */
const plain: PurpleState = {
  text: "THE GOVERNMENT OF JAPAN",
  mode: "encipher",
  plugboard: VOWEL_PLUGBOARD,
  start: [0, 0, 0, 0],
  motion: "123",
  picked: 0,
  view: "machine",
  sixesFirst: false,
};

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, PurpleState> = {
  /** Four words from the real message of 7 December 1941. The page starts here. */
  start: plain,

  /** Nothing but vowels, to see that they only ever turn into vowels. */
  vowels: { ...plain, text: "AEIOUY AEIOUY AEIOUY" },

  /** The first vowel of the message, on its short path through one switch. */
  sixes: { ...plain, picked: 2 },

  /** The sixes switch two letters from its last position, and switch II on its last: all three speeds in four letters. */
  stepping: { ...plain, text: "PEACE", start: [22, 0, 24, 0] },

  /** A long ciphertext made on this page from the real plaintext, ready to count. */
  counted: { ...plain, text: PART_1_PLAINTEXT, view: "count" },

  /** The real intercept of 7 December 1941, with the real settings, being deciphered. */
  intercept: { ...plain, ...PART_1_SETTINGS, text: PART_1_CIPHERTEXT, mode: "decipher", picked: 104 },

  /** The same intercept, counted. That day the sixes were N O K T Y U. */
  interceptCount: { ...plain, ...PART_1_SETTINGS, text: PART_1_CIPHERTEXT, mode: "decipher", view: "count" },

  /** The challenge: a short ciphertext. The reader must set the switches and their speeds. */
  challenge: { ...plain, text: "LUDOT", mode: "decipher" },
};

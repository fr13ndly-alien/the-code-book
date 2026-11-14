import { indexOfLetter, letterAt, lettersOnly, mapLetters } from "../text/index.ts";

/**
 * Key escrow with toy parts: a four-letter key for a Vigenère-style cipher is
 * split into two halves, one for each of two agencies. Neither half alone says
 * anything about the key. Real escrowed keys were long binary numbers; the
 * idea of the split is the same.
 */

/** Every toy key has this many letters. */
export const KEY_LENGTH = 4;

/** The two halves of a lodged key, one per agency. */
export interface Halves {
  one: string;
  two: string;
}

/** Which of the two agencies' halves somebody holds. */
export interface Held {
  one: boolean;
  two: boolean;
}

/** Everything about one escrowed conversation and the people trying to read it. */
export interface EscrowState {
  /** The key Alice lodged with the two agencies. */
  key: string;
  /** The random letters that became half one when the key was lodged. The view makes them. */
  random: string;
  /** What Alice writes to Bob. */
  message: string;
  /** False when the sender uses a cipher of their own, with `ownKey`, which was never lodged. */
  escrowed: boolean;
  ownKey: string;
  /** Whether a judge has given the police a warrant. */
  warrant: boolean;
  /** The halves the agencies have handed to the police. */
  released: Held;
  /** The halves that have leaked or been stolen, and are now with a thief. */
  stolen: Held;
}

/** What somebody outside the conversation has, and what they can make of the message. */
export interface Reading {
  /** The halves in their hands, or null for one they lack. */
  one: string | null;
  two: string | null;
  /** The key rebuilt from both halves, or null without both. */
  key: string | null;
  /** The best they can do: the plaintext, nonsense from a wrong key, or the bare ciphertext. */
  text: string;
  canRead: boolean;
}

/** A key the cipher can use: exactly four letters, padded with A if too few were typed. */
export const cleanKey = (text: string) => (lettersOnly(text) + "A".repeat(KEY_LENGTH)).slice(0, KEY_LENGTH);

/** Adds (or with -1 takes away) two rows of letters, place by place, wrapping round the alphabet. */
const combine = (a: string, b: string, sign: 1 | -1) =>
  [...a].map((letter, place) => letterAt(indexOfLetter(letter) + sign * indexOfLetter(b[place] ?? "A"))).join("");

/**
 * Splits a key in two. Half one is the random letters themselves; half two is
 * the key minus half one, letter by letter. `random` must be four letters
 * chosen by chance: a missing letter counts as A, which hides nothing.
 */
export function split(key: string, random: string): Halves {
  const one = cleanKey(random);
  return { one, two: combine(cleanKey(key), one, -1) };
}

/** Rebuilds a key from its two halves by adding them letter by letter. */
export const join = (one: string, two: string) => combine(cleanKey(one), cleanKey(two), 1);

/** The other half that would turn `half` into `key`. There is one for every key: that is why one half tells nothing. */
export const otherHalfFor = (key: string, half: string) => combine(cleanKey(key), cleanKey(half), -1);

const shift = (text: string, key: string, sign: 1 | -1) => {
  const letters = cleanKey(key);
  return mapLetters(text, (letter, count) => letterAt(indexOfLetter(letter) + sign * indexOfLetter(letters[count % KEY_LENGTH]!)));
};

/** Enciphers with the toy cipher: each letter moves on by the key letter above it, as in Vigenère. */
export const encipher = (text: string, key: string) => shift(text, key, 1);

/** Deciphers what `encipher` made with the same key. */
export const decipher = (text: string, key: string) => shift(text, key, -1);

/** The key that really locks the message: the lodged one, or the sender's own. */
export const keyInUse = (state: EscrowState) => cleanKey(state.escrowed ? state.key : state.ownKey);

/** The message as it travels, where anyone can copy it. */
export const ciphertext = (state: EscrowState) => encipher(state.message, keyInUse(state));

/** The halves as the two agencies store them. */
export const lodged = (state: EscrowState) => split(state.key, state.random);

/** What a person holding these halves can make of the message. */
export function readWith(state: EscrowState, held: Held): Reading {
  const halves = lodged(state);
  const one = held.one ? halves.one : null;
  const two = held.two ? halves.two : null;
  const sent = ciphertext(state);
  if (one !== null && two !== null) {
    const key = join(one, two);
    return { one, two, key, text: decipher(sent, key), canRead: key === keyInUse(state) };
  }
  // With a single half, the only thing to try is the half itself. It is as good as any other guess.
  const guess = one ?? two;
  return { one, two, key: null, text: guess === null ? sent : decipher(sent, guess), canRead: false };
}

/** What the police can read: only the halves released to them count, and only while the warrant stands. */
export const whatPoliceCanRead = (state: EscrowState) =>
  readWith(state, state.warrant ? state.released : { one: false, two: false });

/** What a thief can read from the halves that leaked or were stolen. No warrant is needed for that. */
export const whatThiefCanRead = (state: EscrowState) => readWith(state, state.stolen);

/** An agency hands its half to the police, but only if there is a warrant. */
export function release(state: EscrowState, agency: keyof Held): EscrowState {
  if (!state.warrant) return state;
  return { ...state, released: { ...state.released, [agency]: true } };
}

/** A judge gives or takes back the warrant. Taking it back takes the released halves back too. */
export const setWarrant = (state: EscrowState, warrant: boolean): EscrowState => ({
  ...state,
  warrant,
  released: warrant ? state.released : { one: false, two: false },
});

/** Everyone who can read the message right now, senders first. */
export function whoCanRead(state: EscrowState): string[] {
  const readers = ["Alice", "Bob"];
  if (whatPoliceCanRead(state).canRead) readers.push("the police");
  if (whatThiefCanRead(state).canRead) readers.push("a thief");
  return readers;
}

/** One line of the proof that a single half tells nothing: a key somebody might suspect, and the half that would make it. */
export interface Possibility {
  key: string;
  otherHalf: string;
}

/** For each suspected key, the missing half that would fit it. Every key has one. */
export const possibilities = (half: string, suspects: string[]): Possibility[] =>
  suspects.map((suspect) => ({ key: cleanKey(suspect), otherHalf: otherHalfFor(suspect, half) }));

/** How many keys the toy cipher has: 26 to the power 4. */
export const KEY_COUNT = 26 ** KEY_LENGTH;

/**
 * Words on the watch list of the toy scanner.
 * Source: The Code Book, chapter 6, which gives these three as examples from the Echelon dictionary.
 */
export const WATCH_WORDS = ["HEZBOLLAH", "ASSASSIN", "PENTAGON"];

/** The watch-list words found in each message. A scanner like Echelon sets aside any message with at least one. */
export const scan = (messages: string[], words: string[] = WATCH_WORDS): string[][] =>
  messages.map((message) => words.filter((word) => message.toUpperCase().includes(word)));

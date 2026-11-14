import { useReducer } from "react";
import { MAX_KEY_LENGTH, applyKey, keywordFromShifts, slices } from "@codebook/cipher-engine/babbage";
import { decipher } from "@codebook/cipher-engine/caesar";
import { CRYPTOGRAMS, isSolved } from "@codebook/cipher-engine/codebreakers-challenge";
import {
  assign,
  guessByRank,
  partialText,
  read,
  unassign,
  type Guesses,
} from "@codebook/cipher-engine/frequency-analysis";
import { mod } from "@codebook/cipher-engine/text";

/** Everything the challenge page remembers: the reader's work on all four cryptograms. */
export interface ChallengeState {
  /** The cryptogram on the bench, counting from 0. */
  current: number;
  /** The shift being tried on each cryptogram. Only the Caesar ones use theirs. */
  shifts: number[];
  /** Cryptogram 3: the reader's working key, cipher letter to plain letter. */
  guesses: Guesses;
  /** Cryptogram 3: the cipher letter being worked on, if any. */
  picked?: string;
  /** Cryptogram 4: the reader's guess at the length of the keyword. */
  keyLength: number;
  /** Cryptogram 4: the guess at each key letter, as a shift: 0 is A. */
  keyShifts: number[];
  /** Cryptogram 4: which key letter the chart shows, counting from 0. */
  position: number;
  /** Cryptogram 4: the row of the repeats table the reader tapped, if any. */
  repeat?: number;
  /** Which cryptograms have been read. Once solved, a cryptogram stays solved. */
  solved: boolean[];
}

export type ChallengeAction =
  | { type: "open"; cryptogram: number }
  | { type: "turn"; by: number }
  | { type: "choose"; shift: number }
  | { type: "pick"; cipher: string }
  | { type: "assign"; plain: string }
  | { type: "rubOut" }
  | { type: "rubOutAll" }
  | { type: "guessByRank" }
  | { type: "resize"; by: number }
  | { type: "move"; by: number }
  | { type: "slide"; by: number }
  | { type: "pickRepeat"; row: number }
  | { type: "load"; preset: Partial<ChallengeState> };

/** The cryptogram on the bench. */
export const currentCryptogram = (state: ChallengeState) => CRYPTOGRAMS[state.current]!;

/** Tries a shift on the Caesar cryptogram on the bench. */
const withShift = (state: ChallengeState, shift: number): ChallengeState => ({
  ...state,
  shifts: state.shifts.map((old, at) => (at === state.current ? mod(shift, 26) : old)),
});

/** A new guess at the key length throws away the key letters found so far. */
function resize(state: ChallengeState, by: number): ChallengeState {
  const keyLength = Math.max(2, Math.min(state.keyLength + by, MAX_KEY_LENGTH));
  return { ...state, keyLength, keyShifts: new Array<number>(keyLength).fill(0), position: 0 };
}

/** Slides the alphabet of the key letter in view. */
const slide = (state: ChallengeState, by: number): ChallengeState => ({
  ...state,
  keyShifts: state.keyShifts.map((old, at) => (at === state.position ? mod(old + by, 26) : old)),
});

function act(state: ChallengeState, action: ChallengeAction): ChallengeState {
  switch (action.type) {
    case "open":
      return { ...state, current: action.cryptogram };
    case "turn":
      return withShift(state, state.shifts[state.current]! + action.by);
    case "choose":
      return withShift(state, action.shift);
    case "pick":
      return { ...state, picked: action.cipher === state.picked ? undefined : action.cipher };
    case "assign":
      return state.picked ? { ...state, guesses: assign(state.guesses, state.picked, action.plain) } : state;
    case "rubOut":
      return state.picked ? { ...state, guesses: unassign(state.guesses, state.picked) } : state;
    case "rubOutAll":
      return { ...state, guesses: {} };
    case "guessByRank":
      return { ...state, guesses: guessByRank(currentCryptogram(state).ciphertext) };
    case "resize":
      return resize(state, action.by);
    case "move":
      return { ...state, position: mod(state.position + action.by, state.keyLength) };
    case "slide":
      return slide(state, action.by);
    case "pickRepeat":
      return { ...state, repeat: action.row === state.repeat ? undefined : action.row };
    case "load":
      return { ...state, ...action.preset };
  }
}

/** The cryptogram on the bench as the reader's work so far reads it. */
export function reading(state: ChallengeState): string {
  const cryptogram = currentCryptogram(state);
  switch (cryptogram.kind) {
    case "caesar":
      return decipher(cryptogram.ciphertext, state.shifts[state.current]!);
    case "substitution":
      return partialText(cryptogram.ciphertext, state.guesses);
    case "vigenere":
      return applyKey(cryptogram.ciphertext, state.keyShifts);
  }
}

/** The reading to check against the answer. Unsolved substitution letters are left out, so they cannot pass by luck. */
function attempt(state: ChallengeState): string {
  const cryptogram = currentCryptogram(state);
  if (cryptogram.kind !== "substitution") return reading(state);
  return read(cryptogram.ciphertext, state.guesses)
    .map(({ plain }) => plain ?? "")
    .join("");
}

/** Records the cryptogram on the bench as solved the moment its reading is right. */
function markSolved(state: ChallengeState): ChallengeState {
  if (state.solved[state.current] || !isSolved(currentCryptogram(state), attempt(state))) return state;
  return { ...state, solved: state.solved.map((done, at) => done || at === state.current) };
}

const reduce = (state: ChallengeState, action: ChallengeAction) => markSolved(act(state, action));

/** Whether the cryptogram on the bench has been solved. */
export const currentIsSolved = (state: ChallengeState) => state.solved[state.current] === true;

/** Cryptogram 4: the letters that the key letter in view enciphered. */
export const currentSlice = (state: ChallengeState) =>
  slices(currentCryptogram(state).ciphertext, state.keyLength)[state.position]!;

/** Cryptogram 4: the keyword the reader's shifts spell so far. */
export const keyword = (state: ChallengeState) => keywordFromShifts(state.keyShifts);

/** The state of the challenge page and the way to change it. */
export const useCodebreakersChallenge = (start: ChallengeState) => useReducer(reduce, start);

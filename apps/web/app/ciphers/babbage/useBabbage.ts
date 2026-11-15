import { useReducer } from "react";
import { MAX_KEY_LENGTH, applyKey, bestShift, keywordFromShifts, slices } from "@codebook/cipher-engine/babbage";
import { mod } from "@codebook/cipher-engine/text";

/** The two halves of the attack: find the length of the keyword, then its letters. */
export type Stage = "length" | "letters";

/** Everything the Babbage page remembers. */
export interface BabbageState {
  /** The intercepted message, letters only. */
  ciphertext: string;
  stage: Stage;
  /** The reader's guess at the length of the keyword. */
  keyLength: number;
  /** The reader's guess at each key letter, as a shift: 0 is A. One entry per key letter. */
  shifts: number[];
  /** Which key letter the chart is showing, counting from 0. */
  position: number;
  /** The row of the repeats table the reader tapped, if any. */
  picked?: number;
}

export type BabbageAction =
  | { type: "view"; stage: Stage }
  | { type: "resize"; by: number }
  | { type: "move"; by: number }
  | { type: "slide"; by: number }
  | { type: "solve" }
  | { type: "pick"; row: number }
  | { type: "load"; preset: BabbageState };

/** A new guess at the key length throws away the key letters found so far. */
function resize(state: BabbageState, by: number): BabbageState {
  const keyLength = Math.max(2, Math.min(state.keyLength + by, MAX_KEY_LENGTH));
  return { ...state, keyLength, shifts: new Array<number>(keyLength).fill(0), position: 0 };
}

const withShift = (state: BabbageState, shift: number): BabbageState => ({
  ...state,
  shifts: state.shifts.map((old, at) => (at === state.position ? mod(shift, 26) : old)),
});

function reduce(state: BabbageState, action: BabbageAction): BabbageState {
  switch (action.type) {
    case "view":
      return { ...state, stage: action.stage };
    case "resize":
      return resize(state, action.by);
    case "move":
      return { ...state, position: mod(state.position + action.by, state.keyLength) };
    case "slide":
      return withShift(state, state.shifts[state.position]! + action.by);
    case "solve":
      return withShift(state, bestShift(currentSlice(state)));
    case "pick":
      return { ...state, picked: action.row === state.picked ? undefined : action.row };
    case "load":
      return action.preset;
  }
}

/** The letters of the ciphertext that the key letter in view enciphered. */
export const currentSlice = (state: BabbageState) => slices(state.ciphertext, state.keyLength)[state.position]!;

/** The keyword the reader's shifts spell so far. */
export const keyword = (state: BabbageState) => keywordFromShifts(state.shifts);

/** The ciphertext deciphered with the reader's shifts so far. */
export const plaintext = (state: BabbageState) => applyKey(state.ciphertext, state.shifts);

/** The state of the Babbage page and the way to change it. */
export const useBabbage = (start: BabbageState) => useReducer(reduce, start);

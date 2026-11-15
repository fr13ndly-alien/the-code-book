import { useReducer } from "react";
import {
  decipher,
  encipher,
  keyText,
  lettersOf,
  numberedWords,
  numbersOf,
  parseNumbers,
  type Step,
} from "@codebook/cipher-engine/beale";

/** Whether the reader is turning letters into numbers or numbers into letters. */
export type Mode = "encipher" | "decipher";

/** Everything the Beale page remembers. */
export interface BealeState {
  /** Which key text is on the table: an id from the engine's KEY_TEXTS. */
  keyId: string;
  mode: Mode;
  /** What the reader typed: a message when enciphering, numbers when deciphering. */
  text: string;
  /** Decides which of a letter's many numbers is used when enciphering. */
  seed: number;
  /** The word number the reader highlighted, if any. */
  picked?: number;
}

export type BealeAction =
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "choose"; keyId: string }
  | { type: "redraw" }
  | { type: "pick"; number: number }
  | { type: "load"; preset: BealeState };

/** The numbered words of the key text on the table. */
export const wordsOf = (state: BealeState) => numberedWords(keyText(state.keyId).text);

/** The message, one step per letter: each number with the letter it stands for. */
export const stepsOf = (state: BealeState): Step[] =>
  state.mode === "encipher"
    ? encipher(state.text, wordsOf(state), state.seed)
    : decipher(parseNumbers(state.text), wordsOf(state));

/** The text the cipher produces from what the reader typed. */
export const output = (state: BealeState) =>
  state.mode === "encipher" ? numbersOf(stepsOf(state)) : lettersOf(stepsOf(state));

function reduce(state: BealeState, action: BealeAction): BealeState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "switch":
      // What was just produced becomes the thing to work on, so a reader can go there and back.
      return state.mode === action.mode ? state : { ...state, mode: action.mode, text: output(state) };
    case "choose":
      return { ...state, keyId: action.keyId, picked: undefined };
    case "redraw":
      return { ...state, seed: state.seed + 1 };
    case "pick":
      return { ...state, picked: action.number === state.picked ? undefined : action.number };
    case "load":
      return action.preset;
  }
}

/** The state of the Beale page and the way to change it. */
export const useBeale = (start: BealeState) => useReducer(reduce, start);

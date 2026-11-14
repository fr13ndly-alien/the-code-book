import { useReducer } from "react";
import { decipher, encipher, makeTable, numbersOf, plainOf, type Step } from "@codebook/cipher-engine/homophonic";

/** Whether the reader is turning letters into numbers or numbers back into letters. */
export type Mode = "encipher" | "decipher";

/** Everything the homophonic page remembers. */
export interface HomophonicState {
  mode: Mode;
  /** Plaintext when enciphering, a run of two-digit numbers when deciphering. */
  text: string;
  /** Which table of numbers is the key. */
  table: number;
  /** Decides which of a letter's numbers is picked each time. */
  picks: number;
  /** The number the reader tapped, if any. */
  picked?: string;
}

export type HomophonicAction =
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "deal"; by: number }
  | { type: "roll"; by: number }
  | { type: "pick"; number: string }
  | { type: "load"; preset: HomophonicState };

/** The message on the page, letter by letter, each with its number. */
export const stepsOf = (state: HomophonicState): Step[] => {
  const table = makeTable(state.table);
  return state.mode === "encipher" ? encipher(state.text, table, state.picks) : decipher(state.text, table);
};

/** Carries the message across when the reader changes direction. */
function switchTo(state: HomophonicState, mode: Mode): HomophonicState {
  if (mode === state.mode) return state;
  const steps = stepsOf(state);
  return { ...state, mode, text: mode === "decipher" ? numbersOf(steps) : plainOf(steps) };
}

function reduce(state: HomophonicState, action: HomophonicAction): HomophonicState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "switch":
      return switchTo(state, action.mode);
    case "deal":
      // A new table gives every number a new meaning, so the old pick means nothing.
      return { ...state, table: Math.max(1, state.table + action.by), picked: undefined };
    case "roll":
      return { ...state, picks: Math.max(1, state.picks + action.by) };
    case "pick":
      return { ...state, picked: action.number === state.picked ? undefined : action.number };
    case "load":
      return action.preset;
  }
}

/** The state of the homophonic page and the way to change it. */
export const useHomophonic = (start: HomophonicState) => useReducer(reduce, start);

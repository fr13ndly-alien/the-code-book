import { useReducer } from "react";

/** Everything the pigpen page remembers. */
export interface PigpenState {
  /** The message, in ordinary letters. */
  text: string;
  /** True when the letters under the symbols are hidden, as for someone reading a secret note. */
  hidden: boolean;
  /** The letter whose symbol the reader tapped, if any. */
  picked?: string;
}

export type PigpenAction =
  | { type: "type"; text: string }
  | { type: "pick"; letter: string }
  | { type: "reveal" }
  | { type: "load"; preset: PigpenState };

function reduce(state: PigpenState, action: PigpenAction): PigpenState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "pick":
      return { ...state, picked: action.letter === state.picked ? undefined : action.letter };
    case "reveal":
      return { ...state, hidden: false };
    case "load":
      return action.preset;
  }
}

/** The state of the pigpen page and the way to change it. */
export const usePigpen = (start: PigpenState) => useReducer(reduce, start);

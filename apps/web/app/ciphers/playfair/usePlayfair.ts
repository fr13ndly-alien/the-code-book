import { useReducer } from "react";
import { trace, type Direction, type PlayfairStep } from "@codebook/cipher-engine/playfair";

/** Everything the Playfair page remembers. */
export interface PlayfairState {
  keyword: string;
  mode: Direction;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** Which pair of letters the square is showing, counting from 0. */
  position: number;
}

export type PlayfairAction =
  | { type: "type"; text: string }
  | { type: "rekey"; keyword: string }
  | { type: "switch"; mode: Direction }
  | { type: "step"; by: number }
  | { type: "pick"; position: number }
  | { type: "load"; preset: PlayfairState };

/** The working for every pair of the message as it stands. */
export const steps = (state: PlayfairState): PlayfairStep[] => trace(state.text, state.keyword, state.mode);

/** The text the cipher produces, written in pairs. */
export const output = (state: PlayfairState) =>
  steps(state)
    .map((step) => (state.mode === "encipher" ? step.cipher : step.plain))
    .join(" ");

const clamp = (position: number, state: PlayfairState) => Math.max(0, Math.min(position, steps(state).length - 1));

function reduce(state: PlayfairState, action: PlayfairAction): PlayfairState {
  switch (action.type) {
    // A new message, keyword or direction starts again from the first pair.
    case "type":
      return { ...state, text: action.text, position: 0 };
    case "rekey":
      return { ...state, keyword: action.keyword, position: 0 };
    case "switch":
      return { ...state, mode: action.mode, position: 0 };
    case "step":
      return { ...state, position: clamp(state.position + action.by, state) };
    case "pick":
      return { ...state, position: clamp(action.position, state) };
    case "load":
      return action.preset;
  }
}

/** The state of the Playfair page and the way to change it. */
export const usePlayfair = (start: PlayfairState) => useReducer(reduce, start);

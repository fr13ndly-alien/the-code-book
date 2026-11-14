import { useReducer } from "react";
import { trace, type Direction, type VigenereStep } from "@codebook/cipher-engine/vigenere";

/** Everything the Vigenère page remembers. */
export interface VigenereState {
  keyword: string;
  mode: Direction;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** Which letter of the message the square is showing, counting from 0. */
  position: number;
}

export type VigenereAction =
  | { type: "type"; text: string }
  | { type: "rekey"; keyword: string }
  | { type: "switch"; mode: Direction }
  | { type: "step"; by: number }
  | { type: "pick"; position: number }
  | { type: "load"; preset: VigenereState };

/** The working for every letter of the message as it stands. */
export const steps = (state: VigenereState): VigenereStep[] => trace(state.text, state.keyword, state.mode);

/** The text the cipher produces, in blocks of five letters. */
export function output(state: VigenereState): string {
  const letters = steps(state).map((step) => (state.mode === "encipher" ? step.cipher : step.plain));
  return letters.join("").replace(/(.{5})(?=.)/g, "$1 ");
}

const clamp = (position: number, state: VigenereState) =>
  Math.max(0, Math.min(position, steps(state).length - 1));

function reduce(state: VigenereState, action: VigenereAction): VigenereState {
  switch (action.type) {
    // A new message, keyword or direction starts again from the first letter.
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

/** The state of the Vigenère page and the way to change it. */
export const useVigenere = (start: VigenereState) => useReducer(reduce, start);

import { useReducer } from "react";
import { decipher, encipher } from "@codebook/cipher-engine/caesar";
import { mod } from "@codebook/cipher-engine/text";

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the Caesar page remembers. */
export interface CaesarState {
  /** How many places the cipher alphabet is shifted, 0 to 25. */
  shift: number;
  mode: Mode;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** The column of the alphabet table the reader highlighted, if any. */
  picked?: number;
}

export type CaesarAction =
  | { type: "type"; text: string }
  | { type: "turn"; by: number }
  | { type: "switch"; mode: Mode }
  | { type: "pick"; column: number }
  | { type: "load"; preset: CaesarState };

function reduce(state: CaesarState, action: CaesarAction): CaesarState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "turn":
      return { ...state, shift: mod(state.shift + action.by, 26) };
    case "switch":
      return { ...state, mode: action.mode };
    case "pick":
      return { ...state, picked: action.column === state.picked ? undefined : action.column };
    case "load":
      return action.preset;
  }
}

/** The text the cipher produces from what the reader typed. */
export const output = (state: CaesarState) =>
  state.mode === "encipher" ? encipher(state.text, state.shift) : decipher(state.text, state.shift);

/** The state of the Caesar page and the way to change it. */
export const useCaesar = (start: CaesarState) => useReducer(reduce, start);

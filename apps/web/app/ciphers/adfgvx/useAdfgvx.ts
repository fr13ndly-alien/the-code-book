import { useReducer } from "react";
import { decipher, encipher, type Working } from "@codebook/cipher-engine/adfgvx";

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the ADFGVX page remembers. */
export interface AdfgvxState {
  /** The 36 symbols of the grid, row by row. */
  grid: string;
  /** The keyword that orders the columns in stage two. */
  keyword: string;
  mode: Mode;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** The letter or digit the reader is following through both stages, if any. */
  picked?: string;
}

export type AdfgvxAction =
  | { type: "type"; text: string }
  | { type: "key"; keyword: string }
  | { type: "switch"; mode: Mode }
  | { type: "pick"; symbol: string }
  | { type: "shuffle"; grid: string }
  | { type: "load"; preset: AdfgvxState };

function reduce(state: AdfgvxState, action: AdfgvxAction): AdfgvxState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "key":
      return { ...state, keyword: action.keyword };
    case "switch":
      return { ...state, mode: action.mode };
    case "pick":
      return { ...state, picked: action.symbol === state.picked ? undefined : action.symbol };
    case "shuffle":
      return { ...state, grid: action.grid };
    case "load":
      return action.preset;
  }
}

/** Every stage of the cipher for what the reader typed. */
export const working = (state: AdfgvxState): Working =>
  state.mode === "encipher"
    ? encipher(state.grid, state.keyword, state.text)
    : decipher(state.grid, state.keyword, state.text);

/** The text the cipher produces: ciphertext when enciphering, plaintext when deciphering. */
export const output = (state: AdfgvxState) =>
  state.mode === "encipher" ? working(state).ciphertext : working(state).symbols;

/** The state of the ADFGVX page and the way to change it. */
export const useAdfgvx = (start: AdfgvxState) => useReducer(reduce, start);

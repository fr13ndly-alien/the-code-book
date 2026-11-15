import { useReducer } from "react";
import { decipher, encipher, plainOf, symbolsOf, type Token } from "@codebook/cipher-engine/mary-queen-of-scots";

/** Whether the reader is writing a letter with the key shown, or reading one sign by sign. */
export type Mode = "write" | "read";

/** How many nulls the writer sprinkles in. */
export type Nulls = "none" | "few" | "many";

/** The chance of a null before each sign, for each choice. */
const NULL_SHARE: Record<Nulls, number> = { none: 0, few: 0.15, many: 0.4 };

/** Everything the Mary Queen of Scots page remembers. */
export interface MaryState {
  mode: Mode;
  /** Plaintext when writing, the signs of a ciphertext when reading. */
  text: string;
  nulls: Nulls;
  /** Whether listed words are swapped for their single sign. */
  useWords: boolean;
  /** Decides where the nulls fall. */
  seed: number;
  /** The sign the reader tapped, if any. */
  picked?: string;
}

export type MaryAction =
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "sprinkle"; nulls: Nulls }
  | { type: "useWords"; on: boolean }
  | { type: "shuffle"; by: number }
  | { type: "pick"; symbol: string }
  | { type: "load"; preset: MaryState };

/** The signs of the message on the page, each with what it stands for. */
export const tokensOf = (state: MaryState): Token[] =>
  state.mode === "write"
    ? encipher(state.text, { seed: state.seed, nullShare: NULL_SHARE[state.nulls], useWords: state.useWords })
    : decipher(state.text);

/** Carries the message across when the reader changes desk: the ciphertext to read, or its plaintext to write. */
function switchTo(state: MaryState, mode: Mode): MaryState {
  if (mode === state.mode) return state;
  const tokens = tokensOf(state);
  return { ...state, mode, text: mode === "read" ? symbolsOf(tokens) : plainOf(tokens), picked: undefined };
}

function reduce(state: MaryState, action: MaryAction): MaryState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "switch":
      return switchTo(state, action.mode);
    case "sprinkle":
      return { ...state, nulls: action.nulls };
    case "useWords":
      return { ...state, useWords: action.on };
    case "shuffle":
      return { ...state, seed: Math.max(1, state.seed + action.by) };
    case "pick":
      return { ...state, picked: action.symbol === state.picked ? undefined : action.symbol };
    case "load":
      return action.preset;
  }
}

/** The state of the Mary Queen of Scots page and the way to change it. */
export const useMary = (start: MaryState) => useReducer(reduce, start);

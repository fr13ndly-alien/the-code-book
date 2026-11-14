import { useReducer } from "react";
import { pairsFor, swap } from "@codebook/cipher-engine/kama-sutra";

/** Everything the Kama Sutra page remembers. */
export interface KamaSutraState {
  /** Which pairing is in use. 0 is the book's; each shuffle moves to the next number. */
  seed: number;
  /** What the reader typed: a message to encipher or a ciphertext to read. The swap is the same. */
  text: string;
  /** The letter the reader highlighted, if any. */
  picked?: string;
}

export type KamaSutraAction =
  | { type: "type"; text: string }
  | { type: "shuffle" }
  | { type: "restore" }
  | { type: "pick"; letter: string }
  | { type: "load"; preset: KamaSutraState };

function reduce(state: KamaSutraState, action: KamaSutraAction): KamaSutraState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "shuffle":
      return { ...state, seed: state.seed + 1 };
    case "restore":
      return { ...state, seed: 0 };
    case "pick":
      return { ...state, picked: action.letter === state.picked ? undefined : action.letter };
    case "load":
      return action.preset;
  }
}

/** The thirteen pairs in use. */
export const pairs = (state: KamaSutraState) => pairsFor(state.seed);

/** The text after every letter has been swapped with its partner. */
export const output = (state: KamaSutraState) => swap(state.text, pairs(state));

/** The state of the Kama Sutra page and the way to change it. */
export const useKamaSutra = (start: KamaSutraState) => useReducer(reduce, start);

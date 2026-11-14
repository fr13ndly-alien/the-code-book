import { useReducer } from "react";
import { cipherAlphabet, decipher, encipher } from "@codebook/cipher-engine/keyword-substitution";

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the keyword cipher page remembers. */
export interface KeywordState {
  /** The keyword or keyphrase, as the reader typed it. */
  keyword: string;
  mode: Mode;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** The column of the alphabet table the reader highlighted, if any. */
  picked?: number;
}

export type KeywordAction =
  | { type: "type"; text: string }
  | { type: "rekey"; keyword: string }
  | { type: "switch"; mode: Mode }
  | { type: "pick"; column: number }
  | { type: "load"; preset: KeywordState };

function reduce(state: KeywordState, action: KeywordAction): KeywordState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "rekey":
      return { ...state, keyword: action.keyword };
    case "switch":
      return { ...state, mode: action.mode };
    case "pick":
      return { ...state, picked: action.column === state.picked ? undefined : action.column };
    case "load":
      return action.preset;
  }
}

/** The cipher alphabet the keyword builds. */
export const alphabet = (state: KeywordState) => cipherAlphabet(state.keyword);

/** The text the cipher produces from what the reader typed. */
export const output = (state: KeywordState) =>
  state.mode === "encipher" ? encipher(state.text, alphabet(state)) : decipher(state.text, alphabet(state));

/** The state of the keyword cipher page and the way to change it. */
export const useKeyword = (start: KeywordState) => useReducer(reduce, start);

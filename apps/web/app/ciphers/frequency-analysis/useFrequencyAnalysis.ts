import { useReducer } from "react";
import { assign, guessByRank, unassign, type Guesses } from "@codebook/cipher-engine/frequency-analysis";

/** Everything the frequency analysis page remembers. */
export interface FrequencyAnalysisState {
  /** The message being broken. */
  ciphertext: string;
  /** The reader's working key: cipher letter to plain letter. */
  guesses: Guesses;
  /** The cipher letter the reader is working on, if any. */
  picked?: string;
}

export type FrequencyAnalysisAction =
  | { type: "type"; ciphertext: string }
  | { type: "pick"; cipher: string }
  | { type: "assign"; plain: string }
  | { type: "rubOut" }
  | { type: "rubOutAll" }
  | { type: "guessByRank" }
  | { type: "load"; preset: FrequencyAnalysisState };

/** A new ciphertext is a new puzzle: the old guesses no longer mean anything. */
const newMessage = (ciphertext: string): FrequencyAnalysisState => ({ ciphertext, guesses: {} });

function reduce(state: FrequencyAnalysisState, action: FrequencyAnalysisAction): FrequencyAnalysisState {
  switch (action.type) {
    case "type":
      return newMessage(action.ciphertext.toUpperCase());
    case "pick":
      return { ...state, picked: action.cipher === state.picked ? undefined : action.cipher };
    case "assign":
      return state.picked ? { ...state, guesses: assign(state.guesses, state.picked, action.plain) } : state;
    case "rubOut":
      return state.picked ? { ...state, guesses: unassign(state.guesses, state.picked) } : state;
    case "rubOutAll":
      return { ...state, guesses: {} };
    case "guessByRank":
      return { ...state, guesses: guessByRank(state.ciphertext) };
    case "load":
      return action.preset;
  }
}

/** The state of the frequency analysis page and the way to change it. */
export const useFrequencyAnalysis = (start: FrequencyAnalysisState) => useReducer(reduce, start);

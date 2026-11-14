import { useReducer } from "react";
import { assign, encipher, nextHint, unassign, type Guesses } from "@codebook/cipher-engine/dancing-men";

/** The three tools of the page: write in dancing men, break a danced message, or use Verne's cipher. */
export type Mode = "dance" | "desk" | "verne";

/** The last step of the Verne tool: the letters swapped back. */
export const LAST_VERNE_STEP = 4;

/** Everything the Dancing Men page remembers. */
export interface DancingMenState {
  mode: Mode;
  /** The message that is danced on the board, in ordinary letters. */
  text: string;
  /** True when the letters under the figures are hidden, as for someone who finds the message. */
  hidden: boolean;
  /** The figure the reader tapped, named by its true letter. */
  picked?: string;
  /** At Holmes's desk: the letter the reader has given to each figure. */
  guesses: Guesses;
  /** The message for Verne's cipher. */
  verneText: string;
  /** How far through Verne's cipher the reader has stepped, 0 to LAST_VERNE_STEP. */
  verneStep: number;
}

export type DancingMenAction =
  | { type: "type"; text: string }
  | { type: "pick"; letter: string }
  | { type: "assign"; plain: string }
  | { type: "rubOut" }
  | { type: "rubOutAll" }
  | { type: "hint" }
  | { type: "reveal" }
  | { type: "typeVerne"; text: string }
  | { type: "stepVerne"; by: number }
  | { type: "load"; preset: DancingMenState };

/** Gives away the commonest figure the reader has not yet named correctly. */
function withHint(state: DancingMenState): DancingMenState {
  const letter = nextHint(encipher(state.text), state.guesses);
  return letter ? { ...state, picked: letter, guesses: assign(state.guesses, letter, letter) } : state;
}

function reduce(state: DancingMenState, action: DancingMenAction): DancingMenState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text, picked: undefined };
    case "pick":
      return { ...state, picked: action.letter === state.picked ? undefined : action.letter };
    case "assign":
      return state.picked ? { ...state, guesses: assign(state.guesses, state.picked, action.plain) } : state;
    case "rubOut":
      return state.picked ? { ...state, guesses: unassign(state.guesses, state.picked) } : state;
    case "rubOutAll":
      return { ...state, guesses: {} };
    case "hint":
      return withHint(state);
    case "reveal":
      return { ...state, hidden: false };
    case "typeVerne":
      return { ...state, verneText: action.text, verneStep: 0 };
    case "stepVerne":
      return { ...state, verneStep: Math.min(LAST_VERNE_STEP, Math.max(0, state.verneStep + action.by)) };
    case "load":
      return action.preset;
  }
}

/** The state of the Dancing Men page and the way to change it. */
export const useDancingMen = (start: DancingMenState) => useReducer(reduce, start);

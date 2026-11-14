import { useReducer } from "react";
import { toyPress, toyTurn } from "@codebook/cipher-engine";

/** The state of the book's six-letter model. Plain data, like the main machine's. */
export interface ToyState {
  /** Whether the model's panel in the controls is open. A story button can open it. */
  open: boolean;
  /** Whether the scrambler turns one place after each letter. */
  rotating: boolean;
  /** Places the scrambler has turned from its first position, 0 to 5. */
  position: number;
  typed: string;
  lamps: string;
  /** The most recent press and where the scrambler stood for it, or null before the first. */
  last: { key: string; output: string; position: number } | null;
}

export type ToyAction =
  | { type: "press"; key: string }
  | { type: "setTurning"; rotating: boolean }
  | { type: "restart" }
  | { type: "show"; open: boolean }
  | { type: "load"; rotating: boolean };

const INITIAL: ToyState = { open: false, rotating: false, position: 0, typed: "", lamps: "", last: null };

/** A change of setup starts a fresh message with the scrambler in its first position. */
function newMessage(open: boolean, rotating: boolean): ToyState {
  return { ...INITIAL, open, rotating };
}

function reduce(state: ToyState, action: ToyAction): ToyState {
  switch (action.type) {
    case "press": {
      const { output } = toyPress(state.position, action.key);
      return {
        ...state,
        // The book's model turns after the lamp has lit, not before as the real machine does.
        position: state.rotating ? toyTurn(state.position) : state.position,
        typed: state.typed + action.key,
        lamps: state.lamps + output,
        last: { key: action.key, output, position: state.position },
      };
    }

    case "setTurning":
      return newMessage(state.open, action.rotating);

    case "restart":
      return newMessage(state.open, state.rotating);

    case "show":
      return { ...state, open: action.open };

    case "load":
      return newMessage(true, action.rotating);
  }
}

/** The page's state for the six-letter model, kept apart from the full machine's. */
export function useToyScrambler() {
  return useReducer(reduce, INITIAL);
}

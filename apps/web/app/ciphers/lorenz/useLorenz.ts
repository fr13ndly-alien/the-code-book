import { useReducer } from "react";
import { WHEEL_LENGTHS, outputOf, run, toTape, type Start, type Step } from "@codebook/cipher-engine/lorenz";
import { mod } from "@codebook/cipher-engine/text";

/** Everything the Lorenz page remembers. */
export interface LorenzState {
  /** What the reader typed for the input tape. */
  text: string;
  /** Where each of the five wheels stands before the first letter, counting from 0. */
  start: Start;
  /** The letter of the tape whose working is shown, counting from 0. */
  picked: number;
}

export type LorenzAction =
  | { type: "type"; text: string }
  | { type: "turn"; wheel: number; by: number }
  | { type: "pick"; at: number }
  | { type: "move"; by: number }
  | { type: "feedBack" }
  | { type: "rewind" }
  | { type: "load"; preset: LorenzState };

/** Keeps the chosen letter on the tape when the tape gets shorter. */
const onTape = (state: LorenzState): LorenzState => ({
  ...state,
  picked: Math.max(0, Math.min(state.picked, toTape(state.text).length - 1)),
});

function reduce(state: LorenzState, action: LorenzAction): LorenzState {
  switch (action.type) {
    case "type":
      return onTape({ ...state, text: action.text });
    case "turn":
      return {
        ...state,
        start: state.start.map((at, wheel) =>
          wheel === action.wheel ? mod(at + action.by, WHEEL_LENGTHS[wheel]!) : at,
        ),
      };
    case "pick":
      return { ...state, picked: action.at };
    case "move":
      return onTape({ ...state, picked: state.picked + action.by });
    case "feedBack":
      return { ...state, text: output(state) };
    case "rewind":
      return { ...state, start: state.start.map(() => 0) };
    case "load":
      return action.preset;
  }
}

/** Every step of the machine for the tape the reader typed. */
export const stepsOf = (state: LorenzState): Step[] => run(state.text, state.start);

/** The output tape as text. */
export const output = (state: LorenzState) => outputOf(stepsOf(state));

/** The state of the Lorenz page and the way to change it. */
export const useLorenz = (start: LorenzState) => useReducer(reduce, start);

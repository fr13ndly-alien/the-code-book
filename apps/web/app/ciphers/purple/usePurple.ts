import { useReducer } from "react";
import {
  MOTIONS,
  POSITIONS,
  outputOf,
  run,
  toKeys,
  type Mode,
  type Settings,
  type Step,
} from "@codebook/cipher-engine/purple";
import { inGroups, mod } from "@codebook/cipher-engine/text";

/** What the board shows: the machine at work, or a count of the ciphertext's letters. */
export type View = "machine" | "count";

/** Everything the Purple page remembers. */
export interface PurpleState extends Settings {
  /** What the reader typed. */
  text: string;
  mode: Mode;
  /** The letter of the message whose path is shown, counting from 0. */
  picked: number;
  view: View;
  /** True if the bar chart puts the six sixes letters first. */
  sixesFirst: boolean;
}

export type PurpleAction =
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "turn"; switch: number; by: number }
  | { type: "reorder"; by: number }
  | { type: "plug"; plugboard: string }
  | { type: "pick"; at: number }
  | { type: "move"; by: number }
  | { type: "look"; view: View }
  | { type: "sort"; sixesFirst: boolean }
  | { type: "feedBack" }
  | { type: "load"; preset: PurpleState };

/** Keeps the chosen letter inside the message when the message gets shorter. */
const inMessage = (state: PurpleState): PurpleState => ({
  ...state,
  picked: Math.max(0, Math.min(state.picked, toKeys(state.text).length - 1)),
});

/** The next way of sharing out the speeds, going round the six. */
const nextMotion = (motion: string, by: number) => MOTIONS[mod(MOTIONS.indexOf(motion) + by, MOTIONS.length)]!;

function reduce(state: PurpleState, action: PurpleAction): PurpleState {
  switch (action.type) {
    case "type":
      return inMessage({ ...state, text: action.text });
    case "switch":
      return { ...state, mode: action.mode };
    case "turn":
      return {
        ...state,
        start: state.start.map((at, index) => (index === action.switch ? mod(at + action.by, POSITIONS) : at)),
      };
    case "reorder":
      return { ...state, motion: nextMotion(state.motion, action.by) };
    case "plug":
      return { ...state, plugboard: action.plugboard };
    case "pick":
      return { ...state, picked: action.at };
    case "move":
      return inMessage({ ...state, picked: state.picked + action.by });
    case "look":
      return { ...state, view: action.view };
    case "sort":
      return { ...state, sixesFirst: action.sixesFirst };
    case "feedBack":
      return { ...state, text: inGroups(output(state)), mode: state.mode === "encipher" ? "decipher" : "encipher" };
    case "load":
      return action.preset;
  }
}

/** Every step of the machine for the message the reader typed. */
export const stepsOf = (state: PurpleState): Step[] => run(state.text, state, state.mode);

/** What the machine printed. */
export const output = (state: PurpleState) => outputOf(stepsOf(state));

/** The enciphered side of the page: the output when enciphering, the input when deciphering. */
export const ciphertextOf = (state: PurpleState) => (state.mode === "encipher" ? output(state) : toKeys(state.text));

/** The state of the Purple page and the way to change it. */
export const usePurple = (start: PurpleState) => useReducer(reduce, start);

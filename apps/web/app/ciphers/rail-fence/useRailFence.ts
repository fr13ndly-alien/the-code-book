import { useReducer } from "react";
import { decipher, encipher } from "@codebook/cipher-engine/rail-fence";

/** The fewest and the most rails the page allows. */
export const MIN_RAILS = 2;
export const MAX_RAILS = 6;

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the rail fence page remembers. */
export interface RailFenceState {
  /** How many rails the fence has. This is the key. */
  rails: number;
  mode: Mode;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** The rail the reader highlighted, counting from 0, if any. */
  picked?: number;
}

export type RailFenceAction =
  | { type: "type"; text: string }
  | { type: "step"; by: number }
  | { type: "switch"; mode: Mode }
  | { type: "pick"; rail: number }
  | { type: "load"; preset: RailFenceState };

const clamp = (rails: number) => Math.min(MAX_RAILS, Math.max(MIN_RAILS, rails));

function reduce(state: RailFenceState, action: RailFenceAction): RailFenceState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "step":
      return { ...state, rails: clamp(state.rails + action.by), picked: undefined };
    case "switch":
      return { ...state, mode: action.mode };
    case "pick":
      return { ...state, picked: action.rail === state.picked ? undefined : action.rail };
    case "load":
      return action.preset;
  }
}

/** The message in plain letters, whichever way the reader is working. */
export const plaintext = (state: RailFenceState) =>
  state.mode === "encipher" ? state.text : decipher(state.text, state.rails);

/** The text the cipher produces from what the reader typed. */
export const output = (state: RailFenceState) =>
  state.mode === "encipher" ? encipher(state.text, state.rails) : decipher(state.text, state.rails);

/** The state of the rail fence page and the way to change it. */
export const useRailFence = (start: RailFenceState) => useReducer(reduce, start);

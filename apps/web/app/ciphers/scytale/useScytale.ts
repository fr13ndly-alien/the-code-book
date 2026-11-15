import { useReducer } from "react";
import { decipher, encipher, unwind, writeOnStaff } from "@codebook/cipher-engine/scytale";
import { lettersOnly, mod } from "@codebook/cipher-engine/text";

/** The thinnest and the thickest staff, in letters per turn of the strip. */
export const MIN_PER_TURN = 2;
export const MAX_PER_TURN = 8;

/** The longest message the strip can hold, so the model stays readable. */
export const MAX_LETTERS = 48;

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the scytale page remembers. */
export interface ScytaleState {
  /** How many letters fit round the staff: its thickness, and the key. */
  perTurn: number;
  mode: Mode;
  /** What the reader typed: the message when enciphering, the strip when deciphering. */
  text: string;
  /** The line of writing that faces the reader, counting from 0. */
  facing: number;
}

export type ScytaleAction =
  | { type: "type"; text: string }
  | { type: "resize"; by: number }
  | { type: "roll"; by: number }
  | { type: "switch"; mode: Mode }
  | { type: "load"; preset: ScytaleState };

const clamp = (perTurn: number) => Math.min(MAX_PER_TURN, Math.max(MIN_PER_TURN, perTurn));

function reduce(state: ScytaleState, action: ScytaleAction): ScytaleState {
  switch (action.type) {
    case "type":
      return lettersOnly(action.text).length > MAX_LETTERS ? state : { ...state, text: action.text };
    case "resize":
      return { ...state, perTurn: clamp(state.perTurn + action.by), facing: 0 };
    case "roll":
      return { ...state, facing: mod(state.facing + action.by, state.perTurn) };
    case "switch":
      return { ...state, mode: action.mode };
    case "load":
      return action.preset;
  }
}

/** The letters read along the staff, whichever way the reader is working. */
const plaintext = (state: ScytaleState) =>
  state.mode === "encipher" ? lettersOnly(state.text) : decipher(state.text, state.perTurn);

/** The lines of writing on the staff, top line first. */
export const linesOnStaff = (state: ScytaleState) => writeOnStaff(plaintext(state), state.perTurn);

/** The letters on each turn of the strip, in the order it unwinds. */
export const stripTurns = (state: ScytaleState) => unwind(plaintext(state), state.perTurn);

/** The text the cipher produces from what the reader typed. */
export const output = (state: ScytaleState) =>
  state.mode === "encipher" ? encipher(state.text, state.perTurn) : plaintext(state);

/** The state of the scytale page and the way to change it. */
export const useScytale = (start: ScytaleState) => useReducer(reduce, start);

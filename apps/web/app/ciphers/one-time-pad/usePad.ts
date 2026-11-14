import { useReducer } from "react";
import { decipher, encipher } from "@codebook/cipher-engine/one-time-pad";
import { lettersOnly } from "@codebook/cipher-engine/text";

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the one-time pad page remembers. */
export interface PadState {
  mode: Mode;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
  /** The random letters on the top sheet of the pad. */
  pad: string;
  /** Another message the reader says the ciphertext might hide. Empty when not in use. */
  claim: string;
  /** A second message enciphered with the same sheet, which must never happen. Empty when not in use. */
  second: string;
  /** The column of the table the reader highlighted, if any. */
  picked?: number;
}

export type PadAction =
  | { type: "type"; text: string }
  | { type: "write"; pad: string }
  | { type: "tear"; pad: string }
  | { type: "switch"; mode: Mode }
  | { type: "claim"; text: string }
  | { type: "reuse"; text: string }
  | { type: "pick"; column: number }
  | { type: "load"; preset: PadState };

function reduce(state: PadState, action: PadAction): PadState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "write":
      return { ...state, pad: lettersOnly(action.pad) };
    case "tear":
      return { ...state, pad: action.pad };
    case "switch":
      return { ...state, mode: action.mode };
    case "claim":
      return { ...state, claim: action.text };
    case "reuse":
      return { ...state, second: action.text };
    case "pick":
      return { ...state, picked: action.column === state.picked ? undefined : action.column };
    case "load":
      return action.preset;
  }
}

/** The ciphertext that travels: made from the message, or typed in by the reader. */
export const ciphertext = (state: PadState) =>
  state.mode === "encipher" ? encipher(state.text, state.pad) : lettersOnly(state.text).slice(0, state.pad.length);

/** The message behind the ciphertext, as far as the sheet reaches. */
export const plaintext = (state: PadState) => decipher(ciphertext(state), state.pad);

/** The text the cipher produces: ciphertext when enciphering, plaintext when deciphering. */
export const output = (state: PadState) => (state.mode === "encipher" ? ciphertext(state) : plaintext(state));

/** The state of the one-time pad page and the way to change it. */
export const usePad = (start: PadState) => useReducer(reduce, start);

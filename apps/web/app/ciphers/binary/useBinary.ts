import { useReducer } from "react";
import {
  BITS,
  combine,
  flipBit,
  outputOf,
  parseBits,
  toBits,
  toText,
  type Column,
} from "@codebook/cipher-engine/binary";

/** Whether the reader is turning a message into ciphertext or ciphertext back into a message. */
export type Mode = "encipher" | "decipher";

/** Everything the binary page remembers. */
export interface BinaryState {
  mode: Mode;
  /** What the reader typed: a message when enciphering, ones and zeros when deciphering. */
  text: string;
  /** The key as a word. */
  key: string;
  /** Digits of the key the reader flipped by hand, counted along the key from 0. */
  flips: number[];
}

export type BinaryAction =
  | { type: "type"; text: string }
  | { type: "rekey"; key: string }
  | { type: "flip"; digit: number }
  | { type: "unflip" }
  | { type: "switch"; mode: Mode }
  | { type: "load"; preset: BinaryState };

function reduce(state: BinaryState, action: BinaryAction): BinaryState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "rekey":
      return { ...state, key: action.key, flips: [] };
    case "flip":
      return {
        ...state,
        flips: state.flips.includes(action.digit)
          ? state.flips.filter((digit) => digit !== action.digit)
          : [...state.flips, action.digit],
      };
    case "unflip":
      return { ...state, flips: [] };
    case "switch":
      // The output of one direction becomes the input of the other, so a round trip is one press.
      return action.mode === state.mode ? state : { ...state, mode: action.mode, text: output(state) };
    case "load":
      return action.preset;
  }
}

/** The key as 7-bit numbers, with the reader's flipped digits applied. */
export function keyBits(state: BinaryState): string[] {
  const rows = toBits(state.key);
  for (const digit of state.flips) {
    const row = Math.floor(digit / BITS);
    if (rows[row]) rows[row] = flipBit(rows[row], digit % BITS);
  }
  return rows;
}

/** The sum on the board: one column per character of the input. */
export function columnsOf(state: BinaryState): Column[] {
  const input = state.mode === "encipher" ? toBits(state.text) : parseBits(state.text);
  return combine(input, keyBits(state));
}

/** The result as text: ones and zeros when enciphering, characters when deciphering. */
export function output(state: BinaryState): string {
  const rows = outputOf(columnsOf(state));
  return state.mode === "encipher" ? rows.join(" ") : toText(rows);
}

/** The state of the binary page and the way to change it. */
export const useBinary = (start: BinaryState) => useReducer(reduce, start);

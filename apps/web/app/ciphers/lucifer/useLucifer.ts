import { useReducer } from "react";
import {
  blockToText,
  decrypt,
  encrypt,
  flipBit,
  fromHex,
  MAX_ROUNDS,
  textToBlock,
  toHex,
  type FeistelTrace,
} from "@codebook/cipher-engine/lucifer";

/** Whether the reader is scrambling two letters or unscrambling a ciphertext. */
export type Mode = "encipher" | "decipher";

/** Everything the Lucifer page remembers. */
export interface LuciferState {
  mode: Mode;
  /** What the reader typed: two characters when enciphering, four hex digits when deciphering. */
  text: string;
  /** The key as typed. Only its first character counts: eight bits. */
  keyLetter: string;
  /** How many rounds of kneading, 1 to 16. */
  rounds: number;
  /** The input bit the reader flipped to watch the avalanche, counting from 0 at the left. */
  flipped?: number;
  /** The round whose arithmetic the caption spells out. */
  picked?: number;
}

export type LuciferAction =
  | { type: "type"; text: string }
  | { type: "key"; letter: string }
  | { type: "step"; by: number }
  | { type: "switch"; mode: Mode }
  | { type: "flip"; bit: number }
  | { type: "unflip" }
  | { type: "explain"; by: number }
  | { type: "load"; preset: LuciferState };

/** The 16-bit block the reader typed. */
export const inputBlock = (state: LuciferState) =>
  state.mode === "encipher" ? textToBlock(state.text) : fromHex(state.text);

/** The 8-bit key: the code of the key letter, or 0 when the box is empty. */
export const keyNumber = (state: LuciferState) => (state.keyLetter.charCodeAt(0) || 0) & 0xff;

const runBlock = (state: LuciferState, block: number) =>
  (state.mode === "encipher" ? encrypt : decrypt)(block, keyNumber(state), state.rounds);

/** The cipher run on exactly what the reader typed. */
export const run = (state: LuciferState): FeistelTrace => runBlock(state, inputBlock(state));

/** The same run with the reader's one bit flipped, or nothing if no bit is flipped. */
export const flippedRun = (state: LuciferState): FeistelTrace | undefined =>
  state.flipped === undefined ? undefined : runBlock(state, flipBit(inputBlock(state), state.flipped));

/** The result as real text: hex digits for a ciphertext, characters for a plaintext. */
export const output = (state: LuciferState) =>
  state.mode === "encipher" ? toHex(run(state).output) : blockToText(run(state).output);

/** The round the caption explains: the reader's choice, or the first, and never past the last. */
export const pickedRound = (state: LuciferState) => Math.min(state.picked ?? 1, state.rounds);

const clamp = (rounds: number) => Math.min(MAX_ROUNDS, Math.max(1, rounds));

function reduce(state: LuciferState, action: LuciferAction): LuciferState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "key":
      return { ...state, keyLetter: action.letter.slice(-1) };
    case "step":
      return { ...state, rounds: clamp(state.rounds + action.by) };
    case "switch":
      // The result of one direction becomes the input of the other, ready to be undone.
      return action.mode === state.mode
        ? state
        : { ...state, mode: action.mode, text: output(state), flipped: undefined };
    case "flip":
      return { ...state, flipped: action.bit === state.flipped ? undefined : action.bit };
    case "unflip":
      return { ...state, flipped: undefined };
    case "explain":
      return { ...state, picked: Math.min(state.rounds, Math.max(1, pickedRound(state) + action.by)) };
    case "load":
      return action.preset;
  }
}

/** The state of the Lucifer page and the way to change it. */
export const useLucifer = (start: LuciferState) => useReducer(reduce, start);

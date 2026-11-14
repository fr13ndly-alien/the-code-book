import { useReducer } from "react";
import { DEFAULT_SETTINGS, type EnigmaSettings, type Positions } from "@codebook/cipher-engine";
import {
  chainLengths,
  interceptedOpenings,
  linkTable,
  testRotorSettings,
  type Pair,
  type Stop,
} from "@codebook/cipher-engine/cracking-enigma";
import { lettersOnly, mod } from "@codebook/cipher-engine/text";

/** The two attacks the page lets the reader try. */
export type Tool = "chains" | "crib";

/** The six plugboard cables of the book's example day key. The reader can pull each one out. */
export const DAY_CABLES = ["AL", "PR", "TD", "BW", "KF", "OY"];

/** The rest of the book's example day key: rotors 2-3-1. The rotor start is part of the state. */
const DAY_SETTINGS: EnigmaSettings = { rotors: ["II", "III", "I"], rings: [0, 0, 0], reflector: "B", cables: [] };

/** The machine the crib search assumes: rotors 1-2-3 and an empty plugboard. Only the rotor start is unknown. */
export const CRIB_SETTINGS = DEFAULT_SETTINGS;

/** Everything the page remembers, for both tools. */
export interface CrackState {
  tool: Tool;
  /** Chains: the rotor start of the day key. */
  start: Positions;
  /** Chains: the cables plugged in at the moment. */
  cables: string[];
  /** Chains: which two of the six opening letters are compared. */
  pair: Pair;
  /** Chains: the letter of the table the reader is following, A = 0. */
  picked?: number;
  /** Crib: the intercepted message. */
  ciphertext: string;
  /** Crib: the word the reader thinks is in the message. */
  crib: string;
  /** Crib: how many letters into the message the crib is placed. */
  offset: number;
  /** Crib: the rotor settings that fitted at this position. Missing until the reader runs the test. */
  stops?: Stop[];
}

export type CrackAction =
  | { type: "use"; tool: Tool }
  | { type: "turn"; slot: 0 | 1 | 2; by: number }
  | { type: "plug"; cable: string }
  | { type: "compare"; pair: Pair }
  | { type: "pick"; column: number }
  | { type: "guess"; crib: string }
  | { type: "slide"; by: number }
  | { type: "test" }
  | { type: "load"; preset: CrackState };

/** The last position at which the crib still fits inside the message. */
export const lastOffset = (state: CrackState) =>
  Math.max(0, lettersOnly(state.ciphertext).length - lettersOnly(state.crib).length);

/** Moves the crib, keeping it inside the message. A move throws away the last test result. */
function place(state: CrackState, offset: number): CrackState {
  return { ...state, offset: Math.min(Math.max(0, offset), lastOffset(state)), stops: undefined };
}

function turn(start: Positions, slot: 0 | 1 | 2, by: number): Positions {
  const next: [number, number, number] = [...start];
  next[slot] = mod(next[slot] + by, 26);
  return next;
}

function reduce(state: CrackState, action: CrackAction): CrackState {
  switch (action.type) {
    case "use":
      return { ...state, tool: action.tool };
    case "turn":
      return { ...state, start: turn(state.start, action.slot, action.by) };
    case "plug": {
      const plugged = state.cables.includes(action.cable);
      return { ...state, cables: plugged ? state.cables.filter((c) => c !== action.cable) : [...state.cables, action.cable] };
    }
    case "compare":
      return { ...state, pair: action.pair };
    case "pick":
      return { ...state, picked: action.column === state.picked ? undefined : action.column };
    case "guess":
      return place({ ...state, crib: lettersOnly(action.crib) }, state.offset);
    case "slide":
      return place(state, state.offset + action.by);
    case "test":
      return { ...state, stops: testRotorSettings(CRIB_SETTINGS, state.ciphertext, state.crib, state.offset) };
    case "load":
      return action.preset;
  }
}

/** The first six letters of the day's messages, as the codebreaker receives them. */
export const openings = (state: CrackState) =>
  interceptedOpenings({ settings: { ...DAY_SETTINGS, cables: state.cables }, start: state.start });

/** Rejewski's table for the pair of letters the reader chose. */
export const table = (state: CrackState) => linkTable(openings(state), state.pair);

/** The fingerprint of the day's rotor settings, as text: "11, 11, 1, 1, 1, 1". */
export const fingerprint = (state: CrackState) => chainLengths(table(state)).join(", ");

/** The state of the page and the way to change it. */
export const useCrack = (start: CrackState) => useReducer(reduce, start);

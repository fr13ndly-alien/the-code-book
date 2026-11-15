import { useReducer } from "react";
import {
  countRight,
  encode,
  INTERCEPT,
  knownReadings,
  read,
  unknownGroups,
  type Readings,
} from "@codebook/cipher-engine/zimmermann";

/** Whether the reader is a clerk encoding a telegram or a codebreaker rebuilding the codebook. */
export type Mode = "encode" | "break";

/** Everything the Zimmermann page remembers. */
export interface ZimmermannState {
  mode: Mode;
  /** The telegram the reader is building, word by word. */
  words: string[];
  /** The codebreaker's guesses so far: the word believed to lie behind each unknown group. */
  guesses: Readings;
  /** The unknown group the codebreaker is working on, if any. */
  picked?: number;
}

export type ZimmermannAction =
  | { type: "tap"; word: string }
  | { type: "rub" }
  | { type: "clear" }
  | { type: "switch"; mode: Mode }
  | { type: "pick"; group: number }
  | { type: "guess"; word: string }
  | { type: "forget" }
  | { type: "load"; preset: ZimmermannState };

/** The groups of the telegram the reader has built. */
export const groupsOf = (state: ZimmermannState) => encode(state.words);

/** What the codebreaker can read so far: known groups plus guesses. */
export const readingsOf = (state: ZimmermannState): Readings => ({ ...knownReadings(INTERCEPT), ...state.guesses });

/** Each intercepted telegram as the codebreaker reads it now, with "?" for the gaps. */
export const telegramsRead = (state: ZimmermannState) =>
  INTERCEPT.telegrams.map((telegram) => read(telegram, readingsOf(state)));

/** How far the codebreaker has got: guesses that fit the real codebook, out of the groups to find. */
export const progress = (state: ZimmermannState) => ({
  right: countRight(state.guesses),
  made: Object.keys(state.guesses).length,
  toFind: unknownGroups(INTERCEPT).length,
});

/** The text the page produces: groups when encoding, the telegrams as read so far when breaking. */
export const output = (state: ZimmermannState) =>
  state.mode === "encode"
    ? groupsOf(state).join(" ")
    : telegramsRead(state)
        .map((words) => words.join(" "))
        .join("\n");

/** Writes a word beside the picked group. A word can only stand for one group, so it leaves any other. */
function guess(state: ZimmermannState, word: string): ZimmermannState {
  if (state.picked === undefined) return state;
  const others = Object.entries(state.guesses).filter(([, other]) => other !== word);
  return { ...state, guesses: { ...Object.fromEntries(others), [state.picked]: word } };
}

function forget(state: ZimmermannState): ZimmermannState {
  const others = Object.entries(state.guesses).filter(([group]) => Number(group) !== state.picked);
  return { ...state, guesses: Object.fromEntries(others) };
}

function reduce(state: ZimmermannState, action: ZimmermannAction): ZimmermannState {
  switch (action.type) {
    case "tap":
      return { ...state, words: [...state.words, action.word] };
    case "rub":
      return { ...state, words: state.words.slice(0, -1) };
    case "clear":
      return state.mode === "encode" ? { ...state, words: [] } : { ...state, guesses: {}, picked: undefined };
    case "switch":
      return { ...state, mode: action.mode };
    case "pick":
      return { ...state, picked: action.group === state.picked ? undefined : action.group };
    case "guess":
      return guess(state, action.word);
    case "forget":
      return forget(state);
    case "load":
      return action.preset;
  }
}

/** The state of the Zimmermann page and the way to change it. */
export const useZimmermann = (start: ZimmermannState) => useReducer(reduce, start);

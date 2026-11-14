import { useReducer } from "react";
import {
  PLACES,
  TRIPLET,
  WORDS,
  bridge,
  readWord,
  sharedStem,
  solve,
  type Guesses,
  type NameId,
  type SignId,
  type Word,
  type WordId,
} from "@codebook/cipher-engine/linear-b";

/** Which words are on the board: Kober's triplet, the place names or the tripod tablet. */
export type View = "triplet" | "places" | "tripod";

/** Everything the Linear B page remembers. */
export interface LinearBState {
  view: View;
  /** The signs the reader has marked as shared, in Kober's step. */
  marked: SignId[];
  /** The name the reader has given to each word. */
  guesses: Guesses;
  /** The word the reader tapped, waiting for a name. */
  picked?: WordId;
}

export type LinearBAction =
  | { type: "show"; view: View }
  | { type: "mark"; sign: SignId }
  | { type: "pick"; word: WordId }
  | { type: "guess"; name: NameId | undefined }
  | { type: "fill" }
  | { type: "wipe" }
  | { type: "load"; preset: LinearBState };

/** The three place names, each guessed correctly: what Ventris had by the summer of 1952. */
export const PLACES_GUESSED: Guesses = { amnisos: "amnisos", knossos: "knossos", tulissos: "tulissos" };

const WORDS_SHOWN: Record<View, WordId[]> = { triplet: TRIPLET, places: PLACES, tripod: ["tripods"] };

/** The names offered for the words of each view. */
export const NAMES_OFFERED: Record<View, NameId[]> = {
  triplet: [],
  places: ["amnisos", "knossos", "tulissos"],
  tripod: ["tripods"],
};

const toggle = (signs: SignId[], sign: SignId) =>
  signs.includes(sign) ? signs.filter((other) => other !== sign) : [...signs, sign];

function withGuess(guesses: Guesses, word: WordId, name: NameId | undefined): Guesses {
  const next = { ...guesses };
  if (name) next[word] = name;
  else delete next[word];
  return next;
}

function reduce(state: LinearBState, action: LinearBAction): LinearBState {
  switch (action.type) {
    case "show":
      return { ...state, view: action.view, picked: action.view === "tripod" ? "tripods" : undefined };
    case "mark":
      return { ...state, marked: toggle(state.marked, action.sign) };
    case "pick":
      return { ...state, picked: action.word };
    case "guess":
      return state.picked ? { ...state, guesses: withGuess(state.guesses, state.picked, action.name) } : state;
    case "fill":
      return { ...state, guesses: { ...state.guesses, ...PLACES_GUESSED } };
    case "wipe":
      return { ...state, guesses: {}, marked: [] };
    case "load":
      return action.preset;
  }
}

/** The words on the board, top to bottom. */
export const shown = (state: LinearBState): WordId[] => WORDS_SHOWN[state.view];

/** What the grid says after the reader's guesses, with the clashes of any wrong guess. */
export const solution = (state: LinearBState) => solve(state.guesses);

/** The words on the board as far as they can be read: "a-mi-ni-so / ?o-no-so / ??-?i-so". */
export function output(state: LinearBState): string {
  const { values } = solution(state);
  return shown(state)
    .map((id) => readWord(WORDS[id], values))
    .join(" / ");
}

/** The signs that begin all three of Kober's words. */
export const stemSigns = (): SignId[] => {
  const words: Word[] = TRIPLET.map((id) => WORDS[id]);
  return words[0]!.signs.slice(0, sharedStem(words));
};

/** The signs after the shared start, which Kober said must share a consonant. */
export const bridgeSigns = (): SignId[] => bridge(TRIPLET.map((id) => WORDS[id]));

/** True when the reader has marked exactly the signs that all three words share. */
export function stemFound(state: LinearBState): boolean {
  const stem = stemSigns();
  return state.marked.length === stem.length && stem.every((sign) => state.marked.includes(sign));
}

/** The name the reader gave the picked word, if any. */
export const pickedName = (state: LinearBState): NameId | undefined =>
  state.picked ? state.guesses[state.picked] : undefined;

/** The state of the Linear B page and the way to change it. */
export const useLinearB = (start: LinearBState) => useReducer(reduce, start);

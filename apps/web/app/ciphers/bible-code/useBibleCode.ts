import { useReducer } from "react";
import { findWord, sequence, type Hit } from "@codebook/cipher-engine/bible-code";
import { TEXTS, type TextId } from "@codebook/cipher-engine/bible-code";
import { lettersOnly, mod } from "@codebook/cipher-engine/text";

/** How many letters are read out when the reader sets the start and skip by hand. */
export const READ = 8;

/** The largest skip the stepper reaches. A word search goes further. */
export const MAX_SKIP = 99;

/** Everything the Bible code page remembers. */
export interface BibleCodeState {
  /** Which passage is being searched. */
  text: TextId;
  /** The position of the first letter read, counting letters only, from 0. */
  start: number;
  /** How many letters each jump covers. */
  skip: number;
  /** 1 to jump forwards through the text, -1 to jump backwards. */
  direction: 1 | -1;
  /** How many letters are read out. */
  length: number;
  /** The word the reader is searching for, in capitals. */
  word: string;
  /** Which of the places the word was found is on show, if any. */
  hit?: number;
}

export type BibleCodeAction =
  | { type: "step"; what: "start" | "skip"; by: number }
  | { type: "pick"; position: number }
  | { type: "type"; word: string }
  | { type: "show"; by: number }
  | { type: "read"; text: TextId }
  | { type: "load"; preset: BibleCodeState };

/** The letters of the passage, with spaces and punctuation taken out. */
export const letters = (state: BibleCodeState) => lettersOnly(TEXTS[state.text].text);

/** Every place the reader's word hides in the passage, at any skip. */
export const hits = (state: BibleCodeState): Hit[] => findWord(letters(state), state.word, Infinity);

/** The letters the current start and skip read out. */
export const output = (state: BibleCodeState) =>
  sequence(letters(state), state.start, state.skip * state.direction, state.length);

/** Moves the start and skip to one of the places the word was found. Counts round past either end. */
export function showHit(state: BibleCodeState, index: number): BibleCodeState {
  const found = hits(state);
  const hit = found[mod(index, found.length)];
  if (!hit) return { ...state, hit: undefined };
  return { ...state, ...hit, length: state.word.length, hit: mod(index, found.length) };
}

/** Back to reading by hand: forwards, and a full line of letters if a found word was on show. */
const byHand = (state: BibleCodeState): BibleCodeState => ({
  ...state,
  direction: 1,
  length: state.hit === undefined ? state.length : READ,
  hit: undefined,
});

function step(state: BibleCodeState, what: "start" | "skip", by: number): BibleCodeState {
  if (what === "start") return { ...byHand(state), start: mod(state.start + by, letters(state).length) };
  return { ...byHand(state), skip: Math.max(1, Math.min(MAX_SKIP, state.skip + by)) };
}

function reduce(state: BibleCodeState, action: BibleCodeAction): BibleCodeState {
  switch (action.type) {
    case "step":
      return step(state, action.what, action.by);
    case "pick":
      return { ...byHand(state), start: action.position };
    case "type":
      return showHit({ ...state, word: lettersOnly(action.word) }, 0);
    case "show":
      return showHit(state, (state.hit ?? -1) + action.by);
    case "read":
      return showHit({ ...byHand(state), text: action.text, start: 0 }, 0);
    case "load":
      return action.preset;
  }
}

/** The state of the Bible code page and the way to change it. */
export const useBibleCode = (start: BibleCodeState) => useReducer(reduce, start);

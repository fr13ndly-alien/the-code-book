import { useReducer } from "react";
import { MAX_KEY_LENGTH, applyKey, keywordFromShifts } from "@codebook/cipher-engine/babbage";
import { decipher } from "@codebook/cipher-engine/caesar";
import { CRYPTOGRAMS, isSolved, prepare, type Kind } from "@codebook/cipher-engine/codebreakers-challenge";
import {
  assign,
  guessByRank,
  partialText,
  read,
  unassign,
  type Guesses,
} from "@codebook/cipher-engine/frequency-analysis";
import { mod } from "@codebook/cipher-engine/text";

/** The reader's work on one cryptogram. Each kind of cipher uses its own part. */
export interface Work {
  /** Caesar: the shift being tried. */
  shift: number;
  /** Substitution: the reader's working key, cipher letter to plain letter. */
  guesses: Guesses;
  /** Substitution: the cipher letter being worked on, if any. */
  picked?: string;
  /** Vigenère: the reader's guess at the length of the keyword. */
  keyLength: number;
  /** Vigenère: the guess at each key letter, as a shift: 0 is A. */
  keyShifts: number[];
  /** Vigenère: which key letter the chart shows, counting from 0. */
  position: number;
  /** Vigenère: the row of the repeats table the reader tapped, if any. */
  repeat?: number;
}

/** A cryptogram with no work done on it yet. */
export const FRESH: Work = { shift: 0, guesses: {}, keyLength: 2, keyShifts: [0, 0], position: 0, repeat: 0 };

/** The place on the bench, after our four, for a cryptogram the reader brings. */
export const OWN = CRYPTOGRAMS.length;

/** A cryptogram the reader pasted in, and the kind of cipher they think it is. */
export interface Own {
  text: string;
  kind: Kind;
}

/** Everything the challenge page remembers: the reader's work on our four cryptograms and on their own. */
export interface ChallengeState {
  /** The cryptogram on the bench, counting from 0. OWN is the reader's own. */
  current: number;
  /** The work on each cryptogram: our four, then the reader's own. */
  work: Work[];
  /** The reader's own cryptogram. We do not know its answer. */
  own: Own;
  /** Which of our four have been read. Once solved, a cryptogram stays solved. */
  solved: boolean[];
}

export type ChallengeAction =
  | { type: "open"; cryptogram: number }
  | { type: "paste"; text: string }
  | { type: "pickKind"; kind: Kind }
  | { type: "turn"; by: number }
  | { type: "choose"; shift: number }
  | { type: "pick"; cipher: string }
  | { type: "assign"; plain: string }
  | { type: "rubOut" }
  | { type: "rubOutAll" }
  | { type: "guessByRank" }
  | { type: "resize"; by: number }
  | { type: "move"; by: number }
  | { type: "slide"; by: number }
  | { type: "pickRepeat"; row: number }
  | { type: "load"; preset: Partial<ChallengeState> };

/** What a bench needs to know about the cryptogram on it, whoever wrote it. */
export interface OnBench {
  kind: Kind;
  ciphertext: string;
  /** True when the letters come in groups of five with no word spaces. */
  grouped: boolean;
}

/** True when the reader's own cryptogram is on the bench. */
export const isOwn = (state: ChallengeState) => state.current === OWN;

/** The cryptogram on the bench: one of ours, or the reader's own made ready for its kind. */
export const onBench = (state: ChallengeState): OnBench =>
  isOwn(state) ? prepare(state.own.text, state.own.kind) : CRYPTOGRAMS[state.current]!;

/** The reader's work on the cryptogram on the bench. */
export const currentWork = (state: ChallengeState) => state.work[state.current]!;

/** Changes the work on the cryptogram on the bench and leaves the others alone. */
const withWork = (state: ChallengeState, change: Partial<Work>): ChallengeState => ({
  ...state,
  work: state.work.map((old, at) => (at === state.current ? { ...old, ...change } : old)),
});

/** A new text or a new kind of cipher is a new cryptogram: the work on the old one is thrown away. */
const startOwn = (state: ChallengeState, own: Own): ChallengeState => ({
  ...state,
  current: OWN,
  own,
  work: state.work.map((old, at) => (at === OWN ? FRESH : old)),
});

/** A new guess at the key length throws away the key letters found so far. */
function resize(work: Work, by: number): Partial<Work> {
  const keyLength = Math.max(2, Math.min(work.keyLength + by, MAX_KEY_LENGTH));
  return { keyLength, keyShifts: new Array<number>(keyLength).fill(0), position: 0 };
}

/** Slides the alphabet of the key letter in view. */
const slide = (work: Work, by: number): Partial<Work> => ({
  keyShifts: work.keyShifts.map((old, at) => (at === work.position ? mod(old + by, 26) : old)),
});

/** The change an action makes to the work on the cryptogram on the bench. */
function workOn(state: ChallengeState, action: ChallengeAction): Partial<Work> {
  const work = currentWork(state);
  switch (action.type) {
    case "turn":
      return { shift: mod(work.shift + action.by, 26) };
    case "choose":
      return { shift: mod(action.shift, 26) };
    case "pick":
      return { picked: action.cipher === work.picked ? undefined : action.cipher };
    case "assign":
      return work.picked ? { guesses: assign(work.guesses, work.picked, action.plain) } : {};
    case "rubOut":
      return work.picked ? { guesses: unassign(work.guesses, work.picked) } : {};
    case "rubOutAll":
      return { guesses: {} };
    case "guessByRank":
      return { guesses: guessByRank(onBench(state).ciphertext) };
    case "resize":
      return resize(work, action.by);
    case "move":
      return { position: mod(work.position + action.by, work.keyLength) };
    case "slide":
      return slide(work, action.by);
    case "pickRepeat":
      return { repeat: action.row === work.repeat ? undefined : action.row };
    default:
      return {};
  }
}

function act(state: ChallengeState, action: ChallengeAction): ChallengeState {
  switch (action.type) {
    case "open":
      return { ...state, current: action.cryptogram };
    case "paste":
      return startOwn(state, { ...state.own, text: action.text });
    case "pickKind":
      return startOwn(state, { ...state.own, kind: action.kind });
    case "load":
      // A preset that brings a text of the book puts it on the "Your own" bench as a new cryptogram.
      return action.preset.own ? startOwn(state, action.preset.own) : { ...state, ...action.preset };
    default:
      return withWork(state, workOn(state, action));
  }
}

/** The cryptogram on the bench as the reader's work so far reads it. */
export function reading(state: ChallengeState): string {
  const { kind, ciphertext } = onBench(state);
  const work = currentWork(state);
  switch (kind) {
    case "caesar":
      return decipher(ciphertext, work.shift);
    case "substitution":
      return partialText(ciphertext, work.guesses);
    case "vigenere":
      return applyKey(ciphertext, work.keyShifts);
  }
}

/** The reading to check against the answer. Unsolved substitution letters are left out, so they cannot pass by luck. */
function attempt(state: ChallengeState): string {
  const { kind, ciphertext } = onBench(state);
  if (kind !== "substitution") return reading(state);
  return read(ciphertext, currentWork(state).guesses)
    .map(({ plain }) => plain ?? "")
    .join("");
}

/** Records one of our cryptograms as solved the moment its reading is right. The reader's own has no known answer. */
function markSolved(state: ChallengeState): ChallengeState {
  if (isOwn(state) || state.solved[state.current]) return state;
  if (!isSolved(CRYPTOGRAMS[state.current]!, attempt(state))) return state;
  return { ...state, solved: state.solved.map((done, at) => done || at === state.current) };
}

const reduce = (state: ChallengeState, action: ChallengeAction) => markSolved(act(state, action));

/** Whether the cryptogram on the bench has been solved. Never true for the reader's own. */
export const currentIsSolved = (state: ChallengeState) => state.solved[state.current] === true;

/** Vigenère: the keyword the reader's shifts spell so far. */
export const keyword = (state: ChallengeState) => keywordFromShifts(currentWork(state).keyShifts);

/** The state of the challenge page and the way to change it. */
export const useCodebreakersChallenge = (start: ChallengeState) => useReducer(reduce, start);

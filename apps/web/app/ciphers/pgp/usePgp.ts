import { useReducer } from "react";
import { BOOK_KEY, factorKey, open, seal } from "@codebook/cipher-engine/pgp";

/** Bob's toy RSA key, the one from the book's worked example. */
export const BOB = BOOK_KEY;

/** What each step does, in order. The stage number in the state counts how many are done. */
export const STEPS = [
  "Make a session key",
  "Lock the message",
  "Lock the session key",
  "Send the envelope",
  "Bob unlocks the session key",
  "Bob unlocks the message",
];

/** The stage at which the envelope has left Alice. */
export const SENT = 4;

/** Whose eyes the board looks through. */
export type Viewer = "friends" | "eve";

/** Everything the PGP page remembers. */
export interface PgpState {
  /** What Alice wrote. */
  message: string;
  /** The random key for this one message, as letters. */
  sessionKey: string;
  /** How many of the STEPS are done, 0 to 6. */
  stage: number;
  viewer: Viewer;
  /** True in the challenge: Alice's desk is covered, so the reader has not seen the message. */
  sealed: boolean;
  /** True once Eve has found the two primes inside Bob's N. */
  cracked: boolean;
}

export type PgpAction =
  | { type: "write"; text: string }
  | { type: "step"; by: number }
  | { type: "shuffle"; sessionKey: string }
  | { type: "look"; viewer: Viewer }
  | { type: "factor" }
  | { type: "load"; preset: PgpState };

const clamp = (stage: number) => Math.max(0, Math.min(STEPS.length, stage));

function reduce(state: PgpState, action: PgpAction): PgpState {
  switch (action.type) {
    case "write":
      return { ...state, message: action.text, stage: 0, sealed: false };
    case "step":
      return { ...state, stage: clamp(state.stage + action.by) };
    case "shuffle":
      return { ...state, sessionKey: action.sessionKey, stage: 1, sealed: false };
    case "look":
      return { ...state, viewer: action.viewer };
    case "factor":
      return { ...state, cracked: true, viewer: "eve" };
    case "load":
      return action.preset;
  }
}

/** The two parts Alice sends, worked out from the state. */
export const envelope = (state: PgpState) => seal(state.message, state.sessionKey, BOB);

/** What Eve learns by factoring Bob's N: his private key, then the session key and the message. */
export function evesLoot(state: PgpState) {
  const key = factorKey(BOB);
  return { key, ...open(envelope(state), key) };
}

/** What is travelling where Eve can copy it, as one line of text. */
export function travelling(state: PgpState): string {
  if (state.stage < SENT) return "Nothing yet";
  const { ciphertext, lockedKey } = envelope(state);
  return `${ciphertext} + key ${lockedKey.join(" ")}`;
}

/** The state of the PGP page and the way to change it. */
export const usePgp = (start: PgpState) => useReducer(reduce, start);

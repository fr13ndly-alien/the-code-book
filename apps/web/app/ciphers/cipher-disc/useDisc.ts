import { useReducer } from "react";
import { decipher, encipher, settingAt, type DiscSettings, type Turning } from "@codebook/cipher-engine/cipher-disc";
import { lettersOnly } from "@codebook/cipher-engine/text";

/** Whether the reader is writing a secret message or reading one. */
export type Mode = "encipher" | "decipher";

/** Everything the cipher disc page remembers: how the disc is set and used, and the message. */
export interface DiscState extends DiscSettings {
  mode: Mode;
  /** What the reader typed: plaintext when enciphering, ciphertext when deciphering. */
  text: string;
}

export type DiscAction =
  | { type: "type"; text: string }
  | { type: "turn"; by: number }
  | { type: "spin"; turning: Turning }
  | { type: "key"; keyword: string }
  | { type: "switch"; mode: Mode }
  | { type: "load"; preset: DiscState };

function reduce(state: DiscState, action: DiscAction): DiscState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text };
    case "turn":
      // The shift is not wrapped at 26, so the drawn ring always turns the short way.
      return { ...state, shift: state.shift + action.by };
    case "spin":
      return { ...state, turning: action.turning };
    case "key":
      return { ...state, keyword: action.keyword };
    case "switch":
      return { ...state, mode: action.mode };
    case "load":
      return action.preset;
  }
}

/** The text the disc produces from what the reader typed. */
export const output = (state: DiscState) =>
  state.mode === "encipher" ? encipher(state, state.text) : decipher(state, state.text);

/** How many letters have been typed so far. */
export const letterCount = (state: DiscState) => lettersOnly(state.text).length;

/**
 * Where the disc stands now: the setting it used for the last letter typed, or
 * its starting setting if nothing has been typed. Not wrapped at 26 unless a keyword sets it.
 */
export function shownSetting(state: DiscState): number {
  const last = Math.max(0, letterCount(state) - 1);
  if (state.turning === "fixed") return state.shift;
  if (state.turning === "stepping") return state.shift + last;
  return settingAt(state, last);
}

/** The state of the cipher disc page and the way to change it. */
export const useDisc = (start: DiscState) => useReducer(reduce, start);

import { useReducer } from "react";
import { encode, speak, type CodeWord } from "@codebook/cipher-engine/navajo";

/** Whether the reader is sending a message in code or listening to one. */
export type Mode = "send" | "listen";

/** Everything the Navajo page remembers. */
export interface NavajoState {
  /** The English message. When listening it stays hidden until the reader works it out. */
  text: string;
  mode: Mode;
  /** The code word whose chain is shown, counted along the whole message. */
  picked?: number;
  /** When listening: the code words the reader has opened so far. */
  opened: number[];
}

export type NavajoAction =
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "tap"; word: number }
  | { type: "openAll" }
  | { type: "closeAll" }
  | { type: "load"; preset: NavajoState };

function reduce(state: NavajoState, action: NavajoAction): NavajoState {
  switch (action.type) {
    case "type":
      return { ...state, text: action.text, picked: undefined, opened: [] };
    case "switch":
      return { ...state, mode: action.mode, picked: undefined, opened: [] };
    case "tap":
      return { ...state, picked: action.word, opened: [...new Set([...state.opened, action.word])] };
    case "openAll":
      return { ...state, opened: groupsOf(state).flat().map((_, word) => word) };
    case "closeAll":
      return { ...state, picked: undefined, opened: [] };
    case "load":
      return action.preset;
  }
}

/** The message in code: one group of code words per English word or term. */
export const groupsOf = (state: NavajoState): CodeWord[][] => encode(state.text);

/** Whether the reader can see what a code word stands for. Always true when sending. */
export const isOpen = (state: NavajoState, word: number) => state.mode === "send" || state.opened.includes(word);

/** The text for the controls: the spoken code when sending, the English found so far when listening. */
export function output(state: NavajoState): string {
  const groups = groupsOf(state);
  if (state.mode === "send") return speak(groups);
  let word = 0;
  return groups.map((group) => group.map((entry) => (isOpen(state, word++) ? entry.stands : "·")).join("")).join(" ");
}

/** The state of the Navajo page and the way to change it. */
export const useNavajo = (start: NavajoState) => useReducer(reduce, start);

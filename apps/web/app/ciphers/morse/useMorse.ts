import { useReducer } from "react";
import { decode, encode, fromMorse, pulses, toMorse, type Pulse, type Sign } from "@codebook/cipher-engine/morse";

/** Whether the reader is sending a typed message or keying in signals by hand. */
export type Mode = "send" | "receive";

/** Everything the Morse page remembers. */
export interface MorseState {
  mode: Mode;
  /** The message to send, as the reader typed it. */
  text: string;
  /** What the reader has keyed in by hand: dots and dashes, " " between letters, " / " between words. */
  keyed: string;
  /** Signals that have come down the wire for the reader to copy, written the same way. */
  tape?: string;
  /** True while the lamp is flashing the message. */
  sending: boolean;
  /** How many pulses of the message the lamp has finished. */
  sent: number;
}

export type MorseAction =
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "send" }
  | { type: "stop" }
  | { type: "tick" }
  | { type: "finish" }
  | { type: "key"; symbol: "." | "-" }
  | { type: "gap"; after: "letter" | "word" }
  | { type: "rub" }
  | { type: "load"; preset: MorseState };

const WORD_GAP = " / ";

/** The message on the board, sign by sign: the typed one when sending, the keyed one when receiving. */
export const signsOf = (state: MorseState): Sign[] =>
  state.mode === "send" ? encode(state.text) : decode(state.keyed);

/** The typed message as on-and-off pulses, for the lamp. */
export const timeline = (state: MorseState): Pulse[] => pulses(encode(state.text));

/** The text the page produces: dots and dashes when sending, letters when receiving. */
export const output = (state: MorseState) => (state.mode === "send" ? toMorse(state.text) : fromMorse(state.keyed));

/** The dots and dashes at the end of what was keyed: a letter not yet finished. Empty between letters. */
const unfinished = (keyed: string) => /[.-]+$/.exec(keyed)?.[0] ?? "";

/** The dots and dashes of the letter the reader is in the middle of keying. */
export const halfKeyed = (state: MorseState) => unfinished(state.keyed);

/** A new message starts with the lamp dark. */
const quiet = (state: MorseState): MorseState => ({ ...state, sending: false, sent: 0 });

/** Ends the letter, or the word, being keyed. Pressing a gap twice adds nothing. */
function addGap(keyed: string, after: "letter" | "word"): string {
  if (after === "letter") return unfinished(keyed) === "" ? keyed : `${keyed} `;
  return keyed === "" || keyed.endsWith(WORD_GAP) ? keyed : `${keyed.trimEnd()}${WORD_GAP}`;
}

const rubOut = (keyed: string) => keyed.slice(0, keyed.endsWith(WORD_GAP) ? -WORD_GAP.length : -1);

function reduce(state: MorseState, action: MorseAction): MorseState {
  switch (action.type) {
    case "type":
      return quiet({ ...state, text: action.text });
    case "switch":
      return quiet({ ...state, mode: action.mode });
    case "send":
      return { ...state, sending: true, sent: 0 };
    case "stop":
      return quiet(state);
    case "tick": {
      const sent = state.sent + 1;
      return { ...state, sent, sending: sent < timeline(state).length };
    }
    case "finish":
      return { ...state, sending: false, sent: timeline(state).length };
    case "key":
      return { ...state, keyed: state.keyed + action.symbol };
    case "gap":
      return { ...state, keyed: addGap(state.keyed, action.after) };
    case "rub":
      return { ...state, keyed: rubOut(state.keyed) };
    case "load":
      return action.preset;
  }
}

/** The state of the Morse page and the way to change it. */
export const useMorse = (start: MorseState) => useReducer(reduce, start);

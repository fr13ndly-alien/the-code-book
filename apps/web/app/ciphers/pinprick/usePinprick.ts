import { useReducer } from "react";
import { hide, reveal, togglePrick, type Hiding } from "@codebook/cipher-engine/pinprick";

/** Whether the page pricks the letters for the reader, or the reader pricks them by hand. */
export type Mode = "auto" | "hand";

/** Everything the pinprick page remembers. */
export interface PinprickState {
  /** The innocent text that carries the holes. */
  cover: string;
  /** The message the reader wants to hide. Used in "auto" mode. */
  secret: string;
  mode: Mode;
  /** The holes the reader made by hand: positions in the cover text. Used in "hand" mode. */
  pricked: number[];
  /** True while the page is held up to the light, so only pricked letters show. */
  light: boolean;
}

export type PinprickAction =
  | { type: "type"; secret: string }
  | { type: "switch"; mode: Mode }
  | { type: "prick"; position: number }
  | { type: "hold"; light: boolean }
  | { type: "mend" }
  | { type: "load"; preset: PinprickState };

/** The engine's attempt to hide the secret in the cover text. */
export const hiding = (state: PinprickState): Hiding => hide(state.cover, state.secret);

/** Where the holes are now, whoever made them. */
export const pricks = (state: PinprickState) => (state.mode === "auto" ? hiding(state).positions : state.pricked);

/** What a reader sees through the holes. */
export const output = (state: PinprickState) => reveal(state.cover, pricks(state));

function reduce(state: PinprickState, action: PinprickAction): PinprickState {
  switch (action.type) {
    case "type":
      return { ...state, secret: action.secret, mode: "auto" };
    case "switch":
      // Going to "hand" keeps the holes already on the page, so the reader can add to them.
      return { ...state, mode: action.mode, pricked: pricks(state) };
    case "prick":
      return { ...state, mode: "hand", pricked: togglePrick(pricks(state), action.position) };
    case "hold":
      return { ...state, light: action.light };
    case "mend":
      return { ...state, mode: "hand", pricked: [] };
    case "load":
      return action.preset;
  }
}

/** The state of the pinprick page and the way to change it. */
export const usePinprick = (start: PinprickState) => useReducer(reduce, start);

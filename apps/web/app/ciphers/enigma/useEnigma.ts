import { useReducer } from "react";
import {
  DEFAULT_SETTINGS,
  addCable,
  pressKey,
  removeCable,
  type EnigmaSettings,
  type KeyPress,
  type Positions,
  type RotorName,
} from "@codebook/cipher-engine";

/** Rotor slots, left to right. */
export type Slot = 0 | 1 | 2;

/**
 * Everything the Enigma page shows. It is plain data, so it survives the 3D
 * canvas being torn down and rebuilt, and can be saved later without changes.
 */
export interface EnigmaState {
  settings: EnigmaSettings;
  /** Where the rotors stood when the current message began. */
  start: Positions;
  positions: Positions;
  typed: string;
  lamps: string;
  /** The most recent key press, or null before the first one. */
  last: KeyPress | null;
}

export type EnigmaAction =
  | { type: "press"; key: string }
  | { type: "turn"; slot: Slot; by: 1 | -1 }
  | { type: "fit"; slot: Slot; rotor: RotorName }
  | { type: "plug"; a: string; b: string }
  | { type: "unplug"; letter: string }
  | { type: "rewind" }
  | { type: "load"; settings: EnigmaSettings; start: Positions };

const INITIAL: EnigmaState = {
  settings: DEFAULT_SETTINGS,
  start: [0, 0, 0],
  positions: [0, 0, 0],
  typed: "",
  lamps: "",
  last: null,
};

/** Returns `triple` with the value in one slot replaced. */
function withSlot<T>(triple: readonly [T, T, T], slot: Slot, value: T): [T, T, T] {
  const copy: [T, T, T] = [...triple];
  copy[slot] = value;
  return copy;
}

/** A change of setup starts a fresh message from the given positions. */
function newMessage(settings: EnigmaSettings, start: Positions): EnigmaState {
  return { ...INITIAL, settings, start, positions: start };
}

function reduce(state: EnigmaState, action: EnigmaAction): EnigmaState {
  const { settings } = state;

  switch (action.type) {
    case "press": {
      const press = pressKey(settings, state.positions, action.key);
      return {
        ...state,
        positions: press.positions,
        typed: state.typed + action.key,
        lamps: state.lamps + press.output,
        last: press,
      };
    }

    case "turn": {
      const turned = (state.positions[action.slot] + action.by + 26) % 26;
      return newMessage(settings, withSlot(state.positions, action.slot, turned));
    }

    case "fit": {
      // A rotor can sit in only one slot, so the two slots trade rotors.
      const from = settings.rotors.indexOf(action.rotor) as Slot | -1;
      let rotors = withSlot(settings.rotors, action.slot, action.rotor);
      if (from !== -1) rotors = withSlot(rotors, from, settings.rotors[action.slot]);
      return newMessage({ ...settings, rotors }, state.start);
    }

    case "plug":
      return newMessage({ ...settings, cables: addCable(settings.cables, action.a, action.b) }, state.start);

    case "unplug":
      return newMessage({ ...settings, cables: removeCable(settings.cables, action.letter) }, state.start);

    case "rewind":
      return newMessage(settings, state.start);

    case "load":
      return newMessage(action.settings, action.start);
  }
}

export function useEnigma() {
  return useReducer(reduce, INITIAL);
}

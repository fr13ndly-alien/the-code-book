import { useReducer } from "react";
import {
  CARTOUCHES,
  assign,
  isRead,
  readingText,
  valuesFrom,
  type Assignment,
  type Cartouche,
  type CartoucheId,
  type SignId,
  type Sound,
} from "@codebook/cipher-engine/hieroglyphs";

/** The two cartouches that came without a Greek translation. */
export type Mystery = "rameses" | "alexander";

/** Everything the hieroglyphs page remembers. */
export interface HieroglyphsState {
  /** The sounds the reader has given to signs. */
  assignment: Assignment;
  /** Which untranslated cartouche is on the board. */
  mystery: Mystery;
  /** The sign the reader tapped: which cartouche, and how far along it. */
  picked?: { cartouche: CartoucheId; at: number };
}

export type HieroglyphsAction =
  | { type: "tap"; cartouche: CartoucheId; at: number }
  | { type: "say"; sound: Sound | undefined }
  | { type: "choose"; mystery: Mystery }
  | { type: "fill" }
  | { type: "wipe" }
  | { type: "load"; preset: HieroglyphsState };

function reduce(state: HieroglyphsState, action: HieroglyphsAction): HieroglyphsState {
  switch (action.type) {
    case "tap":
      return { ...state, picked: { cartouche: action.cartouche, at: action.at } };
    case "say": {
      const sign = pickedSign(state);
      return sign ? { ...state, assignment: assign(state.assignment, sign, action.sound) } : state;
    }
    case "choose":
      return { ...state, mystery: action.mystery, picked: undefined };
    case "fill":
      return { ...state, assignment: { ...state.assignment, ...BILINGUAL_VALUES } };
    case "wipe":
      return { ...state, assignment: {}, picked: undefined };
    case "load":
      return action.preset;
  }
}

/** The sounds that the two translated cartouches give: all that Champollion had to start with. */
export const BILINGUAL_VALUES = valuesFrom([CARTOUCHES.ptolemy, CARTOUCHES.cleopatra]);

/** The cartouches on the board, top to bottom. */
export const shown = (state: HieroglyphsState): CartoucheId[] => ["ptolemy", "cleopatra", state.mystery];

/** The sign the reader tapped, if any. */
export function pickedSign(state: HieroglyphsState): SignId | undefined {
  if (!state.picked) return undefined;
  const cartouche: Cartouche = CARTOUCHES[state.picked.cartouche];
  return cartouche.signs[state.picked.at];
}

/** The reading of the mystery cartouche, with its name once every sign is right. */
export function output(state: HieroglyphsState): string {
  const cartouche: Cartouche = CARTOUCHES[state.mystery];
  const reading = readingText(cartouche, state.assignment);
  return isRead(cartouche, state.assignment) ? `${reading}: ${cartouche.name}` : reading;
}

/** The state of the hieroglyphs page and the way to change it. */
export const useHieroglyphs = (start: HieroglyphsState) => useReducer(reduce, start);

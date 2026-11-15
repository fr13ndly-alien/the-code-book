import { useReducer } from "react";
import { TOY_KEY, forge, sign, verify } from "@codebook/cipher-engine/digital-signatures";
import type { Locale } from "~/i18n";

/** Alice's toy RSA key. */
export const ALICE = TOY_KEY;

/** Everything the signatures page remembers. */
export interface SignaturesState {
  /** What Alice has written on her desk. */
  message: string;
  /** The message that reaches Bob. Anyone on the way may have changed it. */
  arrived: string;
  /** The signature that reaches Bob, or null if none came. */
  signature: number | null;
  /** How many numbers the forger tried before one passed, if the forger has done that. */
  tries: number | null;
}

export type SignaturesAction =
  | { type: "write"; text: string }
  | { type: "sign" }
  | { type: "tamper"; text: string }
  | { type: "scribble"; signature: number | null }
  | { type: "tryAll" }
  | { type: "load"; preset: SignaturesState };

function reduce(state: SignaturesState, action: SignaturesAction): SignaturesState {
  switch (action.type) {
    case "write":
      return { ...state, message: action.text };
    case "sign":
      return { message: state.message, arrived: state.message, signature: sign(state.message, ALICE), tries: null };
    case "tamper":
      return { ...state, arrived: action.text, tries: null };
    case "scribble":
      return { ...state, signature: action.signature, tries: null };
    case "tryAll": {
      const found = forge(state.arrived, ALICE);
      return { ...state, ...found };
    }
    case "load":
      return action.preset;
  }
}

/** Bob's check of what arrived, with its working. Null if no signature came. */
export const check = (state: SignaturesState) =>
  state.signature === null ? null : verify(state.arrived, state.signature, ALICE);

/** Bob's verdict in words. */
export function verdict(state: SignaturesState, locale: Locale): string {
  const result = check(state);
  if (locale === "vi") {
    if (!result) return "Không có chữ ký: tin này có thể là của bất kỳ ai";
    return result.valid ? "✓ Thật: các con số khớp nhau" : "✗ Đừng tin: các con số khác nhau";
  }
  if (!result) return "No signature: this could be from anyone";
  return result.valid ? "✓ Genuine: the numbers match" : "✗ Do not trust: the numbers differ";
}

/** The state of the signatures page and the way to change it. */
export const useSignatures = (start: SignaturesState) => useReducer(reduce, start);

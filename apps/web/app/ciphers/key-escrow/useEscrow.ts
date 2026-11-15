import { useReducer } from "react";
import {
  KEY_LENGTH,
  release,
  setWarrant,
  whatPoliceCanRead,
  whoCanRead,
  type EscrowState,
  type Held,
} from "@codebook/cipher-engine/key-escrow";
import { lettersOnly } from "@codebook/cipher-engine/text";
import type { Locale } from "~/i18n";
import { READER_NAMES_VI } from "./vi";

/** One of the two agencies that each store half a key. */
export type Agency = keyof Held;

/** Everything the key escrow page remembers. */
export interface EscrowPageState extends EscrowState {
  /** True in the challenge: Alice's desk and the agencies' shelves are covered. */
  sealed: boolean;
}

export type EscrowAction =
  | { type: "write"; text: string }
  | { type: "rekey"; text: string }
  | { type: "lodge"; random: string }
  | { type: "warrant"; on: boolean }
  | { type: "release"; agency: Agency }
  | { type: "leak"; agency: Agency }
  | { type: "steal" }
  | { type: "outlaw"; on: boolean }
  | { type: "reset" }
  | { type: "load"; preset: EscrowPageState };

const NOBODY: Held = { one: false, two: false };

/** A newly lodged key: nothing has been released or stolen yet. */
const newCase = (state: EscrowPageState): EscrowPageState => ({
  ...state,
  warrant: false,
  released: NOBODY,
  stolen: NOBODY,
});

function reduce(state: EscrowPageState, action: EscrowAction): EscrowPageState {
  switch (action.type) {
    case "write":
      return { ...state, message: action.text, sealed: false };
    case "rekey":
      return newCase({ ...state, key: lettersOnly(action.text).slice(0, KEY_LENGTH), sealed: false });
    case "lodge":
      return newCase({ ...state, random: action.random, sealed: false });
    case "warrant":
      return { ...state, ...setWarrant(state, action.on) };
    case "release":
      return { ...state, ...release(state, action.agency) };
    case "leak":
      return { ...state, stolen: { ...state.stolen, [action.agency]: true } };
    case "steal":
      return { ...state, stolen: { one: true, two: true } };
    case "outlaw":
      return { ...state, escrowed: !action.on };
    case "reset":
      return newCase({ ...state, escrowed: true });
    case "load":
      return action.preset;
  }
}

/** A list in words: "Alice and Bob", "Alice, Bob and the police". In Vietnamese, "và" joins the last two. */
const inWords = (names: string[], and: string) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} ${and} ${names[names.length - 1]}`;

/** Who can read the message right now, as one line of text. */
export function readers(state: EscrowPageState, locale: Locale): string {
  const names = whoCanRead(state);
  if (locale === "vi") {
    const list = inWords(names.map((name) => READER_NAMES_VI[name] ?? name), "và");
    return names.length === 2 ? `Chỉ ${list}` : list;
  }
  return names.length === 2 ? `Only ${inWords(names, "and")}` : inWords(names, "and");
}

/** What the police have on their desk, as one line of text. */
export function policeView(state: EscrowPageState, locale: Locale): string {
  const view = whatPoliceCanRead(state);
  if (view.canRead) return view.text;
  if (locale === "vi") {
    if (view.key !== null) return `${view.text} (vô nghĩa: người gửi đã dùng một khóa chưa bao giờ được ký gửi)`;
    return `${view.text} (${view.one ?? view.two ? "vô nghĩa: một nửa không phải là khóa" : "vẫn còn mã hóa"})`;
  }
  if (view.key !== null) return `${view.text} (nonsense: the sender used a key that was never lodged)`;
  return `${view.text} (${view.one ?? view.two ? "nonsense: one half is not a key" : "still enciphered"})`;
}

/** The state of the key escrow page and the way to change it. */
export const useEscrow = (start: EscrowPageState) => useReducer(reduce, start);

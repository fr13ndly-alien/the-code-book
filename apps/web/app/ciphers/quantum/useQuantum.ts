import { useReducer } from "react";
import { compare, transmit, type Run } from "@codebook/cipher-engine/quantum";
import type { Bilingual, Locale } from "~/i18n";

/** What each step does, in order. The stage in the state is the number of steps done, 1 to 4. */
export const STEPS: Bilingual[] = [
  { en: "Alice sends photons", vi: "Alice gửi photon" },
  { en: "Bob measures them", vi: "Bob đo chúng" },
  { en: "They keep the matches", vi: "Họ giữ chỗ khớp nhau" },
  { en: "They compare a sample", vi: "Họ so một phần mẫu" },
];

/** The stages at which the board gains new rows. */
export const MEASURED = 2;
export const SIFTED = 3;
export const COMPARED = 4;

/** Everything the quantum page remembers. */
export interface QuantumState {
  /** Every random choice of this exchange, made in the view and stored as plain data. */
  run: Run;
  /** True when Eve measures each photon on its way. */
  eve: boolean;
  /** True in the challenge: the reader is not told whether Eve is on the line. */
  eveHidden: boolean;
  /** How many of the STEPS are done, 1 to 4. */
  stage: number;
  /** The photon the reader tapped, if any. */
  picked?: number;
}

export type QuantumAction =
  | { type: "send"; run: Run }
  | { type: "listen"; eve: boolean }
  | { type: "step"; by: number }
  | { type: "pick"; column: number }
  | { type: "load"; preset: QuantumState };

const clamp = (stage: number) => Math.max(1, Math.min(STEPS.length, stage));

function reduce(state: QuantumState, action: QuantumAction): QuantumState {
  switch (action.type) {
    case "send":
      return { ...state, run: action.run, eveHidden: false, picked: undefined };
    case "listen":
      return { ...state, eve: action.eve, eveHidden: false };
    case "step":
      return { ...state, stage: clamp(state.stage + action.by) };
    case "pick":
      return { ...state, picked: action.column === state.picked ? undefined : action.column };
    case "load":
      return action.preset;
  }
}

/** The life of every photon in the current run. */
export const photons = (state: QuantumState) => transmit(state.run, state.eve);

/** What Alice and Bob end up with, in words: a key, or a warning. */
export function outcome(state: QuantumState, locale: Locale): string {
  if (state.stage < COMPARED) return locale === "vi" ? "Chưa thống nhất" : "Not agreed yet";
  const result = compare(photons(state));
  if (locale === "vi") {
    if (result.errors > 0) return `Bỏ đi: ${result.errors} trên ${result.sample.length} bit được so không khớp`;
    return `${result.aliceKey.join("")} (cả ${result.sample.length} bit được so đều khớp)`;
  }
  if (result.errors > 0) return `Thrown away: ${result.errors} of ${result.sample.length} compared bits differ`;
  return `${result.aliceKey.join("")} (all ${result.sample.length} compared bits agree)`;
}

/** The state of the quantum page and the way to change it. */
export const useQuantum = (start: QuantumState) => useReducer(reduce, start);

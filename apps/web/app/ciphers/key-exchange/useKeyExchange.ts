import { useReducer } from "react";
import { eveSearch, exchange, primesUpTo, type PublicNumbers } from "@codebook/cipher-engine/key-exchange";
import { mod } from "@codebook/cipher-engine/text";
import type { Locale } from "~/i18n";

/** The primes the reader can choose for P. The smallest leaves room for a secret; the largest keeps Eve's list short. */
export const PRIMES = primesUpTo(101).filter((prime) => prime >= 5);

/** The exchange has four steps: agree in public, choose secrets, swap numbers, work out the key. */
export const LAST_STEP = 4;

/** Everything the key exchange page remembers. */
export interface KeyExchangeState {
  /** Y, the public base of the one-way function, 2 to P - 1. */
  base: number;
  /** P, the public prime. */
  modulus: number;
  /** Alice's secret number, 1 to P - 2. */
  aliceSecret: number;
  /** Bob's secret number, 1 to P - 2. */
  bobSecret: number;
  /** How far the exchange has gone, 1 to 4. */
  step: number;
  /** True once the reader has let Eve try every secret. */
  eveSearching: boolean;
  /** True when the reader plays Eve: the secrets and the key are hidden. */
  youAreEve?: boolean;
}

export type KeyExchangeAction =
  | { type: "turnBase"; by: number }
  | { type: "turnPrime"; by: number }
  | { type: "turnAlice"; by: number }
  | { type: "turnBob"; by: number }
  | { type: "next" }
  | { type: "restart" }
  | { type: "unleashEve" }
  | { type: "load"; preset: KeyExchangeState };

/** Steps a number round a loop that runs from `low` to `high`. */
const wrap = (value: number, low: number, high: number) => low + mod(value - low, high - low + 1);

/** Pulls the base and the secrets back into range after P has changed. */
const fit = (state: KeyExchangeState): KeyExchangeState => ({
  ...state,
  base: wrap(state.base, 2, state.modulus - 1),
  aliceSecret: wrap(state.aliceSecret, 1, state.modulus - 2),
  bobSecret: wrap(state.bobSecret, 1, state.modulus - 2),
});

function nextPrime(modulus: number, by: number): number {
  const at = PRIMES.indexOf(modulus);
  return PRIMES[mod(at + by, PRIMES.length)]!;
}

function reduce(state: KeyExchangeState, action: KeyExchangeAction): KeyExchangeState {
  switch (action.type) {
    case "turnBase":
      return fit({ ...state, base: state.base + action.by });
    case "turnPrime":
      return fit({ ...state, modulus: nextPrime(state.modulus, action.by) });
    case "turnAlice":
      return fit({ ...state, aliceSecret: state.aliceSecret + action.by });
    case "turnBob":
      return fit({ ...state, bobSecret: state.bobSecret + action.by });
    case "next":
      return { ...state, step: Math.min(LAST_STEP, state.step + 1) };
    case "restart":
      return { ...state, step: 1, eveSearching: false };
    case "unleashEve":
      return { ...state, eveSearching: !state.eveSearching };
    case "load":
      return action.preset;
  }
}

/** The two numbers everyone may know. */
export const publicNumbers = (state: KeyExchangeState): PublicNumbers => ({ base: state.base, modulus: state.modulus });

/** Every number Alice and Bob work out. */
export const runExchange = (state: KeyExchangeState) => exchange(publicNumbers(state), state.aliceSecret, state.bobSecret);

/** Eve's guesses so far, or nothing if the reader has not set her to work. */
export function runEve(state: KeyExchangeState) {
  if (!state.eveSearching || state.step < 3) return undefined;
  const { alice, bob } = runExchange(state);
  return eveSearch(publicNumbers(state), alice.sends, bob.sends);
}

/** The shared key as the controls show it: hidden until it exists, or until Eve has found it. */
export function keyText(state: KeyExchangeState, locale: Locale): string {
  if (state.youAreEve) return String(runEve(state)?.key ?? "?");
  if (state.step < LAST_STEP) return locale === "vi" ? "Chưa có" : "Not yet";
  return String(runExchange(state).alice.key);
}

/** The state of the key exchange page and the way to change it. */
export const useKeyExchange = (start: KeyExchangeState) => useReducer(reduce, start);

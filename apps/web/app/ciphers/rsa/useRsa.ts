import { useReducer } from "react";
import { crack, decipher, encipher, makeKeys, validExponents, type PowerSteps, type RsaKeys } from "@codebook/cipher-engine/rsa";
import { mod } from "@codebook/cipher-engine/text";
import type { Locale } from "~/i18n";

/** The small primes the reader can choose p and q from. */
export const PRIME_CHOICES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

/** Whether the reader is locking a message with the public key or opening one with the private key. */
export type Mode = "encipher" | "decipher";

/** Everything the RSA page remembers. */
export interface RsaState {
  p: number;
  q: number;
  /** The public exponent. Always one of validExponents(p, q). */
  e: number;
  mode: Mode;
  /** What the reader typed: a letter or a number to encipher, or a number to decipher. */
  text: string;
  /** True once the reader has let Eve factor N. */
  attacked: boolean;
  /** True when the reader plays Eve: p, q and d stay hidden until N is factored. */
  youAreEve?: boolean;
}

export type RsaAction =
  | { type: "turnP"; by: number }
  | { type: "turnQ"; by: number }
  | { type: "turnE"; by: number }
  | { type: "type"; text: string }
  | { type: "switch"; mode: Mode }
  | { type: "attack" }
  | { type: "load"; preset: RsaState };

/** The next prime in the list that is not the one the other letter already uses. */
function nextPrime(current: number, other: number, by: number): number {
  const choices = PRIME_CHOICES.filter((prime) => prime !== other);
  return choices[mod(choices.indexOf(current) + by, choices.length)]!;
}

/** Keeps e if it still works with new primes; otherwise takes the smallest e that does. */
function withPrimes(state: RsaState, p: number, q: number): RsaState {
  const options = validExponents(p, q);
  return { ...state, p, q, e: options.includes(state.e) ? state.e : options[0]!, attacked: false };
}

function turnE(state: RsaState, by: number): RsaState {
  const options = validExponents(state.p, state.q);
  return { ...state, e: options[mod(options.indexOf(state.e) + by, options.length)]!, attacked: false };
}

function reduce(state: RsaState, action: RsaAction): RsaState {
  switch (action.type) {
    case "turnP":
      return withPrimes(state, nextPrime(state.p, state.q, action.by), state.q);
    case "turnQ":
      return withPrimes(state, state.p, nextPrime(state.q, state.p, action.by));
    case "turnE":
      return turnE(state, action.by);
    case "type":
      return { ...state, text: action.text };
    case "switch":
      // The result of one direction becomes the input of the other, ready to be undone.
      return action.mode === state.mode ? state : { ...state, mode: action.mode, text: String(work(state)?.result ?? "") };
    case "attack":
      return { ...state, attacked: !state.attacked };
    case "load":
      return action.preset;
  }
}

/** All the numbers of the current key. Presets and the reducer only allow sets that work. */
export const keysOf = (state: RsaState): RsaKeys => makeKeys(state.p, state.q, state.e)!;

/** True while the private numbers must not be shown: the reader is Eve and has not yet factored N. */
export const secretsHidden = (state: RsaState) => state.youAreEve === true && !state.attacked;

/** The number to work on: digits are read as a number, anything else as the ASCII code of its first character. */
export function inputNumber(state: RsaState): number | undefined {
  const text = state.text.trim();
  if (text === "") return undefined;
  return /^\d+$/.test(text) ? Number(text) : text.charCodeAt(0);
}

/** The power being worked out, step by step. Missing if there is no input, it is too big, or the key is hidden. */
export function work(state: RsaState): PowerSteps | undefined {
  const keys = keysOf(state);
  const input = inputNumber(state);
  if (input === undefined || input >= keys.n) return undefined;
  if (state.mode === "encipher") return encipher(input, keys);
  return secretsHidden(state) ? undefined : decipher(input, keys);
}

/** A number with the character it stands for in ASCII, if it is a printable one: "88 = X". */
export const withLetter = (code: number) => (code > 32 && code < 127 ? `${code} = ${String.fromCharCode(code)}` : String(code));

/** The result as the controls show it, or the reason there is none. */
export function output(state: RsaState, locale: Locale): string {
  const input = inputNumber(state);
  if (input === undefined) return "";
  if (input >= keysOf(state).n) return locale === "vi" ? "Quá lớn: phải nhỏ hơn N" : "Too big: it must be less than N";
  const steps = work(state);
  if (!steps) return locale === "vi" ? "Bạn cần có d trước đã" : "You need d first";
  return state.mode === "encipher" ? String(steps.result) : withLetter(steps.result);
}

/** Eve's attack on the public key, or nothing if the reader has not started it. */
export const attackOf = (state: RsaState) => (state.attacked ? crack(keysOf(state).n, state.e) : undefined);

/** The state of the RSA page and the way to change it. */
export const useRsa = (start: RsaState) => useReducer(reduce, start);

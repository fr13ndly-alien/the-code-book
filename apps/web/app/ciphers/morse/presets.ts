import { toMorse } from "@codebook/cipher-engine/morse";
import type { MorseState } from "./useMorse";

const sendMessage = (text: string): MorseState => ({ mode: "send", text, keyed: "", sending: false, sent: 0 });
const receive = (tape?: string): MorseState => ({ mode: "receive", text: "", keyed: "", tape, sending: false, sent: 0 });

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, MorseState> = {
  /** The best-known signal of all. The page starts here. */
  sos: sendMessage("SOS"),

  /** An empty message, ready for the reader's own words. */
  blank: sendMessage(""),

  /** Three common letters and three rare ones, to compare their lengths. */
  common: sendMessage("EAT JQY"),

  /** The message Morse sent from Washington to Baltimore in 1844. */
  first: sendMessage("WHAT HATH GOD WROUGHT"),

  /** A message enciphered before sending: ATTACK AT DAWN under the Vigenère keyword LEMON. */
  enciphered: sendMessage("LXFOPV EF RNHR"),

  /** A quiet key, for tapping out signals by hand. */
  key: receive(),

  /** The challenge: a tape of signals for the reader to key in and read. The engine wrote the tape. */
  wire: receive(toMorse("COME AT ONCE")),
};
